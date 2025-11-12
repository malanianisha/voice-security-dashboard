import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getFraudTypeData, getSeverityData, getCallTreatmentData } from '../services/fraudDataService';
import './ChartComponents.css';

const FraudTypeChart: React.FC = () => {
  const [selectedView, setSelectedView] = useState('Fraud Type');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCurrentData = () => {
    switch (selectedView) {
      case 'Fraud Type':
        return { 
          data: getFraudTypeData(), 
          centerValue: getFraudTypeData().reduce((sum, item) => sum + item.value, 0),
          centerLabel: 'Total Incidents'
        };
      case 'Severity':
        return { 
          data: getSeverityData(), 
          centerValue: getSeverityData().reduce((sum, item) => sum + item.value, 0),
          centerLabel: 'Total Cases'
        };
      case 'Call Treatment':
        return { 
          data: getCallTreatmentData(), 
          centerValue: getCallTreatmentData().reduce((sum, item) => sum + item.value, 0),
          centerLabel: 'Total Calls'
        };
      default:
        return { 
          data: getFraudTypeData(), 
          centerValue: getFraudTypeData().reduce((sum, item) => sum + item.value, 0),
          centerLabel: 'Total Incidents'
        };
    }
  };

  const viewOptions = ['Fraud Type', 'Severity', 'Call Treatment'];
  const currentConfig = getCurrentData();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>🛡️ Fraud Analysis</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button fraud-chart"
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
          <Tooltip formatter={(value: any) => [value, 'Count']} />
          <Legend />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="donut-center-text">
            <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold" fill="#2c3e50">{currentConfig.centerValue}</tspan>
            <tspan x="50%" dy="1.5em" fontSize="14" fill="#7f8c8d">{currentConfig.centerLabel}</tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-stats">
        <div className="stats-grid">
          {currentConfig.data.map((item, index) => (
            <div key={index} className="stat-item">
              <div className="stat-indicator" style={{ backgroundColor: item.color }}></div>
              <div className="stat-info">
                <div className="stat-name">{item.name}</div>
                <div className="stat-value">{item.value} cases</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FraudTypeChart;