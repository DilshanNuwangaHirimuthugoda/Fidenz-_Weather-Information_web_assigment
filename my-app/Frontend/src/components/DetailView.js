// // components/DetailView.js
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faCloudSun,
//   faCloud,
//   faSnowflake,
//   faCloudRain,
//   faSmog,
//   faLocationArrow,
//   faArrowLeft,
// } from '@fortawesome/free-solid-svg-icons';

// const iconMap = {
//   cloud: faCloud,
//   snowflake: faSnowflake,
//   'cloud-rain': faCloudRain,
//   smog: faSmog,
//   'cloud-sun': faCloudSun,
// };

// const DetailView = ({ selectedCity, weatherData, onClose }) => {
//   return (
//     <div className={`detail-view ${weatherData.cardClass} active`}>
//       <div className="detail-content">
//         <div className="detail-header">
//           <button className="back-btn" onClick={onClose}>
//             <FontAwesomeIcon icon={faArrowLeft} />
//           </button>
//         </div>

//         <div className="detail-main">
//           <h2 className="detail-location">{selectedCity}</h2>
//           <div className="detail-time">{weatherData.time}</div>

//           <div className="detail-weather">
//             <FontAwesomeIcon icon={iconMap[weatherData.icon]} className="detail-icon" />
//             <div className="detail-temp">{weatherData.temp}°C</div>
//           </div>

//           <div className="detail-condition">{weatherData.condition}</div>
//           <div className="detail-temp-range">
//             Temp Min: {weatherData.tempMin}°C | Temp Max: {weatherData.tempMax}°C
//           </div>
//         </div>

//         <div className="detail-stats">
//           <div className="stat-item">
//             <div className="stat-value">{weatherData.pressure}</div>
//             <div className="stat-label">Pressure</div>
//           </div>
//           <div className="stat-item">
//             <div className="stat-value">{weatherData.humidity}</div>
//             <div className="stat-label">Humidity</div>
//           </div>
//           <div className="stat-item">
//             <div className="stat-value">{weatherData.visibility}</div>
//             <div className="stat-label">Visibility</div>
//           </div>
//           <div className="stat-item">
//             <div className="wind-detail">
//               <FontAwesomeIcon icon={faLocationArrow} />
//               <span className="stat-value">{weatherData.wind}</span>
//             </div>
//             <div className="stat-label">Wind</div>
//           </div>
//           <div className="stat-item">
//             <div className="stat-value">{weatherData.sunrise}</div>
//             <div className="stat-label">Sunrise</div>
//           </div>
//           <div className="stat-item">
//             <div className="stat-value">{weatherData.sunset}</div>
//             <div className="stat-label">Sunset</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailView;


























// components/DetailView.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudSun,
  faCloud,
  faSnowflake,
  faCloudRain,
  faSmog,
  faLocationArrow,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  cloud: faCloud,
  snowflake: faSnowflake,
  'cloud-rain': faCloudRain,
  smog: faSmog,
  'cloud-sun': faCloudSun,
};

const DetailView = ({ selectedCity, weatherData, onClose }) => {
  return (
    <div className={`detail-view ${weatherData.cardClass} active`}>
      <div className="detail-content">
        <div className="detail-header">
          <button className="back-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>

        <div className="detail-main">
          <h2 className="detail-location">{selectedCity}</h2>
          <div className="detail-time">{weatherData.time}</div>

          <div className="detail-weather">
            <FontAwesomeIcon icon={iconMap[weatherData.icon]} className="detail-icon" />
            <div className="detail-temp">{weatherData.temp}°C</div>
          </div>

          <div className="detail-condition">{weatherData.condition}</div>
          <div className="detail-temp-range">
            Temp Min: {weatherData.tempMin}°C | Temp Max: {weatherData.tempMax}°C
          </div>
        </div>

        <div className="detail-stats">
          <div className="stat-item">
            <div className="stat-value">{weatherData.pressure}</div>
            <div className="stat-label">Pressure</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{weatherData.humidity}</div>
            <div className="stat-label">Humidity</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{weatherData.visibility}</div>
            <div className="stat-label">Visibility</div>
          </div>
          <div className="stat-item">
            <div className="wind-detail">
              <FontAwesomeIcon icon={faLocationArrow} />
              <span className="stat-value">{weatherData.wind}</span>
            </div>
            <div className="stat-label">Wind</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{weatherData.sunrise}</div>
            <div className="stat-label">Sunrise</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{weatherData.sunset}</div>
            <div className="stat-label">Sunset</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
