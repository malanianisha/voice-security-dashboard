import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './ChartComponents.css';

const marketShareData = [
  { name: 'Our Product', value: 35, color: '#e74c3c' },
  { name: 'Competitor A', value: 25, color: '#3498db' },
  { name: 'Competitor B', value: 20, color: '#f39c12' },
  { name: 'Others', value: 20, color: '#95a5a6' },
];

const budgetData = [
  { name: 'Development', value: 40, color: '#27ae60' },
  { name: 'Marketing', value: 25, color: '#e74c3c' },
  { name: 'Operations', value: 20, color: '#3498db' },
  { name: 'Support', value: 15, color: '#f39c12' },
];

const statusData = [
  { name: 'Completed', value: 65, color: '#27ae60' },
  { name: 'In Progress', value: 25, color: '#f39c12' },
  { name: 'Pending', value: 10, color: '#e74c3c' },
];


const DonutChartComponent: React.FC = () => {
  const [selectedView, setSelectedView] = useState('Market Share');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCurrentData = () => {
    switch (selectedView) {
      case 'Market Share':
        return { 
          data: marketShareData, 
          centerValue: marketShareData[0].value,
          centerLabel: 'Market Share'
        };
      case 'Budget Allocation':
        return { 
          data: budgetData, 
          centerValue: budgetData[0].value,
          centerLabel: 'Development'
        };
      case 'Project Status':
        return { 
          data: statusData, 
          centerValue: statusData[0].value,
          centerLabel: 'Completed'
        };
      default:
        return { 
          data: marketShareData, 
          centerValue: marketShareData[0].value,
          centerLabel: 'Market Share'
        };
    }
  };

  const viewOptions = ['Market Share', 'Budget Allocation', 'Project Status'];
  const currentConfig = getCurrentData();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Distribution Overview</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button donut-chart"
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
          <Tooltip formatter={(value: any) => [`${value}%`, 'Percentage']} />
          <Legend />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="donut-center-text">
            <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold" fill="#2c3e50">{currentConfig.centerValue}%</tspan>
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
                <div className="stat-value">{item.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChartComponent;