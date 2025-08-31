// // App.js
// import React, { useState, useEffect } from 'react';
// import './App.css'; // Assuming the CSS is extracted to this file
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faCloudSun,
//   faCloud,
//   faSnowflake,
//   faCloudRain,
//   faSmog,
//   faTimes,
//   faLocationArrow,
//   faArrowLeft,
// } from '@fortawesome/free-solid-svg-icons';

// const API_KEY = '981e96c96aaec017e4457ae21a92e646';

// const initialWeatherData = {
//   'Colombo, LK': {
//     temp: 27,
//     tempMin: 25,
//     tempMax: 28,
//     condition: 'Few Clouds',
//     icon: 'cloud',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'colombo',
//   },
//   'Tokyo, JP': {
//     temp: 7,
//     tempMin: -7,
//     tempMax: 7,
//     condition: 'Broken Clouds',
//     icon: 'cloud',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'tokyo',
//   },
//   'Liverpool, GB': {
//     temp: -2,
//     tempMin: -2,
//     tempMax: 5,
//     condition: 'Clear Sky',
//     icon: 'snowflake',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'liverpool',
//   },
//   'Sydney, AU': {
//     temp: 26,
//     tempMin: 20,
//     tempMax: 30,
//     condition: 'Light Rain',
//     icon: 'cloud-rain',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'sydney',
//   },
//   'Boston, US': {
//     temp: 13,
//     tempMin: 10,
//     tempMax: 15,
//     condition: 'Mist',
//     icon: 'smog',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'boston',
//   },
// };

// const iconMap = {
//   cloud: faCloud,
//   snowflake: faSnowflake,
//   'cloud-rain': faCloudRain,
//   smog: faSmog,
//   'cloud-sun': faCloudSun,
// };

// function App() {
//   const [weatherData, setWeatherData] = useState(initialWeatherData);
//   const [currentCities, setCurrentCities] = useState(Object.keys(initialWeatherData));
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [cityInput, setCityInput] = useState('');

//   useEffect(() => {
//     // For demo, we keep static, but you can fetch real data here if needed
//   }, []);

//   const addCity = async () => {
//     const cityName = cityInput.trim();
//     if (cityName && !currentCities.includes(cityName)) {
//       try {
//         // Fetch real weather data from OpenWeatherMap
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
//         );
//         if (!response.ok) throw new Error('City not found');
//         const data = await response.json();

//         const newData = {
//           temp: Math.round(data.main.temp),
//           tempMin: Math.round(data.main.temp_min),
//           tempMax: Math.round(data.main.temp_max),
//           condition: data.weather[0].description,
//           icon: getIconFromCondition(data.weather[0].main), // Map to font-awesome icon
//           time: new Date().toLocaleString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//             month: 'short',
//             day: 'numeric',
//           }),
//           pressure: `${data.main.pressure}hPa`,
//           humidity: `${data.main.humidity}%`,
//           visibility: `${(data.visibility / 1000).toFixed(1)}km`,
//           wind: `${data.wind.speed}m/s ${data.wind.deg} Degree`,
//           sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
//           sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
//           cardClass: getRandomCardClass(),
//         };

//         setWeatherData((prev) => ({ ...prev, [cityName]: newData }));
//         setCurrentCities((prev) => [...prev, cityName]);
//         setCityInput('');
//       } catch (error) {
//         console.error(error);
//         // Fallback to random data if API fails
//         const sampleData = {
//           temp: Math.floor(Math.random() * 30) + 5,
//           tempMin: Math.floor(Math.random() * 20) + 0,
//           tempMax: Math.floor(Math.random() * 35) + 15,
//           condition: 'Partly Cloudy',
//           icon: 'cloud-sun',
//           time: new Date().toLocaleString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//             month: 'short',
//             day: 'numeric',
//           }),
//           pressure: '1015hPa',
//           humidity: '65%',
//           visibility: '9.5km',
//           wind: '3.5m/s 90 Degree',
//           sunrise: '6:15am',
//           sunset: '6:30pm',
//           cardClass: 'colombo',
//         };
//         setWeatherData((prev) => ({ ...prev, [cityName]: sampleData }));
//         setCurrentCities((prev) => [...prev, cityName]);
//         setCityInput('');
//       }
//     }
//   };

//   const getIconFromCondition = (main) => {
//     switch (main.toLowerCase()) {
//       case 'clouds': return 'cloud';
//       case 'clear': return 'cloud-sun';
//       case 'rain': return 'cloud-rain';
//       case 'snow': return 'snowflake';
//       case 'mist': case 'fog': return 'smog';
//       default: return 'cloud';
//     }
//   };

//   const getRandomCardClass = () => {
//     const classes = ['colombo', 'tokyo', 'liverpool', 'sydney', 'boston'];
//     return classes[Math.floor(Math.random() * classes.length)];
//   };

//   const removeCity = (cityName) => {
//     setCurrentCities((prev) => prev.filter((city) => city !== cityName));
//   };

//   const openDetail = (cityName) => {
//     setSelectedCity(cityName);
//   };

//   const closeDetail = () => {
//     setSelectedCity(null);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       addCity();
//     }
//   };

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         closeDetail();
//       }
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, []);

//   return (
//     <div className="dashboard-container">
//       {/* Background Clouds */}
//       <div className="cloud-bg cloud-1"></div>
//       <div className="cloud-bg cloud-2"></div>
//       <div className="cloud-bg cloud-3"></div>
//       <div className="cloud-bg cloud-4"></div>

//       <div className="header">
//         <div className="header-icon">
//           <FontAwesomeIcon icon={faCloudSun} />
//         </div>
//         <h1>Weather App</h1>
//       </div>

//       <div className="search-section">
//         <div className="search-container">
//           <input
//             type="text"
//             id="cityInput"
//             placeholder="Enter a city"
//             value={cityInput}
//             onChange={(e) => setCityInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//           />
//           <button className="add-btn" onClick={addCity}>
//             Add City
//           </button>
//         </div>
//       </div>

//       <div className="weather-grid">
//         {currentCities.map((city) => {
//           const data = weatherData[city];
//           if (!data) return null;
//           return (
//             <div
//               key={city}
//               className={`weather-card ${data.cardClass} fade-in`}
//               onClick={() => openDetail(city)}
//             >
//               <button
//                 className="close-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   removeCity(city);
//                 }}
//               >
//                 <FontAwesomeIcon icon={faTimes} />
//               </button>

//               <div className="card-header">
//                 <div className="location-info">
//                   <h2>{city}</h2>
//                   <div className="time">{data.time}</div>
//                 </div>
//                 <div className="temperature">{data.temp}°C</div>
//               </div>

//               <div className="weather-main">
//                 <div className="temp-info">
//                   <div className="temp-range">Temp Min: {data.tempMin}°C</div>
//                   <div className="temp-range">Temp Max: {data.tempMax}°C</div>
//                 </div>
//                 <FontAwesomeIcon icon={iconMap[data.icon]} className="weather-icon" />
//               </div>

//               <div className="condition">
//                 <FontAwesomeIcon icon={iconMap[data.icon]} />
//                 <span>{data.condition}</span>
//               </div>

//               <div className="details-footer">
//                 <div className="detail-item">
//                   <div className="detail-value">{data.pressure}</div>
//                   <div className="detail-label">Pressure</div>
//                 </div>
//                 <div className="detail-item">
//                   <div className="detail-value">{data.humidity}</div>
//                   <div className="detail-label">Humidity</div>
//                 </div>
//                 <div className="detail-item">
//                   <div className="detail-value">{data.visibility}</div>
//                   <div className="detail-label">Visibility</div>
//                 </div>
//                 <div className="detail-item wind-info">
//                   <FontAwesomeIcon icon={faLocationArrow} />
//                   <span className="detail-value">{data.wind}</span>
//                 </div>
//                 <div className="detail-item sun-times">
//                   <div><strong>Sunrise:</strong> {data.sunrise}</div>
//                   <div><strong>Sunset:</strong> {data.sunset}</div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="footer">2021 Fidenz Technologies</div>

//       {/* Detail View */}
//       {selectedCity && (
//         <div className={`detail-view ${weatherData[selectedCity]?.cardClass} ${selectedCity ? 'active' : ''}`}>
//           <div className="detail-content">
//             <div className="detail-header">
//               <button className="back-btn" onClick={closeDetail}>
//                 <FontAwesomeIcon icon={faArrowLeft} />
//               </button>
//             </div>

//             <div className="detail-main">
//               <h2 className="detail-location">{selectedCity}</h2>
//               <div className="detail-time">{weatherData[selectedCity].time}</div>

//               <div className="detail-weather">
//                 <FontAwesomeIcon icon={iconMap[weatherData[selectedCity].icon]} className="detail-icon" />
//                 <div className="detail-temp">{weatherData[selectedCity].temp}°C</div>
//               </div>

//               <div className="detail-condition">{weatherData[selectedCity].condition}</div>
//               <div className="detail-temp-range">
//                 Temp Min: {weatherData[selectedCity].tempMin}°C | Temp Max: {weatherData[selectedCity].tempMax}°C
//               </div>
//             </div>

//             <div className="detail-stats">
//               <div className="stat-item">
//                 <div className="stat-value">{weatherData[selectedCity].pressure}</div>
//                 <div className="stat-label">Pressure</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-value">{weatherData[selectedCity].humidity}</div>
//                 <div className="stat-label">Humidity</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-value">{weatherData[selectedCity].visibility}</div>
//                 <div className="stat-label">Visibility</div>
//               </div>
//               <div className="stat-item">
//                 <div className="wind-detail">
//                   <FontAwesomeIcon icon={faLocationArrow} id="detailWindDirection" />
//                   <span className="stat-value">{weatherData[selectedCity].wind}</span>
//                 </div>
//                 <div className="stat-label">Wind</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-value">{weatherData[selectedCity].sunrise}</div>
//                 <div className="stat-label">Sunrise</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-value">{weatherData[selectedCity].sunset}</div>
//                 <div className="stat-label">Sunset</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;





















// // App.js
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Header from './components/Header';
// import SearchSection from './components/SearchSection';
// import WeatherGrid from './components/WeatherGrid';
// import DetailView from './components/DetailView';
// import BackgroundClouds from './components/BackgroundClouds';
// import Footer from './components/Footer';

// const API_KEY = '981e96c96aaec017e4457ae21a92e646';

// const initialWeatherData = {
//   'Colombo, LK': {
//     temp: 27,
//     tempMin: 25,
//     tempMax: 28,
//     condition: 'Few Clouds',
//     icon: 'cloud',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'colombo',
//   },
//   'Tokyo, JP': {
//     temp: 7,
//     tempMin: -7,
//     tempMax: 7,
//     condition: 'Broken Clouds',
//     icon: 'cloud',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'tokyo',
//   },
//   'Liverpool, GB': {
//     temp: -2,
//     tempMin: -2,
//     tempMax: 5,
//     condition: 'Clear Sky',
//     icon: 'snowflake',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'liverpool',
//   },
//   'Sydney, AU': {
//     temp: 26,
//     tempMin: 20,
//     tempMax: 30,
//     condition: 'Light Rain',
//     icon: 'cloud-rain',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'sydney',
//   },
//   'Boston, US': {
//     temp: 13,
//     tempMin: 10,
//     tempMax: 15,
//     condition: 'Mist',
//     icon: 'smog',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'boston',
//   },
// };

// function App() {
//   const [weatherData, setWeatherData] = useState(initialWeatherData);
//   const [currentCities, setCurrentCities] = useState(Object.keys(initialWeatherData));
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [cityInput, setCityInput] = useState('');

//   const getIconFromCondition = (main) => {
//     switch (main.toLowerCase()) {
//       case 'clouds': return 'cloud';
//       case 'clear': return 'cloud-sun';
//       case 'rain': return 'cloud-rain';
//       case 'snow': return 'snowflake';
//       case 'mist': case 'fog': return 'smog';
//       default: return 'cloud';
//     }
//   };

//   const getRandomCardClass = () => {
//     const classes = ['colombo', 'tokyo', 'liverpool', 'sydney', 'boston'];
//     return classes[Math.floor(Math.random() * classes.length)];
//   };

//   const addCity = async () => {
//     const cityName = cityInput.trim();
//     if (cityName && !currentCities.includes(cityName)) {
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
//         );
//         if (!response.ok) throw new Error('City not found');
//         const data = await response.json();

//         const newData = {
//           temp: Math.round(data.main.temp),
//           tempMin: Math.round(data.main.temp_min),
//           tempMax: Math.round(data.main.temp_max),
//           condition: data.weather[0].description,
//           icon: getIconFromCondition(data.weather[0].main),
//           time: new Date().toLocaleString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//             month: 'short',
//             day: 'numeric',
//           }),
//           pressure: `${data.main.pressure}hPa`,
//           humidity: `${data.main.humidity}%`,
//           visibility: `${(data.visibility / 1000).toFixed(1)}km`,
//           wind: `${data.wind.speed}m/s ${data.wind.deg} Degree`,
//           sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
//             hour: 'numeric', 
//             minute: '2-digit', 
//             hour12: true 
//           }),
//           sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
//             hour: 'numeric', 
//             minute: '2-digit', 
//             hour12: true 
//           }),
//           cardClass: getRandomCardClass(),
//         };

//         setWeatherData((prev) => ({ ...prev, [cityName]: newData }));
//         setCurrentCities((prev) => [...prev, cityName]);
//         setCityInput('');
//       } catch (error) {
//         console.error(error);
//         const sampleData = {
//           temp: Math.floor(Math.random() * 30) + 5,
//           tempMin: Math.floor(Math.random() * 20) + 0,
//           tempMax: Math.floor(Math.random() * 35) + 15,
//           condition: 'Partly Cloudy',
//           icon: 'cloud-sun',
//           time: new Date().toLocaleString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//             month: 'short',
//             day: 'numeric',
//           }),
//           pressure: '1015hPa',
//           humidity: '65%',
//           visibility: '9.5km',
//           wind: '3.5m/s 90 Degree',
//           sunrise: '6:15am',
//           sunset: '6:30pm',
//           cardClass: 'colombo',
//         };
//         setWeatherData((prev) => ({ ...prev, [cityName]: sampleData }));
//         setCurrentCities((prev) => [...prev, cityName]);
//         setCityInput('');
//       }
//     }
//   };

//   const removeCity = (cityName) => {
//     setCurrentCities((prev) => prev.filter((city) => city !== cityName));
//   };

//   const openDetail = (cityName) => {
//     setSelectedCity(cityName);
//   };

//   const closeDetail = () => {
//     setSelectedCity(null);
//   };

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         closeDetail();
//       }
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <BackgroundClouds />
      
//       <Header />
      
//       <SearchSection
//         cityInput={cityInput}
//         setCityInput={setCityInput}
//         addCity={addCity}
//       />
      
//       <WeatherGrid
//         currentCities={currentCities}
//         weatherData={weatherData}
//         onCityClick={openDetail}
//         onRemoveCity={removeCity}
//       />
      
//       <Footer />
      
//       {selectedCity && (
//         <DetailView
//           selectedCity={selectedCity}
//           weatherData={weatherData[selectedCity]}
//           onClose={closeDetail}
//         />
//       )}
//     </div>
//   );
// }

// export default App;























////////////////////////////////////////





// // App.js
// import React, { useState, useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import './App.css';
// import Header from './components/Header';
// import SearchSection from './components/SearchSection';
// import WeatherGrid from './components/WeatherGrid';
// import DetailView from './components/DetailView';
// import BackgroundClouds from './components/BackgroundClouds';
// import Footer from './components/Footer';
// import LoginScreen from './components/LoginScreen';
// import LoadingSpinner from './components/LoadingSpinner';

// const API_KEY = '981e96c96aaec017e4457ae21a92e646';

// const initialWeatherData = {
//   'Colombo, LK': {
//     temp: 27,
//     tempMin: 25,
//     tempMax: 28,
//     condition: 'Few Clouds',
//     icon: 'cloud',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'colombo',
//   },
//   'Tokyo, JP': {
//     temp: 7,
//     tempMin: -7,
//     tempMax: 7,
//     condition: 'Broken Clouds',
//     icon: 'cloud',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'tokyo',
//   },
//   'Liverpool, GB': {
//     temp: -2,
//     tempMin: -2,
//     tempMax: 5,
//     condition: 'Clear Sky',
//     icon: 'snowflake',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'liverpool',
//   },
//   'Sydney, AU': {
//     temp: 26,
//     tempMin: 20,
//     tempMax: 30,
//     condition: 'Light Rain',
//     icon: 'cloud-rain',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'sydney',
//   },
//   'Boston, US': {
//     temp: 13,
//     tempMin: 10,
//     tempMax: 15,
//     condition: 'Mist',
//     icon: 'smog',
//     time: '9:19am, Feb 8',
//     pressure: '1018hPa',
//     humidity: '78%',
//     visibility: '8.0km',
//     wind: '4.0m/s 120 Degree',
//     sunrise: '6:05am',
//     sunset: '6:05am',
//     cardClass: 'boston',
//   },
// };

// function App() {
//   const { isLoading, isAuthenticated, error } = useAuth0();
//   const [weatherData, setWeatherData] = useState(initialWeatherData);
//   const [currentCities, setCurrentCities] = useState(Object.keys(initialWeatherData));
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [cityInput, setCityInput] = useState('');

//   const getIconFromCondition = (main) => {
//     switch (main.toLowerCase()) {
//       case 'clouds': return 'cloud';
//       case 'clear': return 'cloud-sun';
//       case 'rain': return 'cloud-rain';
//       case 'snow': return 'snowflake';
//       case 'mist': case 'fog': return 'smog';
//       default: return 'cloud';
//     }
//   };

//   const getRandomCardClass = () => {
//     const classes = ['colombo', 'tokyo', 'liverpool', 'sydney', 'boston'];
//     return classes[Math.floor(Math.random() * classes.length)];
//   };

//   const addCity = async () => {
//     const cityName = cityInput.trim();
//     if (cityName && !currentCities.includes(cityName)) {
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
//         );
//         if (!response.ok) throw new Error('City not found');
//         const data = await response.json();

//         const newData = {
//           temp: Math.round(data.main.temp),
//           tempMin: Math.round(data.main.temp_min),
//           tempMax: Math.round(data.main.temp_max),
//           condition: data.weather[0].description,
//           icon: getIconFromCondition(data.weather[0].main),
//           time: new Date().toLocaleString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//             month: 'short',
//             day: 'numeric',
//           }),
//           pressure: `${data.main.pressure}hPa`,
//           humidity: `${data.main.humidity}%`,
//           visibility: `${(data.visibility / 1000).toFixed(1)}km`,
//           wind: `${data.wind.speed}m/s ${data.wind.deg} Degree`,
//           sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
//             hour: 'numeric', 
//             minute: '2-digit', 
//             hour12: true 
//           }),
//           sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
//             hour: 'numeric', 
//             minute: '2-digit', 
//             hour12: true 
//           }),
//           cardClass: getRandomCardClass(),
//         };

//         setWeatherData((prev) => ({ ...prev, [cityName]: newData }));
//         setCurrentCities((prev) => [...prev, cityName]);
//         setCityInput('');
//       } catch (error) {
//         console.error(error);
//         alert('City not found. Please try again.');
//       }
//     }
//   };

//   const removeCity = (cityName) => {
//     setCurrentCities((prev) => prev.filter((city) => city !== cityName));
//   };

//   const openDetail = (cityName) => {
//     setSelectedCity(cityName);
//   };

//   const closeDetail = () => {
//     setSelectedCity(null);
//   };

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         closeDetail();
//       }
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, []);

//   // Handle loading state
//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   // Handle authentication error
//   if (error) {
//     return (
//       <div className="dashboard-container">
//         <div className="error-message">
//           <h2>Authentication Error</h2>
//           <p>Something went wrong: {error.message}</p>
//         </div>
//       </div>
//     );
//   }

//   // Show login screen if not authenticated
//   if (!isAuthenticated) {
//     return <LoginScreen />;
//   }

//   // Show weather app if authenticated
//   return (
//     <div className="dashboard-container">
//       <BackgroundClouds />
      
//       <Header />
      
//       <SearchSection
//         cityInput={cityInput}
//         setCityInput={setCityInput}
//         addCity={addCity}
//       />
      
//       <WeatherGrid
//         currentCities={currentCities}
//         weatherData={weatherData}
//         onCityClick={openDetail}
//         onRemoveCity={removeCity}
//       />
      
//       <Footer />
      
//       {selectedCity && (
//         <DetailView
//           selectedCity={selectedCity}
//           weatherData={weatherData[selectedCity]}
//           onClose={closeDetail}
//         />
//       )}
//     </div>
//   );
// }

// export default App;













/////////////working///////////////////////


// // App.js
// import React, { useState, useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import './App.css';
// import Header from './components/Header';
// import SearchSection from './components/SearchSection';
// import WeatherGrid from './components/WeatherGrid';
// import DetailView from './components/DetailView';
// import BackgroundClouds from './components/BackgroundClouds';
// import Footer from './components/Footer';
// import LoginScreen from './components/LoginScreen';
// import LoadingSpinner from './components/LoadingSpinner';
// import citiesData from './cities.json';

// const API_KEY = '981e96c96aaec017e4457ae21a92e646';

// function App() {
//   const { isLoading, isAuthenticated, error } = useAuth0();
//   const [weatherData, setWeatherData] = useState({});
//   const [currentCities, setCurrentCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [cityInput, setCityInput] = useState('');
//   const [dataLoaded, setDataLoaded] = useState(false);

//   // Load initial data from cities.json
//   useEffect(() => {
//     const loadInitialData = () => {
//       try {
//         // Convert array format back to object format for compatibility
//         const weatherDataObject = {};
//         const cityNames = [];

//         citiesData.forEach(cityData => {
//           weatherDataObject[cityData.cityName] = {
//             temp: cityData.temp,
//             tempMin: cityData.tempMin,
//             tempMax: cityData.tempMax,
//             condition: cityData.condition,
//             icon: cityData.icon,
//             time: cityData.time,
//             pressure: cityData.pressure,
//             humidity: cityData.humidity,
//             visibility: cityData.visibility,
//             wind: cityData.wind,
//             sunrise: cityData.sunrise,
//             sunset: cityData.sunset,
//             cardClass: cityData.cardClass,
//             cityCode: cityData.cityCode
//           };
//           cityNames.push(cityData.cityName);
//         });

//         setWeatherData(weatherDataObject);
//         setCurrentCities(cityNames);
//         setDataLoaded(true);
//       } catch (error) {
//         console.error('Error loading cities data:', error);
//         // Fallback to empty state if JSON loading fails
//         setWeatherData({});
//         setCurrentCities([]);
//         setDataLoaded(true);
//       }
//     };

//     loadInitialData();
//   }, []);

//   const getIconFromCondition = (main) => {
//     switch (main.toLowerCase()) {
//       case 'clouds': return 'cloud';
//       case 'clear': return 'cloud-sun';
//       case 'rain': return 'cloud-rain';
//       case 'snow': return 'snowflake';
//       case 'mist': case 'fog': return 'smog';
//       default: return 'cloud';
//     }
//   };

//   const getRandomCardClass = () => {
//     const classes = ['colombo', 'tokyo', 'liverpool', 'sydney', 'boston'];
//     return classes[Math.floor(Math.random() * classes.length)];
//   };

//   const addCity = async () => {
//     const cityName = cityInput.trim();
//     if (cityName && !currentCities.includes(cityName)) {
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
//         );
//         if (!response.ok) throw new Error('City not found');
//         const data = await response.json();

//         // Generate a simple city code from the city name
//         const generateCityCode = (name) => {
//           return name.split(',')[0].substring(0, 3).toUpperCase();
//         };

//         const newData = {
//           temp: Math.round(data.main.temp),
//           tempMin: Math.round(data.main.temp_min),
//           tempMax: Math.round(data.main.temp_max),
//           condition: data.weather[0].description,
//           icon: getIconFromCondition(data.weather[0].main),
//           time: new Date().toLocaleString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//             month: 'short',
//             day: 'numeric',
//           }),
//           pressure: `${data.main.pressure}hPa`,
//           humidity: `${data.main.humidity}%`,
//           visibility: `${(data.visibility / 1000).toFixed(1)}km`,
//           wind: `${data.wind.speed}m/s ${data.wind.deg} Degree`,
//           sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
//             hour: 'numeric', 
//             minute: '2-digit', 
//             hour12: true 
//           }),
//           sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
//             hour: 'numeric', 
//             minute: '2-digit', 
//             hour12: true 
//           }),
//           cardClass: getRandomCardClass(),
//           cityCode: generateCityCode(cityName),
//         };

//         setWeatherData((prev) => ({ ...prev, [cityName]: newData }));
//         setCurrentCities((prev) => [...prev, cityName]);
//         setCityInput('');
//       } catch (error) {
//         console.error(error);
//         alert('City not found. Please try again.');
//       }
//     }
//   };

//   const removeCity = (cityName) => {
//     setCurrentCities((prev) => prev.filter((city) => city !== cityName));
//   };

//   const openDetail = (cityName) => {
//     setSelectedCity(cityName);
//   };

//   const closeDetail = () => {
//     setSelectedCity(null);
//   };

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         closeDetail();
//       }
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, []);

//   // Handle loading state
//   if (isLoading || !dataLoaded) {
//     return <LoadingSpinner />;
//   }

//   // Handle authentication error
//   if (error) {
//     return (
//       <div className="dashboard-container">
//         <div className="error-message">
//           <h2>Authentication Error</h2>
//           <p>Something went wrong: {error.message}</p>
//         </div>
//       </div>
//     );
//   }

//   // Show login screen if not authenticated
//   if (!isAuthenticated) {
//     return <LoginScreen />;
//   }

//   // Show weather app if authenticated
//   return (
//     <div className="dashboard-container">
//       <BackgroundClouds />
      
//       <Header />
      
//       <SearchSection
//         cityInput={cityInput}
//         setCityInput={setCityInput}
//         addCity={addCity}
//       />
      
//       <WeatherGrid
//         currentCities={currentCities}
//         weatherData={weatherData}
//         onCityClick={openDetail}
//         onRemoveCity={removeCity}
//       />
      
//       <Footer />
      
//       {selectedCity && (
//         <DetailView
//           selectedCity={selectedCity}
//           weatherData={weatherData[selectedCity]}
//           onClose={closeDetail}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
























// // App.js
// import React, { useState, useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import './App.css';
// import Header from './components/Header';
// import SearchSection from './components/SearchSection';
// import WeatherGrid from './components/WeatherGrid';
// import DetailView from './components/DetailView';
// import BackgroundClouds from './components/BackgroundClouds';
// import Footer from './components/Footer';
// import LoginScreen from './components/LoginScreen';
// import LoadingSpinner from './components/LoadingSpinner';

// const API_KEY = '981e96c96aaec017e4457ae21a92e646';
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; // Your backend URL

// function App() {
//   const { isLoading, isAuthenticated, error } = useAuth0();
//   const [weatherData, setWeatherData] = useState({});
//   const [currentCities, setCurrentCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [cityInput, setCityInput] = useState('');
//   const [dataLoaded, setDataLoaded] = useState(false);

//   // Load initial data from backend
//   useEffect(() => {
//     const loadInitialData = async () => {
//       try {
//         // Fetch cities data from backend API
//         const response = await fetch(`${BACKEND_URL}/api/cities`);
//         if (!response.ok) throw new Error('Failed to load cities data');
        
//         const citiesData = await response.json();
        
//         // Convert array format back to object format for compatibility
//         const weatherDataObject = {};
//         const cityNames = [];

//         citiesData.forEach(cityData => {
//           weatherDataObject[cityData.cityName] = {
//             temp: cityData.temp,
//             tempMin: cityData.tempMin,
//             tempMax: cityData.tempMax,
//             condition: cityData.condition,
//             icon: cityData.icon,
//             time: cityData.time,
//             pressure: cityData.pressure,
//             humidity: cityData.humidity,
//             visibility: cityData.visibility,
//             wind: cityData.wind,
//             sunrise: cityData.sunrise,
//             sunset: cityData.sunset,
//             cardClass: cityData.cardClass,
//             cityCode: cityData.cityCode
//           };
//           cityNames.push(cityData.cityName);
//         });

//         setWeatherData(weatherDataObject);
//         setCurrentCities(cityNames);
//         setDataLoaded(true);
//       } catch (error) {
//         console.error('Error loading cities data:', error);
//         // Fallback to empty state if loading fails
//         setWeatherData({});
//         setCurrentCities([]);
//         setDataLoaded(true);
//       }
//     };

//     if (isAuthenticated) {
//       loadInitialData();
//     }
//   }, [isAuthenticated]);

//   const getIconFromCondition = (main) => {
//     switch (main.toLowerCase()) {
//       case 'clouds': return 'cloud';
//       case 'clear': return 'cloud-sun';
//       case 'rain': return 'cloud-rain';
//       case 'snow': return 'snowflake';
//       case 'mist': case 'fog': return 'smog';
//       default: return 'cloud';
//     }
//   };

//   const getRandomCardClass = () => {
//     const classes = ['colombo', 'tokyo', 'liverpool', 'sydney', 'boston'];
//     return classes[Math.floor(Math.random() * classes.length)];
//   };

//   const generateCityCode = (name) => {
//     return name.split(',')[0].substring(0, 3).toUpperCase();
//   };

//   // Save city data to backend
//   const saveCityToBackend = async (cityData) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/cities`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cityData)
//       });
      
//       if (!response.ok) throw new Error('Failed to save city data');
//       return true;
//     } catch (error) {
//       console.error('Error saving city data:', error);
//       return false;
//     }
//   };

//   // Remove city data from backend
//   const removeCityFromBackend = async (cityName) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/cities/${encodeURIComponent(cityName)}`, {
//         method: 'DELETE'
//       });
      
//       if (!response.ok) throw new Error('Failed to remove city data');
//       return true;
//     } catch (error) {
//       console.error('Error removing city data:', error);
//       return false;
//     }
//   };

//   const addCity = async () => {
//     const cityName = cityInput.trim();
//     if (cityName && !currentCities.includes(cityName)) {
//       try {
//         // Get weather data from OpenWeather API
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
//         );
//         if (!response.ok) throw new Error('City not found');
//         const data = await response.json();

//         const newData = {
//           temp: Math.round(data.main.temp),
//           tempMin: Math.round(data.main.temp_min),
//           tempMax: Math.round(data.main.temp_max),
//           condition: data.weather[0].description,
//           icon: getIconFromCondition(data.weather[0].main),
//           time: new Date().toLocaleString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//             month: 'short',
//             day: 'numeric',
//           }),
//           pressure: `${data.main.pressure}hPa`,
//           humidity: `${data.main.humidity}%`,
//           visibility: `${(data.visibility / 1000).toFixed(1)}km`,
//           wind: `${data.wind.speed}m/s ${data.wind.deg} Degree`,
//           sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
//             hour: 'numeric', 
//             minute: '2-digit', 
//             hour12: true 
//           }),
//           sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
//             hour: 'numeric', 
//             minute: '2-digit', 
//             hour12: true 
//           }),
//           cardClass: getRandomCardClass(),
//           cityCode: generateCityCode(cityName),
//         };

//         // Prepare data for backend (array format)
//         const cityDataForBackend = {
//           cityName: cityName,
//           cityCode: newData.cityCode,
//           ...newData
//         };

//         // Save to backend first
//         const saved = await saveCityToBackend(cityDataForBackend);
        
//         if (saved) {
//           // Update local state only if backend save was successful
//           setWeatherData((prev) => ({ ...prev, [cityName]: newData }));
//           setCurrentCities((prev) => [...prev, cityName]);
//           setCityInput('');
//         } else {
//           alert('Failed to save city data. Please try again.');
//         }
//       } catch (error) {
//         console.error(error);
//         alert('City not found. Please try again.');
//       }
//     }
//   };

//   const removeCity = async (cityName) => {
//     try {
//       // Remove from backend first
//       const removed = await removeCityFromBackend(cityName);
      
//       if (removed) {
//         // Update local state only if backend removal was successful
//         setCurrentCities((prev) => prev.filter((city) => city !== cityName));
//         setWeatherData((prev) => {
//           const newData = { ...prev };
//           delete newData[cityName];
//           return newData;
//         });
        
//         // Close detail view if the removed city was selected
//         if (selectedCity === cityName) {
//           setSelectedCity(null);
//         }
//       } else {
//         alert('Failed to remove city data. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error removing city:', error);
//       alert('Failed to remove city. Please try again.');
//     }
//   };

//   const openDetail = (cityName) => {
//     setSelectedCity(cityName);
//   };

//   const closeDetail = () => {
//     setSelectedCity(null);
//   };

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         closeDetail();
//       }
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, []);

//   // Handle loading state
//   if (isLoading || !dataLoaded) {
//     return <LoadingSpinner />;
//   }

//   // Handle authentication error
//   if (error) {
//     return (
//       <div className="dashboard-container">
//         <div className="error-message">
//           <h2>Authentication Error</h2>
//           <p>Something went wrong: {error.message}</p>
//         </div>
//       </div>
//     );
//   }

//   // Show login screen if not authenticated
//   if (!isAuthenticated) {
//     return <LoginScreen />;
//   }

//   // Show weather app if authenticated
//   return (
//     <div className="dashboard-container">
//       <BackgroundClouds />
      
//       <Header />
      
//       <SearchSection
//         cityInput={cityInput}
//         setCityInput={setCityInput}
//         addCity={addCity}
//       />
      
//       <WeatherGrid
//         currentCities={currentCities}
//         weatherData={weatherData}
//         onCityClick={openDetail}
//         onRemoveCity={removeCity}
//       />
      
//       <Footer />
      
//       {selectedCity && (
//         <DetailView
//           selectedCity={selectedCity}
//           weatherData={weatherData[selectedCity]}
//           onClose={closeDetail}
//         />
//       )}
//     </div>
//   );
// }

// export default App;


























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