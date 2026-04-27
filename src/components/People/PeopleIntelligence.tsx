import React, { useState } from 'react';
import { Search, Users, Brain, FolderGit2, Award, AlertTriangle, BarChart3, UserPlus, X, Send } from 'lucide-react';
import { employees, graphLinks } from '../../data/mockData';

const PeopleIntelligence = () => {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('all');
  const [selected, setSelected] = useState<typeof employees[0] | null>(null);
  const [showSkillGap, setShowSkillGap] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  const depts = ['all', ...new Set(employees.map(e => e.department))];
  const required = ['Machine Learning', 'Cloud Architecture', 'Security', 'UX Research', 'DevOps', 'Microservices'];
  const covered = new Set(employees.flatMap(e => e.expertise));
  const gaps = required.filter(e => !covered.has(e));

  const filtered = employees.filter(e => {
    const mq = !query || e.name.toLowerCase().includes(query.toLowerCase()) || e.title.toLowerCase().includes(query.toLowerCase()) || e.expertise.some(x => x.toLowerCase().includes(query.toLowerCase()));
    const md = dept === 'all' || e.department === dept;
    return mq && md;
  });

  const connections = (id: string) => graphLinks.filter(l => (typeof l.source === 'string' ? l.source : (l.source as any).id) === id || (typeof l.target === 'string' ? l.target : (l.target as any).id) === id).length;

  return (
    <div className="flex h-full">
      <div className="w-96 border-r border-navy-lightest flex flex-col">
        <div className="p-4 border-b border-navy-lightest"><h2 className="text-xl font-bold text-white">People Intelligence</h2><p className="text-sm text-slate mt-1">{employees.length} employees</p></div>
        <div className="p-3 border-b border-navy-lightest bg-amber-500/5">
          <button onClick={() => setShowSkillGap(!showSkillGap)} className="flex items-center gap-2 w-full text-left"><BarChart3 className="w-4 h-4 text-amber-400" /><span className="text-xs font-medium text-amber-400">Skill Gaps ({gaps.length})</span></button>
          {showSkillGap && <div className="mt-2 space-y-1">{gaps.map(g => <div key={g} className="flex items-center gap-2 px-2 py-1 bg-amber-500/10 rounded text-xs text-amber-400"><AlertTriangle className="w-3 h-3" /><span>{g}</span></div>)}</div>}
        </div>
        <div className="p-4 space-y-3 border-b border-navy-lightest">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search people..." className="w-full px-4 py-2 bg-navy-lightest rounded-lg text-sm text-white placeholder-slate focus:outline-none focus:border-electric/50" />
          <select value={dept} onChange={e => setDept(e.target.value)} className="w-full px-3 py-2 bg-navy-lightest rounded-lg text-sm text-white"><option value="all">All Departments</option>{depts.slice(1).map(d => <option key={d} value={d}>{d}</option>)}</select>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(e => (
            <div key={e.id} onClick={() => setSelected(e)} className={`p-4 border-b border-navy-lightest cursor-pointer transition-colors ${selected?.id === e.id ? 'bg-electric/10' : 'hover:bg-navy-lightest/50'}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-electric/20 flex items-center justify-center"><span className="text-sm font-bold text-electric">{e.name.charAt(0)}</span></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between"><h3 className="text-sm font-semibold text-white truncate">{e.name}</h3>{e.knowledgeScore > 90 && <Award className="w-4 h-4 text-amber-400" />}</div>
                  <p className="text-xs text-slate">{e.title}</p>
                  <div className="flex items-center gap-2 mt-2"><div className="flex-1 h-1 bg-navy-lightest rounded-full"><div className="h-full bg-gradient-to-r from-electric to-electric-dark rounded-full" style={{ width: `${e.knowledgeScore}%` }} /></div><span className="text-xs text-electric">{e.knowledgeScore}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        {selected ? (
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-electric/20 flex items-center justify-center"><span className="text-2xl font-bold text-electric">{selected.name.charAt(0)}</span></div>
                <div><h2 className="text-2xl font-bold text-white">{selected.name}</h2><p className="text-slate mt-1">{selected.title} • {selected.department}</p><p className="text-xs text-slate mt-1">{selected.projects} projects • {connections(selected.id)} connections</p></div>
              </div>
              <button onClick={() => setShowTransfer(true)} className="p-2 rounded-lg bg-navy-lightest text-slate hover:text-white"><UserPlus className="w-4 h-4" /></button>
            </div>
            <div className="card p-6 mb-4">
              <h3 className="text-lg font-bold text-white mb-4">Knowledge Profile</h3>
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32"><svg className="w-full h-full -rotate-90"><circle cx="64" cy="64" r="56" fill="none" stroke="#233554" strokeWidth="12" /><circle cx="64" cy="64" r="56" fill="none" stroke="#64FFDA" strokeWidth="12" strokeDasharray={`${selected.knowledgeScore * 3.52} 352`} strokeLinecap="round" /></svg><div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-bold text-white">{selected.knowledgeScore}</span></div></div>
                <div className="flex-1">
                  <div className="w-full h-2 bg-navy-lightest rounded-full mb-4"><div className="h-full bg-gradient-to-r from-electric to-electric-dark rounded-full" style={{ width: `${selected.knowledgeScore}%` }} /></div>
                  <div className="flex flex-wrap gap-2">{selected.expertise.map((e, i) => <span key={i} className="px-3 py-1.5 bg-navy-lightest rounded-lg text-sm text-white">{e}</span>)}</div>
                </div>
              </div>
            </div>
            <div className="card p-6"><h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-400" /> Risk Assessment</h3><p className="text-sm text-slate">Unique Knowledge: <span className={selected.knowledgeScore > 85 ? 'text-amber-400' : 'text-green-400'}>{selected.knowledgeScore > 85 ? 'High Risk' : 'Low Risk'}</span></p></div>
          </div>
        ) : <div className="flex-1 flex items-center justify-center"><div className="text-center"><Users className="w-16 h-16 text-slate mx-auto mb-4" /><h3 className="text-xl font-bold text-white mb-2">Select an Employee</h3></div></div>}
      </div>
      {showTransfer && selected && <div className="fixed inset-0 z-[90] flex items-center justify-center"><div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={() => setShowTransfer(false)} /><div className="relative w-full max-w-lg mx-4 bg-navy-light border border-navy-lightest rounded-xl p-6 animate-fade-in">
        <button onClick={() => setShowTransfer(false)} className="absolute top-4 right-4 text-slate hover:text-white"><X className="w-5 h-5" /></button>
        <h3 className="text-xl font-bold text-white mb-4">Knowledge Transfer Request</h3>
        <p className="text-sm text-slate mb-4">To: {selected.name} • {selected.title}</p>
        <p className="text-sm text-slate mb-4">Subject: Knowledge Transfer: {selected.expertise.slice(0, 2).join(', ')}</p>
        <textarea className="w-full px-4 py-3 bg-navy-lightest rounded-lg text-sm text-white mb-4" rows={4} defaultValue={`Hi ${selected.name},\n\nWould you be available for a knowledge transfer session?\n\nThanks`} />
        <button onClick={() => { navigator.clipboard.writeText('KT Request'); setShowTransfer(false); }} className="flex items-center gap-2 px-4 py-2 bg-electric text-navy rounded-lg ml-auto"><Send className="w-4 h-4" /> Send</button>
      </div></div>}
    </div>
  );
};
export default PeopleIntelligence;