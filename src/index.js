function refreshWeatherData(response) {
    let tempElement = document.querySelector("#city-temp-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;


    tempElement.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Paris");