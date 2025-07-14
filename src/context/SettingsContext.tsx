// src/context/SettingsContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ShopSettings } from '../settingsTypes';
import { DEFAULT_SETTINGS } from '../settingsTypes';

interface SettingsContextType {
  settings: ShopSettings;
  updateSettings: (newSettings: Partial<ShopSettings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<ShopSettings>(() => {
    // Load settings from localStorage if available, otherwise use defaults
    const savedSettings = localStorage.getItem('barberShopSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });

  // Function to apply theme to document - THIS IS THE KEY MISSING PIECE!
  const applyTheme = (appearance: ShopSettings['appearance']) => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-light', 'theme-dark');
    
    // Apply new theme class
    if (appearance.theme === 'dark') {
      root.classList.add('theme-dark');
    } else if (appearance.theme === 'light') {
      root.classList.add('theme-light');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
    }
    
    // Apply primary color as CSS custom property
    root.style.setProperty('--primary-color', appearance.primaryColor);
    
    // Convert hex to RGB for transparency effects
    const hex = appearance.primaryColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    root.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);
    
    // Apply orange color based on primary color (for buttons, etc.)
    root.style.setProperty('--orange-500', appearance.primaryColor);
    root.style.setProperty('--orange-600', appearance.primaryColor);
    root.style.setProperty('--orange-700', `rgba(${r}, ${g}, ${b}, 0.9)`);
  };

  // Apply theme when component mounts
  useEffect(() => {
    applyTheme(settings.appearance);
  }, []);

  // Apply theme whenever appearance settings change - THIS MAKES IT WORK INSTANTLY!
  useEffect(() => {
    applyTheme(settings.appearance);
  }, [settings.appearance]);

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('barberShopSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<ShopSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};