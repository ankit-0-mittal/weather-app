import React, { createContext, useState, useEffect } from "react";

export const WeatherContext = createContext();

const weatherCodeMap = {
  0: { description: "Clear sky", icon: "01d" },
  1: { description: "Mainly clear", icon: "02d" },
  2: { description: "Partly cloudy", icon: "03d" },
  3: { description: "Overcast", icon: "04d" },
  45: { description: "Fog", icon: "50d" },
  48: { description: "Depositing rime fog", icon: "50d" },
  51: { description: "Light drizzle", icon: "09d" },
  53: { description: "Moderate drizzle", icon: "09d" },
  55: { description: "Dense drizzle", icon: "09d" },
  56: { description: "Light freezing drizzle", icon: "09d" },
  57: { description: "Dense freezing drizzle", icon: "09d" },
  61: { description: "Slight rain", icon: "10d" },
  63: { description: "Moderate rain", icon: "10d" },
  65: { description: "Heavy rain", icon: "10d" },
  66: { description: "Light freezing rain", icon: "10d" },
  67: { description: "Heavy freezing rain", icon: "10d" },
  71: { description: "Slight snow fall", icon: "13d" },
  73: { description: "Moderate snow fall", icon: "13d" },
  75: { description: "Heavy snow fall", icon: "13d" },
  77: { description: "Snow grains", icon: "13d" },
  80: { description: "Slight rain showers", icon: "09d" },
  81: { description: "Moderate rain showers", icon: "09d" },
  82: { description: "Violent rain showers", icon: "09d" },
  85: { description: "Slight snow showers", icon: "13d" },
  86: { description: "Heavy snow showers", icon: "13d" },
  95: { description: "Thunderstorm", icon: "11d" },
  96: { description: "Thunderstorm with slight hail", icon: "11d" },
  99: { description: "Thunderstorm with heavy hail", icon: "11d" },
};

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(() => {
    return localStorage.getItem("lastCity") || "";
  });
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem("unit") || "C";
  });
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleUnit = () => {
    setUnit((prevUnit) => {
      const newUnit = prevUnit === "C" ? "F" : "C";
      localStorage.setItem("unit", newUnit);
      return newUnit;
    });
  };

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);
    try {
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          cityName
        )}`
      );
      const geoData = await geoResponse.json();
      if (!geoData || geoData.length === 0) {
        throw new Error("City not found");
      }
      const { lat, lon, display_name } = geoData[0];

      const temperatureUnit = unit === "C" ? "celsius" : "fahrenheit";

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=${temperatureUnit}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const weatherJson = await weatherResponse.json();
      if (!weatherJson.current_weather) {
        throw new Error("Weather data not available");
      }
      const current = weatherJson.current_weather;
      const weatherCode = current.weathercode;
      const weatherInfo = weatherCodeMap[weatherCode] || {
        description: "Unknown",
        icon: "01d",
      };

      const data = {
        name: cityName,
        displayName: display_name,
        latitude: lat,
        longitude: lon,
        temperature: current.temperature,
        windspeed: current.windspeed,
        weathercode: weatherCode,
        description: weatherInfo.description,
        icon: weatherInfo.icon,
        daily: weatherJson.daily,
      };

      setWeatherData(data);
      localStorage.setItem("lastCity", cityName);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
      const interval = setInterval(() => {
        fetchWeather(city);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        unit,
        toggleUnit,
        weatherData,
        error,
        loading,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
