import React, { useState } from 'react';
import { kpiMetrics, employees } from '../../data/mockData';
import { Brain, AlertTriangle, Clock, Activity, ArrowUpRight, ArrowDownRight, Download, Calendar } from 'lucide-react';

const ExecutiveDashboard = () => {
  const [dateRange, setDateRange] = useState('90');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const departments = [...new Set(employees.map(e => e.department))];
  const deptEmps = selectedDept ? employees.filter(e => e.department === selectedDept) : [];

  const handleDownload = async () => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.setFontSize(20).text('Synapse Dashboard Report', 20, 20);
      doc.setFontSize(10).text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
      doc.setFontSize(14).text('KPI Summary', 20, 45);
      doc.setFontSize(10);
      let y = 55;
      Object.entries(kpiMetrics).forEach(([k, v]: [string, any]) => { doc.text(`${k}: ${v.current}${v.unit || ''}`, 20, y); y += 7; });
      doc.save('synapse-dashboard.pdf');
    } catch {}
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h2 className="text-2xl font-bold text-white">Executive Dashboard</h2><p className="text-slate mt-1">Knowledge health metrics</p></div>
        <div className="flex items-center gap-3">
          <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="px-3 py-1.5 bg-navy-lightest rounded-lg text-sm text-white border border-navy-lightest">
            <option value="30">Last 30 Days</option><option value="90">Last 90 Days</option><option value="365">Last 365 Days</option>
          </select>
          <button onClick={handleDownload} className="flex items-center gap-2 px-3 py-1.5 bg-electric text-navy rounded-lg text-sm"><Download className="w-4 h-4" /> Report</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[{ ...kpiMetrics.knowledgeRetentionScore, title: 'Knowledge Retention', icon: Brain, unit: '%' }, { ...kpiMetrics.knowledgeAtRisk, title: 'At Risk', icon: AlertTriangle, unit: '' }, { ...kpiMetrics.timeToCompetency, title: 'Time to Competency', icon: Clock, unit: 'd' }, { ...kpiMetrics.searchAnswerTime, title: 'Answer Time', icon: Activity, unit: 's' }].map((k, i) => (
          <div key={i} className="card p-5">
            <div className="flex justify-between items-start mb-3"><div className="w-10 h-10 rounded-lg bg-navy-lightest flex items-center justify-center">{React.createElement(k.icon, { className: 'w-5 h-5 text-electric' })}</div>
              <div className={`flex items-center gap-1 text-sm ${k.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>{k.trend >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}<span>{Math.abs(k.trend)}%</span></div>
            </div>
            <p className="text-sm text-slate">{k.title}</p>
            <p className="text-3xl font-bold text-white">{k.current}{k.unit}</p></div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-slate uppercase">Drill-down:</span>
        <button onClick={() => setSelectedDept(null)} className={`px-3 py-1 rounded-full text-xs ${!selectedDept ? 'bg-electric text-navy' : 'bg-navy-lightest text-slate'}`}>All</button>
        {departments.map(d => <button key={d} onClick={() => setSelectedDept(d)} className={`px-3 py-1 rounded-full text-xs ${selectedDept === d ? 'bg-electric text-navy' : 'bg-navy-lightest text-slate'}`}>{d}</button>)}
      </div>
      {selectedDept && <div className="card p-5"><h3 className="text-lg font-bold text-white mb-3">{selectedDept}</h3><p className="text-slate text-sm">{deptEmps.length} employees • Avg score: {Math.round(deptEmps.reduce((s, e) => s + e.knowledgeScore, 0) / deptEmps.length)}%</p></div>}
    </div>
  );
};
export default ExecutiveDashboard;