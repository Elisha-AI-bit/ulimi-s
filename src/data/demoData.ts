import { User, Farm, Crop, Product, Order, WeatherData, NewsItem, ForumPost, IoTSensor, PriceData } from '../types';

export const demoUsers: User[] = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@ulimi.com',
    phone: '+260 977 123456',
    role: 'admin',
    location: 'Lusaka',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'farmer1',
    name: 'Joseph Mwanza',
    email: 'joseph@farmer.com',
    phone: '+260 955 789123',
    role: 'farmer',
    location: 'Lusaka Province',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'farmer2',
    name: 'Mary Banda',
    email: 'mary@farmer.com',
    phone: '+260 966 456789',
    role: 'farmer',
    location: 'Copperbelt Province',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    createdAt: '2024-01-20T14:15:00Z'
  },
  {
    id: 'customer1',
    name: 'Peter Sakala',
    email: 'peter@customer.com',
    phone: '+260 977 321654',
    role: 'customer',
    location: 'Lusaka',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    createdAt: '2024-02-01T09:00:00Z'
  },
  {
    id: 'customer2',
    name: 'Grace Mulenga',
    email: 'grace@customer.com',
    phone: '+260 955 987654',
    role: 'customer',
    location: 'Ndola',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    createdAt: '2024-02-05T11:30:00Z'
  }
];

export const demoFarms: Farm[] = [
  {
    id: 'farm1',
    name: 'Mwanza Family Farm',
    farmerId: 'farmer1',
    location: 'Chongwe District, Lusaka',
    size: 25,
    soilType: 'Clay loam',
    coordinates: { lat: -15.7942, lng: 28.6423 },
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'farm2',
    name: 'Green Valley Farm',
    farmerId: 'farmer1',
    location: 'Kafue District, Lusaka',
    size: 40,
    soilType: 'Sandy loam',
    coordinates: { lat: -15.7694, lng: 28.1814 },
    createdAt: '2024-02-01T08:00:00Z'
  },
  {
    id: 'farm3',
    name: 'Banda Organic Farm',
    farmerId: 'farmer2',
    location: 'Kitwe District, Copperbelt',
    size: 15,
    soilType: 'Loamy',
    coordinates: { lat: -12.8024, lng: 28.2132 },
    createdAt: '2024-01-20T14:15:00Z'
  }
];

export const demoCrops: Crop[] = [
  {
    id: 'crop1',
    farmId: 'farm1',
    type: 'Maize',
    variety: 'SC627',
    plantingDate: '2024-11-15',
    expectedHarvest: '2025-04-15',
    status: 'growing',
    area: 10,
    inputs: [
      {
        id: 'input1',
        type: 'fertilizer',
        name: 'NPK 10:20:10',
        amount: 50,
        unit: 'kg',
        cost: 1250,
        date: '2024-11-20'
      }
    ]
  },
  {
    id: 'crop2',
    farmId: 'farm1',
    type: 'Tomatoes',
    variety: 'Roma',
    plantingDate: '2024-10-01',
    expectedHarvest: '2024-12-15',
    status: 'flowering',
    area: 5,
    inputs: [
      {
        id: 'input2',
        type: 'pesticide',
        name: 'Fungicide',
        amount: 2,
        unit: 'liters',
        cost: 400,
        date: '2024-11-01'
      }
    ]
  },
  {
    id: 'crop3',
    farmId: 'farm3',
    type: 'Cabbage',
    variety: 'Green Express',
    plantingDate: '2024-09-01',
    expectedHarvest: '2024-12-01',
    status: 'harvesting',
    area: 8,
    inputs: []
  }
];

export const demoProducts: Product[] = [
  {
    id: 'product1',
    farmerId: 'farmer1',
    farmId: 'farm1',
    cropId: 'crop2',
    name: 'Fresh Roma Tomatoes',
    category: 'Vegetables',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 12,
    description: 'Fresh, organic Roma tomatoes perfect for cooking',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    status: 'approved',
    location: 'Chongwe District, Lusaka',
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'product2',
    farmerId: 'farmer2',
    farmId: 'farm3',
    cropId: 'crop3',
    name: 'Organic Cabbage',
    category: 'Vegetables',
    quantity: 200,
    unit: 'kg',
    pricePerUnit: 8,
    description: 'Organically grown green cabbage, chemical-free',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    status: 'approved',
    location: 'Kitwe District, Copperbelt',
    createdAt: '2024-11-05T14:30:00Z'
  },
  {
    id: 'product3',
    farmerId: 'farmer1',
    farmId: 'farm2',
    cropId: 'crop1',
    name: 'White Maize',
    category: 'Grains',
    quantity: 1000,
    unit: 'kg',
    pricePerUnit: 6,
    description: 'High-quality white maize for immediate delivery',
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    status: 'pending',
    location: 'Kafue District, Lusaka',
    createdAt: '2024-11-10T09:15:00Z'
  }
];

export const demoOrders: Order[] = [
  {
    id: 'order1',
    customerId: 'customer1',
    items: [
      {
        id: 'item1',
        productId: 'product1',
        quantity: 50,
        pricePerUnit: 12,
        total: 600
      }
    ],
    total: 600,
    status: 'confirmed',
    shippingAddress: 'Kabulonga, Lusaka',
    createdAt: '2024-11-08T16:45:00Z'
  }
];

export const demoWeatherData: WeatherData[] = [
  {
    province: 'Lusaka',
    temperature: 28,
    humidity: 65,
    rainfall: 15,
    forecast: 'Partly cloudy with chance of rain',
    icon: '⛅'
  },
  {
    province: 'Copperbelt',
    temperature: 26,
    humidity: 70,
    rainfall: 25,
    forecast: 'Scattered thunderstorms expected',
    icon: '⛈️'
  },
  {
    province: 'Eastern',
    temperature: 30,
    humidity: 55,
    rainfall: 5,
    forecast: 'Sunny and dry',
    icon: '☀️'
  },
  {
    province: 'Southern',
    temperature: 32,
    humidity: 45,
    rainfall: 0,
    forecast: 'Hot and dry conditions',
    icon: '🌡️'
  }
];

export const demoNews: NewsItem[] = [
  {
    id: 'news1',
    title: 'Government Launches New Agricultural Subsidy Program',
    summary: 'The Zambian government announces a K50 million subsidy program to support smallholder farmers.',
    content: 'The Ministry of Agriculture has launched a comprehensive subsidy program aimed at supporting smallholder farmers across the country. The program will provide subsidized fertilizers, seeds, and farming equipment to boost agricultural productivity.',
    category: 'Government',
    image: 'https://images.pexels.com/photos/3965530/pexels-photo-3965530.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    author: 'Agriculture Ministry',
    publishedAt: '2024-11-10T08:00:00Z'
  },
  {
    id: 'news2',
    title: 'Maize Prices Show Upward Trend in Lusaka Markets',
    summary: 'Local maize prices have increased by 15% over the past month due to seasonal demand.',
    content: 'Market analysis shows that maize prices in Lusaka have been steadily increasing due to higher demand from processing companies and reduced supply from last season\'s harvest.',
    category: 'Market',
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    author: 'Market Reporter',
    publishedAt: '2024-11-08T12:30:00Z'
  }
];

export const demoForumPosts: ForumPost[] = [
  {
    id: 'post1',
    userId: 'farmer1',
    title: 'Best practices for maize farming in Lusaka Province',
    content: 'I\'ve been farming maize for 10 years and wanted to share some insights on soil preparation and timing for planting in our region.',
    category: 'Crops',
    likes: 15,
    replies: [
      {
        id: 'reply1',
        userId: 'farmer2',
        content: 'Thank you for sharing! I\'ve found similar results with early planting in October.',
        likes: 3,
        createdAt: '2024-11-05T14:20:00Z'
      }
    ],
    createdAt: '2024-11-03T10:15:00Z'
  },
  {
    id: 'post2',
    userId: 'customer1',
    title: 'Looking for reliable tomato suppliers',
    content: 'I run a small restaurant and need consistent supply of quality tomatoes. Any recommendations?',
    category: 'Marketplace',
    likes: 8,
    replies: [],
    createdAt: '2024-11-07T16:45:00Z'
  }
];

export const demoIoTSensors: IoTSensor[] = [
  {
    id: 'sensor1',
    farmId: 'farm1',
    type: 'soil_moisture',
    name: 'Field 1 Moisture Sensor',
    value: 65,
    unit: '%',
    status: 'online',
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'sensor2',
    farmId: 'farm1',
    type: 'ph_level',
    name: 'Field 1 pH Sensor',
    value: 6.8,
    unit: 'pH',
    status: 'online',
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'sensor3',
    farmId: 'farm1',
    type: 'water_tank',
    name: 'Main Water Tank',
    value: 80,
    unit: '%',
    status: 'online',
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'sensor4',
    farmId: 'farm3',
    type: 'soil_moisture',
    name: 'Organic Field Moisture',
    value: 70,
    unit: '%',
    status: 'online',
    lastUpdate: new Date().toISOString()
  }
];

export const demoPriceData: PriceData[] = [
  {
    crop: 'Maize',
    prices: [
      { date: '2024-01-01', price: 5.2 },
      { date: '2024-02-01', price: 5.5 },
      { date: '2024-03-01', price: 6.0 },
      { date: '2024-04-01', price: 6.2 },
      { date: '2024-05-01', price: 5.8 },
      { date: '2024-06-01', price: 5.5 },
      { date: '2024-07-01', price: 5.9 },
      { date: '2024-08-01', price: 6.1 },
      { date: '2024-09-01', price: 6.3 },
      { date: '2024-10-01', price: 6.5 },
      { date: '2024-11-01', price: 6.8 }
    ],
    prediction: [
      { date: '2024-12-01', predictedPrice: 7.0 },
      { date: '2025-01-01', predictedPrice: 7.2 },
      { date: '2025-02-01', predictedPrice: 7.1 }
    ]
  },
  {
    crop: 'Tomatoes',
    prices: [
      { date: '2024-01-01', price: 10.5 },
      { date: '2024-02-01', price: 11.0 },
      { date: '2024-03-01', price: 12.5 },
      { date: '2024-04-01', price: 13.2 },
      { date: '2024-05-01', price: 11.8 },
      { date: '2024-06-01', price: 10.5 },
      { date: '2024-07-01', price: 11.9 },
      { date: '2024-08-01', price: 12.1 },
      { date: '2024-09-01', price: 13.3 },
      { date: '2024-10-01', price: 12.5 },
      { date: '2024-11-01', price: 12.8 }
    ],
    prediction: [
      { date: '2024-12-01', predictedPrice: 13.0 },
      { date: '2025-01-01', predictedPrice: 13.5 },
      { date: '2025-02-01', predictedPrice: 12.9 }
    ]
  },
  {
    crop: 'Cabbage',
    prices: [
      { date: '2024-01-01', price: 7.2 },
      { date: '2024-02-01', price: 7.5 },
      { date: '2024-03-01', price: 8.0 },
      { date: '2024-04-01', price: 8.2 },
      { date: '2024-05-01', price: 7.8 },
      { date: '2024-06-01', price: 7.5 },
      { date: '2024-07-01', price: 7.9 },
      { date: '2024-08-01', price: 8.1 },
      { date: '2024-09-01', price: 8.3 },
      { date: '2024-10-01', price: 8.5 },
      { date: '2024-11-01', price: 8.8 }
    ],
    prediction: [
      { date: '2024-12-01', predictedPrice: 9.0 },
      { date: '2025-01-01', predictedPrice: 9.2 },
      { date: '2025-02-01', predictedPrice: 8.9 }
    ]
  }
];