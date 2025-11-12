// Fraud Data Service for CSV parsing and chart data generation

export interface FraudRecord {
  date: string;
  time: string;
  fraudType: string;
  severity: string;
  recommendedCallTreatment: string;
  threatInfo: string;
  carrier: string;
  threatsbyIncomingNumber: string;
  location: string;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

// Sample fraud data based on the CSV structure
const fraudData: FraudRecord[] = [
  // This will be replaced with actual CSV parsing
  { date: '8/1/25', time: '10:00:00', fraudType: 'spoofed', severity: 'suspicious', recommendedCallTreatment: 'allowed', threatInfo: 'high risk score', carrier: 'Level 3', threatsbyIncomingNumber: '6508258215', location: 'Kenya' },
  { date: '8/2/25', time: '11:00:00', fraudType: 'robocall', severity: 'critical risk', recommendedCallTreatment: 'blocked', threatInfo: 'suspicious behavior', carrier: 'USA Mobility', threatsbyIncomingNumber: '7253456765', location: 'Iran' },
  { date: '8/3/25', time: '12:00:00', fraudType: 'fraud/scam risk', severity: 'significant risk', recommendedCallTreatment: 'blocked', threatInfo: 'high risk score', carrier: 'Onvoy', threatsbyIncomingNumber: '6777654321', location: 'Iraq' },
  { date: '8/4/25', time: '13:00:00', fraudType: 'spoofed', severity: 'suspicious', recommendedCallTreatment: 'allowed', threatInfo: 'suspicious behavior', carrier: 'Level 4', threatsbyIncomingNumber: '6508258215', location: 'China' },
  { date: '8/5/25', time: '14:00:00', fraudType: 'robocall', severity: 'critical risk', recommendedCallTreatment: 'blocked', threatInfo: 'high risk score', carrier: 'USA Mobility', threatsbyIncomingNumber: '7253456765', location: 'Vietnam' },
  { date: '8/6/25', time: '15:00:00', fraudType: 'fraud/scam risk', severity: 'significant risk', recommendedCallTreatment: 'blocked', threatInfo: 'suspicious behavior', carrier: 'Onvoy', threatsbyIncomingNumber: '6777654321', location: 'Russia' },
  { date: '8/7/25', time: '16:00:00', fraudType: 'spoofed', severity: 'suspicious', recommendedCallTreatment: 'allowed', threatInfo: 'high risk score', carrier: 'Level 5', threatsbyIncomingNumber: '6508258215', location: 'Poland' },
  { date: '8/8/25', time: '17:00:00', fraudType: 'robocall', severity: 'critical risk', recommendedCallTreatment: 'blocked', threatInfo: 'suspicious behavior', carrier: 'USA Mobility', threatsbyIncomingNumber: '6508258215', location: 'Cambodia' },
  { date: '8/9/25', time: '18:00:00', fraudType: 'fraud/scam risk', severity: 'significant risk', recommendedCallTreatment: 'blocked', threatInfo: 'high risk score', carrier: 'Onvoy', threatsbyIncomingNumber: '6508258215', location: 'Kenya' },
  { date: '8/10/25', time: '19:00:00', fraudType: 'spoofed', severity: 'suspicious', recommendedCallTreatment: 'allowed', threatInfo: 'suspicious behavior', carrier: 'Level 6', threatsbyIncomingNumber: '6508258215', location: 'Iran' },
  { date: '8/11/25', time: '20:00:00', fraudType: 'spoofed', severity: 'critical risk', recommendedCallTreatment: 'blocked', threatInfo: 'high risk score', carrier: 'USA Mobility', threatsbyIncomingNumber: '6508258215', location: 'Iraq' },
  { date: '8/12/25', time: '21:00:00', fraudType: 'spoofed', severity: 'significant risk', recommendedCallTreatment: 'blocked', threatInfo: 'suspicious behavior', carrier: 'Onvoy', threatsbyIncomingNumber: '6508258215', location: 'China' },
  { date: '8/13/25', time: '22:00:00', fraudType: 'spoofed', severity: 'suspicious', recommendedCallTreatment: 'allowed', threatInfo: 'high risk score', carrier: 'Level 7', threatsbyIncomingNumber: '7265432345', location: 'Vietnam' },
  { date: '8/14/25', time: '23:00:00', fraudType: 'spoofed', severity: 'critical risk', recommendedCallTreatment: 'blocked', threatInfo: 'suspicious behavior', carrier: 'USA Mobility', threatsbyIncomingNumber: '8765432456', location: 'Russia' },
  { date: '8/15/25', time: '0:00:00', fraudType: 'spoofed', severity: 'significant risk', recommendedCallTreatment: 'blocked', threatInfo: 'high risk score', carrier: 'Onvoy', threatsbyIncomingNumber: '6754324567', location: 'Poland' },
];

// Function to count occurrences and generate chart data
const generateChartData = (data: FraudRecord[], field: keyof FraudRecord, colors: string[]): ChartData[] => {
  const counts: Record<string, number> = {};
  
  data.forEach(record => {
    const value = record[field] as string;
    counts[value] = (counts[value] || 0) + 1;
  });
  
  return Object.entries(counts).map(([name, value], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: colors[index % colors.length]
  }));
};

// Get Fraud Type distribution
export const getFraudTypeData = (): ChartData[] => {
  const colors = ['#e74c3c', '#f39c12', '#27ae60', '#3498db'];
  return generateChartData(fraudData, 'fraudType', colors);
};

// Get Severity distribution  
export const getSeverityData = (): ChartData[] => {
  const colors = ['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff'];
  return generateChartData(fraudData, 'severity', colors);
};

// Get Recommended Call Treatment distribution
export const getCallTreatmentData = (): ChartData[] => {
  const colors = ['#2ed573', '#ff4757', '#5352ed', '#ffa502'];
  return generateChartData(fraudData, 'recommendedCallTreatment', colors);
};

// Get Location data for the map
export const getLocationData = (): Array<{name: string, count: number, color: string}> => {
  const counts: Record<string, number> = {};
  
  fraudData.forEach(record => {
    counts[record.location] = (counts[record.location] || 0) + 1;
  });
  
  const colors = ['#e74c3c', '#f39c12', '#27ae60', '#3498db', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
  
  return Object.entries(counts).map(([name, count], index) => ({
    name,
    count,
    color: colors[index % colors.length]
  }));
};

// Get carrier distribution
export const getCarrierData = (): ChartData[] => {
  const colors = ['#ff6348', '#ff9f43', '#10ac84', '#3742fa', '#5f27cd'];
  return generateChartData(fraudData, 'carrier', colors);
};

// Get time-based analysis
export const getTimeAnalysis = () => {
  const hourCounts: Record<string, number> = {};
  
  fraudData.forEach(record => {
    const hour = record.time.split(':')[0];
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  
  return Object.entries(hourCounts).map(([hour, count]) => ({
    hour: `${hour}:00`,
    count
  })).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
};