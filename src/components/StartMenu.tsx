import React from 'react';
import { useAppContext, WindowType } from '../context/AppContext';
import { Github, Twitter, Mail, FileText, Heart, Briefcase, Code, Terminal } from 'lucide-react';

const StartMenu: React.FC = () => {
  const { isStartMenuOpen, openWindow, closeStartMenu } = useAppContext();
  
  if (!isStartMenuOpen) return null;
  
  const handleOpenWindow = (type: WindowType) => {
    openWindow(type);
    closeStartMenu();
  };
  
  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeStartMenu();
  };

  return (
    <div 
      className="absolute inset-0 z-50"
      onClick={handleOutsideClick}
    >
      <div 
        className="start-menu absolute left-2 bottom-12 w-48 bg-pink-light border-2 border-dark-contrast shadow-lg pixel-border fadeIn"
        onClick={e => e.stopPropagation()}
      >
        <div className="window-header bg-pink-primary px-2 py-1">
          <span className="flex items-center">
            <Heart size={12} className="mr-1" />
            Navya.OS
          </span>
        </div>
        
        <div className="py-1">
          <div className="px-2 py-1 bg-pink-dark text-white text-xs mb-1">Applications</div>
          
          <MenuItem
            icon={<Heart size={16} color="#A0E6C8" />}
            label="About"
            onClick={() => handleOpenWindow('about')}
          />
          <MenuItem
            icon={<Briefcase size={16} color="#8CD4F5" />}
            label="Projects"
            onClick={() => handleOpenWindow('projects')}
          />
          <MenuItem
            icon={<Code size={16} color="#C8A2FF" />}
            label="Skills"
            onClick={() => handleOpenWindow('skills')}
          />
          <MenuItem
            icon={<Mail size={16} color="#FF8AC3" />}
            label="Contact"
            onClick={() => handleOpenWindow('contact')}
          />
          <MenuItem
            icon={<Terminal size={16} color="#60354C" />}
            label="Terminal"
            onClick={() => handleOpenWindow('terminal')}
          />
          
          <div className="px-2 py-1 bg-pink-dark text-white text-xs my-1">Social</div>
          
          <a href="https://github.com/navya1405" target="_blank" rel="noopener noreferrer">
            <MenuItem
              icon={<Github size={16} />}
              label="GitHub"
            />
          </a>
        </div>
        
        <div className="px-2 py-1 text-xs text-dark-contrast border-t border-dark-contrast mt-1 flex items-center">
          <div className="w-2 h-2 bg-mint-accent rounded-full animate-pulse mr-2"></div>
          <span>Available to work</span>
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick }) => {
  return (
    <div 
      className="flex items-center px-2 py-1 hover:bg-pink-primary cursor-pointer group transition-colors"
      onClick={onClick}
    >
      <div className="w-5 h-5 mr-2 text-pink-dark group-hover:text-white flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs group-hover:text-white">{label}</span>
    </div>
  );
};

export default StartMenu;