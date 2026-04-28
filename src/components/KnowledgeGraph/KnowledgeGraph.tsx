import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { graphNodes as rawNodes, graphLinks as rawLinks, employees, projects } from '../../data/mockData';
import { ZoomIn, ZoomOut, Maximize, Route, Download, Bot, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import type { GraphNode } from '../../types';

const KnowledgeGraph = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<any>(() => {
    const state = location.state as any;
    if (state?.highlightNodeId) {
      const node = rawNodes.find(n => n.id === state.highlightNodeId);
      return node || null;
    }
    return null;
  });
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [showShortestPath, setShowShortestPath] = useState(false);
  const [pathStart, setPathStart] = useState('');
  const [pathEnd, setPathEnd] = useState('');
  const [shortestPathResult, setShortestPathResult] = useState<string[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const { theme } = useTheme();

  const allExpertise = Array.from(new Set(employees.flatMap(e => e.expertise))).sort();
  const allDepartments = Array.from(new Set(employees.map(e => e.department))).sort();
  const allNodeOptions = [...employees.map(e => ({ id: e.id, label: e.name, type: 'person' })), ...projects.map(p => ({ id: p.id, label: p.name, type: 'project' }))];

  const handleExportPNG = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      if (!svgRef.current?.parentElement) return;
      const canvas = await html2canvas(svgRef.current.parentElement);
      const link = document.createElement('a');
      link.download = 'knowledge-graph.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch {}
  };

  const findShortestPath = (start: string, end: string) => {
    const q: string[][] = [[start]]; const v = new Set<string>([start]);
    while (q.length > 0) {
      const p = q.shift()!;
      const c = p[p.length - 1];
      if (c === end) { setShortestPathResult(p); return; }
      const neighbors = rawLinks.filter(l => { const s = typeof l.source === 'string' ? l.source : (l.source as any).id; const t = typeof l.target === 'string' ? l.target : (l.target as any).id; return s === c || t === c; }).map(l => { const s = typeof l.source === 'string' ? l.source : (l.source as any).id; const t = typeof l.target === 'string' ? l.target : (l.target as any).id; return s === c ? t : s; }).filter((id: string) => !v.has(id));
      for (const n of neighbors) { v.add(n); q.push([...p, n]); }
    }
    setShortestPathResult([]);
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    const svg = d3.select(svgRef.current);
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    svg.selectAll('*').remove();

    let fNodes = rawNodes.map(n => ({ ...n, x: w / 2, y: h / 2 })) as any[];
    if (departmentFilter !== 'all') { const ids = employees.filter(e => e.department === departmentFilter).map(e => e.id); fNodes = fNodes.filter(n => n.type !== 'person' || ids.includes(n.id)); }
    if (expertiseFilter !== 'all') { const ids = employees.filter(e => e.expertise.includes(expertiseFilter)).map(e => e.id); fNodes = fNodes.filter(n => n.type !== 'person' || ids.includes(n.id)); }
    const vIds = new Set(fNodes.map((n: any) => n.id));
    const fLinks = rawLinks.filter(l => vIds.has(typeof l.source === 'string' ? l.source : (l.source as any).id) && vIds.has(typeof l.target === 'string' ? l.target : (l.target as any).id));
    const pSet = new Set(shortestPathResult);

    const g = svg.append('g');
    svg.call(d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.1, 4]).on('zoom', (e) => { g.attr('transform', e.transform); }));
    const sim = d3.forceSimulation(fNodes).force('link', d3.forceLink(fLinks).id((d: any) => d.id).distance(80)).force('charge', d3.forceManyBody().strength(-150)).force('center', d3.forceCenter(w / 2, h / 2)).force('collision', d3.forceCollide().radius((d: any) => d.size + 5));

    g.append('g').selectAll('line').data(fLinks).join('line').attr('stroke', theme === 'light' ? '#CBD5E1' : '#233554').attr('stroke-opacity', 0.6).attr('stroke-width', (d: any) => Math.sqrt(d.value) * 2);

    const node = g.append('g').selectAll('g').data(fNodes).join('g').call(d3.drag<any, any>().on('start', (e, d: any) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }).on('drag', (e, d: any) => { d.fx = e.x; d.fy = e.y; }).on('end', (e, d: any) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }) as any);

    node.append('circle').attr('r', (d: any) => d.size).attr('fill', (d: any) => { if (pSet.has(d.id)) return '#FF6B6B'; switch (d.type) { case 'person': return '#64FFDA'; case 'project': return '#5CCFE6'; default: return '#FFB454'; } }).attr('stroke', theme === 'light' ? '#F8FAFC' : '#0A192F').style('cursor', 'pointer')
      .on('mouseover', (e: any, d: any) => { const emp = employees.find(em => em.id === d.id); const proj = projects.find(p => p.id === d.id); setTooltipData({ node: d, employee: emp, project: proj }); d3.select(e.currentTarget).attr('stroke', '#64FFDA').attr('stroke-width', 3); })
      .on('mouseout', (e: any) => { setTooltipData(null); d3.select(e.currentTarget).attr('stroke', theme === 'light' ? '#F8FAFC' : '#0A192F').attr('stroke-width', 2); })
      .on('click', (e: any, d: any) => { setSelectedNode(d); e.stopPropagation(); });

    node.filter((d: any) => d.size > 8).append('text').text((d: any) => d.label).attr('x', (d: any) => d.size + 4).attr('y', 4).attr('font-size', '10px').attr('fill', theme === 'light' ? '#64748B' : '#8892B0').style('pointer-events', 'none');

    sim.on('tick', () => { g.selectAll('line').attr('x1', (d: any) => d.source.x).attr('y1', (d: any) => d.source.y).attr('x2', (d: any) => d.target.x).attr('y2', (d: any) => d.target.y); node.attr('transform', (d: any) => `translate(${d.x},${d.y})`); });
    return () => { sim.stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentFilter, expertiseFilter, shortestPathResult, theme]);

  const getColor = (t: string) => { switch (t) { case 'person': return 'bg-electric'; case 'project': return 'bg-cyan-400'; default: return 'bg-amber-400'; } };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-navy-lightest">
        <div><h2 className={`text-xl font-bold ${theme === 'light' ? 'text-light-text' : 'text-white'}`}>Knowledge Graph</h2></div>
        <div className="flex gap-2">
          <button onClick={handleExportPNG} className="p-2 rounded-lg bg-navy-lightest text-slate hover:text-white"><Download className="w-4 h-4" /></button>
          <button onClick={() => setShowShortestPath(!showShortestPath)} className={`p-2 rounded-lg ${showShortestPath ? 'bg-electric/20 text-electric' : 'bg-navy-lightest text-slate'}`}><Route className="w-4 h-4" /></button>
          <button onClick={() => { const s = d3.select(svgRef.current); s.transition().duration(300).call((s as any).zoom().scaleBy, 1.3); }} className="p-2 rounded-lg bg-navy-lightest text-slate hover:text-white"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={() => { const s = d3.select(svgRef.current); s.transition().duration(300).call((s as any).zoom().scaleBy, 0.7); }} className="p-2 rounded-lg bg-navy-lightest text-slate hover:text-white"><ZoomOut className="w-4 h-4" /></button>
          <button onClick={() => { const s = d3.select(svgRef.current); s.transition().duration(300).call((s as any).zoom().transform, d3.zoomIdentity); }} className="p-2 rounded-lg bg-navy-lightest text-slate hover:text-white"><Maximize className="w-4 h-4" /></button>
        </div>
      </div>
      {showShortestPath && (
        <div className="px-4 py-2 bg-navy-light border-b border-navy-lightest flex items-center gap-2">
          <span className="text-xs text-slate">Shortest Path:</span>
          <select value={pathStart} onChange={e => setPathStart(e.target.value)} className="px-2 py-1 bg-navy-lightest rounded text-xs text-white"><option value="">Start</option>{allNodeOptions.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}</select>
          <span className="text-xs text-slate">→</span>
          <select value={pathEnd} onChange={e => setPathEnd(e.target.value)} className="px-2 py-1 bg-navy-lightest rounded text-xs text-white"><option value="">End</option>{allNodeOptions.filter(n => n.id !== pathStart).map(n => <option key={n.id} value={n.id}>{n.label}</option>)}</select>
          <button onClick={() => { if (pathStart && pathEnd) findShortestPath(pathStart, pathEnd); }} className="px-3 py-1 bg-electric text-navy text-xs rounded-lg">Find</button>
          {shortestPathResult.length > 0 && <span className="text-xs text-electric ml-2">{shortestPathResult.map(id => rawNodes.find(n => n.id === id)?.label || id).join(' → ')}</span>}
        </div>
      )}
      <div className="flex items-center gap-4 px-4 py-1.5 bg-navy-light border-b border-navy-lightest">
        <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="px-2 py-1 bg-navy-lightest rounded text-xs text-white"><option value="all">All Depts</option>{allDepartments.map(d => <option key={d} value={d}>{d}</option>)}</select>
        <select value={expertiseFilter} onChange={e => setExpertiseFilter(e.target.value)} className="px-2 py-1 bg-navy-lightest rounded text-xs text-white"><option value="all">All Expertise</option>{allExpertise.map(e => <option key={e} value={e}>{e}</option>)}</select>
        <div className="flex gap-2 ml-auto"><div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-electric"></div><span className="text-xs text-slate">People</span></div><div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div><span className="text-xs text-slate">Projects</span></div><div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><span className="text-xs text-slate">Concepts</span></div></div>
      </div>
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <svg ref={svgRef} width="100%" height="100%" className="cursor-grab active:cursor-grabbing" />
        {tooltipData && (
          <div className="absolute z-50 card p-3 min-w-48 pointer-events-none" style={{ left: Math.min((tooltipData.node.x || 0) + 20, (containerRef.current?.clientWidth || 800) - 260), top: Math.min((tooltipData.node.y || 0) - 20, (containerRef.current?.clientHeight || 600) - 160) }}>
            <div className="flex items-center gap-2 mb-1"><div className={`w-2.5 h-2.5 rounded-full ${getColor(tooltipData.node.type)}`}></div><span className="font-semibold text-white text-sm">{tooltipData.node.label}</span></div>
            {tooltipData.employee && <p className="text-xs text-slate">{tooltipData.employee.title} • Score: {tooltipData.employee.knowledgeScore}</p>}
            {tooltipData.project && <p className="text-xs text-slate">{tooltipData.project.status} • {tooltipData.project.lessonsLearned} lessons</p>}
          </div>
        )}
      </div>
      {selectedNode && (() => {
        const emp = employees.find(e => e.id === selectedNode.id);
        const proj = projects.find(p => p.id === selectedNode.id);
        return (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-72 bg-navy-light border border-navy-lightest rounded-xl p-4 z-40">
            <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-white">{selectedNode.label}</h3><button onClick={() => setSelectedNode(null)} className="text-slate hover:text-white"><X className="w-4 h-4" /></button></div>
            {emp && <div className="space-y-2"><p className="text-xs text-slate">{emp.title} • {emp.department}</p><div className="flex flex-wrap gap-1">{emp.expertise.map((e, i) => <span key={i} className="px-2 py-0.5 bg-navy-lightest rounded text-xs text-electric">{e}</span>)}</div><div className="pt-2"><div className="flex justify-between text-xs mb-1"><span className="text-slate">Knowledge Score</span><span className="text-electric">{emp.knowledgeScore}/100</span></div><div className="w-full h-1.5 bg-navy-lightest rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-electric to-electric-dark rounded-full" style={{ width: `${emp.knowledgeScore}%` }} /></div></div><button onClick={() => navigate('/assistant', { state: { prefillQuery: `Tell me about ${emp.name}` } })} className="mt-3 flex items-center gap-2 px-3 py-2 bg-electric/10 text-electric rounded-lg text-xs w-full justify-center"><Bot className="w-3 h-3" /> Ask AI</button></div>}
            {proj && <div className="space-y-2"><p className={`text-xs px-2 py-0.5 rounded inline-block ${proj.status === 'completed' ? 'bg-green-500/20 text-green-400' : proj.status === 'active' ? 'bg-electric/20 text-electric' : 'bg-red-500/20 text-red-400'}`}>{proj.status}</p><p className="text-xs text-slate mt-2">{proj.lessonsLearned} lessons • {proj.decisions} decisions</p></div>}
          </div>
        );
      })()}
    </div>
  );
};
export default KnowledgeGraph;