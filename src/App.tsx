import './App.css'
import FraudTypeDonut from './components/FraudTypeDonut'
import SeverityDonut from './components/SeverityDonut'
import CallTreatmentDonut from './components/CallTreatmentDonut'
import FraudLocationMap from './components/FraudLocationMap'

function App() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🛡️ Fraud Detection Dashboard</h1>
      </header>
      
      <div className="dashboard-grid">
        <div className="chart-section">
          <FraudTypeDonut />
        </div>
        
        <div className="chart-section">
          <SeverityDonut />
        </div>
        
        <div className="chart-section">
          <CallTreatmentDonut />
        </div>
        
        <div className="chart-section full-width">
          <FraudLocationMap />
        </div>
      </div>
    </div>
  )
}

export default App
