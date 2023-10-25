import './WeatherApp.css';
import React, { useState } from 'react';
import cloud_icon from '../assets/cloud.png';
import clear_icon from '../assets/clear.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import humidityIcon from '../assets/humidity.png';
import snow_icon from '../assets/snow.png';
import windIcon from '../assets/wind.png';
import searchIcon from '../assets/search.png';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: 88,
    windSpeed: 18,
    temperature: 24,
    location: 'London', // Default location
  });

  const [wicon, setwicon] = useState(cloud_icon); // Corrected the initial state

  const api_key = 'd6279ae5f3dc02218e12ed4ae12b9619';

  const search = async () => {
    const element = document.getElementsByClassName('cityInput')[0];
    if (element.value === '') {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        humidity: Math.floor(data.main.humidity),
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
      });

      // Updated the icon selection based on 'data.weather[0].icon'
      switch (data.weather[0].icon) {
        case '01d':
        case '01n':
          setwicon(clear_icon);
          break;
        case '02d':
        case '02n':
          setwicon(cloud_icon);
          break;
        case '03d':
        case '03n':
          setwicon(drizzle_icon);
          break;
        case '04d':
        case '04n':
          setwicon(drizzle_icon);
          break;
        case '09d':
        case '09n':
        case '10d':
        case '10n':
          setwicon(rain_icon);
          break;
        case '13d':
        case '13n':
          setwicon(snow_icon);
          break;
        default:
          setwicon(clear_icon);
          break;
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className="container">
        <div className="header"><img src={cloud_icon} alt=""/>WeatherApp</div>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div className="search-icon" onClick={search}>
          <img src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="Weather Icon" />
      </div>
      <div className="weather-temp">{weatherData.temperature}°C</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="Humidity Icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="Wind Icon" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
