import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const ErrorDisplay = () => {
  const { error } = useContext(WeatherContext);

  if (!error) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white p-4 rounded-lg mb-6 text-center font-semibold shadow-lg">
      {error}
    </div>
  );
};

export default ErrorDisplay;
