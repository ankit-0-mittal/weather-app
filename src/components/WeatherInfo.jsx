import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import Forecast from "./Forecast";
import styles from "./WeatherInfo.module.css";

const WeatherInfo = () => {
  const { weatherData, loading, unit, toggleUnit } = useContext(WeatherContext);

  if (loading) {
    return (
      <div className="text-gray-700 text-xl font-semibold text-center mt-10">
        Loading...
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const {
    name,
    temperature,
    windspeed,
    description,
    icon,
    displayName,
    latitude,
    longitude,
  } = weatherData;
  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@4x.png`
    : "";

  const now = new Date();

  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const displayTemp =
    unit === "C"
      ? Math.round(temperature)
      : Math.round((temperature * 9) / 5 + 32);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.placeTime}>
        <div className="place">{displayName}</div>
        <div className="time">{timeStr}</div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className={styles.cityName}>{name}</h2>
        <img src={iconUrl} alt={description} className={styles.weatherIcon} />
        <p className={styles.temperature}>
          {displayTemp}°{unit}
          <div
            className={styles.toggleSwitch}
            onClick={toggleUnit}
            role="switch"
            aria-checked={unit === "F"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleUnit();
            }}
          >
            <div
              className={`${styles.toggleThumb} ${
                unit === "F" ? styles.active : ""
              }`}
            >
              °{unit}
            </div>
            <div className={styles.toggleLabels}>
              <span className={unit === "C" ? styles.activeLabel : ""}>°C</span>
              <span className={unit === "F" ? styles.activeLabel : ""}>°F</span>
            </div>
          </div>
        </p>
        <p className={styles.description}>{description}</p>
        <div className={styles.detailsRow}>
          <div className={styles.detailItem}>
            <p>Wind</p>
            <p>{windspeed} m/s</p>
          </div>
          <div className={styles.detailItem}>
            <p>Latitude</p>
            <p>{latitude}</p>
          </div>
          <div className={styles.detailItem}>
            <p>Longitude</p>
            <p>{longitude}</p>
          </div>
        </div>
      </div>

      <Forecast />
    </div>
  );
};

export default WeatherInfo;
