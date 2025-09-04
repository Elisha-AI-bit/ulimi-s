import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import LoginForm from './components/Auth/LoginForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Farms from './pages/Farms';
import Crops from './pages/Crops';
import Marketplace from './pages/Marketplace';
import Weather from './pages/Weather';
import Soil from './pages/Soil';
import IoT from './pages/IoT';
import AI from './pages/AI';
import PricePrediction from './pages/PricePrediction';
import Community from './pages/Community';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import News from './pages/News';
import USSD from './pages/USSD';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import Approvals from './pages/Approvals';
import CompareFarms from './pages/CompareFarms';
import LandingPage from './pages/LandingPage';

const ProtectedLayout: React.FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Navigate to="/dashboard" replace />} />
      
      <Route element={<ProtectedLayout />}>
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Farmer Routes */}
        <Route 
          path="/farms" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <Farms />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/crops" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <Crops />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/iot" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <IoT />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ai" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <AI />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/soil" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <Soil />
            </ProtectedRoute>
          } 
        />
        
        {/* Customer Routes */}
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Orders />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Users />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/approvals" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Approvals />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/compare-farms" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CompareFarms />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Analytics />
            </ProtectedRoute>
          } 
        />
        
        {/* Shared Routes */}
        <Route 
          path="/marketplace" 
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/weather" 
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/price-prediction" 
          element={
            <ProtectedRoute>
              <PricePrediction />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/community" 
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/news" 
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ussd" 
          element={
            <ProtectedRoute>
              <USSD />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;