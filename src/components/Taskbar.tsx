import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Heart, X } from 'lucide-react';

const Taskbar: React.FC = () => {
  const { 
    windows, 
    activeWindow, 
    isStartMenuOpen,
    toggleStartMenu, 
    restoreWindow,
    closeWindow
  } = useAppContext();

  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
      
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
      setDate(now.toLocaleDateString(undefined, options));
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="taskbar-container">
      <button 
        className={`taskbar-button flex items-center ${isStartMenuOpen ? 'active' : ''}`}
        onClick={toggleStartMenu}
      >
        <Heart size={12} className="mr-1 fill-white" color="white" />
        Start
      </button>

      <div className="h-6 border-r-2 border-pink-dark mx-1"></div>

      <div className="flex-1 flex overflow-x-auto py-1">
        {windows
          .filter(window => window.isOpen)
          .map(window => (
            <div
              key={window.id}
              className={`taskbar-button-container flex items-center max-w-xs ${activeWindow === window.id ? 'active' : ''}`}
            >
              <button
                className="taskbar-button-main truncate flex-1"
                onClick={() => restoreWindow(window.id)}
              >
                {window.title}
              </button>
              <button
                className="taskbar-close-button ml-1 p-1 hover:bg-pink-primary hover:bg-opacity-20 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(window.id);
                }}
              >
                <X size={10} />
              </button>
            </div>
          ))}
      </div>

      <div className="h-6 border-r-2 border-pink-dark mx-1"></div>

      <div className="taskbar-button text-xs text-white">
        {date}
      </div>

      <div className="taskbar-button flex items-center text-xs">
        <div className="mr-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        {time}
      </div>
    </div>
  );
};

export default Taskbar;