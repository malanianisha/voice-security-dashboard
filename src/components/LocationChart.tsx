import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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

const LocationChart: React.FC = () => {
  const [selectedView, setSelectedView] = useState('User Locations');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fix Leaflet icon issue
      try {
        // Simple approach - just load the map after a brief delay
        if (typeof window !== 'undefined') {
          setIsMapLoaded(true);
        }
      } catch (error) {
        console.error('Failed to initialize map:', error);
        setIsMapLoaded(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

  const getRadius = (value: number, data: LocationData[]) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minRadius = 5;
    const maxRadius = 25;
    return minRadius + (value / maxValue) * (maxRadius - minRadius);
  };

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
      
      <div className="map-container">
        {!isMapLoaded ? (
          <div style={{ 
            height: '300px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <p>Loading map...</p>
          </div>
        ) : (
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <MapContainer
              center={[20, 0]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
              key={`${selectedView}-${isMapLoaded}`}
              attributionControl={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {currentData.map((location, index) => (
                <CircleMarker
                  key={`${location.name}-${index}`}
                  center={[location.lat, location.lng]}
                  radius={getRadius(location.value, currentData)}
                  pathOptions={{
                    color: location.color,
                    fillColor: location.color,
                    fillOpacity: 0.6,
                    weight: 2
                  }}
                >
                  <Popup>
                    <div>
                      <strong>{location.name}</strong><br />
                      Value: {location.value.toLocaleString()}
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        )}
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

export default LocationChart;