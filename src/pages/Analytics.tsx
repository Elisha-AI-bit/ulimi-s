import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, MapPin, ShoppingCart, TrendingUp } from 'lucide-react';

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const { farms, crops, products, orders } = useApp();

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
        <p className="text-gray-600">Analytics are only available for administrators</p>
      </div>
    );
  }

  // Data for charts
  const cropTypeData = crops.reduce((acc, crop) => {
    const existing = acc.find(item => item.type === crop.type);
    if (existing) {
      existing.count += 1;
      existing.area += crop.area;
    } else {
      acc.push({ type: crop.type, count: 1, area: crop.area });
    }
    return acc;
  }, [] as { type: string; count: number; area: number }[]);

  const farmsByProvince = farms.reduce((acc, farm) => {
    const province = farm.location.split(',').pop()?.trim() || 'Unknown';
    acc[province] = (acc[province] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const provinceData = Object.entries(farmsByProvince).map(([province, count]) => ({
    province,
    count
  }));

  const productSalesData = products.map(product => ({
    name: product.name,
    revenue: orders.reduce((sum, order) => {
      const item = order.items.find(i => i.productId === product.id);
      return sum + (item ? item.total : 0);
    }, 0)
  })).filter(item => item.revenue > 0);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalFarms = farms.length;
  const totalCrops = crops.length;
  const approvedProducts = products.filter(p => p.status === 'approved').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-600">Comprehensive insights into the Ulimi platform</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Farms</p>
              <p className="text-3xl font-bold text-emerald-600">{totalFarms}</p>
            </div>
            <MapPin className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Crops</p>
              <p className="text-3xl font-bold text-green-600">{totalCrops}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Products Listed</p>
              <p className="text-3xl font-bold text-blue-600">{approvedProducts}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-amber-600">K {totalRevenue}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Types Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Types Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} ${name === 'count' ? 'crops' : 'hectares'}`,
                    name === 'count' ? 'Number of Crops' : 'Total Area'
                  ]}
                />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Farms by Province */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Farms by Province</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={provinceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ province, count }) => `${province}: ${count}`}
                >
                  {provinceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Sales Revenue</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`K ${value}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">98%</div>
            <p className="text-gray-600">Farmer Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">24h</div>
            <p className="text-gray-600">Avg. Response Time</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">85%</div>
            <p className="text-gray-600">Order Completion Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">156</div>
            <p className="text-gray-600">Active Users</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Platform Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">New farmer registration: Mary Banda (Copperbelt)</span>
            <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Product approved: Fresh Roma Tomatoes</span>
            <span className="text-gray-500 text-sm ml-auto">4 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-gray-700">Order completed: K 600 from Lusaka</span>
            <span className="text-gray-500 text-sm ml-auto">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;