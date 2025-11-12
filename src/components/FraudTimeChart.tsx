import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getTimeAnalysis } from '../services/fraudDataService';
import './ChartComponents.css';

const FraudTimeChart: React.FC = () => {
  const [selectedView, setSelectedView] = useState('Hourly Pattern');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCurrentData = () => {
    const timeData = getTimeAnalysis();
    
    switch (selectedView) {
      case 'Hourly Pattern':
        return { 
          data: timeData, 
          type: 'bar',
          dataKey: 'count',
          xKey: 'hour'
        };
      case 'Trend Analysis':
        return { 
          data: timeData, 
          type: 'line',
          dataKey: 'count',
          xKey: 'hour'
        };
      default:
        return { 
          data: timeData, 
          type: 'bar',
          dataKey: 'count',
          xKey: 'hour'
        };
    }
  };

  const viewOptions = ['Hourly Pattern', 'Trend Analysis'];
  const currentConfig = getCurrentData();

  const totalIncidents = currentConfig.data.reduce((sum, item) => sum + item.count, 0);
  const peakHour = currentConfig.data.reduce((max, item) => 
    item.count > max.count ? item : max, { hour: '0:00', count: 0 }
  );

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>⏰ Fraud Timeline</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button line-chart"
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
        {currentConfig.type === 'bar' ? (
          <BarChart data={currentConfig.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={currentConfig.xKey} />
            <YAxis />
            <Tooltip formatter={(value: any) => [value, 'Incidents']} />
            <Legend />
            <Bar dataKey={currentConfig.dataKey} fill="#e74c3c" name="Fraud Incidents" />
          </BarChart>
        ) : (
          <LineChart data={currentConfig.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={currentConfig.xKey} />
            <YAxis />
            <Tooltip formatter={(value: any) => [value, 'Incidents']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={currentConfig.dataKey} 
              stroke="#e74c3c" 
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              name="Fraud Incidents"
            />
          </LineChart>
        )}
      </ResponsiveContainer>

      <div className="fraud-time-stats">
        <div className="time-stats-grid">
          <div className="time-stat-card">
            <div className="time-stat-title">Total Incidents</div>
            <div className="time-stat-value">{totalIncidents}</div>
          </div>
          <div className="time-stat-card">
            <div className="time-stat-title">Peak Hour</div>
            <div className="time-stat-value">{peakHour.hour}</div>
          </div>
          <div className="time-stat-card">
            <div className="time-stat-title">Peak Incidents</div>
            <div className="time-stat-value">{peakHour.count}</div>
          </div>
          <div className="time-stat-card">
            <div className="time-stat-title">Avg/Hour</div>
            <div className="time-stat-value">{Math.round(totalIncidents / currentConfig.data.length)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudTimeChart;