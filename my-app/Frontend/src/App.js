// App.js
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import WeatherGrid from './components/WeatherGrid';
import DetailView from './components/DetailView';
import BackgroundClouds from './components/BackgroundClouds';
import Footer from './components/Footer';
import LoginScreen from './components/LoginScreen';
import LoadingSpinner from './components/LoadingSpinner';

const API_KEY = '981e96c96aaec017e4457ae21a92e646';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; // Your backend URL

function App() {
  const { isLoading, isAuthenticated, error } = useAuth0();
  const [weatherData, setWeatherData] = useState({});
  const [currentCities, setCurrentCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load initial data from backend
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch cities data from backend API
        const response = await fetch(`${BACKEND_URL}/api/cities`);
        if (!response.ok) throw new Error('Failed to load cities data');
        
        const citiesData = await response.json();
        
        // Convert array format back to object format for compatibility
        const weatherDataObject = {};
        const cityNames = [];

        citiesData.forEach(cityData => {
          weatherDataObject[cityData.cityName] = {
            temp: cityData.temp,
            tempMin: cityData.tempMin,
            tempMax: cityData.tempMax,
            condition: cityData.condition,
            icon: cityData.icon,
            time: cityData.time,
            pressure: cityData.pressure,
            humidity: cityData.humidity,
            visibility: cityData.visibility,
            wind: cityData.wind,
            sunrise: cityData.sunrise,
            sunset: cityData.sunset,
            cardClass: cityData.cardClass,
            cityCode: cityData.cityCode
          };
          cityNames.push(cityData.cityName);
        });

        setWeatherData(weatherDataObject);
        setCurrentCities(cityNames);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error loading cities data:', error);
        // Fallback to empty state if loading fails
        setWeatherData({});
        setCurrentCities([]);
        setDataLoaded(true);
      }
    };

    loadInitialData();
  }, []);

  const getIconFromCondition = (main) => {
    switch (main.toLowerCase()) {
      case 'clouds': return 'cloud';
      case 'clear': return 'cloud-sun';
      case 'rain': return 'cloud-rain';
      case 'snow': return 'snowflake';
      case 'mist': case 'fog': return 'smog';
      default: return 'cloud';
    }
  };

  const getRandomCardClass = () => {
    const classes = ['colombo', 'tokyo', 'liverpool', 'sydney', 'boston'];
    return classes[Math.floor(Math.random() * classes.length)];
  };

  const generateCityCode = (name) => {
    return name.split(',')[0].substring(0, 3).toUpperCase();
  };

  // Save city data to backend
  const saveCityToBackend = async (cityData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cityData)
      });
      
      if (!response.ok) throw new Error('Failed to save city data');
      return true;
    } catch (error) {
      console.error('Error saving city data:', error);
      return false;
    }
  };

  // Remove city data from backend
  const removeCityFromBackend = async (cityName) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cities/${encodeURIComponent(cityName)}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to remove city data');
      return true;
    } catch (error) {
      console.error('Error removing city data:', error);
      return false;
    }
  };

  const addCity = async () => {
    const cityName = cityInput.trim();
    if (cityName && !currentCities.includes(cityName)) {
      try {
        // Get weather data from OpenWeather API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        const newData = {
          temp: Math.round(data.main.temp),
          tempMin: Math.round(data.main.temp_min),
          tempMax: Math.round(data.main.temp_max),
          condition: data.weather[0].description,
          icon: getIconFromCondition(data.weather[0].main),
          time: new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            month: 'short',
            day: 'numeric',
          }),
          pressure: `${data.main.pressure}hPa`,
          humidity: `${data.main.humidity}%`,
          visibility: `${(data.visibility / 1000).toFixed(1)}km`,
          wind: `${data.wind.speed}m/s ${data.wind.deg} Degree`,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          }),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          }),
          cardClass: getRandomCardClass(),
          cityCode: generateCityCode(cityName),
        };

        // Prepare data for backend (array format)
        const cityDataForBackend = {
          cityName: cityName,
          cityCode: newData.cityCode,
          ...newData
        };

        // Save to backend first
        const saved = await saveCityToBackend(cityDataForBackend);
        
        if (saved) {
          // Update local state only if backend save was successful
          setWeatherData((prev) => ({ ...prev, [cityName]: newData }));
          setCurrentCities((prev) => [...prev, cityName]);
          setCityInput('');
        } else {
          alert('Failed to save city data. Please try again.');
        }
      } catch (error) {
        console.error(error);
        alert('City not found. Please try again.');
      }
    }
  };

  const removeCity = async (cityName) => {
    try {
      // Remove from backend first
      const removed = await removeCityFromBackend(cityName);
      
      if (removed) {
        // Update local state only if backend removal was successful
        setCurrentCities((prev) => prev.filter((city) => city !== cityName));
        setWeatherData((prev) => {
          const newData = { ...prev };
          delete newData[cityName];
          return newData;
        });
        
        // Close detail view if the removed city was selected
        if (selectedCity === cityName) {
          setSelectedCity(null);
        }
      } else {
        alert('Failed to remove city data. Please try again.');
      }
    } catch (error) {
      console.error('Error removing city:', error);
      alert('Failed to remove city. Please try again.');
    }
  };

  const openDetail = (cityName) => {
    setSelectedCity(cityName);
  };

  const closeDetail = () => {
    setSelectedCity(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeDetail();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle loading state
  if (isLoading || !dataLoaded) {
    return <LoadingSpinner />;
  }

  // Handle authentication error
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h2>Authentication Error</h2>
          <p>Something went wrong: {error.message}</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Show weather app if authenticated
  return (
    <div className="dashboard-container">
      <BackgroundClouds />
      
      <Header />
      
      <SearchSection
        cityInput={cityInput}
        setCityInput={setCityInput}
        addCity={addCity}
      />
      
      <WeatherGrid
        currentCities={currentCities}
        weatherData={weatherData}
        onCityClick={openDetail}
        onRemoveCity={removeCity}
      />
      
      <Footer />
      
      {selectedCity && (
        <DetailView
          selectedCity={selectedCity}
          weatherData={weatherData[selectedCity]}
          onClose={closeDetail}
        />
      )}
    </div>
  );
}

export default App;