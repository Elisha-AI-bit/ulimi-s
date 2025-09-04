import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Plus, MapPin, Ruler, Mountain, Edit, Trash2 } from 'lucide-react';

const Farms: React.FC = () => {
  const { user } = useAuth();
  const { farms, crops, addFarm, updateFarm, deleteFarm } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFarm, setEditingFarm] = useState<string | null>(null);

  const userFarms = farms.filter(f => f.farmerId === user?.id);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    size: '',
    soilType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFarm) {
      updateFarm(editingFarm, {
        name: formData.name,
        location: formData.location,
        size: parseFloat(formData.size),
        soilType: formData.soilType
      });
      setEditingFarm(null);
    } else {
      addFarm({
        name: formData.name,
        farmerId: user!.id,
        location: formData.location,
        size: parseFloat(formData.size),
        soilType: formData.soilType,
        coordinates: { lat: -15.4067, lng: 28.2817 } // Default Lusaka coordinates
      });
      setShowAddForm(false);
    }
    
    setFormData({ name: '', location: '', size: '', soilType: '' });
  };

  const handleEdit = (farm: any) => {
    setFormData({
      name: farm.name,
      location: farm.location,
      size: farm.size.toString(),
      soilType: farm.soilType
    });
    setEditingFarm(farm.id);
    setShowAddForm(true);
  };

  const handleDelete = (farmId: string) => {
    if (window.confirm('Are you sure you want to delete this farm? All associated crops and products will also be deleted.')) {
      deleteFarm(farmId);
    }
  };

  const getCropCount = (farmId: string) => {
    return crops.filter(c => c.farmId === farmId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Farms</h1>
          <p className="text-gray-600">Manage your farming operations</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Farm</span>
        </button>
      </div>

      {/* Add/Edit Farm Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingFarm ? 'Edit Farm' : 'Add New Farm'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter farm name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., Chongwe District, Lusaka"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size (hectares)</label>
              <input
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
                min="0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter farm size"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select soil type</option>
                <option value="Clay loam">Clay loam</option>
                <option value="Sandy loam">Sandy loam</option>
                <option value="Loamy">Loamy</option>
                <option value="Sandy">Sandy</option>
                <option value="Clay">Clay</option>
              </select>
            </div>
            
            <div className="md:col-span-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {editingFarm ? 'Update Farm' : 'Add Farm'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingFarm(null);
                  setFormData({ name: '', location: '', size: '', soilType: '' });
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Farms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {userFarms.map((farm) => (
          <div key={farm.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{farm.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(farm)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(farm.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{farm.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <Ruler className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{farm.size} hectares</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mountain className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{farm.soilType}</span>
                </div>
                
                <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-emerald-700">Active Crops</span>
                    <span className="text-lg font-bold text-emerald-600">{getCropCount(farm.id)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {userFarms.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center py-8 md:py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No farms yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first farm to begin managing your crops</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Add Your First Farm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farms;