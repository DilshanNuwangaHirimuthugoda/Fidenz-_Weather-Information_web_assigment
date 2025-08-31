// components/LoginScreen.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faSignInAlt, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import BackgroundClouds from './BackgroundClouds';

const LoginScreen = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        prompt: 'login'
      }
    });
  };

  return (
    <div className="dashboard-container">
      <BackgroundClouds />
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <FontAwesomeIcon icon={faCloudSun} />
            </div>
            <h1>Weather App</h1>
            
          </div>

          <div className="login-content">
            <div className="security-info">
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>Secure login with multi-factor authentication</span>
            </div>

            <button className="login-btn" onClick={handleLogin}>
              <FontAwesomeIcon icon={faSignInAlt} />
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;