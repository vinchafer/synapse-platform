import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { kpiMetrics, employees, monthlyRetentionData } from '../../data/mockData';
import { Brain, AlertTriangle, Clock, Activity, ArrowUpRight, ArrowDownRight, Download, Calendar } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const departmentRiskData = [
  { name: 'Engineering', risk: 34 }, { name: 'Product', risk: 22 },
  { name: 'Research', risk: 18 }, { name: 'Finance & Strategy', risk: 14 }, { name: 'People Operations', risk: 12 },
];

const ExecutiveDashboard = () => {
  const [dateRange, setDateRange] = useState('90');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const departments = [...new Set(employees.map(e => e.department))];
  const deptEmps = selectedDept ? employees.filter(e => e.department === selectedDept) : [];

  const filteredData = useMemo(() => {
    const months = dateRange === '30' ? 1 : dateRange === '90' ? 3 : 12;
    return monthlyRetentionData.slice(-months);
  }, [dateRange]);

  const handleDownload = async () => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.setFontSize(20).text('Synapse Dashboard Report', 20, 20);
      doc.setFontSize(10).text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
      doc.setFontSize(14).text('KPI Summary', 20, 45);
      doc.setFontSize(10);
      let y = 55;
      Object.entries(kpiMetrics).forEach(([k, v]) => { doc.text(`${k}: ${(v as any).current}${(v as any).unit || ''}`, 20, y); y += 7; });
      doc.save('synapse-dashboard.pdf');
    } catch {}
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-light border border-navy-lightest rounded-lg p-3 shadow-xl">
          <p className="text-white text-sm font-semibold mb-1">{label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value}</p>
          ))}
        </div>
      );
    }
    return null;
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
        {[{ ...kpiMetrics.knowledgeRetentionScore, title: 'Knowledge Retention', icon: Brain, unit: '%' }, { ...kpiMetrics.knowledgeAtRisk, title: 'At Risk', icon: AlertTriangle, unit: ' empl' }, { ...kpiMetrics.timeToCompetency, title: 'Time to Competency', icon: Clock, unit: 'd' }, { ...kpiMetrics.knowledgeLossPerDeparture, title: 'Loss per Departure', icon: Activity, unit: 'M $' }].map((k, i) => (
          <div key={i} className="card p-5">
            <div className="flex justify-between items-start mb-3"><div className="w-10 h-10 rounded-lg bg-navy-lightest flex items-center justify-center">{React.createElement(k.icon, { className: 'w-5 h-5 text-electric' })}</div>
              <div className={`flex items-center gap-1 text-sm ${k.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>{k.trend >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}<span>{Math.abs(k.trend)}%</span></div>
            </div>
            <p className="text-sm text-slate">{k.title}</p>
            <p className="text-3xl font-bold text-white">{k.current}{k.unit}</p></div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Knowledge Retention Score</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64FFDA" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#64FFDA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
              <XAxis dataKey="month" stroke="#8892B0" tick={{ fill: '#8892B0', fontSize: 12 }} />
              <YAxis domain={[0, 100]} stroke="#8892B0" tick={{ fill: '#8892B0', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="retention" stroke="#64FFDA" fill="url(#retentionGrad)" strokeWidth={2} name="Retention" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Knowledge Activity (Created vs Consumed)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
              <XAxis dataKey="month" stroke="#8892B0" tick={{ fill: '#8892B0', fontSize: 12 }} />
              <YAxis stroke="#8892B0" tick={{ fill: '#8892B0', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#8892B0' }} />
              <Bar dataKey="created" fill="#64FFDA" radius={[4, 4, 0, 0]} name="Created" />
              <Bar dataKey="consumed" fill="#8892B0" radius={[4, 4, 0, 0]} name="Consumed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Department Knowledge at Risk (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentRiskData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
              <XAxis type="number" domain={[0, 50]} stroke="#8892B0" tick={{ fill: '#8892B0', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" stroke="#8892B0" tick={{ fill: '#8892B0', fontSize: 12 }} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="risk" fill="#FF6B6B" radius={[0, 4, 4, 0]} name="Risk %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-2 items-start card p-5">
          <div className="w-full"><span className="text-xs text-slate uppercase">Drill-down:</span></div>
          <button onClick={() => setSelectedDept(null)} className={`px-3 py-1 rounded-full text-xs ${!selectedDept ? 'bg-electric text-navy' : 'bg-navy-lightest text-slate'}`}>All</button>
          {departments.map(d => <button key={d} onClick={() => setSelectedDept(d)} className={`px-3 py-1 rounded-full text-xs ${selectedDept === d ? 'bg-electric text-navy' : 'bg-navy-lightest text-slate'}`}>{d}</button>)}
          {selectedDept && <div className="w-full mt-3 card bg-navy p-4"><h3 className="text-lg font-bold text-white mb-2">{selectedDept}</h3><p className="text-slate text-sm">{deptEmps.length} employees • Avg score: {Math.round(deptEmps.reduce((s, e) => s + e.knowledgeScore, 0) / deptEmps.length)}%</p></div>}
        </div>
      </div>
    </div>
  );
};
export default ExecutiveDashboard;