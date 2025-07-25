const apiKey = "0093ddd24f194003831c866ea2f29657";

function getWeather() {
 const city = encodeURIComponent(document.getElementById("cityInput").value.trim());
  if (city === "") {
    alert("Please enter a city name");
    return;
  }
  fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    }, () => {
      alert("Unable to access your location");
    });
  } else {
    alert("Geolocation not supported by this browser.");
  }
}

function fetchWeatherData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const weatherBox = document.getElementById("weatherResult");
        weatherBox.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Condition:</strong> ${data.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
      } else {
        alert("City not found");
      }
    })
    .catch(error => {
      alert("Error fetching weather data");
      console.error(error);
    });
}
