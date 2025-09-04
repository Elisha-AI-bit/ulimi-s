export interface AIQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export const aiQuestions: AIQuestion[] = [
  // Crop Management
  {
    id: 'crop1',
    question: 'When is the best time to plant maize in Zambia?',
    answer: 'The best time to plant maize in Zambia is during the rainy season, typically between November and December. Plant when soil moisture is adequate and temperatures are between 20-30°C. Early planting (November) often yields better results.',
    category: 'Crop Management',
    keywords: ['maize', 'planting', 'timing', 'season', 'november', 'december']
  },
  {
    id: 'crop2',
    question: 'How do I improve soil fertility naturally?',
    answer: 'Improve soil fertility by adding organic matter like compost or well-rotted manure. Practice crop rotation with legumes like beans or groundnuts to fix nitrogen. Use cover crops during off-seasons and avoid over-tilling to maintain soil structure.',
    category: 'Soil Management',
    keywords: ['soil', 'fertility', 'organic', 'compost', 'rotation', 'legumes']
  },
  {
    id: 'crop3',
    question: 'What are the signs of nitrogen deficiency in crops?',
    answer: 'Nitrogen deficiency shows as yellowing of older leaves (chlorosis), starting from leaf tips and edges. Plants appear stunted with reduced growth. Leaves may drop prematurely. Apply nitrogen-rich fertilizer or organic matter to correct this.',
    category: 'Plant Health',
    keywords: ['nitrogen', 'deficiency', 'yellowing', 'chlorosis', 'fertilizer']
  },
  {
    id: 'crop4',
    question: 'How often should I water my tomato plants?',
    answer: 'Water tomato plants deeply 2-3 times per week, providing about 2.5cm of water weekly. Water early morning to reduce disease risk. Maintain consistent moisture to prevent blossom end rot and fruit cracking.',
    category: 'Irrigation',
    keywords: ['tomato', 'watering', 'irrigation', 'moisture', 'blossom end rot']
  },
  {
    id: 'crop5',
    question: 'What is the ideal pH level for vegetable crops?',
    answer: 'Most vegetables grow best in slightly acidic to neutral soil with pH 6.0-7.0. Tomatoes prefer 6.0-6.8, while brassicas (cabbage, broccoli) prefer 6.0-7.5. Test soil regularly and adjust with lime (to raise pH) or sulfur (to lower pH).',
    category: 'Soil Management',
    keywords: ['ph', 'soil', 'vegetables', 'acidic', 'neutral', 'lime', 'sulfur']
  },

  // Pest and Disease Management
  {
    id: 'pest1',
    question: 'How do I control aphids on my crops?',
    answer: 'Control aphids by spraying with neem oil or insecticidal soap. Introduce beneficial insects like ladybugs. Remove heavily infested leaves. Plant companion crops like marigolds to deter aphids naturally.',
    category: 'Pest Control',
    keywords: ['aphids', 'neem oil', 'ladybugs', 'insecticidal soap', 'marigolds']
  },
  {
    id: 'pest2',
    question: 'What causes blight in tomatoes and how to prevent it?',
    answer: 'Tomato blight is caused by fungal infections (early or late blight). Prevent by ensuring good air circulation, avoiding overhead watering, and applying copper-based fungicides. Remove affected leaves immediately and practice crop rotation.',
    category: 'Disease Management',
    keywords: ['blight', 'tomato', 'fungal', 'copper', 'fungicide', 'rotation']
  },
  {
    id: 'pest3',
    question: 'How do I identify and treat cutworms?',
    answer: 'Cutworms are gray/brown caterpillars that cut young plants at soil level. Look for plants cut near the base and caterpillars in soil. Control with beneficial nematodes, diatomaceous earth around plants, or evening hand-picking.',
    category: 'Pest Control',
    keywords: ['cutworms', 'caterpillars', 'nematodes', 'diatomaceous earth']
  },

  // Weather and Climate
  {
    id: 'weather1',
    question: 'How does rainfall affect crop planting decisions?',
    answer: 'Plant when soil has adequate moisture but isn\'t waterlogged. Too much rain can delay planting and cause seed rot. Too little requires irrigation. Monitor 7-day forecasts and plant 2-3 days after good rainfall for optimal conditions.',
    category: 'Weather',
    keywords: ['rainfall', 'planting', 'moisture', 'waterlogged', 'irrigation']
  },
  {
    id: 'weather2',
    question: 'What crops are drought-resistant for Zambia?',
    answer: 'Drought-resistant crops for Zambia include sorghum, millet, cassava, sweet potatoes, and cowpeas. These crops require less water and can tolerate dry conditions better than maize or vegetables.',
    category: 'Crop Selection',
    keywords: ['drought', 'resistant', 'sorghum', 'millet', 'cassava', 'cowpeas']
  },

  // Market and Economics
  {
    id: 'market1',
    question: 'When are vegetable prices highest in Zambian markets?',
    answer: 'Vegetable prices are typically highest during dry season (May-October) when supply is limited. Prices peak in August-September. Plan production to harvest during these periods for better profits.',
    category: 'Market Timing',
    keywords: ['prices', 'vegetables', 'dry season', 'august', 'september', 'profits']
  },
  {
    id: 'market2',
    question: 'How do I calculate farming profitability?',
    answer: 'Calculate profitability by subtracting total costs (seeds, fertilizer, labor, equipment) from total revenue (yield × market price). Track costs per hectare and yield per hectare to determine profit margins and ROI.',
    category: 'Farm Economics',
    keywords: ['profitability', 'costs', 'revenue', 'yield', 'roi', 'margins']
  },

  // Technology and Innovation
  {
    id: 'tech1',
    question: 'How can IoT sensors help my farm?',
    answer: 'IoT sensors monitor soil moisture, pH, temperature, and humidity in real-time. This data helps optimize irrigation, detect problems early, and make informed decisions about fertilization and pest control, leading to better yields.',
    category: 'Technology',
    keywords: ['iot', 'sensors', 'moisture', 'ph', 'temperature', 'irrigation']
  },
  {
    id: 'tech2',
    question: 'What is precision agriculture?',
    answer: 'Precision agriculture uses technology like GPS, sensors, and data analysis to optimize farming practices. It involves applying the right amount of inputs (water, fertilizer, pesticides) at the right time and place for maximum efficiency.',
    category: 'Technology',
    keywords: ['precision', 'agriculture', 'gps', 'sensors', 'optimization', 'efficiency']
  },

  // Organic Farming
  {
    id: 'organic1',
    question: 'How do I start organic farming?',
    answer: 'Start organic farming by eliminating synthetic chemicals, building soil health with compost and organic matter, using natural pest control methods, and obtaining organic certification. Focus on biodiversity and sustainable practices.',
    category: 'Organic Farming',
    keywords: ['organic', 'synthetic', 'chemicals', 'compost', 'certification', 'biodiversity']
  },
  {
    id: 'organic2',
    question: 'What are natural alternatives to chemical pesticides?',
    answer: 'Natural pesticide alternatives include neem oil, diatomaceous earth, beneficial insects, companion planting, crop rotation, and homemade sprays using garlic, soap, or chili peppers. These methods are safer for environment and health.',
    category: 'Organic Farming',
    keywords: ['natural', 'pesticides', 'neem', 'diatomaceous', 'companion', 'garlic', 'soap']
  },

  // Post-Harvest
  {
    id: 'harvest1',
    question: 'How do I properly store harvested maize?',
    answer: 'Store maize in clean, dry containers with moisture content below 14%. Use airtight storage to prevent pest infestation. Add diatomaceous earth or ash to deter insects. Keep storage area cool and well-ventilated.',
    category: 'Post-Harvest',
    keywords: ['storage', 'maize', 'moisture', 'airtight', 'diatomaceous', 'insects']
  },
  {
    id: 'harvest2',
    question: 'When should I harvest my vegetables for best quality?',
    answer: 'Harvest vegetables early morning when temperatures are cool. Pick tomatoes when they start turning color, leafy greens before flowering, and root vegetables when they reach desired size. Regular harvesting encourages continued production.',
    category: 'Post-Harvest',
    keywords: ['harvest', 'vegetables', 'morning', 'tomatoes', 'leafy greens', 'root vegetables']
  },

  // Livestock Integration
  {
    id: 'livestock1',
    question: 'How can I integrate livestock with crop farming?',
    answer: 'Integrate livestock through rotational grazing on crop residues, using animal manure for fertilizer, and practicing silvopasture. Animals can graze cover crops and provide additional income while improving soil fertility.',
    category: 'Integrated Farming',
    keywords: ['livestock', 'integration', 'grazing', 'manure', 'silvopasture', 'cover crops']
  },

  // Climate Change Adaptation
  {
    id: 'climate1',
    question: 'How do I adapt my farming to climate change?',
    answer: 'Adapt to climate change by choosing drought-resistant varieties, implementing water conservation techniques, diversifying crops, using climate-smart agriculture practices, and adjusting planting dates based on changing weather patterns.',
    category: 'Climate Adaptation',
    keywords: ['climate change', 'drought-resistant', 'water conservation', 'diversification', 'climate-smart']
  },

  // Financial Management
  {
    id: 'finance1',
    question: 'How do I access agricultural loans in Zambia?',
    answer: 'Access agricultural loans through commercial banks, microfinance institutions, and government programs like FISP. Prepare a business plan, collateral documentation, and farming records. Consider group lending schemes for better terms.',
    category: 'Finance',
    keywords: ['loans', 'banks', 'microfinance', 'fisp', 'business plan', 'collateral']
  },

  // Sustainable Practices
  {
    id: 'sustain1',
    question: 'What is conservation agriculture?',
    answer: 'Conservation agriculture involves minimal soil disturbance, permanent soil cover with crop residues or cover crops, and crop rotation. This practice improves soil health, reduces erosion, and increases water retention while maintaining yields.',
    category: 'Sustainable Farming',
    keywords: ['conservation', 'agriculture', 'minimal tillage', 'soil cover', 'rotation', 'erosion']
  },

  // Pest and Disease Management (Additional)
  {
    id: 'pest4',
    question: 'How do I identify and treat aphids on my crops?',
    answer: 'Aphids are small, soft-bodied insects that cluster on leaves and stems. They cause yellowing, stunted growth, and sticky honeydew. Treat with neem oil, insecticidal soap, or introduce beneficial insects like ladybugs. Remove heavily infested leaves.',
    category: 'Pest Control',
    keywords: ['aphids', 'insects', 'yellowing', 'honeydew', 'neem oil', 'ladybugs']
  },
  {
    id: 'disease4',
    question: 'What is downy mildew and how do I treat it?',
    answer: 'Downy mildew appears as yellow patches on upper leaf surfaces with fuzzy gray-white growth underneath. It thrives in cool, wet conditions. Treat with copper-based fungicides, improve air circulation, and avoid overhead watering.',
    category: 'Disease Management',
    keywords: ['downy mildew', 'yellow patches', 'fuzzy growth', 'copper fungicide', 'air circulation']
  },
  {
    id: 'disease5',
    question: 'How do I recognize and manage fusarium wilt?',
    answer: 'Fusarium wilt causes yellowing and wilting of lower leaves that progresses upward. Cut stems show brown discoloration. Remove infected plants immediately, practice crop rotation, use resistant varieties, and improve soil drainage.',
    category: 'Disease Management',
    keywords: ['fusarium wilt', 'yellowing', 'wilting', 'brown stem', 'resistant varieties', 'drainage']
  }
];

export const getAIResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // Find matching questions based on keywords
  const matches = aiQuestions.filter(q => 
    q.keywords.some(keyword => input.includes(keyword)) ||
    input.includes(q.question.toLowerCase())
  );

  if (matches.length > 0) {
    // Return the best match (first one found)
    return matches[0].answer;
  }

  // Default responses for common greetings and general questions
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return "Hello! I'm your AI farming assistant. I can help you with crop management, pest control, soil health, weather advice, and much more. What farming question do you have today?";
  }

  if (input.includes('help') || input.includes('what can you do')) {
    return "I can help you with:\n• Crop planting and management advice\n• Pest and disease identification\n• Soil health and fertilization\n• Weather-based farming decisions\n• Market timing and pricing\n• Organic farming practices\n• Post-harvest storage\n• Financial planning\n\nJust ask me any farming question!";
  }

  // Generic helpful response
  return "I'd be happy to help with your farming question! I have knowledge about crop management, pest control, soil health, weather patterns, market timing, and sustainable farming practices in Zambia. Could you please be more specific about what you'd like to know?";
};