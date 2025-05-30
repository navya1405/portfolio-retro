import React from 'react';

const skills = {
  languages: ['Python', 'SQL', 'HTML5', 'CSS3', 'JavaScript', 'C', 'C++', 'Java'],
  webTech: ['HTML5', 'CSS3', 'JavaScript'],
  databases: ['SQL'],
  tools: ['Jupyter Notebook', 'Visual Studio Code', 'Git', 'Vercel', 'Streamlit'],
  csFundamentals: ['Data Structures', 'Algorithms'],
  machineLearning: ['Scikit-learn', 'XGBoost', 'Random Forest', 'Gradient Boosting', 'LIME', 'SHAP']
};

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => (
  <div className="mb-4">
    <h3 className="text-pink-primary text-sm mb-2">{title}</h3>
    <div className="grid grid-cols-2 gap-2">
      {skills.map((skill, index) => (
        <div 
          key={index} 
          className="bg-pink-bg p-2 border border-pink-dark text-xs"
        >
          {skill}
        </div>
      ))}
    </div>
  </div>
);

const SkillsWindow: React.FC = () => {
  return (
    <div className="p-2 h-full overflow-auto">
      <div className="bg-pink-light p-4 border-2 border-pink-dark min-h-full">
        <h2 className="text-pink-primary text-lg mb-4 glow-text">Skills</h2>

        <SkillCategory title="Languages" skills={skills.languages} />
        <SkillCategory title="Web Technologies" skills={skills.webTech} />
        <SkillCategory title="Databases" skills={skills.databases} />
        <SkillCategory title="Tools & Platforms" skills={skills.tools} />
        <SkillCategory title="CS Fundamentals" skills={skills.csFundamentals} />
        <SkillCategory title="Machine Learning" skills={skills.machineLearning} />
      </div>
    </div>
  );
};

export default SkillsWindow;