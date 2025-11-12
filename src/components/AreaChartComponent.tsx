import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartComponents.css';

const stackedData = [
  { name: 'Jan', organic: 4000, paid: 2400, social: 1200, direct: 800 },
  { name: 'Feb', organic: 4500, paid: 2800, social: 1400, direct: 900 },
  { name: 'Mar', organic: 5000, paid: 3200, social: 1600, direct: 1000 },
  { name: 'Apr', organic: 5500, paid: 3600, social: 1800, direct: 1100 },
  { name: 'May', organic: 6000, paid: 4000, social: 2000, direct: 1200 },
  { name: 'Jun', organic: 6500, paid: 4400, social: 2200, direct: 1300 },
];

const volumeData = [
  { name: 'Week 1', desktop: 8000, mobile: 12000, tablet: 3000 },
  { name: 'Week 2', desktop: 8500, mobile: 13500, tablet: 3200 },
  { name: 'Week 3', desktop: 9000, mobile: 15000, tablet: 3400 },
  { name: 'Week 4', desktop: 9500, mobile: 16500, tablet: 3600 },
  { name: 'Week 5', desktop: 10000, mobile: 18000, tablet: 3800 },
  { name: 'Week 6', desktop: 10500, mobile: 19500, tablet: 4000 },
];

const revenueData = [
  { name: 'Q1', product: 25000, services: 15000, subscriptions: 8000 },
  { name: 'Q2', product: 28000, services: 18000, subscriptions: 10000 },
  { name: 'Q3', product: 32000, services: 22000, subscriptions: 12000 },
  { name: 'Q4', product: 35000, services: 25000, subscriptions: 15000 },
];

const AreaChartComponent: React.FC = () => {
  const [selectedView, setSelectedView] = useState('Traffic Sources');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCurrentData = () => {
    switch (selectedView) {
      case 'Traffic Sources':
        return { data: stackedData, areas: ['organic', 'paid', 'social', 'direct'] };
      case 'Device Usage':
        return { data: volumeData, areas: ['desktop', 'mobile', 'tablet'] };
      case 'Revenue Streams':
        return { data: revenueData, areas: ['product', 'services', 'subscriptions'] };
      default:
        return { data: stackedData, areas: ['organic', 'paid', 'social', 'direct'] };
    }
  };

  const viewOptions = ['Traffic Sources', 'Device Usage', 'Revenue Streams'];

  const getAreaColor = (areaName: string) => {
    const colors = {
      organic: '#27ae60',
      paid: '#e74c3c',
      social: '#3498db',
      direct: '#f39c12',
      desktop: '#9b59b6',
      mobile: '#1abc9c',
      tablet: '#e67e22',
      product: '#2c3e50',
      services: '#16a085',
      subscriptions: '#d35400',
    };
    return colors[areaName as keyof typeof colors] || '#8884d8';
  };

  const currentConfig = getCurrentData();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Cumulative Analysis</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button area-chart"
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
        <AreaChart data={currentConfig.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {currentConfig.areas.map((areaKey) => (
            <Area 
              key={areaKey}
              type="monotone"
              dataKey={areaKey} 
              stackId="1"
              stroke={getAreaColor(areaKey)}
              fill={getAreaColor(areaKey)}
              fillOpacity={0.6}
              name={areaKey.charAt(0).toUpperCase() + areaKey.slice(1)}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;