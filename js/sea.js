function fetchSeaData(lat, lon) { 
  const apiUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&timezone=auto`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log("API data returned:", data);
      updateSeaCard(data);
    })
    .catch(error => {
      console.error('Error fetching sea data:', error);
    });
}

function updateSeaCard(data) {
  const wave_height = document.getElementById('wave_height');
  const wave_direction = document.getElementById('wave_direction');
  const wave_period = document.getElementById('wave_period');
  const wind_wave_height = document.getElementById('wind_wave_height');
  const wind_wave_direction = document.getElementById('wind_wave_direction');
  const wind_wave_period = document.getElementById('wind_wave_period');
  const swell_wave_height = document.getElementById('swell_wave_height');
  const swell_wave_direction = document.getElementById('swell_wave_direction');
  const swell_wave_period = document.getElementById('swell_wave_period');

  const firstIndex = 0;
  const hourly = data.hourly;

  if (hourly) {
    wave_height.textContent = `${hourly.wave_height[firstIndex]} m`;
    wave_direction.textContent = `${hourly.wave_direction[firstIndex]} °`;
    wave_period.textContent = `${hourly.wave_period[firstIndex]} s`;
    wind_wave_height.textContent = `${hourly.wind_wave_height[firstIndex]} m`;
    wind_wave_direction.textContent = `${hourly.wind_wave_direction[firstIndex]} °`;
    wind_wave_period.textContent = `${hourly.wind_wave_period[firstIndex]} s`;
    swell_wave_height.textContent = `${hourly.swell_wave_height[firstIndex]} m`;
    swell_wave_direction.textContent = `${hourly.swell_wave_direction[firstIndex]} °`;
    swell_wave_period.textContent = `${hourly.swell_wave_period[firstIndex]} s`;
  } else {
    console.warn("Hourly data not found in API.");
  }

  const seaCard = document.getElementById('sea-section');
  if (seaCard) {
    seaCard.style.display = 'block';
  }

  alertSeaUser(data);
}

let seaLocationChangeHandler = null;

function activateSeaModule() {
  currentActiveType = 'sea';
  const locationSelect = document.getElementById('locationSelect');
  if (!locationSelect) return;

  if (seaLocationChangeHandler) {
    locationSelect.removeEventListener('change', seaLocationChangeHandler);
  }

  seaLocationChangeHandler = handleSeaLocationChange;
  locationSelect.addEventListener('change', handleSeaLocationChange);

  if (typeof mapView !== 'undefined') {
    initializeMapClickEvent(mapView, 'sea');
  }

  initSearch(mapView);

  console.log("Sea module activated");
}

function deactivateSeaModule() {
  const locationSelect = document.getElementById('locationSelect');

  if (locationSelect && seaLocationChangeHandler) {
    locationSelect.removeEventListener('change', seaLocationChangeHandler);
    seaLocationChangeHandler = null;
  }

  refreshSeaData();

  console.log("Sea module deactivated");
}

function handleSeaLocationChange(event) {
  const selectedLocation = event.target.value;
  const coords = window.coordsArea[selectedLocation];

  if (coords) {
    fetchSeaData(coords.lat, coords.lon);
    updateSeaChart(coords.lat, coords.lon);
  }
}

async function fetchSeaHourly(lat, lon) {
  const apiUrlHourly = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&timezone=auto`;

  try {
    const response = await fetch(apiUrlHourly);
    const data = await response.json();

    console.log("API data returned:", data);

    if (!data.hourly) {
      console.warn("Hourly data not found:", data);
      return null;
    }

    return data.hourly;
  } catch (error) {
    console.error("Error fetching hourly sea data:", error);
    return null;
  }
}

let wavePeriodChart = null;

function renderSeaChart(labels, wavePeriod, windWavePeriod, swellWaveHeight) {
  const ctx = document.getElementById("seaHourChart").getContext("2d");

  if (wavePeriodChart) {
    wavePeriodChart.destroy();
  }

  wavePeriodChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Wave Period",
          data: wavePeriod,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          fill: true,
        },
        {
          label: "Wind Wave Period",
          data: windWavePeriod,
          borderColor: "rgba(255, 159, 64, 1)",
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderWidth: 2,
          fill: true,
        },
        {
          label: "Swell Wave Height",
          data: swellWaveHeight,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: "top" },
      },
      scales: {
        x: { title: { display: true, text: "Time" } },
        y: { title: { display: true, text: "Value" }, beginAtZero: true },
      },
    },
  });
}

async function updateSeaChart(lat, lon) {
  const hourlyData = await fetchSeaHourly(lat, lon);

  if (!hourlyData) {
    console.warn("No hourly wave data available.");
    return;
  }

  const labels = hourlyData.time;
  const wavePeriod = hourlyData.wave_period;
  const windWavePeriod = hourlyData.wind_wave_period;
  const swellWaveHeight = hourlyData.swell_wave_height;

  renderSeaChart(labels, wavePeriod, windWavePeriod, swellWaveHeight);
}

function alertSeaUser(data) {
  const fisher = [];
  const surfer = [];
  const swimmer = [];

  const {
    wave_height,
    wave_direction,
    wave_period,
    wind_wave_height,
    wind_wave_direction,
    wind_wave_period,
    swell_wave_height,
    swell_wave_direction,
    swell_wave_period
  } = data;

  if (wave_height > 2 || wind_wave_height > 2 || swell_wave_height > 2) {
    fisher.push("Strong waves and wind. Dangerous for fishing boats, postpone sailing. Check weather forecast before going out.");
  } else if (wave_height > 1) {
    fisher.push("Moderate waves. You can sail but prepare carefully and monitor forecasts.");
  } else {
    fisher.push("Calm sea, suitable for fishing nearshore or offshore. Pay attention to wind and waves if going far.");
  }

  if (wind_wave_period < 4) {
    fisher.push("Short wind wave period may cause strong rocking. Avoid using small or unstable boats.");
  }

  if (wind_wave_direction >= 45 && wind_wave_direction <= 135) {
    fisher.push("Wind from sea to land may affect navigation and create high nearshore waves. Be careful nearshore.");
  }

  if (swell_wave_height >= 1.2 && swell_wave_period >= 6) {
    surfer.push("Strong and stable swell – Ideal for surfing, especially for experienced surfers.");
  } else if (swell_wave_height < 0.5) {
    surfer.push("Small and weak waves – Not suitable for surfing. Only suitable for beginners or shallow practice.");
  } else {
    surfer.push("Moderate waves – Suitable for beginners or practice. Pay attention to wave stability.");
  }

  if (Math.abs(wave_direction - swell_wave_direction) > 60) {
    surfer.push("Wave and swell direction differ greatly – Can be difficult for surfing, especially for beginners.");
  }

  if (wave_period >= 10) {
    surfer.push("Long wave period – Be cautious of large waves, only suitable for advanced surfers.");
  }

  if (wave_height < 0.5 && wind_wave_height < 0.5) {
    swimmer.push("Calm sea with very low waves – Safe for swimming. Check water temperature and currents.");
  } else if (wave_height < 1) {
    swimmer.push("Moderate waves, swimming possible but caution is advised, especially for children.");
  } else {
    swimmer.push("High waves and rough sea – Not safe for swimming. Watch out for strong currents and unexpected waves.");
  }

  if (swell_wave_period >= 8) {
    swimmer.push("Long swell period may create strong offshore currents, dangerous for inexperienced swimmers. Swim near lifeguard areas.");
  }

  if (wind_wave_direction >= 180 && wind_wave_direction <= 270) {
    swimmer.push("Wind blowing from land to sea may change currents and pull swimmers offshore. Avoid swimming here.");
  }

  const textUser = document.getElementById('text-user');
  textUser.innerHTML =
    "<strong>Fisher Advice:</strong><br>" + fisher.join("<br>") + "<br><br>" +
    "<strong>Surfer Advice:</strong><br>" + surfer.join("<br>") + "<br><br>" +
    "<strong>Swimmer Advice:</strong><br>" + swimmer.join("<br>");
}

function refreshSeaData() {
  document.getElementById('text-user').innerHTML = "";
  document.getElementById('wave_height').innerHTML = "";
  document.getElementById('wave_direction').innerHTML = "";
  document.getElementById('wave_period').innerHTML = "";
  document.getElementById('wind_wave_height').innerHTML = "";
  document.getElementById('wind_wave_direction').innerHTML = "";
  document.getElementById('wind_wave_period').innerHTML = "";
  document.getElementById('swell_wave_height').innerHTML = "";
  document.getElementById('swell_wave_direction').innerHTML = "";
  document.getElementById('swell_wave_period').innerHTML = "";

  if (wavePeriodChart) {
    wavePeriodChart.destroy();
    wavePeriodChart = null;
  }
}
