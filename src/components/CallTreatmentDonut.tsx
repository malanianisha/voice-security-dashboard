import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './ChartComponents.css';

// Parse the CSV data for call treatment
const callTreatmentData = [
  { name: 'Allowed', value: 27, color: '#27ae60' },
  { name: 'Blocked', value: 23, color: '#e74c3c' }
];

const CallTreatmentDonut: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterOptions = ['All', 'Allowed', 'Blocked'];

  const getFilteredData = () => {
    if (selectedFilter === 'All') {
      return callTreatmentData;
    }
    
    // When a specific treatment is selected, highlight it
    return callTreatmentData.map(item => ({
      ...item,
      value: item.name === selectedFilter ? item.value : 0,
      color: item.name === selectedFilter ? item.color : '#e0e0e0'
    }));
  };

  const getTotalValue = () => {
    if (selectedFilter === 'All') {
      return callTreatmentData.reduce((sum, item) => sum + item.value, 0);
    }
    const selectedItem = callTreatmentData.find(item => item.name === selectedFilter);
    return selectedItem ? selectedItem.value : 0;
  };

  const getSelectedPercentage = () => {
    if (selectedFilter === 'All') return 100;
    const selectedItem = callTreatmentData.find(item => item.name === selectedFilter);
    const total = callTreatmentData.reduce((sum, item) => sum + item.value, 0);
    return selectedItem ? Math.round((selectedItem.value / total) * 100) : 0;
  };

  const currentData = getFilteredData();
  const totalValue = getTotalValue();
  const percentage = getSelectedPercentage();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>📞 Call Treatment</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button treatment-chart"
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
          <Tooltip formatter={(value: any) => [value, 'Calls']} />
          <Legend />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="donut-center-text">
            <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold" fill="#2c3e50">{totalValue}</tspan>
            <tspan x="50%" dy="1.5em" fontSize="14" fill="#7f8c8d">{selectedFilter === 'All' ? 'Total Calls' : `${percentage}%`}</tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-stats">
        <div className="stats-grid">
          {callTreatmentData.map((item, index) => (
            <div key={index} className={`stat-item ${selectedFilter !== 'All' && selectedFilter !== item.name ? 'stat-dimmed' : ''}`}>
              <div className="stat-indicator" style={{ backgroundColor: item.color }}></div>
              <div className="stat-info">
                <div className="stat-name">{item.name}</div>
                <div className="stat-value">{item.value} calls</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallTreatmentDonut;