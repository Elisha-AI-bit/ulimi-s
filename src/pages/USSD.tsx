import React, { useState } from 'react';
import { Smartphone, ArrowLeft } from 'lucide-react';

interface USSDStep {
  id: string;
  text: string;
  options: { key: string; label: string; nextStep?: string; action?: string }[];
}

const USSD: React.FC = () => {
  const [currentStep, setCurrentStep] = useState('main');
  const [ussdHistory, setUssdHistory] = useState<string[]>(['*123# - Ulimi USSD']);

  const ussdSteps: Record<string, USSDStep> = {
    main: {
      id: 'main',
      text: 'Welcome to Ulimi\n\nSelect an option:',
      options: [
        { key: '1', label: 'Farmer Services', nextStep: 'farmer' },
        { key: '2', label: 'Customer Services', nextStep: 'customer' },
        { key: '3', label: 'Weather Info', nextStep: 'weather' },
        { key: '4', label: 'Market Prices', nextStep: 'prices' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    farmer: {
      id: 'farmer',
      text: 'Farmer Services\n\nSelect an option:',
      options: [
        { key: '1', label: 'My Farms', nextStep: 'farms' },
        { key: '2', label: 'My Crops', nextStep: 'crops' },
        { key: '3', label: 'My Products', nextStep: 'products' },
        { key: '4', label: 'Orders Received', nextStep: 'farmer_orders' },
        { key: '#', label: 'Back to Main Menu', nextStep: 'main' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    customer: {
      id: 'customer',
      text: 'Customer Services\n\nSelect an option:',
      options: [
        { key: '1', label: 'Browse Products', nextStep: 'browse' },
        { key: '2', label: 'My Orders', nextStep: 'customer_orders' },
        { key: '3', label: 'Price Alerts', nextStep: 'alerts' },
        { key: '4', label: 'Contact Farmers', nextStep: 'contact' },
        { key: '#', label: 'Back to Main Menu', nextStep: 'main' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    farms: {
      id: 'farms',
      text: 'Your Farms:\n\n1. Mwanza Family Farm\n   Location: Chongwe District\n   Size: 25 hectares\n\n2. Green Valley Farm\n   Location: Kafue District\n   Size: 40 hectares',
      options: [
        { key: '#', label: 'Back', nextStep: 'farmer' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    crops: {
      id: 'crops',
      text: 'Your Crops:\n\n1. Maize (SC627)\n   Status: Growing\n   Expected: Apr 2025\n\n2. Tomatoes (Roma)\n   Status: Flowering\n   Expected: Dec 2024',
      options: [
        { key: '1', label: 'View Details', nextStep: 'crop_details' },
        { key: '2', label: 'Add Input', nextStep: 'add_input' },
        { key: '#', label: 'Back', nextStep: 'farmer' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    weather: {
      id: 'weather',
      text: 'Weather Forecast\n\nLusaka: 28°C, Partly Cloudy\nCopperbelt: 26°C, Thunderstorms\nEastern: 30°C, Sunny\nSouthern: 32°C, Hot & Dry',
      options: [
        { key: '#', label: 'Back to Main Menu', nextStep: 'main' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    prices: {
      id: 'prices',
      text: 'Market Prices (per kg)\n\nMaize: K 6.80\nTomatoes: K 12.80\nCabbage: K 8.80\nOnions: K 15.50\n\nPrices updated: Today',
      options: [
        { key: '#', label: 'Back to Main Menu', nextStep: 'main' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    // Adding missing step definitions
    browse: {
      id: 'browse',
      text: 'Browse Products\n\n1. Fresh Maize (SC627)\n   Price: K 6.80/kg\n   Farmer: Mwanza Family Farm\n\n2. Roma Tomatoes\n   Price: K 12.80/kg\n   Farmer: Green Valley Farm\n\n3. Cabbage\n   Price: K 8.80/kg\n   Farmer: Mwanza Family Farm',
      options: [
        { key: '1', label: 'Order Maize', action: 'order' },
        { key: '2', label: 'Order Tomatoes', action: 'order' },
        { key: '3', label: 'Order Cabbage', action: 'order' },
        { key: '#', label: 'Back', nextStep: 'customer' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    customer_orders: {
      id: 'customer_orders',
      text: 'Your Orders:\n\nOrder #ORD-789456\nStatus: Delivered\nDate: 2024-11-15\nTotal: K 272.00\n\nOrder #ORD-123789\nStatus: Processing\nDate: 2024-11-20\nTotal: K 128.00',
      options: [
        { key: '1', label: 'View Details', nextStep: 'order_details' },
        { key: '#', label: 'Back', nextStep: 'customer' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    alerts: {
      id: 'alerts',
      text: 'Price Alerts:\n\n1. Maize - Set at K 7.00/kg\n   Current: K 6.80/kg\n   Status: Below threshold\n\n2. Tomatoes - Set at K 12.00/kg\n   Current: K 12.80/kg\n   Status: Above threshold',
      options: [
        { key: '1', label: 'Modify Alert', nextStep: 'modify_alert' },
        { key: '2', label: 'Add New Alert', nextStep: 'add_alert' },
        { key: '#', label: 'Back', nextStep: 'customer' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    contact: {
      id: 'contact',
      text: 'Contact Farmers:\n\n1. Mwanza Family Farm\n   Phone: 0971234567\n   Location: Chongwe District\n\n2. Green Valley Farm\n   Phone: 0969876543\n   Location: Kafue District',
      options: [
        { key: '1', label: 'Call Mwanza Farm', action: 'call' },
        { key: '2', label: 'Call Green Valley', action: 'call' },
        { key: '#', label: 'Back', nextStep: 'customer' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    products: {
      id: 'products',
      text: 'Your Products:\n\n1. Fresh Maize (SC627)\n   Quantity: 500 kg\n   Price: K 6.80/kg\n   Status: Available\n\n2. Roma Tomatoes\n   Quantity: 200 kg\n   Price: K 12.80/kg\n   Status: Available',
      options: [
        { key: '1', label: 'Update Maize', nextStep: 'update_product' },
        { key: '2', label: 'Update Tomatoes', nextStep: 'update_product' },
        { key: '3', label: 'Add New Product', nextStep: 'add_product' },
        { key: '#', label: 'Back', nextStep: 'farmer' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    farmer_orders: {
      id: 'farmer_orders',
      text: 'Orders Received:\n\nOrder #ORD-789456\nCustomer: John Mwanza\nStatus: Delivered\nTotal: K 272.00\n\nOrder #ORD-123789\nCustomer: Mary Phiri\nStatus: Processing\nTotal: K 128.00',
      options: [
        { key: '1', label: 'Update Status', nextStep: 'update_order' },
        { key: '#', label: 'Back', nextStep: 'farmer' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    order_details: {
      id: 'order_details',
      text: 'Order Details:\n\nOrder #ORD-789456\nCustomer: John Mwanza\nDate: 2024-11-15\nStatus: Delivered\n\nItems:\n- Maize (SC627) 40kg @ K 6.80/kg = K 272.00\n\nShipping: Chongwe Market\nDelivery Date: 2024-11-16',
      options: [
        { key: '#', label: 'Back', nextStep: 'customer_orders' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    modify_alert: {
      id: 'modify_alert',
      text: 'Modify Price Alert:\n\nCurrent: Maize - K 7.00/kg\n\nEnter new price threshold:',
      options: [
        { key: '1', label: 'K 6.50', action: 'update_alert' },
        { key: '2', label: 'K 7.50', action: 'update_alert' },
        { key: '3', label: 'Custom Amount', nextStep: 'custom_alert' },
        { key: '#', label: 'Back', nextStep: 'alerts' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    add_alert: {
      id: 'add_alert',
      text: 'Add New Price Alert:\n\nSelect crop:\n1. Maize\n2. Tomatoes\n3. Cabbage\n4. Onions',
      options: [
        { key: '1', label: 'Maize', nextStep: 'set_maize_alert' },
        { key: '2', label: 'Tomatoes', nextStep: 'set_tomato_alert' },
        { key: '#', label: 'Back', nextStep: 'alerts' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    update_product: {
      id: 'update_product',
      text: 'Update Product:\n\nProduct: Fresh Maize (SC627)\nCurrent Price: K 6.80/kg\nAvailable: 500 kg\n\n1. Update Price\n2. Update Quantity\n3. Mark as Sold Out',
      options: [
        { key: '1', label: 'Change Price', nextStep: 'change_price' },
        { key: '2', label: 'Change Quantity', nextStep: 'change_quantity' },
        { key: '#', label: 'Back', nextStep: 'products' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    add_product: {
      id: 'add_product',
      text: 'Add New Product:\n\nEnter product details:\n1. Select Crop\n2. Set Price\n3. Set Quantity',
      options: [
        { key: '1', label: 'Select Crop', nextStep: 'select_crop' },
        { key: '#', label: 'Back', nextStep: 'products' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    update_order: {
      id: 'update_order',
      text: 'Update Order Status:\n\nOrder #ORD-123789\nStatus: Processing\n\n1. Mark as Shipped\n2. Mark as Delivered\n3. Cancel Order',
      options: [
        { key: '1', label: 'Shipped', action: 'update_status' },
        { key: '2', label: 'Delivered', action: 'update_status' },
        { key: '3', label: 'Cancel', action: 'cancel_order' },
        { key: '#', label: 'Back', nextStep: 'farmer_orders' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    crop_details: {
      id: 'crop_details',
      text: 'Crop Details:\n\nMaize (SC627)\nFarm: Mwanza Family Farm\nPlanting Date: 2024-08-15\nExpected Harvest: 2025-04-20\nCurrent Status: Growing\nArea: 15 hectares',
      options: [
        { key: '#', label: 'Back', nextStep: 'crops' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    },
    add_input: {
      id: 'add_input',
      text: 'Add Crop Input:\n\nSelect input type:\n1. Fertilizer\n2. Pesticide\n3. Water\n4. Labor',
      options: [
        { key: '1', label: 'Fertilizer', nextStep: 'add_fertilizer' },
        { key: '2', label: 'Pesticide', nextStep: 'add_pesticide' },
        { key: '#', label: 'Back', nextStep: 'crops' },
        { key: '0', label: 'Exit', action: 'exit' }
      ]
    }
  };

  const handleOptionSelect = (option: any) => {
    if (option.action === 'exit') {
      setCurrentStep('main');
      setUssdHistory(['*123# - Session Ended']);
      return;
    }

    if (option.nextStep) {
      const step = ussdSteps[option.nextStep];
      if (step) {
        setCurrentStep(option.nextStep);
        setUssdHistory(prev => [...prev, `${option.key}. ${option.label}`, step.text]);
      } else {
        // Handle case where step is not defined
        setCurrentStep('main');
        setUssdHistory(prev => [...prev, `${option.key}. ${option.label}`, 'Error: Service not available. Returning to main menu.']);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep('main');
    setUssdHistory(['*123# - Ulimi USSD']);
  };

  const currentStepData = ussdSteps[currentStep] || ussdSteps['main'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">USSD Simulation</h1>
        <p className="text-gray-600">Experience Ulimi services through USSD interface</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phone Simulator */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="mx-auto max-w-sm">
            {/* Phone Frame */}
            <div className="bg-black rounded-3xl p-4 md:p-6">
              <div className="bg-gray-900 rounded-2xl p-3 md:p-4">
                <div className="bg-green-900 text-green-300 font-mono text-xs p-3 rounded-lg h-80 md:h-96 overflow-y-auto">
                  {/* USSD Screen */}
                  <div className="space-y-2">
                    {ussdHistory.map((line, index) => (
                      <div key={index} className="text-green-300 text-xs md:text-sm">
                        {line}
                      </div>
                    ))}
                  </div>
                  
                  {/* Current Options */}
                  <div className="mt-4 space-y-1">
                    {currentStepData.options.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => handleOptionSelect(option)}
                        className="block w-full text-left text-green-300 hover:bg-green-800 px-2 py-1 rounded transition-colors text-xs md:text-sm"
                      >
                        {option.key}. {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Phone Keypad */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                    <button
                      key={key}
                      className="bg-gray-700 text-white py-2 md:py-3 rounded-lg hover:bg-gray-600 transition-colors font-mono text-sm md:text-base"
                    >
                      {key}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleReset}
                  className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
                >
                  End Call
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* USSD Information */}
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>How to Use USSD</span>
            </h3>
            <div className="space-y-3 text-gray-700 text-sm md:text-base">
              <p>1. Dial *123# from any mobile phone</p>
              <p>2. Follow the menu prompts</p>
              <p>3. Select options by pressing the number keys</p>
              <p>4. Press # to go back or 0 to exit</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="font-medium text-gray-900">Farmer Services</h4>
                <p className="text-gray-600 text-sm">Access farm info, crop status, and product listings</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Customer Services</h4>
                <p className="text-gray-600 text-sm">Browse products, check orders, and set price alerts</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <h4 className="font-medium text-gray-900">Weather & Market Info</h4>
                <p className="text-gray-600 text-sm">Get weather forecasts and current market prices</p>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 md:p-6">
            <h3 className="font-semibold text-emerald-800 mb-2">Why USSD?</h3>
            <ul className="text-emerald-700 text-sm space-y-2">
              <li>• Works on any mobile phone (no smartphone required)</li>
              <li>• No internet connection needed</li>
              <li>• Fast access to essential farming information</li>
              <li>• Available 24/7 from anywhere in Zambia</li>
              <li>• Low cost - standard USSD rates apply</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USSD;