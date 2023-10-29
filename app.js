function currentTemperature(response) {
	let temperature = Math.round(response.data.temperature.current);
	let temperatureElement = document.querySelector("#temp-today");
	temperatureElement.innerHTML = `${temperature}`;

	let desc = response.data.condition.description;
	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = `${desc}`;

	let humidity = response.data.temperature.humidity;
	let humidityElement = document.querySelector("#humidity-value");
	humidityElement.innerHTML = `${humidity}`;

	let wind = Math.round(response.data.wind.speed);
	let windElement = document.querySelector("#wind-value");
	windElement.innerHTML = `${wind}`;

	let iconUrl = response.data.condition.icon_url;
	let iconElement = document.querySelector("#current-icon");
	iconElement.setAttribute("src", `${iconUrl}`);

	let city = response.data.city;
	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = city;

	celsiusTemp = temperature;
	showcelsius();
}

//Search button
function search(cityName) {
	let apiKey = "8942b6bt940fbcoac33ad8a55c33f639";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

	axios.get(apiUrl).then(currentTemperature);
}

function enter(event) {
	event.preventDefault();

	let cityElement = document.querySelector("#city-input");
	let cityName = cityElement.value;

	search(cityName);

	let currentCity = document.querySelector("#city");
	currentCity.innerHTML = cityName;
}

let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", enter);

//current location button
function getCurrentWeather(latitude, longitude) {
	let apiKey = "8942b6bt940fbcoac33ad8a55c33f639";
	let currentUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

	axios.get(currentUrl).then(currentTemperature);
}

function coordinates(event) {
	event.preventDefault();

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;

			getCurrentWeather(latitude, longitude);
		});
	} else {
		alert("Geolocation is not supported by your browser.");
	}
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", coordinates);

//Unit conversion
function showcelsius(event) {
	if (celsiusTemp !== null) {
		fahrenheitLink.classList.remove("active");
		celsiusLink.classList.add("active");
		celsiusLink.style.color = "white";
		fahrenheitLink.style.color = "black";

		let tempToday = document.querySelector("#temp-today");
		tempToday.innerHTML = celsiusTemp;
	}
}

function showFahrenheit(event) {
	event.preventDefault();
	if (celsiusTemp !== null) {
		celsiusLink.classList.remove("active");
		fahrenheitLink.classList.add("active");
		fahrenheitLink.style.color = "white";
		celsiusLink.style.color = "black";

		let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
		let tempToday = document.querySelector("#temp-today");
		tempToday.innerHTML = fahrenheitTemp;
	}
}

let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

//Changing the date
let current = new Date();
let now = document.querySelector("#date");

let date = current.getDate();
let year = current.getFullYear();
let minutes = current.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}

let hours = current.getHours();
if (hours < 10) {
	hours = `0${hours}`;
}

let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let day = days[current.getDay()];

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
let month = months[current.getMonth()];

now.innerHTML = `${day}, ${month} ${date}, ${year}. ${hours}:${minutes}`;

//Change background depending on the time
let weatherElement = document.querySelector(".weather");
let weatherTodayElement = document.querySelector("#weather-today");

let isDaytime = hours >= 6 && hours < 18;
if (isDaytime) {
	weatherElement.style.backgroundImage =
		'url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/099/125/original/cloud-blue-sky.jpg?1696527919")';
} else {
	weatherElement.style.backgroundImage =
		'url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/102/010/original/night-backfround.jpeg?1698325108")';
	weatherTodayElement.style.color = "white";
}
