import React from 'react';
import { WindowType } from '../context/AppContext';

interface FolderIconProps {
  type: WindowType;
  label: string;
  onClick: () => void;
}

const FolderIcon: React.FC<FolderIconProps> = ({ type, label, onClick }) => {
  return (
    <div 
      className="pixel-folder flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="w-18 h-18 mb-0 flex items-center justify-center">
        <img 
          src={`/icons/${type}.png`} 
          alt={`${type} icon`} 
          className="w-16 h-16 object-cover"
          style={{ 
            imageRendering: 'pixelated',
            width: '48px',
            height: '48px'
          }}
        />
      </div>
      <span className="text-[8.5px] text-center text-dark-contrast leading-tight whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

export default FolderIcon;