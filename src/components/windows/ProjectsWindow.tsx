import React from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Driving Toward Sustainability: Predicting and Explaining Vehicle Emissions',
    description: 'Built a Random Forest model (R²: 0.99897) to predict vehicle CO2 emissions using a dataset of 27,001 records. Applied XAI techniques (LIME, SHAP, PDP) for interpretability. Tools: Python, Scikit-learn.',
    link: 'https://github.com/navya1405' 
  },
  {
    id: 2,
    title: 'Nature\'s Palette - Sustainable E-commerce Web Application',
    description: 'Developed a responsive e-commerce platform for sustainable skincare products with advanced filtering and cart management. Emphasized eco-friendly branding and user experience. Tools: HTML5, CSS3, JavaScript.',
    link: 'https://github.com/navya1405' 
  }
];

const ProjectsWindow: React.FC = () => {
  return (
    <div className="p-2 h-full overflow-auto">
      <div className="bg-pink-light p-4 border-2 border-pink-dark min-h-full">
        <h2 className="text-pink-primary text-lg mb-4 glow-text">My Projects</h2>
        
        <div className="space-y-4">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="bg-pink-bg p-3 border-2 border-pink-dark hover:border-pink-primary transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm text-pink-dark mb-2">{project.title}</h3>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-primary hover:text-pink-bright"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <p className="text-xs">{project.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <a 
            href="https://github.com/navya1405" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="pixel-button text-xs">
              View All Projects
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;