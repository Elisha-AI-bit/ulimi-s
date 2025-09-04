import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Search, Filter, ShoppingCart, MapPin, Plus, Edit, Eye, Trash2 } from 'lucide-react';

const Marketplace: React.FC = () => {
  const { user } = useAuth();
  const { products, addToCart, farms, crops, addProduct, updateProduct, deleteProduct } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    farmId: '',
    cropId: '',
    name: '',
    category: 'Vegetables',
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    description: '',
    image: '',
    location: ''
  });

  const categories = ['All', 'Vegetables', 'Grains', 'Fruits', 'Legumes'];
  const locations = ['All', 'Lusaka', 'Copperbelt', 'Eastern', 'Southern', 'Western', 'Northern'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || 
                           product.category === selectedCategory;
    const matchesLocation = selectedLocation === '' || selectedLocation === 'All' || 
                           product.location.includes(selectedLocation);
    const isApproved = product.status === 'approved';
    
    return matchesSearch && matchesCategory && matchesLocation && isApproved;
  });

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      updateProduct(editingProduct, {
        farmId: formData.farmId,
        cropId: formData.cropId,
        name: formData.name,
        category: formData.category,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        pricePerUnit: parseFloat(formData.pricePerUnit),
        description: formData.description,
        image: formData.image || 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        location: formData.location
      });
      setEditingProduct(null);
    } else {
      addProduct({
        farmerId: user!.id,
        farmId: formData.farmId,
        cropId: formData.cropId,
        name: formData.name,
        category: formData.category,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        pricePerUnit: parseFloat(formData.pricePerUnit),
        description: formData.description,
        image: formData.image || 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        location: formData.location,
        status: 'pending'
      });
      setShowAddForm(false);
    }
    
    setFormData({
      farmId: '',
      cropId: '',
      name: '',
      category: 'Vegetables',
      quantity: '',
      unit: 'kg',
      pricePerUnit: '',
      description: '',
      image: '',
      location: ''
    });
  };

  const handleEdit = (product: any) => {
    setFormData({
      farmId: product.farmId,
      cropId: product.cropId,
      name: product.name,
      category: product.category,
      quantity: product.quantity.toString(),
      unit: product.unit,
      pricePerUnit: product.pricePerUnit.toString(),
      description: product.description,
      image: product.image,
      location: product.location
    });
    setEditingProduct(product.id);
    setShowAddForm(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const userFarms = farms.filter(f => f.farmerId === user?.id);
  const userCrops = crops.filter(c => userFarms && userFarms.some(f => f.id === c.farmId));

  const getCropsForFarm = (farmId: string) => {
    return crops.filter(c => c.farmId === farmId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600">Discover fresh produce from local farmers</p>
        </div>
        {user?.role === 'farmer' && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span>List Product</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
          
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
          >
            {locations.map(location => (
              <option key={location} value={location === 'All' ? '' : location}>
                {location}
              </option>
            ))}
          </select>
          
          <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm md:text-base">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Product Form */}
      {showAddForm && user?.role === 'farmer' && (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingProduct ? 'Edit Product' : 'List New Product'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm</label>
              <select
                value={formData.farmId}
                onChange={(e) => setFormData({ ...formData, farmId: e.target.value, cropId: '' })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
              >
                <option value="">Select a farm</option>
                {userFarms.map(farm => (
                  <option key={farm.id} value={farm.id}>{farm.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crop</label>
              <select
                value={formData.cropId}
                onChange={(e) => setFormData({ ...formData, cropId: e.target.value })}
                required
                disabled={!formData.farmId}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
              >
                <option value="">Select a crop</option>
                {formData.farmId && getCropsForFarm(formData.farmId).map(crop => (
                  <option key={crop.id} value={crop.id}>{crop.type} - {crop.variety}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
                placeholder="e.g., Fresh Tomatoes"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
              >
                {categories.filter(cat => cat !== 'All').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex">
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                  min="1"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
                  placeholder="Enter quantity"
                />
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="border-y border-r border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 px-2 text-sm md:text-base"
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="pieces">pieces</option>
                  <option value="bunches">bunches</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price per {formData.unit}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">K</span>
                <input
                  type="number"
                  value={formData.pricePerUnit}
                  onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
                placeholder="e.g., Chongwe District, Lusaka"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
                placeholder="Describe your product quality, harvest date, etc."
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="md:col-span-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {editingProduct ? 'Update Product' : 'List Product'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                  setFormData({
                    farmId: '',
                    cropId: '',
                    name: '',
                    category: 'Vegetables',
                    quantity: '',
                    unit: 'kg',
                    pricePerUnit: '',
                    description: '',
                    image: '',
                    location: ''
                  });
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {user?.role === 'farmer' && product.farmerId === user.id && (
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 bg-white bg-opacity-80 text-blue-600 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 bg-white bg-opacity-80 text-red-600 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{product.location}</span>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-emerald-600">K {product.pricePerUnit.toFixed(2)}</span>
                <span className="text-sm text-gray-500">per {product.unit}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{product.quantity} {product.unit} available</span>
                {user?.role === 'customer' ? (
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                ) : user?.role === 'farmer' && product.farmerId === user.id ? (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    Your Product
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedLocation('');
              }}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;