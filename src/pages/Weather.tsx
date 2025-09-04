import React, { useState } from 'react';
import { CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';
import { demoWeatherData } from '../data/demoData';

const Weather: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState('Lusaka');

  const provinces = [
    'Lusaka', 'Copperbelt', 'Eastern', 'Southern', 
    'Western', 'Northern', 'Northwestern', 'Central', 'Muchinga'
  ];

  const currentWeather = demoWeatherData.find(w => w.province === selectedProvince) || demoWeatherData[0];

  const getForecastIcon = (forecast: string) => {
    if (forecast.includes('rain') || forecast.includes('storm')) return '🌧️';
    if (forecast.includes('cloud')) return '⛅';
    if (forecast.includes('sunny') || forecast.includes('hot')) return '☀️';
    return '🌤️';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Weather Forecast</h1>
        <p className="text-gray-600">Stay updated with weather conditions across Zambia</p>
      </div>

      {/* Province Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Province</label>
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {provinces.map(province => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>
      </div>

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">{currentWeather.province} Province</h2>
            <p className="text-blue-100 text-lg">{currentWeather.forecast}</p>
          </div>
          <div className="text-6xl">
            {getForecastIcon(currentWeather.forecast)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Thermometer className="h-6 w-6 text-blue-100" />
              <div>
                <p className="text-blue-100 text-sm">Temperature</p>
                <p className="text-2xl font-bold">{currentWeather.temperature}°C</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Droplets className="h-6 w-6 text-blue-100" />
              <div>
                <p className="text-blue-100 text-sm">Humidity</p>
                <p className="text-2xl font-bold">{currentWeather.humidity}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CloudRain className="h-6 w-6 text-blue-100" />
              <div>
                <p className="text-blue-100 text-sm">Rainfall</p>
                <p className="text-2xl font-bold">{currentWeather.rainfall}mm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather for All Provinces */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Provinces Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoWeatherData.map((weather) => (
            <div key={weather.province} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{weather.province}</h4>
                <span className="text-2xl">{weather.icon}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Temperature: {weather.temperature}°C</p>
                <p className="text-sm text-gray-600">Humidity: {weather.humidity}%</p>
                <p className="text-sm text-gray-600">Rainfall: {weather.rainfall}mm</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farming Tips */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather-Based Farming Tips</h3>
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <h4 className="font-medium text-emerald-800 mb-2">🌱 Planting Recommendation</h4>
            <p className="text-emerald-700">
              {currentWeather.rainfall > 20 
                ? 'High rainfall expected - delay planting until conditions improve'
                : currentWeather.rainfall > 10
                ? 'Good conditions for planting water-sensitive crops'
                : 'Consider irrigation for new plantings due to low rainfall'
              }
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">💧 Irrigation Advice</h4>
            <p className="text-blue-700">
              {currentWeather.humidity < 60
                ? 'Low humidity - increase irrigation frequency'
                : 'Normal humidity levels - maintain regular watering schedule'
              }
            </p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">🌡️ Temperature Alert</h4>
            <p className="text-amber-700">
              {currentWeather.temperature > 30
                ? 'High temperatures - provide shade for sensitive crops'
                : currentWeather.temperature < 20
                ? 'Cool temperatures - protect young plants from cold'
                : 'Optimal temperature range for most crops'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;