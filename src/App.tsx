// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Appointments from './pages/Appointments';
import Services from './pages/Services';
import Staff from './pages/Staff';
import Settings from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import { SettingsProvider } from './context/SettingsContext';
import Profile from './pages/Profile';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/services" element={<Services />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;