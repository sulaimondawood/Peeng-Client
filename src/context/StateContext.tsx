import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Toast } from '../types';

interface StateContextType {
  // Theme
  theme: 'dark';
  setTheme: (t: 'dark') => void;
  toggleTheme: () => void;

  // Sidebar responsive collapse states
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (c: boolean) => void;
  sidebarMobileOpen: boolean;
  setSidebarMobileOpen: (open: boolean) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {

  // Theme State
  const [theme, setTheme] = useState<'dark'>('dark');


  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);


  // Toast State & Handler
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };



  // Enforce dark mode on HTML element
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    // Theme is permanently set to dark
  };



  return (
    <StateContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      sidebarCollapsed,
      setSidebarCollapsed,
      sidebarMobileOpen,
      setSidebarMobileOpen,
      toasts,
      addToast
    }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
}
