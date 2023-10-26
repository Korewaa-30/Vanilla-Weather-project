function currentTemperature(response) {
	console.log(response.data);
}

let apiKey = "e58bebf275d2443b930984841fd24cd9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(currentTemperature);
