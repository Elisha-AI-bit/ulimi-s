import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, Users, TrendingUp, Shield, Smartphone, 
  Cloud, Bot, BarChart3, ArrowRight, CheckCircle,
  MapPin, Wheat, ShoppingCart
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Farm Management',
      description: 'Manage multiple farms, track crops, and monitor growth cycles with ease.'
    },
    {
      icon: ShoppingCart,
      title: 'Digital Marketplace',
      description: 'Connect farmers directly with customers for fresh, local produce sales.'
    },
    {
      icon: Cloud,
      title: 'Weather Insights',
      description: 'Get accurate weather forecasts and farming recommendations for your region.'
    },
    {
      icon: Bot,
      title: 'AI-Powered Tools',
      description: 'Use AI for crop disease detection, pest identification, and farming advice.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Track performance, generate reports, and make data-driven farming decisions.'
    },
    {
      icon: Smartphone,
      title: 'USSD Access',
      description: 'Access key features from any mobile phone, no internet required.'
    }
  ];

  const benefits = [
    'Increase crop yields by up to 30%',
    'Reduce farming costs through better planning',
    'Access to wider markets and better prices',
    'Real-time weather and market information',
    'Connect with farming community',
    'AI-powered farming recommendations'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-emerald-600">Ulimi</h1>
            </div>
            <Link
              to="/login"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Smart Farming for
                <span className="text-emerald-600"> Zambia</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Empowering farmers with technology to increase yields, reduce costs, and connect with markets. 
                Join the digital farming revolution in Zambia.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-colors text-lg font-medium"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button className="flex items-center justify-center space-x-2 border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-colors text-lg font-medium">
                  <span>Learn More</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Zambian farmer in field"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">30% Yield Increase</p>
                    <p className="text-sm text-gray-600">Average improvement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Farming
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From farm management to AI-powered insights, Ulimi provides comprehensive tools 
              to help Zambian farmers succeed in the digital age.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Ulimi?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of Zambian farmers who are already using Ulimi to transform 
                their farming operations and increase their income.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1"
                alt="Farmer with crops"
                className="rounded-lg shadow-md"
              />
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1"
                alt="Fresh vegetables"
                className="rounded-lg shadow-md mt-8"
              />
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1"
                alt="Mobile farming"
                className="rounded-lg shadow-md -mt-8"
              />
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1"
                alt="Market produce"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-emerald-100">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-emerald-100">Farms Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-emerald-100">Tons Produced</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">K2M+</div>
              <div className="text-emerald-100">Revenue Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the Ulimi community today and start your journey towards smarter, 
            more profitable farming in Zambia.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-colors text-lg font-medium"
          >
            <span>Start Your Free Account</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-emerald-400" />
                <h3 className="text-xl font-bold">Ulimi</h3>
              </div>
              <p className="text-gray-400">
                Empowering Zambian farmers with smart technology for better yields and sustainable farming.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Farm Management</li>
                <li>Marketplace</li>
                <li>Weather Insights</li>
                <li>AI Tools</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Community Forum</li>
                <li>Contact Us</li>
                <li>USSD: *123#</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ulimi. All rights reserved. Made with ❤️ for Zambian farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;