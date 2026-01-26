function fetchAirData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${window.apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      updateAirCard(data);
      const aqi = data.list[0].main.aqi;
      console.log("AQI:", aqi);
      updateAQIArrow(aqi);
      updateAQIBackground(aqi);
    })
    .catch(error => {
      console.error('Error fetching air quality data:', error);
    });
}

function updateAirCard(data) {
  const PM25 = document.getElementById('pm25-value');
  const PM10 = document.getElementById('pm10-value');
  const NO2 = document.getElementById('no2-value');
  const SO2 = document.getElementById('so2-value');
  const CO = document.getElementById('co-value');
  const O3 = document.getElementById('o3-value');
  const AQI = document.getElementById('aqi-index');
  AQI.innerHTML = '';

  PM25.textContent = `${data.list[0].components.pm2_5} µg/m³`;
  PM10.textContent = `${data.list[0].components.pm10} µg/m³`;
  NO2.textContent = `${data.list[0].components.no2} µg/m³`;
  SO2.textContent = `${data.list[0].components.so2} µg/m³`;
  CO.textContent = `${data.list[0].components.co} µg/m³`;
  O3.textContent = `${data.list[0].components.o3} µg/m³`;
  AQI.textContent = `${data.list[0].main.aqi}`;

  const airCard = document.getElementById('air-section');
  airCard.style.display = 'block';

  alertAirUser(data);
}

let airLocationChangeHandler = null;

function activateAirModule() {
  currentActiveType = 'air';
  const locationSelect = document.getElementById('locationSelect');
  if (!locationSelect) return;

  if (airLocationChangeHandler) {
    locationSelect.removeEventListener('change', airLocationChangeHandler);
  }

  airLocationChangeHandler = handleAirLocationChange;
  locationSelect.addEventListener('change', handleAirLocationChange);

  if (typeof mapView !== 'undefined') {
    initializeMapClickEvent(mapView, 'air');
  }

  initSearch(mapView);

  console.log("Air module activated");
}

function deactivateAirModule() {
  const locationSelect = document.getElementById('locationSelect');

  if (locationSelect && airLocationChangeHandler) {
    locationSelect.removeEventListener('change', airLocationChangeHandler);
    airLocationChangeHandler = null;
    resetAQIArrow();
    resetAQIArrowBackground();
  }

  refreshAirData();

  console.log("Air module deactivated");
}

function handleAirLocationChange(event) {
  const selectedLocation = event.target.value;
  const coords = window.coordsArea[selectedLocation];

  if (coords) {
    fetchAirData(coords.lat, coords.lon);
    updateAirQualityChart(coords.lat, coords.lon);
  }
}

async function fetchAirQualityHourly(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${window.apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.list;
  } catch (error) {
    console.error("Error fetching hourly air quality:", error);
    return [];
  }
}

let airQualityChart = null;

function renderAirQualityChart(data) {
  const ctx = document.getElementById("airHourChart").getContext("2d");

  if (airQualityChart) airQualityChart.destroy();

  const labels = data.map(item => {
    const date = new Date(item.dt * 1000);
    return `${date.getHours()}:00`;
  });

  const aqiValues = data.map(item => item.main.aqi);

  airQualityChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Hourly AQI",
        data: aqiValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: "top" },
      },
      scales: {
        x: { title: { display: true, text: "Time" } },
        y: { title: { display: true, text: "AQI" }, beginAtZero: true },
      },
    },
  });
}

async function updateAirQualityChart(lat, lon) {
  const hourlyData = await fetchAirQualityHourly(lat, lon);
  if (hourlyData.length === 0) {
    console.warn("No hourly air quality data available.");
    return;
  }
  renderAirQualityChart(hourlyData);
}

function updateAQIArrow(aqi) {
  const arrow = document.querySelector(".arrow-container");
  let position = 0;

  switch (aqi) {
    case 1: position = 0; break;
    case 2: position = 15; break;
    case 3: position = 25; break;
    case 4: position = 35; break;
    case 5: position = 45; break;
    case 6: position = 55; break;
    default: return;
  }

  if (arrow) arrow.style.left = `calc(${position}% + 40px)`;
}

function resetAQIArrow() {
  const arrow = document.querySelector(".arrow-container");
  if (arrow) arrow.style.left = '0%';
}

function updateAQIBackground(aqi) {
  const aqiElement = document.getElementById("aqi-circle");
  if (!aqiElement) return;

  let backgroundColor = "";
  switch (aqi) {
    case 1: backgroundColor = "#388e3c"; break;
    case 2: backgroundColor = "#ffeb3b"; break;
    case 3: backgroundColor = "#ff9800"; break;
    case 4: backgroundColor = "#f44336"; break;
    case 5: backgroundColor = "#d32f2f"; break;
    case 6: backgroundColor = "#7f0000"; break;
    default: return;
  }

  aqiElement.style.backgroundColor = backgroundColor;
  aqiElement.style.color = "#fff";
  aqiElement.style.transition = "transform 0.3s ease, background-color 0.3s ease";
  aqiElement.style.transform = "scale(1.2)";
  setTimeout(() => { aqiElement.style.transform = "scale(1)"; }, 300);
}

function resetAQIArrowBackground() {
  const aqiElement = document.getElementById("aqi-circle");
  if (aqiElement) {
    aqiElement.style.backgroundColor = "#ff5722";
    aqiElement.style.color = "#fff";
    const aqiNumber = document.getElementById("aqi-index");
    if (aqiNumber) aqiNumber.textContent = "0";
  }
}

function alertAirUser(data) {
  const suggestions = [];
  const aqi = data.list[0].main.aqi;
  const pm25 = data.list[0].components.pm2_5;
  const pm10 = data.list[0].components.pm10;
  const no2 = data.list[0].components.no2;
  const so2 = data.list[0].components.so2;
  const co = data.list[0].components.co;
  const o3 = data.list[0].components.o3;

  if (aqi == 1) {
    suggestions.push("Air quality is very good. You can freely enjoy outdoor activities or tourism.");
  } else if (aqi == 2) {
    suggestions.push("Air quality is moderate. Outdoor activities are acceptable but avoid prolonged exposure in busy traffic areas.");
  } else if (aqi == 3) {
    suggestions.push("Air quality is poor. Sensitive groups should limit outdoor activities.");
  } else if (aqi == 4) {
    suggestions.push("Air quality is unhealthy. Stay indoors and choose green, open areas for leisure.");
  } else if (aqi == 5) {
    suggestions.push("Air quality is very unhealthy. Avoid going outside and use masks or air purifiers if needed.");
  } else {
    suggestions.push("Air quality is hazardous. Stay indoors, close windows, and postpone outdoor plans.");
  }

  if (pm25 > 75) {
    suggestions.push("Heavy PM2.5 pollution. Limit outdoor exposure, especially for children, elderly, and respiratory patients.");
  } else if (pm25 > 35) {
    suggestions.push("PM2.5 at moderate level. Wear certified masks and avoid busy traffic areas.");
  } else {
    suggestions.push("Low PM2.5 – Natural ventilation and outdoor activities are safe.");
  }

  if (pm10 > 150) suggestions.push("High PM10. Close windows and avoid areas near main roads.");
  if (no2 > 100) suggestions.push("High NO₂. Avoid crowded urban areas or main roads.");
  if (so2 > 75) suggestions.push("High SO₂. Avoid outdoor BBQs or staying near industrial areas.");
  if (co > 10) suggestions.push("High CO. Ensure proper ventilation in enclosed spaces.");
  if (o3 > 180) suggestions.push("High O₃. Avoid outdoor activities at noon under strong sunlight.");

  const textUser = document.getElementById('text-user');
  textUser.innerHTML = "";
  const ul = document.createElement("ul");
  suggestions.slice(0, 6).forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });
  textUser.appendChild(ul);
}

function refreshAirData() {
  document.getElementById('text-user').innerHTML = "";
  document.getElementById('pm25-value').innerHTML = "";
  document.getElementById('pm10-value').innerHTML = "";
  document.getElementById('no2-value').innerHTML = "";
  document.getElementById('so2-value').innerHTML = "";
  document.getElementById('co-value').innerHTML = "";
  document.getElementById('o3-value').innerHTML = "";

  if (airQualityChart) {
    airQualityChart.destroy();
    airQualityChart = null;
  }
}
