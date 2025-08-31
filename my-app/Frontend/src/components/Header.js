// // components/Header.js
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

// const Header = () => {
//   return (
//     <div className="header">
//       <div className="header-icon">
//         <FontAwesomeIcon icon={faCloudSun} />
//       </div>
//       <h1>Weather App</h1>
//     </div>
//   );
// };

// export default Header;


























// components/Header.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { logout, user } = useAuth0();

  const handleLogout = () => {
    logout({ 
      logoutParams: { 
        returnTo: window.location.origin 
      } 
    });
  };

  return (
    <div className="header">
      <div className="header-icon">
        <FontAwesomeIcon icon={faCloudSun} />
      </div>
      <h1>Weather App</h1>
      
      <div className="user-section">
        <div className="user-info">
          <FontAwesomeIcon icon={faUser} />
          <span className="user-name">{user?.name || user?.email}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
