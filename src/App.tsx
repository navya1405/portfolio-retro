import React, { useState } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import { AppProvider } from './context/AppContext';
import StartMenu from './components/StartMenu';
import Windows from './components/Windows';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Loading onComplete={() => setIsLoading(false)} />;
  }

  return (
    <AppProvider>
      <div className="min-h-screen w-full flex items-start justify-center bg-pink-bg py-10">
        <div className="os-container">
          {/* Top Title Bar - thick bordered rectangle */}
          <div className="title-bar">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center">
                <span className="text-white text-xs font-pixel">Navya.OS</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white text-xs">32°C</span>
                <div className="w-4 h-4 bg-yellow-400"></div> {/* Weather icon */}
              </div>
            </div>
          </div>

          {/* Main Desktop Area */}
          <div className="desktop-area">
            <Desktop />
            <Windows />
            <StartMenu />
          </div>

          {/* Bottom Taskbar - thick bordered rectangle */}
          <div className="taskbar-wrapper">
            <Taskbar />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;