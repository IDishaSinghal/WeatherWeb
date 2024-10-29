import React, { useState } from "react";
import axios from "axios";
import './Weather.css';

function Weather() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
            setWeatherData(response.data);
            setError("");
        } catch (error) {
            console.error("Error fetching weather:", error);
            setWeatherData(null);
            setError("Enter a correct city");
        }
    };

    let backgroundClass = '';
    if (weatherData) {
        const mainWeather = weatherData.weather[0].main.toLowerCase();
        if (mainWeather.includes('thunderstorm')) {
            backgroundClass = 'thunderstorm';
        } else if (mainWeather.includes('cloud')) {
            backgroundClass = 'cloudy';
        } else if (mainWeather.includes('rain')) {
            backgroundClass = 'rain';
        } else if (mainWeather.includes('snow')) {
            backgroundClass = 'snow';
        } else {
            backgroundClass = 'sunny';
        }
    }

    return (
        <div className={`weather-container ${backgroundClass}`}>
           <h1 className="heading">"Track the weather, plan with confidence!"</h1>
            
            <input className="search-input"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button className="button" onClick={fetchWeather}>Get Weather</button>
            {error && <p>{error}</p>}
            {weatherData && (
                <div className="result-box">
                    <h3>{weatherData.name}</h3>
                    <p>{weatherData.weather[0].description}</p>
                    <p>{Math.round(weatherData.main.temp - 273.15)}°C</p> {/* Converts from Kelvin to Celsius */}
                </div>
            )}
        </div>
    );
}

export default Weather;
