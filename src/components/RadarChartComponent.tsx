import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './ChartComponents.css';

const performanceData = [
  { skill: 'Marketing', company: 85, competitor: 70, industry: 75 },
  { skill: 'Sales', company: 90, competitor: 80, industry: 78 },
  { skill: 'Support', company: 95, competitor: 85, industry: 82 },
  { skill: 'Product', company: 88, competitor: 75, industry: 80 },
  { skill: 'Technology', company: 92, competitor: 88, industry: 85 },
  { skill: 'Innovation', company: 87, competitor: 65, industry: 72 },
];

const satisfactionData = [
  { metric: 'Quality', current: 90, target: 95, benchmark: 85 },
  { metric: 'Speed', current: 85, target: 90, benchmark: 80 },
  { metric: 'Price', current: 78, target: 85, benchmark: 82 },
  { metric: 'Support', current: 92, target: 95, benchmark: 88 },
  { metric: 'Features', current: 88, target: 90, benchmark: 85 },
  { metric: 'Usability', current: 94, target: 95, benchmark: 90 },
];

const skillsData = [
  { area: 'Leadership', team1: 85, team2: 78, team3: 82 },
  { area: 'Communication', team1: 90, team2: 85, team3: 88 },
  { area: 'Technical', team1: 88, team2: 92, team3: 85 },
  { area: 'Problem Solving', team1: 92, team2: 88, team3: 90 },
  { area: 'Creativity', team1: 87, team2: 83, team3: 89 },
  { area: 'Teamwork', team1: 94, team2: 90, team3: 92 },
];

const RadarChartComponent: React.FC = () => {
  const [selectedView, setSelectedView] = useState('Performance Analysis');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getCurrentData = () => {
    switch (selectedView) {
      case 'Performance Analysis':
        return { data: performanceData, radars: ['company', 'competitor', 'industry'] };
      case 'Customer Satisfaction':
        return { data: satisfactionData, radars: ['current', 'target', 'benchmark'] };
      case 'Team Skills':
        return { data: skillsData, radars: ['team1', 'team2', 'team3'] };
      default:
        return { data: performanceData, radars: ['company', 'competitor', 'industry'] };
    }
  };

  const viewOptions = ['Performance Analysis', 'Customer Satisfaction', 'Team Skills'];

  const getRadarColor = (radarName: string) => {
    const colors = {
      company: '#e74c3c',
      competitor: '#3498db',
      industry: '#f39c12',
      current: '#27ae60',
      target: '#e74c3c',
      benchmark: '#95a5a6',
      team1: '#9b59b6',
      team2: '#1abc9c',
      team3: '#e67e22',
    };
    return colors[radarName as keyof typeof colors] || '#8884d8';
  };

  const currentConfig = getCurrentData();

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Multi-Dimensional Analysis</h3>
        <div className="dropdown-container">
          <button
            className="dropdown-button radar-chart"
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
        <RadarChart data={currentConfig.data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey={selectedView === 'Performance Analysis' ? 'skill' : selectedView === 'Customer Satisfaction' ? 'metric' : 'area'} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Tooltip />
          <Legend />
          {currentConfig.radars.map((radarKey, index) => (
            <Radar 
              key={radarKey}
              name={radarKey.charAt(0).toUpperCase() + radarKey.slice(1)}
              dataKey={radarKey} 
              stroke={getRadarColor(radarKey)}
              fill={getRadarColor(radarKey)}
              fillOpacity={0.1 + index * 0.1}
              strokeWidth={2}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;