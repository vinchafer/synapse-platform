import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import Sidebar from './components/Layout/Sidebar';
import CommandCenter from './components/CommandCenter/CommandCenter';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import KnowledgeGraph from './components/KnowledgeGraph/KnowledgeGraph';
import AIAssistant from './components/AIAssistant/AIAssistant';
import ExecutiveDashboard from './components/Dashboard/ExecutiveDashboard';
import PeopleIntelligence from './components/People/PeopleIntelligence';
import ProjectArchive from './components/Projects/ProjectArchive';
import KnowledgeFeed from './components/KnowledgeFeed/KnowledgeFeed';
import ChromeExtension from './components/Extension/ChromeExtension';
import { Sun, Moon, Keyboard } from 'lucide-react';

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsCommandOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('synapse-visited');
    const dontShow = localStorage.getItem('synapse-onboarding-skipped');
    const completed = localStorage.getItem('synapse-onboarding-completed');
    if (!hasVisited && dontShow !== 'true' && completed !== 'true') {
      localStorage.setItem('synapse-visited', 'true');
      setTimeout(() => setShowOnboarding(true), 800);
    } else {
      localStorage.setItem('synapse-visited', 'true');
    }
  }, []);

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${theme === 'light' ? 'bg-light-bg text-light-text' : 'bg-navy text-white'}`}>
      <CommandCenter isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      {showOnboarding && <OnboardingFlow onComplete={() => setShowOnboarding(false)} />}
      <Sidebar />
      <main className="flex-1 ml-64 overflow-hidden flex flex-col">
        <div className={`flex items-center justify-between px-6 py-3 border-b transition-colors duration-300 ${theme === 'light' ? 'border-light-border bg-light-card' : 'border-navy-lightest bg-navy'}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsCommandOpen(true)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${theme === 'light' ? 'bg-slate-100 text-light-muted hover:bg-slate-200' : 'bg-navy-lightest text-slate hover:bg-navy-lightest/70'}`}>
              <Keyboard className="w-4 h-4" /><span>Search...</span>
              <kbd className={`px-1.5 py-0.5 rounded text-xs ${theme === 'light' ? 'bg-white border border-slate-300' : 'bg-navy border border-slate-600'}`}>⌘K</kbd>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-sm ${theme === 'light' ? 'text-light-muted' : 'text-slate'}`}><Clock /></div>
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'bg-slate-100 text-light-muted hover:bg-slate-200' : 'bg-navy-lightest text-slate hover:bg-navy-lightest/70 hover:text-white'}`} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<KnowledgeGraph />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/dashboard" element={<ExecutiveDashboard />} />
            <Route path="/people" element={<PeopleIntelligence />} />
            <Route path="/projects" element={<ProjectArchive />} />
            <Route path="/feed" element={<KnowledgeFeed />} />
            <Route path="/extension" element={<ChromeExtension />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return <span className="text-xs">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;