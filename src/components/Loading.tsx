import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const Loading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing OS...');

  useEffect(() => {
    const texts = [
      'Initializing OS...',
      'Loading pixel memories...',
      'Generating dreams...',
      'Starting up...'
    ];
    
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 2000);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(textInterval);
          onComplete();
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-pink-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-pink-light p-6 border-4 border-pink-dark pixel-border">
          <div className="flex items-center justify-center mb-6">
            <Heart className="text-pink-primary w-8 h-8 animate-pulse" />
            <h1 className="text-pink-primary text-xl ml-2">Navya.OS</h1>
          </div>
          
          <div className="mb-4">
            <div className="bg-pink-bg border-2 border-pink-dark h-6 pixel-border">
              <div 
                className="h-full bg-pink-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-pink-dark">{loadingText}</p>
            <p className="text-xs text-pink-dark mt-2">{progress}%</p>
          </div>
        </div>
      </div>
      
      {/* Decorative pixels */}
      <div className="fixed bottom-16 right-16 w-4 h-4 bg-pink-bright animate-float" />
      <div className="fixed bottom-20 right-20 w-3 h-3 bg-pink-primary animate-float" />
      <div className="fixed bottom-24 right-12 w-2 h-2 bg-pink-dark animate-float" />
    </div>
  );
};

export default Loading;