import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home, MapPin, Wheat, ShoppingCart, CloudRain, TestTube,
  Cpu, Bot, BarChart3, Users, Settings, User, CheckCircle,
  TrendingUp, MessageSquare, FileText, Smartphone, Newspaper,
  ShoppingBag, Package
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navItems = {
    farmer: [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'My Farms', path: '/farms', icon: MapPin },
      { name: 'Crops', path: '/crops', icon: Wheat },
      { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart },
      { name: 'Weather', path: '/weather', icon: CloudRain },
      { name: 'Soil Insights', path: '/soil', icon: TestTube },
      { name: 'IoT Dashboard', path: '/iot', icon: Cpu },
      { name: 'AI Tools', path: '/ai', icon: Bot },
      { name: 'Reports', path: '/reports', icon: BarChart3 },
      { name: 'Community', path: '/community', icon: Users },
    ],
    customer: [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart },
      { name: 'My Orders', path: '/orders', icon: Package },
      { name: 'Price Prediction', path: '/price-prediction', icon: TrendingUp },
      { name: 'Weather', path: '/weather', icon: CloudRain },
      { name: 'Community', path: '/community', icon: Users },
      { name: 'Reports', path: '/reports', icon: BarChart3 },
    ],
    admin: [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'Manage Users', path: '/users', icon: User },
      { name: 'Approve Listings', path: '/approvals', icon: CheckCircle },
      { name: 'Analytics', path: '/analytics', icon: BarChart3 },
      { name: 'Compare Farms', path: '/compare-farms', icon: TrendingUp },
      { name: 'Price Prediction', path: '/price-prediction', icon: TrendingUp },
      { name: 'Reports', path: '/reports', icon: FileText },
    ]
  };

  const commonItems = [
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'USSD', path: '/ussd', icon: Smartphone }
  ];

  const items = user ? [...navItems[user.role], ...commonItems] : [];

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg border-r border-gray-200 fixed left-0 top-16 z-30 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700 ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700 border-r-4 border-emerald-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;