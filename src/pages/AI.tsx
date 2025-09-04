import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bot, Camera, MessageSquare, Upload, Zap, Leaf, Bug } from 'lucide-react';
import { getAIResponse } from '../data/aiQuestions';

const AI: React.FC = () => {
  const { user } = useAuth();
  const [selectedTool, setSelectedTool] = useState<'diagnosis' | 'chat'>('diagnosis');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI farming assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = [
        {
          disease: 'Early Blight',
          confidence: 87,
          description: 'Fungal disease affecting tomato leaves',
          treatment: 'Apply copper-based fungicide every 7-14 days',
          severity: 'moderate'
        },
        {
          disease: 'Healthy Plant',
          confidence: 92,
          description: 'Plant appears healthy with no visible diseases',
          treatment: 'Continue current care routine',
          severity: 'none'
        },
        {
          disease: 'Aphid Infestation',
          confidence: 78,
          description: 'Small green insects on plant leaves',
          treatment: 'Use neem oil spray or introduce ladybugs',
          severity: 'mild'
        }
      ];
      
      setDiagnosisResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(chatInput);
      const aiResponse = {
        role: 'assistant',
        content: response
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setChatInput('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-yellow-600 bg-yellow-100';
      case 'moderate': return 'text-orange-600 bg-orange-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  if (user?.role !== 'farmer') {
    return (
      <div className="text-center py-12">
        <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
        <p className="text-gray-600">AI tools are only available for farmers</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Tools</h1>
        <p className="text-gray-600">Leverage AI for better farming decisions</p>
      </div>

      {/* Tool Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedTool('diagnosis')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedTool === 'diagnosis'
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Camera className="h-4 w-4" />
            <span>Image Diagnosis</span>
          </button>
          
          <button
            onClick={() => setSelectedTool('chat')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedTool === 'chat'
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>AI Assistant</span>
          </button>
        </div>
      </div>

      {/* AI Image Diagnosis */}
      {selectedTool === 'diagnosis' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Crop Disease & Pest Detection</span>
          </h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Crop Image</h4>
            <p className="text-gray-600 mb-4">Take a photo of your crop and upload it for AI analysis</p>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>Choose Image</span>
            </label>
          </div>

          {isAnalyzing && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-700">Analyzing image with AI...</span>
              </div>
            </div>
          )}

          {diagnosisResult && (
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-emerald-600" />
                <span>AI Diagnosis Result</span>
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{diagnosisResult.disease}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(diagnosisResult.severity)}`}>
                    {diagnosisResult.severity}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Confidence Level</span>
                    <span className="text-sm font-bold">{diagnosisResult.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${diagnosisResult.confidence}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Description:</h5>
                  <p className="text-gray-700">{diagnosisResult.description}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Recommended Treatment:</h5>
                  <p className="text-gray-700">{diagnosisResult.treatment}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Chat Assistant */}
      {selectedTool === 'chat' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>AI Farming Assistant</span>
          </h3>
          
          <div className="border border-gray-200 rounded-lg">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleChatSubmit} className="border-t border-gray-200 p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about farming tips, pest control, crop management..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Features Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <Leaf className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-2">Disease Detection</h4>
            <p className="text-sm text-gray-600">Upload crop images for instant disease identification</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Bug className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-2">Pest Identification</h4>
            <p className="text-sm text-gray-600">Identify pests and get treatment recommendations</p>
          </div>
          
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <Zap className="h-8 w-8 text-amber-600 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-2">Smart Recommendations</h4>
            <p className="text-sm text-gray-600">Get personalized farming advice based on your data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;