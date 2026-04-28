import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, FolderGit2, Calendar, Users, CheckCircle, XCircle, AlertCircle, ChevronRight, Lightbulb, FileText } from 'lucide-react';
import { projects, employees } from '../../data/mockData';

const ProjectArchive = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<typeof projects[0] | null>(() => {
    const state = location.state as any;
    if (state?.selectedProjectId) {
      return projects.find(p => p.id === state.selectedProjectId) || null;
    }
    return null;
  });

  const filtered = projects.filter(p => {
    const mq = !query || p.name.toLowerCase().includes(query.toLowerCase());
    const ms = statusFilter === 'all' || p.status === statusFilter;
    return mq && ms;
  });

  const owner = (id: string) => employees.find(e => e.id === id);

  return (
    <div className="flex h-full">
      <div className="w-96 border-r border-navy-lightest flex flex-col">
        <div className="p-4 border-b border-navy-lightest"><h2 className="text-xl font-bold text-white">Project Archive</h2><p className="text-sm text-slate mt-1">{projects.length} projects</p></div>
        <div className="p-4 space-y-3 border-b border-navy-lightest">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects..." className="w-full px-4 py-2 bg-navy-lightest rounded-lg text-sm text-white placeholder-slate focus:outline-none focus:border-electric/50" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full px-3 py-2 bg-navy-lightest rounded-lg text-sm text-white"><option value="all">All Status</option><option value="active">Active</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(p => (
            <div key={p.id} onClick={() => setSelected(p)} className={`p-4 border-b border-navy-lightest cursor-pointer transition-colors ${selected?.id === p.id ? 'bg-electric/10' : 'hover:bg-navy-lightest/50'}`}>
              <div className="flex justify-between mb-2"><h3 className="text-sm font-semibold text-white">{p.name}</h3>{p.outcome === 'success' ? <CheckCircle className="w-4 h-4 text-green-400" /> : p.outcome === 'failed' ? <XCircle className="w-4 h-4 text-red-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}</div>
              <div className="flex items-center gap-2 mb-2"><span className={`px-2 py-0.5 rounded text-xs ${p.status === 'completed' ? 'bg-green-500/20 text-green-400' : p.status === 'active' ? 'bg-electric/20 text-electric' : 'bg-red-500/20 text-red-400'}`}>{p.status}</span><span className="text-xs text-slate">{owner(p.owner)?.name}</span></div>
              <div className="flex gap-3 text-xs text-slate"><span><Lightbulb className="w-3 h-3 inline" /> {p.lessonsLearned.length}</span><span><FileText className="w-3 h-3 inline" /> {p.decisions.length}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        {selected ? (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6"><h2 className="text-2xl font-bold text-white">{selected.name}</h2><span className={`px-3 py-1 rounded-full text-sm ${selected.status === 'completed' ? 'bg-green-500/20 text-green-400' : selected.status === 'active' ? 'bg-electric/20 text-electric' : 'bg-red-500/20 text-red-400'}`}>{selected.status}</span></div>
            <div className="flex items-center gap-6 text-sm text-slate mb-6"><span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(selected.startDate).toLocaleDateString()} - {selected.endDate ? new Date(selected.endDate).toLocaleDateString() : 'Present'}</span><span className="flex items-center gap-2"><Users className="w-4 h-4" /> {owner(selected.owner)?.name}</span></div>
              <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="card p-6"><Lightbulb className="w-5 h-5 text-electric mb-2" /><h3 className="text-lg font-bold text-white">Lessons Learned</h3><p className="text-4xl font-bold text-electric mt-2">{selected.lessonsLearned.length}</p></div>
              <div className="card p-6"><FileText className="w-5 h-5 text-electric mb-2" /><h3 className="text-lg font-bold text-white">Decisions</h3><p className="text-4xl font-bold text-electric mt-2">{selected.decisions.length}</p></div>
            </div>
          </div>
        ) : <div className="flex-1 flex items-center justify-center"><div className="text-center"><FolderGit2 className="w-16 h-16 text-slate mx-auto mb-4" /><h3 className="text-xl font-bold text-white mb-2">Select a Project</h3></div></div>}
      </div>
    </div>
  );
};
export default ProjectArchive;