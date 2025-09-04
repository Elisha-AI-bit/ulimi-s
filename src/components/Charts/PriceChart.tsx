import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: {
    date: string;
    price?: number;
    predictedPrice?: number;
  }[];
  title: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
              strokeWidth={2}
              name="Historical Price"
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="predictedPrice" 
              stroke="#3b82f6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted Price"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;