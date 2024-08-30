function refreshWeatherData(response) {
    let tempElement = document.querySelector("#city-temp-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#windSpeed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#city-temp-icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
    timeElement.innerHTML = formatDate(date);
    windElement.innerHTML = response.data.wind.speed;
    humidityElement.innerHTML = response.data.temperature.humidity;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(temperature);

    console.log(response.log);

}

function formatDate(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

     let day = days[date.getDay()];

        if (minutes < 10) {
          minutes = `0${minutes}`;
        }

        return `${day} ${hours}:${minutes}`;
      }

function searchCity(city) {
    let apiKey = "4078o345b3e8ef8e68dbfe19dta5019e";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiURL).then(refreshWeatherData);
}

function searchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat",];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌥️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>18º</strong>
          </div>
          <div class="weather-forecast-temperature">11º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

  let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Paris");
displayForecast();


