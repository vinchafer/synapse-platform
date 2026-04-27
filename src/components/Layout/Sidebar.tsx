import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, BarChart3, Users, FolderGit2, Search, LayoutGrid, Rss } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Sidebar = () => {
  const location = useLocation();
  const { theme } = useTheme();

  const navItems = [
    { path: '/', label: 'Knowledge Graph', icon: Brain },
    { path: '/assistant', label: 'AI Assistant', icon: Search },
    { path: '/dashboard', label: 'Executive Dashboard', icon: BarChart3 },
    { path: '/people', label: 'People Intelligence', icon: Users },
    { path: '/projects', label: 'Project Archive', icon: FolderGit2 },
    { path: '/feed', label: 'Knowledge Feed', icon: Rss },
    { path: '/extension', label: 'Chrome Extension', icon: LayoutGrid },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full w-64 border-r flex flex-col z-50 transition-colors duration-300 ${theme === 'light' ? 'bg-light-card border-light-border' : 'bg-navy-light border-navy-lightest'}`}>
      <div className="p-6 border-b border-inherit">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center"><Brain className="w-6 h-6 text-electric" /></div>
          <div><h1 className={`font-bold text-lg ${theme === 'light' ? 'text-light-text' : 'text-white'}`}>Synapse</h1><p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate'}`}>Organizational Intelligence</p></div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-electric/10 text-electric border border-electric/20' : theme === 'light' ? 'text-slate-600 hover:text-navy hover:bg-slate-100' : 'text-slate hover:text-white hover:bg-navy-lightest'}`}>
              <Icon className="w-5 h-5" /><span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className={`p-4 border-t ${theme === 'light' ? 'border-light-border' : 'border-navy-lightest'}`}>
        <div className={`p-4 rounded-xl ${theme === 'light' ? 'bg-slate-50' : 'card'}`}>
          <div className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate'} mb-2`}>Knowledge Retention Score</div>
          <div className="flex items-end justify-between"><span className="text-2xl font-bold gradient-text">58%</span><span className="text-xs text-green-400">+7.2%</span></div>
          <div className={`w-full h-1.5 rounded-full mt-3 overflow-hidden ${theme === 'light' ? 'bg-slate-200' : 'bg-navy-lightest'}`}><div className="h-full bg-gradient-to-r from-electric to-electric-dark w-3/5 rounded-full"></div></div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;