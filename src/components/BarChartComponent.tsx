import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartComponents.css';

const monthlyData = [
  { name: 'Jan', users: 4000, sessions: 2400, pageViews: 8900 },
  { name: 'Feb', users: 3000, sessions: 1398, pageViews: 6700 },
  { name: 'Mar', users: 2000, sessions: 9800, pageViews: 12400 },
  { name: 'Apr', users: 2780, sessions: 3908, pageViews: 9800 },
  { name: 'May', users: 1890, sessions: 4800, pageViews: 11200 },
  { name: 'Jun', users: 2390, sessions: 3800, pageViews: 8900 },
];

const weeklyData = [
  { name: 'Mon', users: 800, sessions: 600, pageViews: 1200 },
  { name: 'Tue', users: 950, sessions: 750, pageViews: 1450 },
  { name: 'Wed', users: 1100, sessions: 890, pageViews: 1680 },
  { name: 'Thu', users: 1200, sessions: 950, pageViews: 1890 },
  { name: 'Fri', users: 1350, sessions: 1100, pageViews: 2100 },
  { name: 'Sat', users: 900, sessions: 700, pageViews: 1300 },
  { name: 'Sun', users: 750, sessions: 580, pageViews: 1100 },
];

const categoryData = [
  { name: 'Electronics', revenue: 12000, orders: 340 },
  { name: 'Clothing', revenue: 8900, orders: 280 },
  { name: 'Books', revenue: 4500, orders: 180 },
  { name: 'Home & Garden', revenue: 7800, orders: 220 },
  { name: 'Sports', revenue: 6200, orders: 160 },
];

const BarChartComponent: React.FC = () => {
  const [selectedView, setSelectedView] = useState('Monthly Traffic');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCurrentData = () => {
    switch (selectedView) {
      case 'Monthly Traffic':
        return { data: monthlyData, bars: ['users', 'sessions', 'pageViews'] };
      case 'Weekly Traffic':
        return { data: weeklyData, bars: ['users', 'sessions', 'pageViews'] };
      case 'Category Performance':
        return { data: categoryData, bars: ['revenue', 'orders'] };
      default:
        return { data: monthlyData, bars: ['users', 'sessions', 'pageViews'] };
    }
  };

  const viewOptions = ['Monthly Traffic', 'Weekly Traffic', 'Category Performance'];

  const getBarColor = (barName: string) => {
    const colors = {
      users: '#8884d8',
      sessions: '#82ca9d',
      pageViews: '#ffc658',
      revenue: '#ff7c7c',
      orders: '#8dd1e1',
    };
    return colors[barName as keyof typeof colors] || '#8884d8';
  };

  const currentConfig = getCurrentData();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Performance Metrics</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button bar-chart"
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
        <BarChart data={currentConfig.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {currentConfig.bars.map((barKey) => (
            <Bar 
              key={barKey} 
              dataKey={barKey} 
              fill={getBarColor(barKey)}
              name={barKey.charAt(0).toUpperCase() + barKey.slice(1)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;