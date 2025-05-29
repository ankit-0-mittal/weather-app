import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const weatherCodeMap = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌦️',
  53: '🌦️',
  55: '🌧️',
  56: '🌧️',
  57: '🌧️',
  61: '🌧️',
  63: '🌧️',
  65: '🌧️',
  66: '🌧️',
  67: '🌧️',
  71: '❄️',
  73: '❄️',
  75: '❄️',
  77: '❄️',
  80: '🌧️',
  81: '🌧️',
  82: '🌧️',
  85: '❄️',
  86: '❄️',
  95: '⛈️',
  96: '⛈️',
  99: '⛈️',
};

const Forecast = () => {
  const { weatherData } = useContext(WeatherContext);

  if (!weatherData || !weatherData.daily) {
    return null;
  }

  const { daily } = weatherData;
  const days = daily.time;
  const maxTemps = daily.temperature_2m_max;
  const minTemps = daily.temperature_2m_min;
  const weathercodes = daily.weathercode;

  // Get day names from dates
  const dayNames = days.map(dateStr => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { weekday: 'short' });
  });

  return (
    <div className style={{display: 'flex',  alignItems: 'center', gap:'3rem'}}>
      {dayNames.map((day, idx) => (
        <div key={day} style={{display: 'flex',  alignItems: 'center',flexDirection: 'column', gap:'0.5rem'}}>
          <div className="text-lg font-semibold drop-shadow-lg">{day}</div>
          <div className="text-4xl drop-shadow-lg my-1">{weatherCodeMap[weathercodes[idx]] || '❓'}</div>
          <div className="text-sm drop-shadow-lg font-mono">
            {Math.round(maxTemps[idx])}° / {Math.round(minTemps[idx])}°
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
