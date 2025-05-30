import React, { useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useAppContext, Window as WindowType } from '../context/AppContext';
import { Minimize2, Maximize2, X, Minimize } from 'lucide-react';

interface WindowProps {
  window: WindowType;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ window: windowData, children }) => {
  const { 
    activeWindow, 
    setActiveWindow, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize
  } = useAppContext();

  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (windowRef.current && activeWindow === windowData.id) {
      windowRef.current.focus();
    }
  }, [activeWindow, windowData.id]);

  // Function to ensure window is visible by scrolling if necessary
  const ensureWindowVisible = (x: number, y: number, width: number, height: number) => {
    const scrollMargin = 50; // Margin from viewport edge
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Calculate if window extends beyond viewport
    const windowRight = x + width;
    const windowBottom = y + height;
    const viewportRight = scrollX + viewportWidth;
    const viewportBottom = scrollY + viewportHeight;

    let newScrollX = scrollX;
    let newScrollY = scrollY;

    // Check horizontal scrolling
    if (windowRight > viewportRight - scrollMargin) {
      newScrollX = windowRight - viewportWidth + scrollMargin;
    } else if (x < scrollX + scrollMargin) {
      newScrollX = Math.max(0, x - scrollMargin);
    }

    // Check vertical scrolling
    if (windowBottom > viewportBottom - scrollMargin) {
      newScrollY = windowBottom - viewportHeight + scrollMargin;
    } else if (y < scrollY + scrollMargin) {
      newScrollY = Math.max(0, y - scrollMargin);
    }

    // Smooth scroll to new position if needed
    if (newScrollX !== scrollX || newScrollY !== scrollY) {
      window.scrollTo({
        left: newScrollX,
        top: newScrollY,
        behavior: 'smooth'
      });
    }
  };

  if (windowData.isMinimized) return null;

  const isActive = activeWindow === windowData.id;
  const isMaximized = windowData.isMaximized;

  return (
    <Rnd
      className={`window ${isActive ? 'window-active' : 'window-inactive'} ${windowData.isNew ? 'window-open' : ''}`}
      style={{ 
        zIndex: windowData.zIndex,
        border: '2px solid var(--dark-contrast)',
        outline: isActive ? '2px solid var(--pink-bright)' : 'none',
      }}
      position={{
        x: windowData.position.x,
        y: windowData.position.y,
      }}
      size={{
        width: windowData.size.width,
        height: windowData.size.height,
      }}
      minWidth={300}
      minHeight={200}
      dragHandleClassName="window-header"
      disableDragging={isMaximized}
      resizeHandleClasses={{
        top: 'react-resizable-handle react-resizable-handle-top',
        right: 'react-resizable-handle react-resizable-handle-right',
        bottom: 'react-resizable-handle react-resizable-handle-bottom',
        left: 'react-resizable-handle react-resizable-handle-left',
        topRight: 'react-resizable-handle react-resizable-handle-top-right',
        bottomRight: 'react-resizable-handle react-resizable-handle-bottom-right',
        bottomLeft: 'react-resizable-handle react-resizable-handle-bottom-left',
        topLeft: 'react-resizable-handle react-resizable-handle-top-left',
      }}
      enableResizing={!isMaximized ? {
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      } : false}
      onDragStop={(e, d) => {
        if (!isMaximized) {
          updateWindowPosition(windowData.id, { x: d.x, y: d.y });
          // Ensure window remains visible after drag
          ensureWindowVisible(d.x, d.y, windowData.size.width, windowData.size.height);
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!isMaximized) {
          const newWidth = parseInt(ref.style.width);
          const newHeight = parseInt(ref.style.height);
          updateWindowSize(windowData.id, {
            width: newWidth,
            height: newHeight,
          });
          updateWindowPosition(windowData.id, position);
          // Ensure window remains visible after resize
          ensureWindowVisible(position.x, position.y, newWidth, newHeight);
        }
      }}
      onClick={() => setActiveWindow(windowData.id)}
    >
      <div 
        ref={windowRef}
        className="flex flex-col h-full focus:outline-none"
        tabIndex={-1}
      >
        <div className="window-header">
          <div className="window-title truncate flex-1">
            {windowData.title}
          </div>
          <div className="flex">
            <button 
              className="window-button bg-pink-light"
              onClick={() => minimizeWindow(windowData.id)}
            >
              <Minimize2 size={10} />
            </button>
            <button 
              className="window-button bg-pink-light"
              onClick={() => maximizeWindow(windowData.id)}
            >
              {isMaximized ? <Minimize size={10} /> : <Maximize2 size={10} />}
            </button>
            <button 
              className="window-button bg-pink-light"
              onClick={() => closeWindow(windowData.id)}
            >
              <X size={10} />
            </button>
          </div>
        </div>
        <div className="window-body flex-1 scanline">
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;