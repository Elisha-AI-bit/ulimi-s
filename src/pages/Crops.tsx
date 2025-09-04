import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Plus, Wheat, Calendar, TrendingUp, DollarSign, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const Crops: React.FC = () => {
  const { user } = useAuth();
  const { farms, crops, addCrop, updateCrop, deleteCrop } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState<string | null>(null);

  const userFarms = farms.filter(f => f.farmerId === user?.id);
  const userCrops = crops.filter(c => userFarms && userFarms.some(f => f.id === c.farmId));

  const [formData, setFormData] = useState({
    farmId: '',
    type: '',
    variety: '',
    plantingDate: '',
    expectedHarvest: '',
    status: 'planted' as const,
    area: ''
  });

  const cropTypes = [
    'Maize', 'Tomatoes', 'Cabbage', 'Onions', 'Carrots', 'Beans', 
    'Groundnuts', 'Sweet Potato', 'Irish Potato', 'Lettuce'
  ];

  const statusColors = {
    planted: 'bg-yellow-100 text-yellow-800',
    growing: 'bg-green-100 text-green-800',
    flowering: 'bg-purple-100 text-purple-800',
    harvesting: 'bg-orange-100 text-orange-800',
    harvested: 'bg-gray-100 text-gray-800'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCrop) {
      updateCrop(editingCrop, {
        farmId: formData.farmId,
        type: formData.type,
        variety: formData.variety,
        plantingDate: formData.plantingDate,
        expectedHarvest: formData.expectedHarvest,
        status: formData.status,
        area: parseFloat(formData.area)
      });
      setEditingCrop(null);
    } else {
      addCrop({
        farmId: formData.farmId,
        type: formData.type,
        variety: formData.variety,
        plantingDate: formData.plantingDate,
        expectedHarvest: formData.expectedHarvest,
        status: formData.status,
        area: parseFloat(formData.area),
        inputs: []
      });
      setShowAddForm(false);
    }
    
    setFormData({
      farmId: '',
      type: '',
      variety: '',
      plantingDate: '',
      expectedHarvest: '',
      status: 'planted',
      area: ''
    });
  };

  const handleEdit = (crop: any) => {
    setFormData({
      farmId: crop.farmId,
      type: crop.type,
      variety: crop.variety,
      plantingDate: crop.plantingDate,
      expectedHarvest: crop.expectedHarvest,
      status: crop.status,
      area: crop.area.toString()
    });
    setEditingCrop(crop.id);
    setShowAddForm(true);
  };

  const handleDelete = (cropId: string) => {
    if (window.confirm('Are you sure you want to delete this crop? All associated products will also be deleted.')) {
      deleteCrop(cropId);
    }
  };

  const getFarmName = (farmId: string) => {
    return farms.find(f => f.id === farmId)?.name || 'Unknown Farm';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crop Management</h1>
          <p className="text-gray-600">Track your crops across all farms</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          disabled={userFarms.length === 0}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Crop</span>
        </button>
      </div>

      {userFarms.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <p className="text-amber-800">You need to add a farm first before planting crops.</p>
        </div>
      )}

      {/* Add/Edit Crop Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingCrop ? 'Edit Crop' : 'Add New Crop'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm</label>
              <select
                value={formData.farmId}
                onChange={(e) => setFormData({ ...formData, farmId: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select farm</option>
                {userFarms.map(farm => (
                  <option key={farm.id} value={farm.id}>{farm.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select crop type</option>
                {cropTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variety</label>
              <input
                type="text"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter variety"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date</label>
              <input
                type="date"
                value={formData.plantingDate}
                onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Harvest</label>
              <input
                type="date"
                value={formData.expectedHarvest}
                onChange={(e) => setFormData({ ...formData, expectedHarvest: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="planted">Planted</option>
                <option value="growing">Growing</option>
                <option value="flowering">Flowering</option>
                <option value="harvesting">Harvesting</option>
                <option value="harvested">Harvested</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area (hectares)</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
                min="0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter area"
              />
            </div>
            
            <div className="md:col-span-3 flex space-x-3 pt-4">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {editingCrop ? 'Update Crop' : 'Add Crop'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingCrop(null);
                  setFormData({
                    farmId: '',
                    type: '',
                    variety: '',
                    plantingDate: '',
                    expectedHarvest: '',
                    status: 'planted',
                    area: ''
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

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userCrops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{crop.type}</h3>
                  <p className="text-sm text-gray-600">{crop.variety}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(crop)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(crop.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Farm</span>
                  <span className="text-sm font-medium">{getFarmName(crop.farmId)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Area</span>
                  <span className="text-sm font-medium">{crop.area} hectares</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[crop.status]}`}>
                    {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    Planted: {format(new Date(crop.plantingDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">
                    Harvest: {format(new Date(crop.expectedHarvest), 'MMM dd, yyyy')}
                  </span>
                </div>
                
                {crop.inputs.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Total Inputs Cost</span>
                      <span className="text-lg font-bold text-emerald-600">
                        K {crop.inputs.reduce((sum, input) => sum + input.cost, 0)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {userCrops.length === 0 && userFarms.length > 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12">
            <Wheat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No crops planted yet</h3>
            <p className="text-gray-600 mb-4">Start by planting your first crop on one of your farms</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Plant Your First Crop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Crops;