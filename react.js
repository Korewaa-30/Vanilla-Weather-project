import "./styles.css";

export default function Weather() {
	return (
		<div className="Weather">
			<h1>Weather Dashboard</h1>
			<form>
				<div id="search-city">
					<div className="row">
						<div className="col-md-8">
							<input
								type="text"
								className="form-control"
								placeholder="Enter your city..."
								defaultValue=""
								autoFocus="on"
								autoComplete="off"
								id="city-input"
							/>
						</div>
						<div className="col-md-3">
							<button
								type="submit"
								className="btn btn-primary"
								id="search"
							>
								Search
							</button>
						</div>
					</div>
				</div>
				<div className="separator"></div>
				<div className="row">
					<div className="col-md-8">
						<button
							type="button"
							className="btn btn-info"
							id="current-location"
						>
							Use your current location
						</button>
					</div>
				</div>
			</form>
			<div id="weather-today">
				<h2 id="city">Accra</h2>
				<div id="date">Monday, November 20, 2023. 16:13</div>
				<br />
				<div
					className="row"
					id="row"
				>
					<div className="col-md-6">
						<div id="description"></div>
						<img
							src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
							alt="icon"
							width="70px"
							id="current-icon"
						/>
						<span id="temp-today">30</span>
						<span className="units">
							<a
								href="#"
								id="celsius-link"
							>
								°C
							</a>
							<span className="unit-separator">|</span>
							<a
								href="#"
								id="fahrenheit-link"
							>
								°F
							</a>
						</span>
					</div>
					<div className="col-md-6">
						<div id="humidity">
							<img
								src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/102/363/original/icons8-humidity-32.png?1698661745"
								alt=""
								width="20px"
							/>
							Humidity: <span id="humidity-value"></span>
							<span>%</span>
						</div>
						<div id="wind">
							<img
								src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/102/364/original/icons8-wind-64.png?1698661902"
								alt=""
								width="20px"
							/>
							Wind: <span id="wind-value"></span>
							<span> m/s</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/********************Update for week 2 homework****************************/
import React, { useState } from "react";

export default function App() {
  let [city, changeCity] = useState("");
  let [statement, changeStatement] = useState("");

  function updateCity(event) {
    event.preventDefault();
    if (city.length > 0) {
      changeStatement(`It is currently 25°C in ${city}`);
    } else {
      alert("Please enter a city name");
    }
  }

  function updateStatement(event) {
    changeCity(event.target.value);
  }

  return (
    <div className="App">
      <h1>Weather Search Engine</h1>
      <form onSubmit={updateCity}>
        <input
          type="search"
          placeholder="Enter a city"
          onChange={updateStatement}
        />
        <input type="submit" value="Search" />
      </form>
      <h2>{statement}</h2>
    </div>
  );
}

///////////////// new update for Ajax react. added on 23/11/2023
`https://codesandbox.io/p/sandbox/hopeful-vaughan-nxxm8q?file=%2Fsrc%2FWeather.js%3A29%2C11`
import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, changeCity] = useState("");
  let [weather, changeWeather] = useState({});
  const [refreshed, changeRefreshed] = useState(false);

  function currentWeather(response) {
    changeRefreshed(true);
    changeWeather({
      city: response.data.city,
      temperature: response.data.temperature.current,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      icon: response.data.condition.icon_url,
      description: response.data.condition.description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "8942b6bt940fbcoac33ad8a55c33f639";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(currentWeather);
  }

  function updateCity(event) {
    changeCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (refreshed) {
    return (
      <div className="App">
      <h1>My Weather App</h1>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="App">
      <h1>My Weather App</h1>
        {form}
        </div>
    );
  }
}
