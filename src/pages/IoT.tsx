import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { ExternalLink, Droplets, TestTube, Database, Thermometer, Wifi, WifiOff } from 'lucide-react';

const IoT: React.FC = () => {
  const { user } = useAuth();
  const { farms, iotSensors } = useApp();

  const userFarms = farms.filter(f => f.farmerId === user?.id);

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'soil_moisture': return Droplets;
      case 'ph_level': return TestTube;
      case 'water_tank': return Database;
      case 'temperature': return Thermometer;
      default: return Wifi;
    }
  };

  const getSensorColor = (value: number, type: string) => {
    if (type === 'soil_moisture') {
      if (value < 40) return 'text-red-600 bg-red-100';
      if (value < 60) return 'text-yellow-600 bg-yellow-100';
      return 'text-green-600 bg-green-100';
    }
    if (type === 'ph_level') {
      if (value < 6.0 || value > 7.5) return 'text-red-600 bg-red-100';
      if (value < 6.5 || value > 7.0) return 'text-yellow-600 bg-yellow-100';
      return 'text-green-600 bg-green-100';
    }
    if (type === 'water_tank') {
      if (value < 20) return 'text-red-600 bg-red-100';
      if (value < 50) return 'text-yellow-600 bg-yellow-100';
      return 'text-green-600 bg-green-100';
    }
    return 'text-blue-600 bg-blue-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IoT Dashboard</h1>
          <p className="text-gray-600">Monitor your farm sensors in real-time</p>
        </div>
        <a
          href="https://ulimi-iot.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>External IoT Platform</span>
        </a>
      </div>

      {/* Farm Sensor Overview */}
      {userFarms.map((farm) => {
        const farmSensors = iotSensors.filter(s => s.farmId === farm.id);
        
        return (
          <div key={farm.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{farm.name}</h3>
            
            {farmSensors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {farmSensors.map((sensor) => {
                  const Icon = getSensorIcon(sensor.type);
                  const colorClasses = getSensorColor(sensor.value, sensor.type);
                  
                  return (
                    <div key={sensor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="h-6 w-6 text-gray-600" />
                        <div className={`flex items-center space-x-1 ${sensor.status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                          {sensor.status === 'online' ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                          <span className="text-xs">{sensor.status}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-2">{sensor.name}</h4>
                      
                      <div className={`text-center p-3 rounded-lg ${colorClasses}`}>
                        <div className="text-2xl font-bold">{sensor.value}</div>
                        <div className="text-sm">{sensor.unit}</div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Last update: {new Date(sensor.lastUpdate).toLocaleTimeString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 border border-gray-200 rounded-lg">
                <Wifi className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-medium text-gray-900 mb-2">No sensors connected</h4>
                <p className="text-gray-600">Connect IoT sensors to monitor this farm</p>
              </div>
            )}
          </div>
        );
      })}

      {userFarms.length === 0 && (
        <div className="text-center py-12">
          <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No farms available</h3>
          <p className="text-gray-600">Add a farm first to start monitoring IoT sensors</p>
        </div>
      )}

      {/* IoT Integration Info */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <h3 className="font-semibold text-emerald-800 mb-2">IoT Integration</h3>
        <p className="text-emerald-700 mb-4">
          Connect your farm sensors to monitor soil moisture, pH levels, water tanks, and environmental conditions in real-time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-emerald-800 mb-2">Supported Sensors:</h4>
            <ul className="text-emerald-700 text-sm space-y-1">
              <li>• Soil moisture sensors</li>
              <li>• pH level monitors</li>
              <li>• Water tank level sensors</li>
              <li>• Temperature & humidity sensors</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-emerald-800 mb-2">Benefits:</h4>
            <ul className="text-emerald-700 text-sm space-y-1">
              <li>• Real-time monitoring</li>
              <li>• Automated alerts</li>
              <li>• Data-driven decisions</li>
              <li>• Improved crop yields</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoT;