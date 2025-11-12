import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartComponents.css';

const trendsData = [
  { name: 'Jan', revenue: 12000, profit: 8400, expenses: 3600 },
  { name: 'Feb', revenue: 15000, profit: 10500, expenses: 4500 },
  { name: 'Mar', revenue: 18000, profit: 12600, expenses: 5400 },
  { name: 'Apr', revenue: 22000, profit: 15400, expenses: 6600 },
  { name: 'May', revenue: 25000, profit: 17500, expenses: 7500 },
  { name: 'Jun', revenue: 28000, profit: 19600, expenses: 8400 },
];

const growthData = [
  { name: 'Week 1', users: 1200, signups: 240, conversions: 48 },
  { name: 'Week 2', users: 1350, signups: 270, conversions: 54 },
  { name: 'Week 3', users: 1500, signups: 300, conversions: 60 },
  { name: 'Week 4', users: 1680, signups: 336, conversions: 67 },
  { name: 'Week 5', users: 1850, signups: 370, conversions: 74 },
  { name: 'Week 6', users: 2000, signups: 400, conversions: 80 },
];

const performanceData = [
  { name: 'Q1', sales: 45000, targets: 50000, achievement: 90 },
  { name: 'Q2', sales: 52000, targets: 55000, achievement: 94.5 },
  { name: 'Q3', sales: 58000, targets: 60000, achievement: 96.7 },
  { name: 'Q4', sales: 65000, targets: 65000, achievement: 100 },
];

const LineChartComponent: React.FC = () => {
  const [selectedView, setSelectedView] = useState('Revenue Trends');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCurrentData = () => {
    switch (selectedView) {
      case 'Revenue Trends':
        return { data: trendsData, lines: ['revenue', 'profit', 'expenses'] };
      case 'User Growth':
        return { data: growthData, lines: ['users', 'signups', 'conversions'] };
      case 'Performance':
        return { data: performanceData, lines: ['sales', 'targets', 'achievement'] };
      default:
        return { data: trendsData, lines: ['revenue', 'profit', 'expenses'] };
    }
  };

  const viewOptions = ['Revenue Trends', 'User Growth', 'Performance'];

  const getLineColor = (lineName: string) => {
    const colors = {
      revenue: '#e74c3c',
      profit: '#27ae60',
      expenses: '#f39c12',
      users: '#3498db',
      signups: '#9b59b6',
      conversions: '#e67e22',
      sales: '#1abc9c',
      targets: '#34495e',
      achievement: '#e74c3c',
    };
    return colors[lineName as keyof typeof colors] || '#8884d8';
  };

  const currentConfig = getCurrentData();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Trend Analysis</h3>
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
        <LineChart data={currentConfig.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {currentConfig.lines.map((lineKey) => (
            <Line 
              key={lineKey} 
              type="monotone"
              dataKey={lineKey} 
              stroke={getLineColor(lineKey)}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name={lineKey.charAt(0).toUpperCase() + lineKey.slice(1)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;