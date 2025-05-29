import React, { useContext, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import styles from './SearchInput.module.css';

const SearchInput = () => {
  const { setCity, fetchWeather } = useContext(WeatherContext);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setCity(input.trim());
    fetchWeather(input.trim());
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchInput;
