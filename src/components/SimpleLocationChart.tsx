import React, { useState } from 'react';
import './ChartComponents.css';

interface LocationData {
  name: string;
  lat: number;
  lng: number;
  value: number;
  color: string;
}

const usersData: LocationData[] = [
  { name: 'New York', lat: 40.7128, lng: -74.0060, value: 1250, color: '#ff6b6b' },
  { name: 'London', lat: 51.5074, lng: -0.1278, value: 890, color: '#4ecdc4' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, value: 1456, color: '#45b7d1' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, value: 567, color: '#96ceb4' },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, value: 723, color: '#f9ca24' },
];

const salesData: LocationData[] = [
  { name: 'California', lat: 36.7783, lng: -119.4179, value: 2340, color: '#ee5a24' },
  { name: 'Texas', lat: 31.9686, lng: -99.9018, value: 1890, color: '#0abde3' },
  { name: 'Florida', lat: 27.7663, lng: -82.6404, value: 1456, color: '#10ac84' },
  { name: 'New York', lat: 42.1657, lng: -74.9481, value: 1234, color: '#feca57' },
  { name: 'Illinois', lat: 40.3363, lng: -89.0022, value: 987, color: '#ff9ff3' },
];

const officesData: LocationData[] = [
  { name: 'HQ - San Francisco', lat: 37.7749, lng: -122.4194, value: 450, color: '#5f27cd' },
  { name: 'Europe Office - Berlin', lat: 52.5200, lng: 13.4050, value: 320, color: '#00d2d3' },
  { name: 'Asia Office - Singapore', lat: 1.3521, lng: 103.8198, value: 280, color: '#ff9f43' },
  { name: 'LATAM Office - São Paulo', lat: -23.5505, lng: -46.6333, value: 150, color: '#a4b0be' },
];

const SimpleLocationChart: React.FC = () => {
  const [selectedView, setSelectedView] = useState('User Locations');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCurrentData = () => {
    switch (selectedView) {
      case 'User Locations':
        return usersData;
      case 'Sales by Region':
        return salesData;
      case 'Office Locations':
        return officesData;
      default:
        return usersData;
    }
  };

  const viewOptions = ['User Locations', 'Sales by Region', 'Office Locations'];
  const currentData = getCurrentData();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Geographic Data</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button location-chart"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedView} ▼
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {viewOptions.map((option) => (
                <div
                  key={option}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedView(option);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="simple-map-container">
        <div className="world-map-placeholder">
          <div className="map-message">
            <h4>🗺️ Geographic Overview</h4>
            <p>Interactive world map will load here</p>
            <p className="map-note">Map component temporarily simplified to prevent rendering issues</p>
          </div>
          
          <div className="location-bubbles">
            {currentData.map((location, index) => (
              <div
                key={index}
                className="location-bubble"
                style={{
                  backgroundColor: location.color,
                  left: `${Math.random() * 70 + 15}%`,
                  top: `${Math.random() * 60 + 20}%`,
                  width: `${Math.min(location.value / 50 + 20, 60)}px`,
                  height: `${Math.min(location.value / 50 + 20, 60)}px`,
                }}
                title={`${location.name}: ${location.value.toLocaleString()}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="legend">
        <h4>Legend</h4>
        <div className="legend-items">
          {currentData.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.name}: {item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleLocationChart;