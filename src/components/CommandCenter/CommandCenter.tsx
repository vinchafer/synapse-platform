import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Clock, User, FolderGit2, Brain, Zap } from 'lucide-react';
import { employees, projects, graphNodes, sampleResponses } from '../../data/mockData';
import type { SearchResult, RecentSearch } from '../../types';

interface Props { isOpen: boolean; onClose: () => void; }

const CommandCenter: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const s = localStorage.getItem('synapse-recent-searches'); if (s) try { setRecentSearches(JSON.parse(s).map((x: any) => ({ ...x, timestamp: new Date(x.timestamp) }))); } catch {} }, []);

  const saveRecent = useCallback((q: string) => {
    const updated = [{ query: q, timestamp: new Date() }, ...recentSearches.filter(s => s.query !== q)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('synapse-recent-searches', JSON.stringify(updated));
  }, [recentSearches]);

  const search = useCallback((q: string): SearchResult[] => {
    if (!q.trim()) return [];
    const lq = q.toLowerCase();
    const r: SearchResult[] = [];
    employees.forEach(e => { if (e.name.toLowerCase().includes(lq) || e.title.toLowerCase().includes(lq) || e.expertise.some(x => x.toLowerCase().includes(lq))) r.push({ id: e.id, type: 'employee', label: e.name, subtitle: `${e.title} • ${e.department}`, relevance: 1 }); });
    projects.forEach(p => { if (p.name.toLowerCase().includes(lq)) r.push({ id: p.id, type: 'project', label: p.name, subtitle: `${p.status}`, relevance: 0.9 }); });
    graphNodes.filter(n => n.type === 'concept').forEach(n => { if (n.label.toLowerCase().includes(lq)) r.push({ id: n.id, type: 'concept', label: n.label, subtitle: 'Knowledge Concept', relevance: 0.7 }); });
    Object.keys(sampleResponses).forEach(k => { if (k.includes(lq)) r.push({ id: `a-${k}`, type: 'answer', label: k, subtitle: 'AI Answer', relevance: 0.85 }); });
    return r.sort((a, b) => b.relevance - a.relevance).slice(0, 8);
  }, []);

  useEffect(() => { if (query.trim()) { setResults(search(query)); setSelectedIndex(0); } else setResults([]); }, [query, search]);

  const handleSelect = useCallback((r: SearchResult) => {
    saveRecent(query);
    onClose();
    // Navigate based on result type
    if (r.type === 'employee') {
      navigate(`/people`, { state: { selectedEmployeeId: r.id } });
    } else if (r.type === 'project') {
      navigate(`/projects`, { state: { selectedProjectId: r.id } });
    } else if (r.type === 'concept') {
      navigate(`/`, { state: { highlightNodeId: r.id } });
    } else if (r.type === 'answer') {
      const aiQuery = r.label;
      navigate(`/assistant`, { state: { prefillQuery: aiQuery } });
    }
  }, [query, saveRecent, onClose, navigate]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(p => Math.min(p + 1, results.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(p => Math.max(p - 1, 0)); }
      else if (e.key === 'Enter' && results[selectedIndex]) { e.preventDefault(); handleSelect(results[selectedIndex]); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose, results, selectedIndex, handleSelect]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'employee': return <User className="w-4 h-4 text-electric" />;
      case 'project': return <FolderGit2 className="w-4 h-4 text-cyan-400" />;
      case 'concept': return <Brain className="w-4 h-4 text-amber-400" />;
      case 'answer': return <Zap className="w-4 h-4 text-electric" />;
      default: return <Search className="w-4 h-4 text-slate" />;
    }
  };

  useEffect(() => { if (isOpen && inputRef.current) { inputRef.current.focus(); setQuery(''); setResults([]); } }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" />
      <div ref={containerRef} className="relative w-full max-w-2xl mx-4 card bg-navy-light border border-electric/20 shadow-2xl animate-fade-in">
        <div className="flex items-center gap-3 p-4 border-b border-navy-lightest">
          <Search className="w-5 h-5 text-slate flex-shrink-0" />
          <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search people, projects, concepts..." className="flex-1 bg-transparent text-white placeholder-slate text-lg focus:outline-none" />
          {query && <button onClick={() => setQuery('')} className="p-1 rounded hover:bg-navy-lightest text-slate hover:text-white"><X className="w-4 h-4" /></button>}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {!query && recentSearches.length > 0 && <div className="p-4"><p className="text-xs text-slate uppercase tracking-wider mb-3">Recent Searches</p>{recentSearches.slice(0, 5).map((s, i) => <button key={i} onClick={() => { setQuery(s.query); inputRef.current?.focus(); }} className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-navy-lightest text-left"><Clock className="w-4 h-4 text-slate" /><span className="text-sm text-slate-light">{s.query}</span></button>)}</div>}
          {query && results.map((r, i) => (
            <button key={r.id} onClick={() => handleSelect(r)} className={`flex items-center gap-3 w-full p-3 rounded-lg text-left ${i === selectedIndex ? 'bg-electric/10 border border-electric/20' : 'hover:bg-navy-lightest'}`}>
              <div className="w-8 h-8 rounded-lg bg-navy-lightest flex items-center justify-center">{getIcon(r.type)}</div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">{r.label}</p><p className="text-xs text-slate truncate">{r.subtitle}</p></div>
              <ArrowRight className="w-4 h-4 text-slate" />
            </button>
          ))}
          {query && results.length === 0 && <div className="p-8 text-center"><Zap className="w-12 h-12 text-slate mx-auto mb-4" /><p className="text-slate">No results found</p></div>}
        </div>
        <div className="flex items-center justify-between p-3 border-t border-navy-lightest">
          <div className="flex items-center gap-4 text-xs text-slate">
            <span><kbd className="px-1.5 py-0.5 bg-navy-lightest rounded text-xs">↑↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-navy-lightest rounded text-xs">↵</kbd> select</span>
            <span><kbd className="px-1.5 py-0.5 bg-navy-lightest rounded text-xs">esc</kbd> close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommandCenter;