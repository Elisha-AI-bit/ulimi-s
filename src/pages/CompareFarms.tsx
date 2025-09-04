import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MapPin, Wheat, TrendingUp, Users } from 'lucide-react';

const CompareFarms: React.FC = () => {
  const { user } = useAuth();
  const { farms, crops, products } = useApp();
  const [selectedFarms, setSelectedFarms] = useState<string[]>([]);

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
        <p className="text-gray-600">Farm comparison is only available for administrators</p>
      </div>
    );
  }

  const handleFarmSelection = (farmId: string) => {
    setSelectedFarms(prev => 
      prev.includes(farmId) 
        ? prev.filter(id => id !== farmId)
        : [...prev, farmId]
    );
  };

  const getComparisonData = () => {
    return selectedFarms.map(farmId => {
      const farm = farms.find(f => f.id === farmId);
      const farmCrops = crops.filter(c => c.farmId === farmId);
      const farmProducts = products.filter(p => p.farmId === farmId);
      
      return {
        name: farm?.name || 'Unknown',
        size: farm?.size || 0,
        crops: farmCrops.length,
        products: farmProducts.length,
        totalArea: farmCrops.reduce((sum, crop) => sum + crop.area, 0)
      };
    });
  };

  const comparisonData = getComparisonData();
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compare Farms</h1>
        <p className="text-gray-600">Analyze and compare farm performance across the platform</p>
      </div>

      {/* Farm Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Farms to Compare</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {farms.map(farm => (
            <div
              key={farm.id}
              onClick={() => handleFarmSelection(farm.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedFarms.includes(farm.id)
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-medium text-gray-900">{farm.name}</h4>
              <p className="text-sm text-gray-600">{farm.location}</p>
              <p className="text-sm text-gray-500">{farm.size} hectares</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Charts */}
      {selectedFarms.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Farm Size Comparison */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Size Comparison</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value} hectares`, 'Farm Size']} />
                    <Bar dataKey="size" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Crop Count Comparison */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Number of Crops</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value} crops`, 'Active Crops']} />
                    <Bar dataKey="crops" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Farm Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size (hectares)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Active Crops
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products Listed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cultivated Area
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Efficiency
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisonData.map((farm, index) => (
                    <tr key={farm.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {farm.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farm.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farm.crops}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farm.products}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farm.totalArea.toFixed(1)} ha
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {((farm.totalArea / farm.size) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {selectedFarms.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select farms to compare</h3>
          <p className="text-gray-600">Choose at least one farm from the list above to start comparing</p>
        </div>
      )}
    </div>
  );
};

export default CompareFarms;