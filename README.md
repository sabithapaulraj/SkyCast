# SkyCast - Find My Weather
## Date: 23-07-2025
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
### Home.jsx:
```
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (city.trim() === '') {
      setError('Please enter a city name')
      return
    }
    setError('')
    navigate('/weather', { state: { city: city.trim() } })
  }, [city, navigate])

  return (
    <div className="home">
      <h1>SkyCast - Find My Weather</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="input"
          />
          <button type="submit" className="button">
            Get Weather
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
export default Home

```
### Weather.jsx:
```
import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const city = location.state?.city

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  const temperatureData = useMemo(() => {
    if (!weatherData) return null
    
    const celsius = Math.round(weatherData.main.temp - 273.15)
    const fahrenheit = Math.round((celsius * 9/5) + 32)
    
    return { celsius, fahrenheit }
  }, [weatherData])

  useEffect(() => {
    if (!city) {
      navigate('/')
      return
    }

    const fetchWeather = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        )
        setWeatherData(response.data)
        setError('')
      } catch {
        setError('City not found. Please try again.')
        setWeatherData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city, navigate, API_KEY])

  if (loading) {
    return (
      <div className="weather">
        <p className="loading">Loading weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather">
        <h2>Error</h2>
        <p className="error">{error}</p>
        <button onClick={() => navigate('/')} className="button">
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="weather">
      <h1>Weather in {weatherData.name}</h1>
      <div className="weather-card">
        <h2>{weatherData.weather[0].description}</h2>
        <div className="temperature">
          <p className="temp">{temperatureData.celsius}°C</p>
          <p className="temp">{temperatureData.fahrenheit}°F</p>
        </div>
        <div className="details">
          <div className="detail">
            <span className="label">Humidity:</span>
            <span className="value">{weatherData.main.humidity}%</span>
          </div>
          <div className="detail">
            <span className="label">Wind Speed:</span>
            <span className="value">{weatherData.wind.speed} m/s</span>
          </div>
          <div className="detail">
            <span className="label">Condition:</span>
            <span className="value">{weatherData.weather[0].main}</span>
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/')} className="button">
        Search Another City
      </button>
    </div>
  )
}

export default Weather

```
### App.jsx:
```
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

```
### App.css:
```
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.app {
  padding-bottom: 80px;
}

.home {
  margin: 0 auto;
  padding: 20px;
}

.home h1 {
  color: black;
}

.input {
  padding: 10px;
  border: 1px solid gray;
  width: 200px;
}

.button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
}

.error {
  color: red;
}

.weather {
  margin: 0 auto;
  padding: 20px;
}

.weather h1 {
  color: black;
}

.weather-card {
  background-color: lightgray;
  padding: 20px;
}

.weather-card h2 {
  color: black;
}

.temp {
  font-size: 24px;
  color: black;
}

.detail {
  padding: 8px;
  background-color: white;
}

.label {
  font-weight: bold;
}

.footer {
  background-color: gray;  
  color: white;
  text-align: center;
  padding: 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

```
## Output:
<img width="1915" height="1028" alt="image" src="https://github.com/user-attachments/assets/a4a74238-2ba7-4669-a4db-7450f4f7c7f0" />

<img width="1918" height="1034" alt="image" src="https://github.com/user-attachments/assets/6d422d25-d429-4202-8c60-587da0f619bd" />

## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
