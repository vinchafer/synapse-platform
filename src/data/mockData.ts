export const employees = [
  { id: 'e1', name: 'Sarah Chen', title: 'CTO', department: 'Executive', expertise: ['Distributed Systems', 'AI Strategy', 'Enterprise Architecture'], knowledgeScore: 97, projects: 18 },
  { id: 'e2', name: 'Michael Roberts', title: 'VP Engineering', department: 'Engineering', expertise: ['Microservices', 'Kubernetes', 'Team Leadership'], knowledgeScore: 92, projects: 24 },
  { id: 'e3', name: 'Elena Rodriguez', title: 'Head of Product', department: 'Product', expertise: ['Product Strategy', 'UX Research', 'Market Analysis'], knowledgeScore: 89, projects: 15 },
  { id: 'e4', name: 'James Wilson', title: 'Principal Architect', department: 'Engineering', expertise: ['Cloud Architecture', 'Security', 'System Design'], knowledgeScore: 94, projects: 12 },
  { id: 'e5', name: 'Amanda Foster', title: 'Data Science Director', department: 'Data', expertise: ['Machine Learning', 'Predictive Analytics', 'Knowledge Graphs'], knowledgeScore: 88, projects: 11 },
  { id: 'e6', name: 'David Kim', title: 'Senior Backend Engineer', department: 'Engineering', expertise: ['Python', 'FastAPI', 'Database Design'], knowledgeScore: 76, projects: 8 },
  { id: 'e7', name: 'Lisa Thompson', title: 'UX Design Lead', department: 'Design', expertise: ['User Research', 'Design Systems', 'Interaction Design'], knowledgeScore: 82, projects: 16 },
  { id: 'e8', name: 'Robert Chang', title: 'Sales Director', department: 'Sales', expertise: ['Enterprise Sales', 'Client Relations', 'Negotiation'], knowledgeScore: 78, projects: 21 },
  { id: 'e9', name: 'Jennifer Adams', title: 'HR Director', department: 'People', expertise: ['Organizational Design', 'Talent Management', 'Change Management'], knowledgeScore: 74, projects: 7 },
  { id: 'e10', name: 'Thomas Anderson', title: 'CFO', department: 'Executive', expertise: ['Financial Modeling', 'Strategic Planning', 'Risk Management'], knowledgeScore: 91, projects: 9 },
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `e${i + 11}`, name: ['Alex Johnson','Maria Garcia','John Smith','Emily Davis','Daniel Brown','Sophia Miller','William Taylor','Olivia Wilson','Benjamin Moore','Isabella Jackson','Lucas White','Mia Harris','Henry Martin','Charlotte Thompson','Alexander Garcia','Ava Martinez','Daniel Robinson','Harper Clark','Matthew Lewis','Abigail Lee','Andrew Walker','Evelyn Hall','Joseph Allen','Amelia Young','David King','Elizabeth Wright','Samuel Scott','Victoria Green','Anthony Adams','Grace Baker','Christopher Nelson','Chloe Carter','Joshua Mitchell','Lily Perez','Andrew Roberts','Zoe Turner','Ryan Phillips','Hannah Campbell','Nathan Parker','Lillian Evans'][i],
    title: ['Senior Engineer','Product Manager','Data Scientist','UX Designer','Solution Architect','Engineering Manager','Business Analyst','Technical Lead'][i % 8],
    department: ['Engineering','Product','Data','Design','Sales','Operations'][i % 6],
    expertise: [['React','TypeScript','Frontend'],['Python','ML','Data Pipelines'],['Go','Backend','APIs'],['AWS','Cloud','DevOps']][i % 4],
    knowledgeScore: 45 + Math.floor(Math.random() * 40), projects: 2 + Math.floor(Math.random() * 10)
  }))
];

export const projects = [
  { id: 'p1', name: 'Project Phoenix', status: 'completed', startDate: '2021-03-15', endDate: '2022-01-30', owner: 'e2', outcome: 'partial_success', lessonsLearned: 12, decisions: 47 },
  { id: 'p2', name: 'European Market Expansion', status: 'completed', startDate: '2022-04-01', endDate: '2023-02-28', owner: 'e8', outcome: 'success', lessonsLearned: 23, decisions: 62 },
  { id: 'p3', name: 'Customer 360 Platform', status: 'active', startDate: '2025-01-10', endDate: null, owner: 'e5', outcome: null, lessonsLearned: 8, decisions: 31 },
  { id: 'p4', name: 'AI-Powered Search Engine', status: 'completed', startDate: '2023-06-01', endDate: '2024-03-15', owner: 'e4', outcome: 'success', lessonsLearned: 17, decisions: 39 },
  { id: 'p5', name: 'Zero Trust Security Initiative', status: 'completed', startDate: '2022-09-01', endDate: '2023-08-30', owner: 'e4', outcome: 'success', lessonsLearned: 9, decisions: 28 },
  { id: 'p6', name: 'Mobile App Rewrite', status: 'cancelled', startDate: '2023-02-01', endDate: '2023-10-15', owner: 'e6', outcome: 'failed', lessonsLearned: 31, decisions: 54 },
  { id: 'p7', name: 'Salesforce Integration', status: 'completed', startDate: '2024-01-05', endDate: '2024-06-20', owner: 'e8', outcome: 'success', lessonsLearned: 6, decisions: 19 },
  { id: 'p8', name: 'Data Warehouse Modernization', status: 'active', startDate: '2024-09-01', endDate: null, owner: 'e5', outcome: null, lessonsLearned: 14, decisions: 36 },
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `p${i + 9}`, name: ['API Gateway Migration','Cloud Cost Optimization','Developer Portal','Analytics Platform','Customer Support Tool','Payment System Upgrade','Identity Management','Performance Optimization','Compliance Automation','Documentation Platform','ML Recommendation Engine','Real-time Collaboration'][i],
    status: ['completed','completed','active','completed','cancelled'][i % 5],
    startDate: `202${2 + Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`,
    endDate: Math.random() > 0.3 ? `202${3 + Math.floor(Math.random() * 3)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-15` : null,
    owner: `e${2 + Math.floor(Math.random() * 8)}`, outcome: ['success','partial_success','failed'][Math.floor(Math.random() * 3)],
    lessonsLearned: 3 + Math.floor(Math.random() * 25), decisions: 10 + Math.floor(Math.random() * 50)
  }))
];

export const kpiMetrics = {
  knowledgeRetentionScore: { current: 58, target: 70, trend: +7.2, baseline: 28 },
  knowledgeAtRisk: { current: 12, target: 5, trend: -3.1, totalEmployees: 3000 },
  timeToCompetency: { current: 67, target: 40, trend: -12.3, unit: 'days' },
  searchAnswerTime: { current: 145, target: 90, trend: -42, unit: 'seconds' },
  decisionsReferencingPast: { current: 38, target: 60, trend: +11.5 },
  duplicateWorkReduction: { current: 22, target: 50, trend: +8.7 },
  knowledgeLossPerDeparture: { current: 27, target: 10, trend: -9.4 }
};

export const graphNodes = [
  ...employees.map(e => ({ id: e.id, label: e.name.split(' ')[0], type: 'person', group: 1, size: Math.max(8, e.knowledgeScore / 8) })),
  ...projects.map(p => ({ id: p.id, label: p.name.split(' ')[0], type: 'project', group: 2, size: 12 })),
  ...Array.from({ length: 130 }, (_, i) => ({
    id: `c${i}`, label: ['Architecture','Security','Performance','UX','API','Database','Cloud','ML','DevOps','Testing','Scalability','Reliability','Cost','Compliance','Integration','Migration','Automation','Analytics','Mobile','Web','Backend','Frontend','Data','AI','Workflow','Process','Strategy','Risk','Quality','Documentation','Training','Support','Sales','Product','Design','Research'][i % 36],
    type: 'concept', group: 3, size: 6 + Math.random() * 6
  }))
];

export const graphLinks = Array.from({ length: 180 }, () => ({
  source: graphNodes[Math.floor(Math.random() * graphNodes.length)].id,
  target: graphNodes[Math.floor(Math.random() * graphNodes.length)].id,
  value: 0.3 + Math.random() * 0.7
})).filter(l => l.source !== l.target);

export const sampleResponses: Record<string, { answer: string; confidence: number; sources: Array<{ title: string; date: string; author: string }>; experts: string[] }> = {
  "microservices project phoenix": {
    answer: "Project Phoenix attempted to migrate our monolith to microservices in 2021-2022. The project was partially successful but ultimately rolled back due to underestimated operational complexity.\n\nKey findings:\n• Distributed debugging became exponentially harder\n• Network latency increased 40% for critical paths\n• Team cognitive load exceeded sustainable levels\n\nFinal decision: We adopted a modular monolith approach instead, which delivered 80% of the benefits with 20% of the cost.",
    confidence: 0.94,
    sources: [{ title: "Project Phoenix Final Post-Mortem", date: "Jan 30, 2022", author: "Michael Roberts" }, { title: "Architecture Decision Record 047", date: "Nov 12, 2021", author: "James Wilson" }, { title: "Engineering All-Hands Presentation", date: "Feb 3, 2022", author: "Sarah Chen" }],
    experts: ["e4", "e2", "e1"]
  },
  "european market expansion": {
    answer: "Our 2022 European expansion successfully established operations in Germany, France, and UK. Key learnings that are still applied today:\n\n1. GDPR requires data residency architecture decisions before product development\n2. Local sales teams are 3x more effective than US-based remote teams\n3. Payment method preferences vary drastically by country\n\nThis project delivered $42M annual recurring revenue within 18 months.",
    confidence: 0.97,
    sources: [{ title: "Europe Launch Playbook", date: "Feb 28, 2023", author: "Robert Chang" }, { title: "Executive Summary Q1 2023", date: "Mar 15, 2023", author: "Thomas Anderson" }],
    experts: ["e8", "e3", "e10"]
  },
  "who knows about kubernetes": {
    answer: "Based on content analysis, commit history, and project involvement:\n\n🥇 Michael Roberts (VP Engineering) - Primary expertise. Led 4 major Kubernetes migrations, authored our internal standards.\n🥈 James Wilson (Principal Architect) - Designed our production cluster architecture.\n🥉 Sarah Chen (CTO) - Strategic oversight and architectural decisions.\n\n12 additional engineers have working experience across production environments.",
    confidence: 0.91,
    sources: [],
    experts: ["e2", "e4", "e1"]
  }
};