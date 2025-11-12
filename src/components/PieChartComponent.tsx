import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './ChartComponents.css';

const sampleData = [
  { name: 'Desktop', value: 1245, color: '#ff6b6b' },
  { name: 'Mobile', value: 890, color: '#4ecdc4' },
  { name: 'Tablet', value: 456, color: '#45b7d1' },
  { name: 'Other', value: 123, color: '#96ceb4' },
];

const additionalDataSets = {
  'Traffic Sources': [
    { name: 'Organic', value: 856, color: '#ff9f43' },
    { name: 'Direct', value: 612, color: '#a4b0be' },
    { name: 'Social Media', value: 389, color: '#5f27cd' },
    { name: 'Referral', value: 234, color: '#00d2d3' },
  ],
  'User Engagement': [
    { name: 'Highly Engaged', value: 445, color: '#10ac84' },
    { name: 'Moderately Engaged', value: 678, color: '#feca57' },
    { name: 'Low Engagement', value: 334, color: '#ff6348' },
    { name: 'Bounce', value: 167, color: '#c8d6e5' },
  ],
};

const PieChartComponent: React.FC = () => {
  const [selectedDataSet, setSelectedDataSet] = useState('Device Types');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const getCurrentData = () => {
    switch (selectedDataSet) {
      case 'Device Types':
        return sampleData;
      case 'Traffic Sources':
        return additionalDataSets['Traffic Sources'];
      case 'User Engagement':
        return additionalDataSets['User Engagement'];
      default:
        return sampleData;
    }
  };

  const dataOptions = ['Device Types', 'Traffic Sources', 'User Engagement'];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Analytics Overview</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedDataSet} ▼
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {dataOptions.map((option) => (
                <div
                  key={option}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedDataSet(option);
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
            data={getCurrentData()}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {getCurrentData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;