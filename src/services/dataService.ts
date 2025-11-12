// Data service to handle Google Sheets integration
// Replace these functions with your actual Google Sheets API calls

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  name: string;
  users?: number;
  sessions?: number;
  pageViews?: number;
  revenue?: number;
  orders?: number;
}

export interface LocationData {
  name: string;
  lat: number;
  lng: number;
  value: number;
  color: string;
}

// Sample data - replace with Google Sheets API calls
export const fetchPieChartData = async (dataType: string): Promise<ChartData[]> => {
  // TODO: Replace with Google Sheets API call
  // Example: const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${dataType}!A:C?key=${API_KEY}`);
  
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  const data: Record<string, ChartData[]> = {
    'Device Types': [
      { name: 'Desktop', value: 1245, color: '#ff6b6b' },
      { name: 'Mobile', value: 890, color: '#4ecdc4' },
      { name: 'Tablet', value: 456, color: '#45b7d1' },
      { name: 'Other', value: 123, color: '#96ceb4' },
    ],
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
  
  return data[dataType] || data['Device Types'];
};

export const fetchTimeSeriesData = async (dataType: string): Promise<TimeSeriesData[]> => {
  // TODO: Replace with Google Sheets API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const data: Record<string, TimeSeriesData[]> = {
    'Monthly Traffic': [
      { name: 'Jan', users: 4000, sessions: 2400, pageViews: 8900 },
      { name: 'Feb', users: 3000, sessions: 1398, pageViews: 6700 },
      { name: 'Mar', users: 2000, sessions: 9800, pageViews: 12400 },
      { name: 'Apr', users: 2780, sessions: 3908, pageViews: 9800 },
      { name: 'May', users: 1890, sessions: 4800, pageViews: 11200 },
      { name: 'Jun', users: 2390, sessions: 3800, pageViews: 8900 },
    ],
    'Weekly Traffic': [
      { name: 'Mon', users: 800, sessions: 600, pageViews: 1200 },
      { name: 'Tue', users: 950, sessions: 750, pageViews: 1450 },
      { name: 'Wed', users: 1100, sessions: 890, pageViews: 1680 },
      { name: 'Thu', users: 1200, sessions: 950, pageViews: 1890 },
      { name: 'Fri', users: 1350, sessions: 1100, pageViews: 2100 },
      { name: 'Sat', users: 900, sessions: 700, pageViews: 1300 },
      { name: 'Sun', users: 750, sessions: 580, pageViews: 1100 },
    ],
    'Category Performance': [
      { name: 'Electronics', revenue: 12000, orders: 340 },
      { name: 'Clothing', revenue: 8900, orders: 280 },
      { name: 'Books', revenue: 4500, orders: 180 },
      { name: 'Home & Garden', revenue: 7800, orders: 220 },
      { name: 'Sports', revenue: 6200, orders: 160 },
    ],
  };
  
  return data[dataType] || data['Monthly Traffic'];
};

export const fetchLocationData = async (dataType: string): Promise<LocationData[]> => {
  // TODO: Replace with Google Sheets API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const data: Record<string, LocationData[]> = {
    'User Locations': [
      { name: 'New York', lat: 40.7128, lng: -74.0060, value: 1250, color: '#ff6b6b' },
      { name: 'London', lat: 51.5074, lng: -0.1278, value: 890, color: '#4ecdc4' },
      { name: 'Tokyo', lat: 35.6762, lng: 139.6503, value: 1456, color: '#45b7d1' },
      { name: 'Sydney', lat: -33.8688, lng: 151.2093, value: 567, color: '#96ceb4' },
      { name: 'Paris', lat: 48.8566, lng: 2.3522, value: 723, color: '#f9ca24' },
    ],
    'Sales by Region': [
      { name: 'California', lat: 36.7783, lng: -119.4179, value: 2340, color: '#ee5a24' },
      { name: 'Texas', lat: 31.9686, lng: -99.9018, value: 1890, color: '#0abde3' },
      { name: 'Florida', lat: 27.7663, lng: -82.6404, value: 1456, color: '#10ac84' },
      { name: 'New York', lat: 42.1657, lng: -74.9481, value: 1234, color: '#feca57' },
      { name: 'Illinois', lat: 40.3363, lng: -89.0022, value: 987, color: '#ff9ff3' },
    ],
    'Office Locations': [
      { name: 'HQ - San Francisco', lat: 37.7749, lng: -122.4194, value: 450, color: '#5f27cd' },
      { name: 'Europe Office - Berlin', lat: 52.5200, lng: 13.4050, value: 320, color: '#00d2d3' },
      { name: 'Asia Office - Singapore', lat: 1.3521, lng: 103.8198, value: 280, color: '#ff9f43' },
      { name: 'LATAM Office - São Paulo', lat: -23.5505, lng: -46.6333, value: 150, color: '#a4b0be' },
    ],
  };
  
  return data[dataType] || data['User Locations'];
};

// Google Sheets integration helper (for future implementation)
export const setupGoogleSheetsAPI = {
  // Instructions for connecting to Google Sheets:
  // 1. Go to Google Cloud Console
  // 2. Create a new project or select existing
  // 3. Enable Google Sheets API
  // 4. Create credentials (API key for public sheets or OAuth for private)
  // 5. Replace the fetch functions above with actual API calls
  
  SHEET_ID: 'YOUR_GOOGLE_SHEET_ID_HERE',
  API_KEY: 'YOUR_API_KEY_HERE',
  
  // Example Google Sheets API URL format:
  // https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{RANGE}?key={API_KEY}
};