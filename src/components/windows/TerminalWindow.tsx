import React, { useEffect, useState, useRef } from 'react';
import Typewriter from 'typewriter-effect';

const TerminalWindow: React.FC = () => {
  const [isTyping, setIsTyping] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom whenever command history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory, isTyping]);
  
  useEffect(() => {
    // Focus on the window when it opens
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 9000); // Adjust timing based on typewriter duration
    
    // Add global key listener to complete typing on Enter
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isTyping) {
        setIsTyping(false);
        clearTimeout(timer);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyPress);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, [isTyping]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      processCommand(currentCommand);
      setCurrentCommand('');
    }
  };
  
  const processCommand = (command: string) => {
    let response = '';
    
    // Simple command processing
    const cmd = command.toLowerCase().trim();
    
    if (cmd === 'help') {
      response = `
Available commands:
- about: Learn about me
- skills: See my technical skills
- projects: View my portfolio
- contact: Get in touch
- clear: Clear the terminal
- help: Show this help menu
      `;
    } else if (cmd === 'about') {
      response = "I'm Navya, a web developer specializing in creating interactive web experiences.";
    } else if (cmd === 'skills') {
      response = "My skills include React, TypeScript, Node.js, Java, UI/UX Design, and more.";
    } else if (cmd === 'projects') {
      response = "I've worked on e-commerce platforms, Machine Learning Projects, and creative portfolio sites.";
    } else if (cmd === 'contact') {
      response = "Email: navyasreeboddu@gmail.com\nGitHub: github.com/navya1405";
    } else if (cmd === 'clear') {
      setCommandHistory([]);
      return;
    } else {
      response = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    
    setCommandHistory([...commandHistory, `> ${command}`, response]);
  };

  return (
    <div className="p-2 h-full flex flex-col">
      <div 
        ref={terminalRef}
        className="bg-black text-green-400 p-2 flex-1 font-mono text-xs overflow-auto"
      >
        {isTyping ? (
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("> Hello, welcome to my portfolio!")
                .pauseFor(500)
                .typeString("<br />")
                .typeString("> I'm Navya.")
                .pauseFor(500)
                .typeString("<br />")
                .typeString("> I build responsive and interactive websites.")
                .pauseFor(500)
                .typeString("<br />")
                .typeString("> Type 'help' to see available commands.")
                .start();
            }}
          />
        ) : (
          <>
            <div className="mb-4">
              <div>{'>'} Hello, welcome to my portfolio!</div>
              <div>{'>'} I'm Navya.</div>
              <div>{'>'} I build responsive and interactive websites.</div>
              <div>{'>'} Type 'help' to see available commands.</div>
            </div>
            
            {commandHistory.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">{line}</div>
            ))}
            
            <div className="flex">
              <span className="mr-1">{'>'}</span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none border-none flex-1 text-green-400"
                autoFocus
              />
              <span className="typing-cursor">|</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TerminalWindow;