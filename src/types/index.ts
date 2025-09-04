export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'farmer' | 'customer';
  location: string;
  avatar?: string;
  createdAt: string;
}

export interface Farm {
  id: string;
  name: string;
  farmerId: string;
  location: string;
  size: number;
  soilType: string;
  coordinates: { lat: number; lng: number };
  createdAt: string;
}

export interface Crop {
  id: string;
  farmId: string;
  type: string;
  variety: string;
  plantingDate: string;
  expectedHarvest: string;
  status: 'planted' | 'growing' | 'flowering' | 'harvesting' | 'harvested';
  area: number;
  inputs: CropInput[];
  yield?: number;
}

export interface CropInput {
  id: string;
  type: 'fertilizer' | 'pesticide' | 'water' | 'labor';
  name: string;
  amount: number;
  unit: string;
  cost: number;
  date: string;
}

export interface Product {
  id: string;
  farmerId: string;
  farmId: string;
  cropId: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  description: string;
  image: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  location: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export interface WeatherData {
  province: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: string;
  icon: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
}

export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: ForumReply[];
  createdAt: string;
}

export interface ForumReply {
  id: string;
  userId: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface IoTSensor {
  id: string;
  farmId: string;
  type: 'soil_moisture' | 'ph_level' | 'water_tank' | 'temperature';
  name: string;
  value: number;
  unit: string;
  status: 'online' | 'offline';
  lastUpdate: string;
}

export interface PriceData {
  crop: string;
  prices: {
    date: string;
    price: number;
  }[];
  prediction: {
    date: string;
    predictedPrice: number;
  }[];
}