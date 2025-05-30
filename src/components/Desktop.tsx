import React, { useEffect } from 'react';
import { useAppContext, WindowType } from '../context/AppContext';
import FolderIcon from './FolderIcon';

const Desktop: React.FC = () => {
  const { openWindow, closeStartMenu } = useAppContext();
  
  const handleDesktopClick = () => {
    closeStartMenu();
  };

  // Create random pixel stars for background decoration
  useEffect(() => {
    const createStars = () => {
      const desktopElement = document.querySelector('.desktop-background');
      if (!desktopElement) return;
      
      // Remove existing stars first if any
      const existingStars = document.querySelectorAll('.pixel-star');
      existingStars.forEach(star => star.remove());
      
      // Create new stars
      for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'pixel-star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        desktopElement.appendChild(star);
      }
    };
    
    createStars();
    
    // Recreate stars on window resize
    window.addEventListener('resize', createStars);
    return () => window.removeEventListener('resize', createStars);
  }, []);

  return (
    <div 
      className="absolute inset-0 flex flex-col content-start p-4 desktop-background"
      onClick={handleDesktopClick}
    >
      {/* Desktop Icons - positioned at top on mobile, left side on desktop */}
      <div className="desktop-icons">
        <FolderIcon 
          type="home" 
          label="Home.exe"
          onClick={() => openWindow('home')}
        />

        <FolderIcon 
          type="about" 
          label="About.exe"
          onClick={() => openWindow('about')}
        />
        
        <FolderIcon 
          type="projects" 
          label="Projects.exe"
          onClick={() => openWindow('projects')}
        />
        
        <FolderIcon 
          type="skills" 
          label="Skills.exe"
          onClick={() => openWindow('skills')}
        />
        
        <FolderIcon 
          type="contact" 
          label="Contact.exe"
          onClick={() => openWindow('contact')}
        />

        <FolderIcon 
          type="terminal" 
          label="Terminal.exe"
          onClick={() => openWindow('terminal')}
        />
      </div>

      {/* Center Text - positioned below icons on mobile, center on desktop */}
      <div className="flex-1 flex items-center justify-center text-center">
        <div>
          <h1 className="text-lg md:text-3xl mb-2 heading-text text-simple fadeIn">
            Hi, I'm Navyasree
          </h1>
          <h2 className="text-xl md:text-4xl mb-4 subheading-text text-simple fadeIn" style={{animationDelay: '0.3s'}}>
            Web Developer
          </h2>
          <p className="text-xs md:text-sm text-dark-contrast fadeIn" style={{animationDelay: '0.6s'}}>
            Engineer by choice, artist by pixels
            <span className="ml-1 text-pink-primary">🌸</span>
          </p>
          <div className="mt-4 fadeIn" style={{animationDelay: '0.9s'}}>
          </div>
        </div>
      </div>
      
      {/* Decorative pixels - hidden on mobile */}
      <div className="absolute bottom-12 right-12 w-4 h-4 bg-[#5DD4BF] animate-float hidden md:block" style={{ animationDelay: '0.2s' }}></div>
      <div className="absolute bottom-16 right-16 w-3 h-3 bg-[#3CB2F2] animate-float hidden md:block" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 right-8 w-2 h-2 bg-[#C29AFF] animate-float hidden md:block" style={{ animationDelay: '0.8s' }}></div>
    </div>
  );
};

export default Desktop;