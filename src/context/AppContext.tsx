import React, { createContext, useState, useContext, ReactNode } from 'react';

export type WindowType = 'home' | 'about' | 'projects' | 'skills' | 'contact' | 'terminal';

export interface Window {
  id: string;
  type: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  originalPosition?: { x: number; y: number };
  originalSize?: { width: number; height: number };
  isNew?: boolean;
}

interface AppContextType {
  windows: Window[];
  activeWindow: string | null;
  isStartMenuOpen: boolean;
  openWindow: (type: WindowType) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  setActiveWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const getWindowTitle = (type: WindowType): string => {
  switch (type) {
    case 'home':
      return 'Home.exe';
    case 'about':
      return 'About.exe';
    case 'projects':
      return 'Projects.exe';
    case 'skills':
      return 'Skills.exe';
    case 'contact':
      return 'Contact.exe';
    case 'terminal':
      return 'Terminal.exe';
    default:
      return 'Window';
  }
};

const getWindowSize = (type: WindowType): { width: number; height: number } => {
  switch (type) {
    case 'terminal':
      return { width: 400, height: 300 };
    default:
      return { width: 500, height: 400 };
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(100);

  const openWindow = (type: WindowType) => {
    // Check if window already exists
    const existingWindow = windows.find(w => w.type === type);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        restoreWindow(existingWindow.id);
      }
      setActiveWindow(existingWindow.id);
      return;
    }

    // Calculate position with offset for cascading effect
    const offset = windows.length * 20;
    const position = { 
      x: 100 + offset, 
      y: 100 + offset 
    };

    const newWindow: Window = {
      id: `${type}-${Date.now()}`,
      type,
      title: getWindowTitle(type),
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
      position,
      size: getWindowSize(type),
    };

    setWindows([...windows, newWindow]);
    setActiveWindow(newWindow.id);
    setNextZIndex(nextZIndex + 1);
    closeStartMenu();
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(window => window.id !== id));
    if (activeWindow === id) {
      const remainingWindows = windows.filter(window => window.id !== id && !window.isMinimized);
      if (remainingWindows.length > 0) {
        setActiveWindow(remainingWindows[remainingWindows.length - 1].id);
      } else {
        setActiveWindow(null);
      }
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(
      windows.map(window => 
        window.id === id 
          ? { ...window, isMinimized: true } 
          : window
      )
    );
    
    if (activeWindow === id) {
      const visibleWindows = windows.filter(window => window.id !== id && !window.isMinimized);
      if (visibleWindows.length > 0) {
        setActiveWindow(visibleWindows[visibleWindows.length - 1].id);
      } else {
        setActiveWindow(null);
      }
    }
  };

  const maximizeWindow = (id: string) => {
    setWindows(
      windows.map(window => {
        if (window.id !== id) return window;
        
        if (window.isMaximized) {
          // Restore to original size and position
          return {
            ...window,
            isMaximized: false,
            position: window.originalPosition || window.position,
            size: window.originalSize || window.size,
            originalPosition: undefined,
            originalSize: undefined,
            zIndex: nextZIndex
          };
        } else {
          // Maximize to fill available space (accounting for taskbar)
          const maxWidth = 1080 - 16; // Container width minus padding
          const maxHeight = 720 - 32 - 16; // Container height minus taskbar and padding
          
          return {
            ...window,
            isMaximized: true,
            originalPosition: window.position,
            originalSize: window.size,
            position: { x: 8, y: 8 },
            size: { width: maxWidth, height: maxHeight },
            zIndex: nextZIndex
          };
        }
      })
    );
    setActiveWindow(id);
    setNextZIndex(nextZIndex + 1);
  };

  const restoreWindow = (id: string) => {
    setWindows(
      windows.map(window => 
        window.id === id 
          ? { 
              ...window, 
              isMinimized: false,
              isMaximized: false,
              position: window.originalPosition || window.position,
              size: window.originalSize || window.size,
              originalPosition: undefined,
              originalSize: undefined,
              zIndex: nextZIndex 
            } 
          : window
      )
    );
    setActiveWindow(id);
    setNextZIndex(nextZIndex + 1);
  };

  const setActive = (id: string) => {
    if (id === activeWindow) return;
    
    setWindows(
      windows.map(window => 
        window.id === id 
          ? { ...window, zIndex: nextZIndex } 
          : window
      )
    );
    setActiveWindow(id);
    setNextZIndex(nextZIndex + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(
      windows.map(window => 
        window.id === id 
          ? { ...window, position } 
          : window
      )
    );
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(
      windows.map(window => 
        window.id === id 
          ? { ...window, size } 
          : window
      )
    );
  };

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const closeStartMenu = () => {
    setIsStartMenuOpen(false);
  };

  const value = {
    windows,
    activeWindow,
    isStartMenuOpen,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    setActiveWindow: setActive,
    updateWindowPosition,
    updateWindowSize,
    toggleStartMenu,
    closeStartMenu,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};