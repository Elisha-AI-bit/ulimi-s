import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { TestTube, Droplets, Zap, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const Soil: React.FC = () => {
  const { user } = useAuth();
  const { farms } = useApp();
  const [selectedFarm, setSelectedFarm] = useState('');

  const userFarms = farms.filter(f => f.farmerId === user?.id);

  // Mock soil data for demonstration
  const soilData = {
    ph: 6.8,
    nitrogen: 45,
    phosphorus: 32,
    potassium: 28,
    organicMatter: 3.2,
    moisture: 65,
    temperature: 24,
    conductivity: 1.2
  };

  const getHealthStatus = (value: number, optimal: { min: number; max: number }) => {
    if (value >= optimal.min && value <= optimal.max) {
      return { status: 'optimal', color: 'text-green-600 bg-green-100', icon: CheckCircle };
    } else if (value < optimal.min * 0.8 || value > optimal.max * 1.2) {
      return { status: 'critical', color: 'text-red-600 bg-red-100', icon: AlertTriangle };
    } else {
      return { status: 'warning', color: 'text-yellow-600 bg-yellow-100', icon: AlertTriangle };
    }
  };

  const soilMetrics = [
    {
      name: 'pH Level',
      value: soilData.ph,
      unit: 'pH',
      optimal: { min: 6.0, max: 7.5 },
      icon: TestTube,
      description: 'Soil acidity/alkalinity level'
    },
    {
      name: 'Nitrogen (N)',
      value: soilData.nitrogen,
      unit: 'ppm',
      optimal: { min: 40, max: 60 },
      icon: Zap,
      description: 'Essential for leaf growth'
    },
    {
      name: 'Phosphorus (P)',
      value: soilData.phosphorus,
      unit: 'ppm',
      optimal: { min: 30, max: 50 },
      icon: TrendingUp,
      description: 'Important for root development'
    },
    {
      name: 'Potassium (K)',
      value: soilData.potassium,
      unit: 'ppm',
      optimal: { min: 25, max: 45 },
      icon: Zap,
      description: 'Helps with disease resistance'
    },
    {
      name: 'Organic Matter',
      value: soilData.organicMatter,
      unit: '%',
      optimal: { min: 3.0, max: 5.0 },
      icon: TestTube,
      description: 'Improves soil structure'
    },
    {
      name: 'Soil Moisture',
      value: soilData.moisture,
      unit: '%',
      optimal: { min: 50, max: 70 },
      icon: Droplets,
      description: 'Water content in soil'
    }
  ];

  if (user?.role !== 'farmer') {
    return (
      <div className="text-center py-12">
        <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
        <p className="text-gray-600">Soil insights are only available for farmers</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Soil Insights</h1>
        <p className="text-gray-600">Monitor and analyze your soil health</p>
      </div>

      {/* Farm Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Farm</label>
        <select
          value={selectedFarm}
          onChange={(e) => setSelectedFarm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">All Farms</option>
          {userFarms.map(farm => (
            <option key={farm.id} value={farm.id}>{farm.name}</option>
          ))}
        </select>
      </div>

      {/* Soil Health Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Soil Health Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {soilMetrics.map((metric) => {
            const health = getHealthStatus(metric.value, metric.optimal);
            const Icon = metric.icon;
            const StatusIcon = health.icon;
            
            return (
              <div key={metric.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-6 w-6 text-gray-600" />
                  <StatusIcon className={`h-5 w-5 ${health.color.split(' ')[0]}`} />
                </div>
                
                <h4 className="font-medium text-gray-900 mb-1">{metric.name}</h4>
                <p className="text-xs text-gray-500 mb-3">{metric.description}</p>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.unit}</div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Optimal: {metric.optimal.min}-{metric.optimal.max}</span>
                    <span className={`font-medium ${health.color}`}>
                      {health.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        health.status === 'optimal' ? 'bg-green-500' :
                        health.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.min(100, (metric.value / metric.optimal.max) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Soil Recommendations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Soil Improvement Recommendations</h3>
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <h4 className="font-medium text-emerald-800 mb-2">✅ Good Practices</h4>
            <ul className="text-emerald-700 text-sm space-y-1">
              <li>• pH levels are within optimal range for most crops</li>
              <li>• Soil moisture content is adequate</li>
              <li>• Organic matter levels support healthy plant growth</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">⚠️ Areas for Improvement</h4>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Consider adding phosphorus-rich fertilizer to boost levels</li>
              <li>• Potassium levels could be improved with organic compost</li>
              <li>• Monitor nitrogen levels during growing season</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">📋 Recommended Actions</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Apply balanced NPK fertilizer (10-20-10) before planting</li>
              <li>• Add organic compost to improve soil structure</li>
              <li>• Test soil again in 3 months to track improvements</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Soil Testing Schedule */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Soil Testing Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recommended Testing Frequency</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">pH Level</span>
                <span className="text-gray-600 text-sm">Every 6 months</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">NPK Levels</span>
                <span className="text-gray-600 text-sm">Before each season</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Organic Matter</span>
                <span className="text-gray-600 text-sm">Annually</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Next Scheduled Tests</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span className="text-emerald-700">Comprehensive Test</span>
                <span className="text-emerald-600 text-sm font-medium">Dec 15, 2024</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">pH Quick Test</span>
                <span className="text-blue-600 text-sm font-medium">Jan 30, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Soil Health Tips */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Soil Health Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="font-medium mb-2">🌱 Improve Soil Structure</h4>
            <p className="text-emerald-100 text-sm">
              Add organic matter like compost or well-rotted manure to improve soil structure and water retention.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="font-medium mb-2">🔄 Crop Rotation</h4>
            <p className="text-emerald-100 text-sm">
              Practice crop rotation to maintain soil fertility and reduce pest and disease pressure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Soil;