// components/SearchSection.js
import React from 'react';

const SearchSection = ({ cityInput, setCityInput, addCity }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addCity();
    }
  };

  return (
    <div className="search-section">
      <div className="search-container">
        <input
          type="text"
          id="cityInput"
          placeholder="Enter a city"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="add-btn" onClick={addCity}>
          Add City
        </button>
      </div>
    </div>
  );
};

export default SearchSection;