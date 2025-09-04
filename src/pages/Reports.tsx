import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Download, FileText, BarChart3, Calendar, MapPin, TrendingUp, Users, ShoppingCart, Package } from 'lucide-react';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { demoUsers } from '../data/demoData';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const { farms, crops, products, orders, users: appUsers } = useApp();
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState('last30');

  const allUsers = [...demoUsers, ...appUsers];

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(20);
    doc.text('Ulimi Platform Report', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });
    doc.text(`Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`, pageWidth / 2, 40, { align: 'center' });
    
    let yPosition = 60;
    
    if (user?.role === 'farmer') {
      const userFarms = farms.filter(f => f.farmerId === user.id);
      const userCrops = crops.filter(c => userFarms && userFarms.some(f => f.id === c.farmId));
      const userProducts = products.filter(p => p.farmerId === user.id);
      
      doc.setFontSize(16);
      doc.text('Farm Summary', 20, yPosition);
      yPosition += 20;
      
      doc.setFontSize(12);
      doc.text(`Total Farms: ${userFarms.length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Total Crops: ${userCrops.length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Products Listed: ${userProducts.length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Total Farm Area: ${userFarms.reduce((sum, f) => sum + f.size, 0)} hectares`, 20, yPosition);
      yPosition += 20;
      
      doc.text('Farm Details:', 20, yPosition);
      yPosition += 15;
      
      userFarms.forEach(farm => {
        doc.text(`• ${farm.name} - ${farm.size} hectares (${farm.location})`, 25, yPosition);
        yPosition += 10;
      });
    } else if (user?.role === 'admin') {
      doc.setFontSize(16);
      doc.text('Platform Overview', 20, yPosition);
      yPosition += 20;
      
      doc.setFontSize(12);
      doc.text(`Total Farms: ${farms.length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Total Crops: ${crops.length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Total Products: ${products.length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Total Orders: ${orders.length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Total Revenue: K ${orders.reduce((sum, o) => sum + o.total, 0)}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Total Users: ${allUsers.length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Farmers: ${allUsers.filter(u => u.role === 'farmer').length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Customers: ${allUsers.filter(u => u.role === 'customer').length}`, 20, yPosition);
    } else if (user?.role === 'customer') {
      const customerOrders = orders.filter(o => o.customerId === user.id);
      const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0);
      const avgOrderValue = customerOrders.length > 0 ? totalSpent / customerOrders.length : 0;
      
      doc.setFontSize(16);
      doc.text('Customer Summary', 20, yPosition);
      yPosition += 20;
      
      doc.setFontSize(12);
      doc.text(`Total Orders: ${customerOrders.length}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Total Spent: K ${totalSpent}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Average Order Value: K ${avgOrderValue.toFixed(2)}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Delivered Orders: ${customerOrders.filter(o => o.status === 'delivered').length}`, 20, yPosition);
      yPosition += 20;
      
      if (customerOrders.length > 0) {
        doc.text('Recent Orders:', 20, yPosition);
        yPosition += 15;
        
        customerOrders.slice(0, 5).forEach(order => {
          doc.text(`• Order #${order.id.slice(-8)} - K ${order.total} (${order.status})`, 25, yPosition);
          yPosition += 10;
        });
      }
    }

    doc.save(`ulimi-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateCSVReport = () => {
    let csvContent = '';
    
    if (user?.role === 'farmer') {
      const userFarms = farms.filter(f => f.farmerId === user.id);
      const userCrops = crops.filter(c => userFarms && userFarms.some(f => f.id === c.farmId));
      const userProducts = products.filter(p => p.farmerId === user.id);
      
      csvContent = 'Farm Name,Location,Size (hectares),Soil Type,Crops Count,Products Listed\n';
      userFarms.forEach(farm => {
        const cropCount = userCrops.filter(c => c.farmId === farm.id).length;
        const productCount = userProducts.filter(p => p.farmId === farm.id).length;
        csvContent += `"${farm.name}","${farm.location}",${farm.size},"${farm.soilType}",${cropCount},${productCount}\n`;
      });
    } else if (user?.role === 'customer') {
      const customerOrders = orders.filter(o => o.customerId === user.id);
      csvContent = 'Order ID,Date,Status,Total Amount,Items Count,Delivery Address\n';
      customerOrders.forEach(order => {
        csvContent += `"${order.id}","${order.createdAt}","${order.status}",${order.total},${order.items.length},"${order.shippingAddress}"\n`;
      });
    } else if (user?.role === 'admin') {
      csvContent = 'Farm Name,Farmer,Location,Size,Crops,Products,Revenue\n';
      farms.forEach(farm => {
        const farmCrops = crops.filter(c => c.farmId === farm.id).length;
        const farmProducts = products.filter(p => p.farmId === farm.id);
        const farmerName = allUsers.find(u => u.id === farm.farmerId)?.name || 'Unknown';
        const farmRevenue = orders.reduce((sum, order) => {
          return sum + order.items.reduce((itemSum, item) => {
            return farmProducts && farmProducts.some(p => p.id === item.productId) ? itemSum + item.total : itemSum;
          }, 0);
        }, 0);
        
        csvContent += `"${farm.name}","${farmerName}","${farm.location}",${farm.size},${farmCrops},${farmProducts.length},${farmRevenue}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `ulimi-data-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const reportTypes = {
    farmer: [
      { value: 'summary', label: 'Farm Summary' },
      { value: 'crops', label: 'Crop Details' },
      { value: 'financial', label: 'Financial Report' }
    ],
    customer: [
      { value: 'orders', label: 'Order History' },
      { value: 'spending', label: 'Spending Report' },
      { value: 'summary', label: 'Customer Summary' }
    ],
    admin: [
      { value: 'platform', label: 'Platform Overview' },
      { value: 'financial', label: 'Financial Report' },
      { value: 'users', label: 'User Analytics' }
    ]
  };

  const availableReports = reportTypes[user?.role as keyof typeof reportTypes] || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and download detailed reports</p>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {availableReports.map(report => (
                <option key={report.value} value={report.value}>{report.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="thisyear">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <div className="flex space-x-2 w-full">
              <button
                onClick={generatePDFReport}
                className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex-1"
              >
                <Download className="h-4 w-4" />
                <span>PDF</span>
              </button>
              <button
                onClick={generateCSVReport}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1"
              >
                <Download className="h-4 w-4" />
                <span>CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats for Current Report */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
        
        {user?.role === 'farmer' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 rounded-lg p-4 text-center">
              <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-600">
                {farms.filter(f => f.farmerId === user.id).length}
              </div>
              <div className="text-gray-600">My Farms</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {crops.filter(c => farms.filter(f => f.farmerId === user.id).some(f => f.id === c.farmId)).length}
              </div>
              <div className="text-gray-600">Active Crops</div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {products.filter(p => p.farmerId === user.id).length}
              </div>
              <div className="text-gray-600">Products Listed</div>
            </div>
          </div>
        )}

        {user?.role === 'customer' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.customerId === user.id).length}
              </div>
              <div className="text-gray-600">Total Orders</div>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-4 text-center">
              <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-600">
                K {orders.filter(o => o.customerId === user.id).reduce((sum, o) => sum + o.total, 0)}
              </div>
              <div className="text-gray-600">Total Spent</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <ShoppingCart className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {products.filter(p => p.status === 'approved').length}
              </div>
              <div className="text-gray-600">Available Products</div>
            </div>
          </div>
        )}

        {user?.role === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-emerald-50 rounded-lg p-4 text-center">
              <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-600">{farms.length}</div>
              <div className="text-gray-600">Total Farms</div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <ShoppingCart className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{products.length}</div>
              <div className="text-gray-600">Products</div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <TrendingUp className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600">
                K {orders.reduce((sum, o) => sum + o.total, 0)}
              </div>
              <div className="text-gray-600">Revenue</div>
            </div>
          </div>
        )}
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableReports.map((report) => (
            <div key={report.value} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <FileText className="h-6 w-6 text-emerald-600" />
                <h4 className="font-medium text-gray-900">{report.label}</h4>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {report.value === 'summary' && 'Overview of all farm activities and performance'}
                {report.value === 'crops' && 'Detailed crop information and growth tracking'}
                {report.value === 'financial' && 'Revenue, expenses, and profitability analysis'}
                {report.value === 'orders' && 'Complete order history and status'}
                {report.value === 'spending' && 'Purchase patterns and budget analysis'}
                {report.value === 'platform' && 'Comprehensive platform statistics'}
                {report.value === 'users' && 'User engagement and activity metrics'}
                {user?.role === 'customer' && report.value === 'summary' && 'Complete customer activity and purchase summary'}
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setReportType(report.value);
                    generatePDFReport();
                  }}
                  className="flex-1 bg-red-600 text-white text-sm py-2 px-3 rounded hover:bg-red-700 transition-colors"
                >
                  PDF
                </button>
                <button
                  onClick={() => {
                    setReportType(report.value);
                    generateCSVReport();
                  }}
                  className="flex-1 bg-green-600 text-white text-sm py-2 px-3 rounded hover:bg-green-700 transition-colors"
                >
                  CSV
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Schedule */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Automated Reports</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-emerald-600" />
              <div>
                <h4 className="font-medium text-emerald-800">Weekly Summary</h4>
                <p className="text-emerald-700 text-sm">Get weekly performance reports every Monday</p>
              </div>
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Enable
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-800">Monthly Report</h4>
                <p className="text-blue-700 text-sm">Comprehensive monthly analysis and insights</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;