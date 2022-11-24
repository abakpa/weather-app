import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=30c04ae53701b6d90dd0ef683523ddad`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      axios.get(url).then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className="app">
      <h1 className="header">Weather Report App</h1>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        {loading ? <h1>Loading...</h1> : null}
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            {/* <h1>{data.main.temp}°F</h1> */}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            {/* <p>Clouds</p> */}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.temp.toFixed()}°F</p>
              ) : null}
              {/* <p className="bold">65°F</p> */}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              {/* <p className="bold">20%</p> */}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              ) : null}
              {/* <p className="bold">12 MPH</p> */}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
