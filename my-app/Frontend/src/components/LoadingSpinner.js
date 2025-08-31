// components/LoadingSpinner.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import BackgroundClouds from './BackgroundClouds';

const LoadingSpinner = () => {
  return (
    <div className="dashboard-container">
      <BackgroundClouds />
      
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} className="loading-spinner" spin />
        <h2>Loading Weather App...</h2>
        <p>Authenticating your session</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;