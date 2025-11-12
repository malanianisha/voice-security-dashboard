import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getLocationData, getCarrierData } from '../services/fraudDataService';
import './ChartComponents.css';

const FraudLocationChart: React.FC = () => {
  const [selectedView, setSelectedView] = useState('Threat Locations');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCurrentData = () => {
    switch (selectedView) {
      case 'Threat Locations':
        const locationData = getLocationData().map(item => ({
          name: item.name,
          value: item.count,
          color: item.color
        }));
        return { 
          data: locationData, 
          centerValue: locationData.reduce((sum, item) => sum + item.value, 0),
          centerLabel: 'Countries'
        };
      case 'Carriers':
        return { 
          data: getCarrierData(), 
          centerValue: getCarrierData().reduce((sum, item) => sum + item.value, 0),
          centerLabel: 'Carriers'
        };
      default:
        const defaultData = getLocationData().map(item => ({
          name: item.name,
          value: item.count,
          color: item.color
        }));
        return { 
          data: defaultData, 
          centerValue: defaultData.reduce((sum, item) => sum + item.value, 0),
          centerLabel: 'Countries'
        };
    }
  };

  const viewOptions = ['Threat Locations', 'Carriers'];
  const currentConfig = getCurrentData();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>🌍 Geographic Threats</h3>
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
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={currentConfig.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
          >
            {currentConfig.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => [value, 'Incidents']} />
          <Legend />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="donut-center-text">
            <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold" fill="#2c3e50">{currentConfig.centerValue}</tspan>
            <tspan x="50%" dy="1.5em" fontSize="14" fill="#7f8c8d">{currentConfig.centerLabel}</tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-stats">
        <div className="stats-grid">
          {currentConfig.data.slice(0, 6).map((item, index) => (
            <div key={index} className="stat-item">
              <div className="stat-indicator" style={{ backgroundColor: item.color }}></div>
              <div className="stat-info">
                <div className="stat-name">{item.name}</div>
                <div className="stat-value">{item.value} threats</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FraudLocationChart;