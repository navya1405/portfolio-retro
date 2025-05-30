import React from 'react';
import { useAppContext } from '../context/AppContext';
import Window from './Window';
import HomeWindow from './windows/HomeWindow';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';
import ContactWindow from './windows/ContactWindow';
import TerminalWindow from './windows/TerminalWindow';

const Windows: React.FC = () => {
  const { windows } = useAppContext();

  const renderWindowContent = (window: any) => {
    switch (window.type) {
      case 'home':
        return <HomeWindow />;
      case 'about':
        return <AboutWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'terminal':
        return <TerminalWindow />;
      default:
        return <div>Window content not available</div>;
    }
  };

  return (
    <>
      {windows.map(window => (
        <Window key={window.id} window={window}>
          {renderWindowContent(window)}
        </Window>
      ))}
    </>
  );
};

export default Windows