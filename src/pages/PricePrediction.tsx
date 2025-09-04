import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { demoPriceData } from '../data/demoData';

const PricePrediction: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('Maize');

  const currentData = demoPriceData.find(data => data.crop === selectedCrop) || demoPriceData[0];
  
  // Combine historical and predicted data for chart
  const chartData = [
    ...currentData.prices.map(p => ({ 
      ...p, 
      type: 'historical',
      predictedPrice: null 
    })),
    ...currentData.prediction.map(p => ({ 
      date: p.date, 
      price: null, 
      predictedPrice: p.predictedPrice, 
      type: 'predicted' 
    }))
  ];

  const currentPrice = currentData.prices[currentData.prices.length - 1]?.price || 0;
  const predictedPrice = currentData.prediction[0]?.predictedPrice || 0;
  const priceChange = predictedPrice - currentPrice;
  const priceChangePercent = ((priceChange / currentPrice) * 100).toFixed(1);

  const getTrendIcon = () => {
    if (priceChange > 0) return <TrendingUp className="h-5 w-5 text-green-600" />;
    if (priceChange < 0) return <TrendingDown className="h-5 w-5 text-red-600" />;
    return <Minus className="h-5 w-5 text-gray-600" />;
  };

  const getTrendColor = () => {
    if (priceChange > 0) return 'text-green-600';
    if (priceChange < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Price Prediction</h1>
        <p className="text-gray-600">Analyze market trends and predict future crop prices</p>
      </div>

      {/* Crop Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Crop</label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {demoPriceData.map(data => (
            <option key={data.crop} value={data.crop}>{data.crop}</option>
          ))}
        </select>
      </div>

      {/* Price Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Price</h3>
          <div className="text-3xl font-bold text-emerald-600">K {currentPrice.toFixed(2)}</div>
          <p className="text-sm text-gray-600">per kg</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Predicted Price</h3>
          <div className="text-3xl font-bold text-blue-600">K {predictedPrice.toFixed(2)}</div>
          <p className="text-sm text-gray-600">next month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Change</h3>
          <div className={`flex items-center space-x-2 text-2xl font-bold ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{priceChangePercent}%</span>
          </div>
          <p className="text-sm text-gray-600">vs current price</p>
        </div>
      </div>

      {/* Price Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Trend Analysis</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis 
                label={{ value: 'Price (K)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [
                  value ? `K ${value.toFixed(2)}` : 'N/A',
                  name === 'price' ? 'Historical Price' : 'Predicted Price'
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Historical Price"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="predictedPrice" 
                stroke="#3b82f6" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Predicted Price"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-medium text-emerald-800 mb-2">Best Selling Time</h4>
              <p className="text-emerald-700">
                Based on historical data, {selectedCrop.toLowerCase()} prices peak in December-January.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Market Demand</h4>
              <p className="text-blue-700">
                High demand expected due to seasonal consumption patterns.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-800 mb-2">Supply Factors</h4>
              <p className="text-amber-700">
                Weather conditions and harvest timing may impact supply levels.
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-2">Regional Trends</h4>
              <p className="text-purple-700">
                Prices vary by region - Lusaka markets showing strongest demand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePrediction;