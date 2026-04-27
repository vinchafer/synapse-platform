import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Brain, Search, BarChart3, Users, FolderGit2 } from 'lucide-react';

const steps = [
  { id: 1, title: 'Welcome to Synapse', description: 'Your organizational intelligence platform that connects people, projects, and knowledge.', icon: Brain },
  { id: 2, title: 'Knowledge Graph', description: 'Visualize your organization\'s knowledge network. See how people, projects, and concepts are connected.', icon: Search },
  { id: 3, title: 'AI Assistant', description: 'Ask natural language questions about your organization. The AI searches across documents and expertise.', icon: BarChart3 },
  { id: 4, title: 'Executive Dashboard', description: 'Monitor knowledge health metrics, retention scores, and ROI across your organization.', icon: Users },
  { id: 5, title: 'Ready to Go!', description: 'You\'re all set! Explore the platform and discover the collective intelligence of your organization.', icon: FolderGit2 },
];

interface Props { onComplete: () => void; }

const OnboardingFlow: React.FC<Props> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(p => p + 1);
    else {
      localStorage.setItem('synapse-onboarding-completed', 'true');
      setIsCompleted(true);
      setTimeout(() => onComplete(), 2000);
    }
  };

  const handleSkip = () => { localStorage.setItem('synapse-onboarding-skipped', 'true'); onComplete(); };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center">
      <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm" />
      {isCompleted && <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="absolute animate-float" style={{ left: `${Math.random() * 100}%`, top: '-20px', animationDelay: `${Math.random() * 2}s`, animationDuration: `${2 + Math.random() * 3}s` }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#64FFDA','#5CCFE6','#FFB454','#FF6B6B','#A8B2D1'][Math.floor(Math.random() * 5)] }} />
          </div>
        ))}
      </div>}
      <div className="relative w-full max-w-lg mx-4 card bg-navy-light border border-electric/20 shadow-2xl animate-fade-in">
        <button onClick={handleSkip} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-navy-lightest text-slate hover:text-white"><X className="w-5 h-5" /></button>
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-3"><span className="text-xs text-slate">Step {currentStep + 1} of {steps.length}</span><span className="text-xs text-electric">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span></div>
          <div className="w-full h-1 bg-navy-lightest rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-electric to-electric-dark rounded-full transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} /></div>
        </div>
        <div className="p-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-6">
            {React.createElement(steps[currentStep].icon, { className: 'w-10 h-10 text-electric' })}
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
          <p className="text-slate leading-relaxed">{steps[currentStep].description}</p>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-navy-lightest">
          <button onClick={() => currentStep > 0 && setCurrentStep(p => p - 1)} disabled={currentStep === 0} className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate hover:text-white disabled:opacity-50"><ArrowLeft className="w-4 h-4" /> Previous</button>
          <div className="flex items-center gap-3">
            <button onClick={handleSkip} className="px-4 py-2 rounded-lg text-slate hover:text-white">Skip Tour</button>
            <button onClick={handleNext} className="flex items-center gap-2 px-6 py-2 bg-electric text-navy font-semibold rounded-lg hover:bg-electric-dark">
              {currentStep === steps.length - 1 ? <><Check className="w-4 h-4" /> Get Started</> : <>{currentStep === steps.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnboardingFlow;