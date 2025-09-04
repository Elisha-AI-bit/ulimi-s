import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { 
  MapPin, Wheat, ShoppingCart, TrendingUp, 
  Users, Package, DollarSign, BarChart3, CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { farms, crops, products, orders } = useApp();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'farmer':
        const userFarms = farms.filter(f => f.farmerId === user.id);
        const userCrops = crops.filter(c => userFarms && userFarms.some(f => f.id === c.farmId));
        const userProducts = products.filter(p => p.farmerId === user.id);
        const userRevenue = orders
          .filter(o => o.items && o.items.some(item => 
            userProducts && userProducts.some(p => p.id === item.productId)))
          .reduce((sum, order) => sum + order.total, 0);

        return [
          { name: 'My Farms', value: userFarms.length, icon: MapPin, color: 'emerald' },
          { name: 'Active Crops', value: userCrops.length, icon: Wheat, color: 'green' },
          { name: 'Products Listed', value: userProducts.length, icon: ShoppingCart, color: 'blue' },
          { name: 'Revenue (K)', value: userRevenue, icon: DollarSign, color: 'amber' }
        ];

      case 'customer':
        const customerOrders = orders.filter(o => o.customerId === user.id);
        const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);

        return [
          { name: 'Total Orders', value: customerOrders.length, icon: Package, color: 'blue' },
          { name: 'Total Spent (K)', value: totalSpent, icon: DollarSign, color: 'emerald' },
          { name: 'Available Products', value: products.filter(p => p.status === 'approved').length, icon: ShoppingCart, color: 'green' },
          { name: 'Favorite Farmers', value: 5, icon: Users, color: 'amber' }
        ];

      case 'admin':
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const approvedProducts = products.filter(p => p.status === 'approved').length;

        return [
          { name: 'Total Farms', value: farms.length, icon: MapPin, color: 'emerald' },
          { name: 'Total Users', value: 5, icon: Users, color: 'blue' },
          { name: 'Approved Products', value: approvedProducts, icon: CheckCircle, color: 'green' },
          { name: 'Platform Revenue (K)', value: totalRevenue, icon: TrendingUp, color: 'amber' }
        ];

      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-4 md:p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {getGreeting()}, {user?.name}!
        </h1>
        <p className="text-emerald-100 text-base md:text-lg">
          {user?.role === 'farmer' && 'Manage your farms and grow your business'}
          {user?.role === 'customer' && 'Discover fresh produce from local farmers'}
          {user?.role === 'admin' && 'Oversee the Ulimi farming platform'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            emerald: 'bg-emerald-500 text-white',
            green: 'bg-green-500 text-white',
            blue: 'bg-blue-500 text-white',
            amber: 'bg-amber-500 text-white'
          };

          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {user?.role === 'farmer' && (
            <>
              <button className="flex items-center space-x-3 p-3 md:p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                <MapPin className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                <span className="font-medium text-emerald-700 text-sm md:text-base">Add New Farm</span>
              </button>
              <button className="flex items-center space-x-3 p-3 md:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Wheat className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                <span className="font-medium text-green-700 text-sm md:text-base">Plant New Crop</span>
              </button>
              <button className="flex items-center space-x-3 p-3 md:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                <span className="font-medium text-blue-700 text-sm md:text-base">List Product</span>
              </button>
            </>
          )}
          
          {user?.role === 'customer' && (
            <>
              <button className="flex items-center space-x-3 p-3 md:p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                <span className="font-medium text-emerald-700 text-sm md:text-base">Browse Marketplace</span>
              </button>
              <button className="flex items-center space-x-3 p-3 md:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Package className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                <span className="font-medium text-blue-700 text-sm md:text-base">Track Orders</span>
              </button>
              <button className="flex items-center space-x-3 p-3 md:p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                <span className="font-medium text-amber-700 text-sm md:text-base">Price Trends</span>
              </button>
            </>
          )}
          
          {user?.role === 'admin' && (
            <>
              <button className="flex items-center space-x-3 p-3 md:p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                <span className="font-medium text-emerald-700 text-sm md:text-base">Manage Users</span>
              </button>
              <button className="flex items-center space-x-3 p-3 md:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                <span className="font-medium text-blue-700 text-sm md:text-base">Review Listings</span>
              </button>
              <button className="flex items-center space-x-3 p-3 md:p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                <span className="font-medium text-amber-700 text-sm md:text-base">View Analytics</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700 text-sm md:text-base">New tomato crop planted in Mwanza Family Farm</span>
            <span className="text-gray-500 text-xs ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700 text-sm md:text-base">Order #12345 shipped successfully</span>
            <span className="text-gray-500 text-xs ml-auto">5 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-gray-700 text-sm md:text-base">Weather alert: Heavy rains expected in Lusaka</span>
            <span className="text-gray-500 text-xs ml-auto">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;