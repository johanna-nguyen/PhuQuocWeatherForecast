function fetchUVIndexData(lat, lon) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&timezone=auto`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      updateUVIndex(data);
      const currentHour = new Date().getHours();
      const uvindex = data.hourly.uv_index[currentHour];
      console.log("Current UV Index:", uvindex);
      updateUVIndexArrow(uvindex);
      updateUVIndexBackground(uvindex);
    })
    .catch(error => {
      console.error('Error fetching UV data:', error);
    });
}

function updateUVIndex(data) {
  const UVIndex = document.getElementById('uv-index');
  UVIndex.innerHTML = '';
  const currentHour = new Date().getHours();
  const uvindex = data.hourly.uv_index[currentHour];
  UVIndex.textContent = uvindex;
  alertUVIndexUser(data);
}

let uvIndexLocationChangeHandler = null;

function activateUVIndexModule() {
  currentActiveType = 'uv';
  const locationSelect = document.getElementById('locationSelect');
  if (!locationSelect) return;

  if (uvIndexLocationChangeHandler) {
    locationSelect.removeEventListener('change', uvIndexLocationChangeHandler);
  }

  uvIndexLocationChangeHandler = handleUVIndexLocationChange;
  locationSelect.addEventListener('change', handleUVIndexLocationChange);

  if (typeof mapView !== 'undefined') {
    initializeMapClickEvent(mapView, 'uv');
  }

  initSearch(mapView);

  console.log("UV Index module activated");
}

function deactivateUVIndexModule() {
  const locationSelect = document.getElementById('locationSelect');

  if (locationSelect && uvIndexLocationChangeHandler) {
    locationSelect.removeEventListener('change', uvIndexLocationChangeHandler);
    uvIndexLocationChangeHandler = null;
    resetUVIndexArrow();
    resetUVIndexArrowBackground();
  }

  refreshUVIndexData();

  console.log("UV Index module deactivated");
}

function handleUVIndexLocationChange(event) {
  const selectedLocation = event.target.value;
  const coords = window.coordsArea[selectedLocation];

  if (coords) {
    fetchUVIndexData(coords.lat, coords.lon);
    updateUVIndexChart(coords.lat, coords.lon);
  }
}

async function fetchUVIndexHourly(lat, lon) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&timezone=auto`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("API data returned:", data);

    if (!data.hourly || !Array.isArray(data.hourly.time) || !Array.isArray(data.hourly.uv_index)) {
      console.warn("Invalid API response.");
      return [];
    }

    return data.hourly;
  } catch (error) {
    console.error("Error fetching UV chart data:", error);
    return [];
  }
}

async function updateUVIndexChart(lat, lon) {
  const hourlyData = await fetchUVIndexHourly(lat, lon);

  if (!hourlyData || !Array.isArray(hourlyData.uv_index) || !Array.isArray(hourlyData.time)) {
    console.warn("No hourly UV data available.");
    return;
  }

  renderUVIndexChart(hourlyData);
}

let uvIndexChart = null;

function renderUVIndexChart(data) {
  const ctx = document.getElementById("UVHourChart").getContext("2d");

  if (uvIndexChart) {
    uvIndexChart.destroy();
  }

  if (!data || !Array.isArray(data.uv_index) || !Array.isArray(data.time)) {
    console.warn("Invalid chart data.");
    return;
  }

  const uvIndexValues = data.uv_index;
  const labels = data.time.map(t => new Date(t).getHours() + ":00");

  uvIndexChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Hourly UV Index",
          data: uvIndexValues,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true, position: "top" } },
      scales: {
        x: { title: { display: true, text: "Time" } },
        y: { title: { display: true, text: "UV Index" }, beginAtZero: true },
      },
    },
  });
}

function updateUVIndexArrow(uvindex) {
  const arrow = document.querySelector(".arrow-container-uv");
  let position = 0;

  if (uvindex >= 0 && uvindex < 3) position = 0;
  else if (uvindex >= 3 && uvindex < 6) position = 20;
  else if (uvindex >= 6 && uvindex < 8) position = 40;
  else if (uvindex >= 8 && uvindex < 11) position = 60;
  else if (uvindex >= 11) position = 80;
  else return console.warn("Invalid UV index:", uvindex);

  if (arrow) {
    arrow.style.left = `calc(${position}% + 40px)`;
  }
}

function resetUVIndexArrow() {
  const arrow = document.querySelector(".arrow-container-uv");
  if (arrow) arrow.style.left = '0%';
}

function updateUVIndexBackground(uvindex) {
  const uvIndexElement = document.getElementById("uv-circle");
  if (!uvIndexElement || uvindex < 0) return;

  let backgroundColor = "";
  if (uvindex >= 0 && uvindex < 3) backgroundColor = "#388e3c";
  else if (uvindex >= 3 && uvindex < 6) backgroundColor = "#ffeb3b";
  else if (uvindex >= 6 && uvindex < 8) backgroundColor = "#ff9800";
  else if (uvindex >= 8 && uvindex < 11) backgroundColor = "#d32f2f";
  else if (uvindex >= 11) backgroundColor = "#852ae0e8";

  uvIndexElement.style.backgroundColor = backgroundColor;
  uvIndexElement.style.color = "#fff";
  uvIndexElement.style.transition = "transform 0.05s ease, background-color 0.05s ease";
  uvIndexElement.style.transform = "scale(1.2)";

  setTimeout(() => { uvIndexElement.style.transform = "scale(1)"; }, 50);
}

function resetUVIndexArrowBackground() {
  const uvIndexElement = document.getElementById("uv-circle");
  if (uvIndexElement) {
    uvIndexElement.style.backgroundColor = "#ff5722";
    uvIndexElement.style.color = "#fff";
    const uvIndex = document.getElementById("uv-index");
    if (uvIndex) uvIndex.textContent = "0";
  }
}

function alertUVIndexUser(data) {
  const suggestions = [];
  const currentHour = new Date().getHours();
  const uvindex = data.hourly.uv_index[currentHour];
  console.log("UV Index:", uvindex);

  if (uvindex >= 0 && uvindex < 3) suggestions.push("Low UV index. Safe to be outdoors. Use sunscreen if staying out long.");
  else if (uvindex >= 3 && uvindex < 6) suggestions.push("Moderate UV index. Wear sunglasses, hat, and sunscreen if outside.");
  else if (uvindex >= 6 && uvindex < 8) suggestions.push("High UV index. Avoid direct sun from 10am-4pm. Use SPF 30+ sunscreen, hat, and long sleeves.");
  else if (uvindex >= 8 && uvindex < 11) suggestions.push("Very high UV index. High risk to skin and eyes. Limit sun exposure and protect yourself.");
  else if (uvindex >= 11) suggestions.push("Extreme UV index. Avoid going out during daytime. Use all protective measures.");
  else suggestions.push("Cannot determine UV index. Please try again.");

  const textUser = document.getElementById('text-user');
  textUser.innerHTML = "";

  const ul = document.createElement("ul");
  suggestions.slice(0, 1).forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });
  textUser.appendChild(ul);
}

function refreshUVIndexData() {
  document.getElementById('text-user').innerHTML = "";
  if (uvIndexChart) {
    uvIndexChart.destroy();
    uvIndexChart = null;
  }
}
