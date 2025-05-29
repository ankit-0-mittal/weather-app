import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  return (
    <WeatherProvider>
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to right, #fbbf24)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '64rem',
            gap: '2rem',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(to right, #ec4899, #ef4444, #fbbf24)',
              borderRadius: '1.5rem',
              boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '100%',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <SearchInput />
            <ErrorDisplay />
            <WeatherInfo />
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
