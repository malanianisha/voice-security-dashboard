import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './ChartComponents.css';

// Parse the CSV data for severity levels
const severityData = [
  { name: 'Suspicious', value: 35, color: '#f39c12' },
  { name: 'Critical Risk', value: 9, color: '#e74c3c' },
  { name: 'Significant Risk', value: 6, color: '#e67e22' }
];

const SeverityDonut: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterOptions = ['All', 'Suspicious', 'Critical Risk', 'Significant Risk'];

  const getFilteredData = () => {
    if (selectedFilter === 'All') {
      return severityData;
    }
    
    // When a specific severity is selected, highlight it
    return severityData.map(item => ({
      ...item,
      value: item.name === selectedFilter ? item.value : 0,
      color: item.name === selectedFilter ? item.color : '#e0e0e0'
    }));
  };

  const getTotalValue = () => {
    if (selectedFilter === 'All') {
      return severityData.reduce((sum, item) => sum + item.value, 0);
    }
    const selectedItem = severityData.find(item => item.name === selectedFilter);
    return selectedItem ? selectedItem.value : 0;
  };

  const getSelectedPercentage = () => {
    if (selectedFilter === 'All') return 100;
    const selectedItem = severityData.find(item => item.name === selectedFilter);
    const total = severityData.reduce((sum, item) => sum + item.value, 0);
    return selectedItem ? Math.round((selectedItem.value / total) * 100) : 0;
  };

  const currentData = getFilteredData();
  const totalValue = getTotalValue();
  const percentage = getSelectedPercentage();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>⚠️ Severity Level</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button severity-chart"
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
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={currentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
          >
            {currentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => [value, 'Incidents']} />
          <Legend />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="donut-center-text">
            <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold" fill="#2c3e50">{totalValue}</tspan>
            <tspan x="50%" dy="1.5em" fontSize="14" fill="#7f8c8d">{selectedFilter === 'All' ? 'Total Cases' : `${percentage}%`}</tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-stats">
        <div className="stats-grid">
          {severityData.map((item, index) => (
            <div key={index} className={`stat-item ${selectedFilter !== 'All' && selectedFilter !== item.name ? 'stat-dimmed' : ''}`}>
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

export default SeverityDonut;