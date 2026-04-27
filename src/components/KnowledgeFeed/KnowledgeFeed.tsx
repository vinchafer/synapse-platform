import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, Info, RefreshCw, Clock } from 'lucide-react';
import { employees, projects } from '../../data/mockData';
import type { KnowledgeFeedEvent } from '../../types';

const KnowledgeFeed = () => {
  const [events, setEvents] = useState<KnowledgeFeedEvent[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const generateEvent = (): KnowledgeFeedEvent => {
    const types: Array<'atRisk' | 'new' | 'gap' | 'confirmed'> = ['atRisk', 'new', 'gap', 'confirmed'];
    const t = types[Math.floor(Math.random() * types.length)];
    const emp = employees[Math.floor(Math.random() * employees.length)];
    const proj = projects[Math.floor(Math.random() * projects.length)] as any;
    switch (t) {
      case 'atRisk': return { id: `e-${Date.now()}`, type: 'atRisk', title: `Knowledge at Risk: ${emp.name}`, description: `${emp.name} holds unique knowledge with score ${emp.knowledgeScore}`, timestamp: new Date(), employee: emp };
      case 'new': return { id: `e-${Date.now()}`, type: 'new', title: `New Knowledge: ${proj.name}`, description: `New lessons learned from ${proj.name}`, timestamp: new Date(), project: proj };
      case 'gap': return { id: `e-${Date.now()}`, type: 'gap', title: 'Knowledge Gap Detected', description: 'Question asked multiple times with no documented answer', timestamp: new Date() };
      default: return { id: `e-${Date.now()}`, type: 'confirmed', title: `Expertise Confirmed: ${emp.name}`, description: `${emp.name} confirmed expertise in ${emp.expertise.join(', ')}`, timestamp: new Date(), employee: emp };
    }
  };

  useEffect(() => {
    const initial = Array.from({ length: 8 }, () => generateEvent());
    setEvents(initial);
    const interval = setInterval(() => setEvents(prev => [generateEvent(), ...prev].slice(0, 20)), 8000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter);
  const icons: Record<string, { icon: any; color: string; label: string }> = { atRisk: { icon: AlertTriangle, color: 'text-red-400 bg-red-500/10 border-red-500/20', label: 'At Risk' }, new: { icon: CheckCircle, color: 'text-green-400 bg-green-500/10 border-green-500/20', label: 'New' }, gap: { icon: AlertCircle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', label: 'Gap' }, confirmed: { icon: Info, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: 'Confirmed' } };

  const timeAgo = (d: Date) => { const s = Math.floor((Date.now() - d.getTime()) / 1000); if (s < 60) return 'just now'; const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`; const h = Math.floor(m / 60); return `${h}h ago`; };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-navy-lightest">
        <div className="flex items-center justify-between mb-3"><div><h2 className="text-xl font-bold text-white">Knowledge Health Feed</h2><p className="text-sm text-slate">Live activity stream</p></div></div>
        <div className="flex gap-2">
          {['all', 'atRisk', 'new', 'gap', 'confirmed'].map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1.5 rounded-full text-xs font-medium ${filter === t ? 'bg-electric/20 text-electric border border-electric/30' : 'bg-navy-lightest text-slate'}`}>
              {t === 'all' ? 'All' : icons[t]?.label || t} <span className="ml-1 opacity-70">{t === 'all' ? events.length : events.filter(e => e.type === t).length}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filtered.map(event => {
          const info = icons[event.type] || icons.confirmed;
          const Icon = info.icon;
          return (
            <div key={event.id} className={`p-4 rounded-xl border transition-all ${info.color}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${info.color}`}><Icon className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1"><h3 className="text-sm font-semibold text-white">{event.title}</h3><span className="text-xs text-slate">{timeAgo(event.timestamp)}</span></div>
                  <p className="text-sm text-slate-light">{event.description}</p>
                  {event.employee && <div className="flex items-center gap-2 mt-2"><div className="w-5 h-5 rounded-full bg-electric/20 flex items-center justify-center"><span className="text-xs text-electric">{event.employee.name.charAt(0)}</span></div><span className="text-xs text-slate">{event.employee.title}</span></div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default KnowledgeFeed;