import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Weather from './components/Weather'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
        <footer className="footer">
          <p>By Sabitha</p>
          <p>Reg No: 212222040137</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
