import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Farm, Crop, Product, Order, IoTSensor, User } from '../types';
import { demoFarms, demoCrops, demoProducts, demoOrders, demoIoTSensors, demoUsers } from '../data/demoData';

interface AppContextType {
  // Farms
  farms: Farm[];
  addFarm: (farm: Omit<Farm, 'id' | 'createdAt'>) => void;
  updateFarm: (farmId: string, updates: Partial<Farm>) => void;
  deleteFarm: (farmId: string) => void;
  
  // Crops
  crops: Crop[];
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (cropId: string, updates: Partial<Crop>) => void;
  deleteCrop: (cropId: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // IoT Sensors
  iotSensors: IoTSensor[];
  
  // Cart
  cart: { productId: string; quantity: number }[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  // Users (for admin)
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  
  // Data persistence
  saveData: () => void;
  loadData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [farms, setFarms] = useState<Farm[]>(() => {
    const saved = localStorage.getItem('ulimi_farms');
    return saved ? JSON.parse(saved) : demoFarms;
  });
  const [crops, setCrops] = useState<Crop[]>(() => {
    const saved = localStorage.getItem('ulimi_crops');
    return saved ? JSON.parse(saved) : demoCrops;
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ulimi_products');
    return saved ? JSON.parse(saved) : demoProducts;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ulimi_orders');
    return saved ? JSON.parse(saved) : demoOrders;
  });
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('ulimi_users');
    return saved ? JSON.parse(saved) : demoUsers;
  });
  const [iotSensors] = useState<IoTSensor[]>(demoIoTSensors);
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);

  // Save data to localStorage whenever state changes
  React.useEffect(() => {
    localStorage.setItem('ulimi_farms', JSON.stringify(farms));
  }, [farms]);

  React.useEffect(() => {
    localStorage.setItem('ulimi_crops', JSON.stringify(crops));
  }, [crops]);

  React.useEffect(() => {
    localStorage.setItem('ulimi_products', JSON.stringify(products));
  }, [products]);

  React.useEffect(() => {
    localStorage.setItem('ulimi_orders', JSON.stringify(orders));
  }, [orders]);

  React.useEffect(() => {
    localStorage.setItem('ulimi_users', JSON.stringify(users));
  }, [users]);

  // Farm operations
  const addFarm = (farmData: Omit<Farm, 'id' | 'createdAt'>) => {
    const newFarm: Farm = {
      ...farmData,
      id: `farm_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setFarms(prev => [...prev, newFarm]);
  };

  const updateFarm = (farmId: string, updates: Partial<Farm>) => {
    setFarms(prev => prev.map(farm => 
      farm.id === farmId ? { ...farm, ...updates } : farm
    ));
  };

  const deleteFarm = (farmId: string) => {
    setFarms(prev => prev.filter(farm => farm.id !== farmId));
    setCrops(prev => prev.filter(crop => crop.farmId !== farmId));
    setProducts(prev => prev.filter(product => product.farmId !== farmId));
  };

  // Crop operations
  const addCrop = (cropData: Omit<Crop, 'id'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop_${Date.now()}`
    };
    setCrops(prev => [...prev, newCrop]);
  };

  const updateCrop = (cropId: string, updates: Partial<Crop>) => {
    setCrops(prev => prev.map(crop => 
      crop.id === cropId ? { ...crop, ...updates } : crop
    ));
  };

  const deleteCrop = (cropId: string) => {
    setCrops(prev => prev.filter(crop => crop.id !== cropId));
    setProducts(prev => prev.filter(product => product.cropId !== cropId));
  };

  // Product operations
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `product_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === productId ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  // Order operations
  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  // Cart operations
  const addToCart = (productId: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // User operations
  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    // Clean up related data
    const userFarms = farms.filter(f => f.farmerId === userId);
    userFarms.forEach(farm => deleteFarm(farm.id));
    setOrders(prev => prev.filter(order => order.customerId !== userId));
  };

  // Data persistence
  const saveData = () => {
    localStorage.setItem('ulimi_farms', JSON.stringify(farms));
    localStorage.setItem('ulimi_crops', JSON.stringify(crops));
    localStorage.setItem('ulimi_products', JSON.stringify(products));
    localStorage.setItem('ulimi_orders', JSON.stringify(orders));
    localStorage.setItem('ulimi_users', JSON.stringify(users));
  };

  const loadData = () => {
    const savedFarms = localStorage.getItem('ulimi_farms');
    const savedCrops = localStorage.getItem('ulimi_crops');
    const savedProducts = localStorage.getItem('ulimi_products');
    const savedOrders = localStorage.getItem('ulimi_orders');
    const savedUsers = localStorage.getItem('ulimi_users');

    if (savedFarms) setFarms(JSON.parse(savedFarms));
    if (savedCrops) setCrops(JSON.parse(savedCrops));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  };
  const value = {
    farms,
    addFarm,
    updateFarm,
    deleteFarm,
    crops,
    addCrop,
    updateCrop,
    deleteCrop,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    addOrder,
    updateOrderStatus,
    iotSensors,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    users,
    addUser,
    updateUser,
    deleteUser,
    saveData,
    loadData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};