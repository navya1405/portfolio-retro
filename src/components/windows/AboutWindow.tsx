import React from 'react';

const AboutWindow: React.FC = () => {
  return (
    <div className="p-2 h-full overflow-auto">
      <div className="bg-pink-light p-4 border-2 border-pink-dark min-h-full text-xs space-y-4">
        <h2 className="text-pink-primary text-lg mb-2 glow-text">Hello World!</h2>

        <div>
          <h3 className="text-pink-primary text-sm mb-2">Experience</h3>
          <div className="space-y-2">
            <p><span className="font-bold">Researc Intern</span> — Facts-H Lab IIIT Kottayam (December–May 2025)</p>
            <p><span className="font-bold">Member</span> — Anti-Ragging Committe,GITAM(May 2023–Present)</p>
          </div>
        </div>

        <div>
          <h3 className="text-pink-primary text-sm mb-2">Education</h3>
          <p><span className="font-bold">B.Tech. in Computer Science</span></p>
          <p>GITAM, Visakapatanam (2023–2027)</p>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
