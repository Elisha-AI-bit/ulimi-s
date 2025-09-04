import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Package, Clock, CheckCircle, Truck, XCircle, Plus } from 'lucide-react';
import { format } from 'date-fns';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { orders, products, addOrder, updateOrderStatus } = useApp();

  const userOrders = orders.filter(o => o.customerId === user?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'confirmed': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'shipped': return <Truck className="h-5 w-5 text-purple-600" />;
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductName = (productId: string) => {
    return products.find(p => p.id === productId)?.name || 'Unknown Product';
  };

  const handleUpdateStatus = (orderId: string, status: any) => {
    updateOrderStatus(orderId, status);
  };

  const createSampleOrder = () => {
    const availableProducts = products.filter(p => p.status === 'approved');
    if (availableProducts.length === 0) return;

    const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    const quantity = Math.floor(Math.random() * 10) + 1;
    
    addOrder({
      customerId: user!.id,
      items: [{
        id: `item_${Date.now()}`,
        productId: randomProduct.id,
        quantity,
        pricePerUnit: randomProduct.pricePerUnit,
        total: quantity * randomProduct.pricePerUnit
      }],
      total: quantity * randomProduct.pricePerUnit,
      status: 'pending',
      shippingAddress: user!.location
    });
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600">Track your orders and purchase history</p>
        {user?.role === 'customer' && (
          <button
            onClick={createSampleOrder}
            className="mt-2 flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create Sample Order</span>
          </button>
        )}
      </div>

      {/* Orders List */}
      {userOrders.length > 0 ? (
        <div className="space-y-6">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-8)}</h3>
                  <p className="text-gray-600">
                    Placed on {format(new Date(order.createdAt), 'MMMM dd, yyyy')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                    <div>
                      <h4 className="font-medium text-gray-900">{getProductName(item.productId)}</h4>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">K {item.total}</p>
                      <p className="text-gray-600 text-sm">K {item.pricePerUnit} each</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div>
                  <p className="text-gray-600">Delivery Address:</p>
                  <p className="font-medium text-gray-900">{order.shippingAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Total Amount:</p>
                  <p className="text-2xl font-bold text-emerald-600">K {order.total}</p>
                </div>
              </div>
              
              {/* Order Actions */}
              <div className="flex space-x-3 mt-4">
                {order.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Confirm Order
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel Order
                    </button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'shipped')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Mark as Shipped
                  </button>
                )}
                {order.status === 'shipped' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'delivered')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark as Delivered
                  </button>
                )}
                {order.status === 'cancelled' && (
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-4">Start shopping in our marketplace to place your first order</p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Browse Marketplace
          </button>
        </div>
      )}

      {/* Order Summary Stats */}
      {userOrders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userOrders.length}</div>
            <div className="text-gray-600">Total Orders</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {userOrders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-gray-600">Delivered</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {userOrders.filter(o => ['pending', 'confirmed', 'shipped'].includes(o.status)).length}
            </div>
            <div className="text-gray-600">In Progress</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              K {userOrders.reduce((sum, order) => sum + order.total, 0)}
            </div>
            <div className="text-gray-600">Total Spent</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;