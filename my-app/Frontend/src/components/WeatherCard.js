// components/WeatherCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudSun,
  faCloud,
  faSnowflake,
  faCloudRain,
  faSmog,
  faTimes,
  faLocationArrow,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  cloud: faCloud,
  snowflake: faSnowflake,
  'cloud-rain': faCloudRain,
  smog: faSmog,
  'cloud-sun': faCloudSun,
};

const WeatherCard = ({ city, data, onClick, onRemove }) => {
  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div
      className={`weather-card ${data.cardClass} fade-in`}
      onClick={onClick}
    >
      <button className="close-btn" onClick={handleRemove}>
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <div className="card-header">
        <div className="location-info">
          <h2>{city}</h2>
          <div className="time">{data.time}</div>
        </div>
        <div className="temperature">{data.temp}°C</div>
      </div>

      <div className="weather-main">
        <div className="temp-info">
          <div className="temp-range">Temp Min: {data.tempMin}°C</div>
          <div className="temp-range">Temp Max: {data.tempMax}°C</div>
        </div>
        <FontAwesomeIcon icon={iconMap[data.icon]} className="weather-icon" />
      </div>

      <div className="condition">
        <FontAwesomeIcon icon={iconMap[data.icon]} />
        <span>{data.condition}</span>
      </div>

      <div className="details-footer">
        <div className="detail-item">
          <div className="detail-value">{data.pressure}</div>
          <div className="detail-label">Pressure</div>
        </div>
        <div className="detail-item">
          <div className="detail-value">{data.humidity}</div>
          <div className="detail-label">Humidity</div>
        </div>
        <div className="detail-item">
          <div className="detail-value">{data.visibility}</div>
          <div className="detail-label">Visibility</div>
        </div>
        <div className="detail-item wind-info">
          <FontAwesomeIcon icon={faLocationArrow} />
          <span className="detail-value">{data.wind}</span>
        </div>
        <div className="detail-item sun-times">
          <div><strong>Sunrise:</strong> {data.sunrise}</div>
          <div><strong>Sunset:</strong> {data.sunset}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;