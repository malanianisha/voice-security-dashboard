import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './ChartComponents.css';

interface LocationData {
  name: string;
  lat: number;
  lng: number;
  count: number;
  color: string;
}

// Location data based on your CSV file
const threatLocations: LocationData[] = [
  { name: 'Kenya', lat: -1.2921, lng: 36.8219, count: 4, color: '#e74c3c' },
  { name: 'Iran', lat: 32.4279, lng: 53.6880, count: 6, color: '#c0392b' },
  { name: 'Iraq', lat: 33.2232, lng: 43.6793, count: 3, color: '#f39c12' },
  { name: 'China', lat: 35.8617, lng: 104.1954, count: 3, color: '#e67e22' },
  { name: 'Vietnam', lat: 14.0583, lng: 108.2772, count: 4, color: '#27ae60' },
  { name: 'Russia', lat: 61.5240, lng: 105.3188, count: 3, color: '#2980b9' },
  { name: 'Poland', lat: 51.9194, lng: 19.1451, count: 3, color: '#8e44ad' },
  { name: 'Cambodia', lat: 12.5657, lng: 104.9910, count: 3, color: '#16a085' },
  { name: 'USA', lat: 37.0902, lng: -95.7129, count: 3, color: '#34495e' }
];

const FraudLocationMap: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Locations');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Create filter options from location names
  const filterOptions = ['All Locations', ...threatLocations.map(loc => loc.name)];

  const getFilteredData = () => {
    if (selectedFilter === 'All Locations') {
      return threatLocations;
    }
    
    // Show only selected location
    return threatLocations.filter(location => location.name === selectedFilter);
  };

  const getTotalThreats = () => {
    const filtered = getFilteredData();
    return filtered.reduce((sum, location) => sum + location.count, 0);
  };

  const getRadius = (count: number, data: LocationData[]) => {
    const maxCount = Math.max(...data.map(d => d.count));
    const minRadius = 8;
    const maxRadius = 20;
    return minRadius + (count / maxCount) * (maxRadius - minRadius);
  };

  const currentData = getFilteredData();
  const totalThreats = getTotalThreats();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>🌍 Threat Origins</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button location-chart"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedFilter} ▼
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {filterOptions.map((option) => (
                <div
                  key={option}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedFilter(option);
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
            <p>Loading threat map...</p>
          </div>
        ) : (
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <MapContainer
              center={[20, 20]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
              key={`${selectedFilter}-${isMapLoaded}`}
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
                  radius={getRadius(location.count, threatLocations)}
                  pathOptions={{
                    color: location.color,
                    fillColor: location.color,
                    fillOpacity: 0.7,
                    weight: 3
                  }}
                >
                  <Popup>
                    <div style={{ textAlign: 'center' }}>
                      <strong>{location.name}</strong><br />
                      <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                        ⚠️ {location.count} Threats
                      </span>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>

      <div className="location-summary">
        <div className="summary-header">
          <h4>📊 Threat Summary</h4>
          <div className="total-threats">
            <span className="total-label">Total Threats:</span>
            <span className="total-value">{totalThreats}</span>
          </div>
        </div>
        
        <div className="location-stats">
          {(selectedFilter === 'All Locations' ? threatLocations : currentData)
            .sort((a, b) => b.count - a.count)
            .slice(0, 6)
            .map((location, index) => (
            <div key={index} className="location-stat-item">
              <div className="location-indicator" style={{ backgroundColor: location.color }}></div>
              <div className="location-info">
                <div className="location-name">{location.name}</div>
                <div className="location-count">{location.count} threats</div>
              </div>
              <div className="location-percentage">
                {Math.round((location.count / threatLocations.reduce((sum, loc) => sum + loc.count, 0)) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FraudLocationMap;