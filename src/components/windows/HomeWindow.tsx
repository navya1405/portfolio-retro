import React from 'react';

const HomeWindow: React.FC = () => {
  return (
    <div className="p-2 h-full overflow-auto">
      <div className="bg-pink-light p-4 border-2 border-pink-dark min-h-full flex flex-col justify-center text-center space-y-3">
        <p className="text-xs md:text-sm text-pink-dark max-w-md mx-auto">
          I'm a B.Tech. student and MERN stack web developer passionate about building clean, user-friendly interfaces that blend aesthetics with seamless functionality.
        </p>
        <p className="text-xs md:text-sm text-pink-dark max-w-md mx-auto">
          Currently exploring machine learning and Web3 — I love experimenting with emerging technologies, especially JavaScript frameworks.
        </p>
      </div>
    </div>
  );
};

export default HomeWindow;
