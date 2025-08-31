// // components/WeatherGrid.js
// import React from 'react';
// import WeatherCard from './WeatherCard';

// const WeatherGrid = ({ currentCities, weatherData, onCityClick, onRemoveCity }) => {
//   return (
//     <div className="weather-grid">
//       {currentCities.map((city) => {
//         const data = weatherData[city];
//         if (!data) return null;
        
//         return (
//           <WeatherCard
//             key={city}
//             city={city}
//             data={data}
//             onClick={() => onCityClick(city)}
//             onRemove={() => onRemoveCity(city)}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default WeatherGrid;






























// components/WeatherGrid.js
import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherGrid = ({ currentCities, weatherData, onCityClick, onRemoveCity }) => {
  return (
    <div className="weather-grid">
      {currentCities.map((city) => {
        const data = weatherData[city];
        if (!data) return null;
        
        return (
          <WeatherCard
            key={city}
            city={city}
            data={data}
            onClick={() => onCityClick(city)}
            onRemove={() => onRemoveCity(city)}
          />
        );
      })}
    </div>
  );
};

export default WeatherGrid;