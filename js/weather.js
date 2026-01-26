window.apiKey = '79669b0102ea131f77aecc410f0813f4';

function fetchWeatherData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${window.apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      updateWeatherCard(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function updateWeatherCard(data) {
  const temperatureElement = document.getElementById('weather-temp');
  const weatherDescriptionElement = document.getElementById('weather-description');
  const weatherIconElement = document.getElementById('weather-icon');
  const humidityElement = document.getElementById('humidity');
  const windspeedElement = document.getElementById('wind');
  const pressureElement = document.getElementById('pressure');

  const engDescription = data.weather[0].description;
  const vnDescription = window.weatherDescriptionMap[engDescription] || engDescription;

  temperatureElement.textContent = `${data.main.temp}°C`;
  weatherDescriptionElement.textContent = vnDescription;
  weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  humidityElement.textContent = `${data.main.humidity}%`;
  windspeedElement.textContent = `${data.wind.speed} km/h`;
  pressureElement.textContent = `${data.main.pressure} hPa`;

  const weatherCard = document.getElementById('weather-section');
  weatherCard.style.display = 'block';

  alertWeatherUser(data);
}

function fetchForecastData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateForecastCard(data.list.slice(1, 7));
    })
    .catch(error => {
      console.error('Error fetching forecast data:', error);
    });
}

function updateForecastCard(forecastData) {
  const forecastGrid = document.querySelector('.forecast-grid');
  forecastGrid.innerHTML = '';

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const todayDayOfWeek = today.getDay();

  forecastData.forEach((day, index) => {
    const date = new Date(day.dt * 1000);
    const dayName = daysOfWeek[(todayDayOfWeek + index) % 7];
    const temp = Math.round(day.main.temp);
    const weatherIcon = day.weather[0].icon;
    const weatherEmoji = getEmojiByIcon(weatherIcon);

    const dayDiv = document.createElement('div');
    dayDiv.classList.add('forecast-item');
    dayDiv.innerHTML = `
      <div class="forecast-item-content">
        <span class="forecast-day-name">${dayName}</span>
        <span class="forecast-temp">${temp}°C</span>
        <span class="forecast-emoji">${weatherEmoji}</span>
      </div>
    `;

    forecastGrid.appendChild(dayDiv);
  });
}

function getEmojiByIcon(icon) {
  return window.weatherIcons[icon] || 'null';
}

function fetchForecastDataDiagram(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      renderHourlyForecast(data.list.slice(0, 8));
      updateForecastCard(data.list.slice(8, 14));
    })
    .catch(error => {
      console.error('Error fetching forecast data:', error);
    });
}

let weatherHourlyChart = null;

function renderHourlyForecast(hourlyData) {
  const ctx = document.getElementById('hourlyChart').getContext('2d');
  const hours = hourlyData.map(item => `${new Date(item.dt * 1000).getHours()}h`);
  const temps = hourlyData.map(item => Math.round(item.main.temp));

  if (weatherHourlyChart) weatherHourlyChart.destroy();

  weatherHourlyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [{
        label: 'Temperature (°C)',
        data: temps,
        backgroundColor: 'rgba(255, 114, 58, 0.2)',
        borderColor: '#ff723a',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          ticks: { callback: value => `${value}°C` }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

let weatherLocationChangeHandler = null;

function activateWeatherModule() {
  currentActiveType = 'weather';
  const locationSelect = document.getElementById('locationSelect');
  if (!locationSelect) return;

  if (weatherLocationChangeHandler) locationSelect.removeEventListener('change', weatherLocationChangeHandler);

  weatherLocationChangeHandler = handleWeatherLocationChange;
  locationSelect.addEventListener('change', weatherLocationChangeHandler);

  if (typeof mapView !== 'undefined') initializeMapClickEvent(mapView, 'weather');
  initSearch(mapView);

  console.log("Weather module activated");
}

function deactivateWeatherModule() {
  const locationSelect = document.getElementById('locationSelect');
  if (locationSelect && weatherLocationChangeHandler) {
    locationSelect.removeEventListener('change', weatherLocationChangeHandler);
    weatherLocationChangeHandler = null;
  }
  refreshWeatherData();
  console.log("Weather module deactivated");
}

function handleWeatherLocationChange(event) {
  const selectedLocation = event.target.value;
  const coords = window.coordsArea[selectedLocation];
  if (coords) {
    fetchWeatherData(coords.lat, coords.lon);
    fetchForecastData(coords.lat, coords.lon);
    fetchForecastDataDiagram(coords.lat, coords.lon);
  }
}

function alertWeatherUser(data) {
  const suggestions = [];
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const pressure = data.main.pressure;
  const description = data.weather[0].main.toLowerCase();

  if (temp >= 35) suggestions.push("Very hot weather, avoid outdoor activities at noon. Prefer indoor visits like museums or malls.");
  else if (temp >= 30) suggestions.push("Warm weather, bring a hat, sunscreen, and stay hydrated.");
  else if (temp <= 10) suggestions.push("Cold weather, wear multiple layers in mountains. Avoid going out in strong wind.");
  else suggestions.push("Pleasant weather, ideal for outdoor activities, walks, and sightseeing.");

  if (humidity > 85) suggestions.push("High humidity, may feel stuffy. Wear light clothes and rest in shade when possible.");
  else if (humidity < 40) suggestions.push("Dry air, use moisturizer and carry water during long trips.");

  if (wind > 10) suggestions.push("Strong wind, avoid outdoor activities near beaches, hills, or large trees.");
  else if (wind > 5) suggestions.push("Light wind, suitable for cycling or walking in open areas.");

  if (pressure < 1000) suggestions.push("Low pressure, sensitive people may feel tired or have headaches. Rest if needed.");
  else suggestions.push("Stable pressure, weather is relatively comfortable for sightseeing.");

  if (description.includes("rain")) suggestions.push("Rainy, carry umbrella or raincoat, avoid outdoor activities like hiking or camping.");
  else if (description.includes("clear")) suggestions.push("Clear sky, ideal for sightseeing, photography, and park walks.");
  else if (description.includes("cloud")) suggestions.push("Cloudy, suitable for light outdoor activities without worrying about sun.");

  const textUser = document.getElementById('text-user');
  textUser.innerHTML = "";
  const ul = document.createElement("ul");
  suggestions.slice(0, 5).forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });
  textUser.appendChild(ul);
}

function refreshWeatherData() {
  document.getElementById('text-user').innerHTML = "";
  document.getElementById('weather-temp').innerHTML = "";
  document.getElementById('weather-description').innerHTML = "";
  document.getElementById('weather-icon').innerHTML = "";
  document.getElementById('humidity').innerHTML = "";
  document.getElementById('wind').innerHTML = "";
  document.getElementById('pressure').innerHTML = "";

  const forecastGrid = document.querySelector('.forecast-grid');
  if (forecastGrid) forecastGrid.innerHTML = "";

  if (weatherHourlyChart) {
    weatherHourlyChart.destroy();
    weatherHourlyChart = null;
  }
}
