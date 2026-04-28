// Mulberry32 seeded PRNG
function seededRandom(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = seededRandom(42);
const irng = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min;

// Normal distribution (Box-Muller) around mean 62, std dev 18
const normalScore = (): number => {
  const u1 = rng(), u2 = rng();
  const n = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return Math.max(25, Math.min(98, Math.round(62 + n * 18)));
};

export const employees = [
  { id: 'e1', name: 'Sarah Chen', title: 'VP Engineering, Search Infrastructure', department: 'Engineering', expertise: ['Distributed Systems', 'Search Ranking', 'LLM Infrastructure'], knowledgeScore: 97, projects: 24 },
  { id: 'e2', name: 'Michael Roberts', title: 'Principal Engineer, Cloud Platform', department: 'Engineering', expertise: ['Kubernetes', 'Cloud Architecture', 'Distributed Systems'], knowledgeScore: 94, projects: 31 },
  { id: 'e3', name: 'Elena Rodriguez', title: 'Director of Product, Knowledge Tools', department: 'Product', expertise: ['Product Strategy', 'Knowledge Management', 'Enterprise UX'], knowledgeScore: 89, projects: 17 },
  { id: 'e4', name: 'James Wilson', title: 'Staff Software Engineer L7', department: 'Engineering', expertise: ['TensorFlow', 'ML Infrastructure', 'Performance Optimization'], knowledgeScore: 96, projects: 14 },
  { id: 'e5', name: 'Amanda Foster', title: 'Research Scientist, Google Brain', department: 'Research', expertise: ['Deep Learning', 'Large Language Models', 'Knowledge Graphs'], knowledgeScore: 93, projects: 12 },
  { id: 'e6', name: 'David Kim', title: 'Software Engineer L6', department: 'Engineering', expertise: ['Android Platform', 'Privacy Engineering', 'Mobile Infrastructure'], knowledgeScore: 78, projects: 19 },
  { id: 'e7', name: 'Lisa Thompson', title: 'Senior Product Manager', department: 'Product', expertise: ['Internal Tools', 'Developer Experience', 'Platform Strategy'], knowledgeScore: 82, projects: 14 },
  { id: 'e8', name: 'Robert Chang', title: 'Director, Go-To-Market', department: 'Go-To-Market', expertise: ['Enterprise Sales', 'Cloud Partnerships', 'Market Strategy'], knowledgeScore: 76, projects: 22 },
  { id: 'e9', name: 'Jennifer Adams', title: 'VP, People Operations', department: 'People Operations', expertise: ['Org Design', 'Talent Management', 'Knowledge Retention'], knowledgeScore: 88, projects: 9 },
  { id: 'e10', name: 'Thomas Anderson', title: 'VP, Finance & Strategy', department: 'Finance & Strategy', expertise: ['Financial Modeling', 'Resource Planning', 'ROI Analysis'], knowledgeScore: 91, projects: 11 },
  { id: 'e11', name: 'Marcus Rodriguez', title: 'Staff Software Engineer L7', department: 'Engineering', expertise: ['Android Low-Latency Audio', 'Mobile Infrastructure', 'Performance'], knowledgeScore: 95, projects: 16 },
  { id: 'e12', name: 'Priya Patel', title: 'Senior Research Scientist', department: 'Research', expertise: ['Natural Language Processing', 'Question Answering', 'Information Retrieval'], knowledgeScore: 90, projects: 13 },
  { id: 'e13', name: 'Alex Nakamura', title: 'Software Engineer L6', department: 'Engineering', expertise: ['Ads Auction Systems', 'Real-time Bidding', 'Distributed Computing'], knowledgeScore: 87, projects: 21 },
  { id: 'e14', name: 'Maria Gonzalez', title: 'Engineering Manager L6', department: 'Engineering', expertise: ['Cloud Infrastructure', 'Site Reliability', 'Incident Response'], knowledgeScore: 84, projects: 18 },
  { id: 'e15', name: 'John Kim', title: 'General Counsel', department: 'Legal', expertise: ['Privacy Law', 'IP Strategy', 'AI Regulation'], knowledgeScore: 72, projects: 7 },
  { id: 'e16', name: 'Sophia Williams', title: 'Product Lead, Internal AI', department: 'Product', expertise: ['AI Products', 'Internal Tools', 'Knowledge Management'], knowledgeScore: 79, projects: 11 },
  { id: 'e17', name: 'Daniel Okafor', title: 'Software Engineer L5', department: 'Engineering', expertise: ['Spanner', 'Database Systems', 'Distributed Transactions'], knowledgeScore: 73, projects: 9 },
  { id: 'e18', name: 'Emma Johansson', title: 'UX Director', department: 'Product', expertise: ['Design Systems', 'Internal UX', 'Information Architecture'], knowledgeScore: 77, projects: 15 },
  { id: 'e19', name: 'Ryan Murphy', title: 'Director of Engineering', department: 'Engineering', expertise: ['Cloud Networking', 'Infrastructure', 'Scalability'], knowledgeScore: 86, projects: 20 },
  { id: 'e20', name: 'Olivia Park', title: 'Senior Staff Engineer L7', department: 'Research', expertise: ['Search Quality', 'Ranking Algorithms', 'Machine Learning'], knowledgeScore: 92, projects: 12 },
  // Remaining 30 employees with bell-curve scores
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `e${i + 21}`, name: [
      'Ravi Sharma','Hannah Müller','Carlos Silva','Aisha Johnson','Wei Zhang','Fatima Al-Rashid','Kenji Watanabe','Nadia Petrov','Liam O\'Brien','Zara Hussain',
      'Victor Moreno','Amélie Dubois','Santiago Reyes','Mei-Lin Chang','Olga Kuznetsova','Derek Thompson','Ingrid Larsen','Hiroshi Tanaka','Esther Osei','Dmitri Ivanov',
      'Clara Santos','Babatunde Adeyemi','Yuki Mori','Ananya Krishnan','Stefan Berger','Leila Haddad','Anders Nilsson','Priyanka Verma','Mateo Hernandez','Suki Yoshida'
    ][i],
    title: [
      'Software Engineer L5','Senior Product Manager','Staff Engineer L6','Software Engineer L5','Engineering Manager L6','Research Scientist','Software Engineer L5','Product Manager','Staff Engineer L6','Senior UX Designer',
      'Software Engineer L5','Product Lead','Engineering Manager','Software Engineer L6','Data Scientist','Site Reliability Engineer L5','Product Manager','Research Engineer','Software Engineer L5','Engineering Manager L5',
      'Staff Data Scientist','Software Engineer L5','Product Manager','Staff Engineer L6','Senior Developer Advocate','Software Engineer L6','UX Research Lead','Product Manager','Software Engineer L5','Staff Engineer L6'
    ][i],
    department: [
      'Engineering','Product','Engineering','Engineering','Engineering','Research','Engineering','Product','Engineering','Product',
      'Engineering','Product','Engineering','Engineering','Research','Engineering','Product','Research','Engineering','Engineering',
      'Research','Engineering','Product','Engineering','Go-To-Market','Engineering','Product','Product','Engineering','Engineering'
    ][i],
    expertise: [
      ['TensorFlow','ML Pipelines','Model Serving'],['User Research','Product Strategy','Data Analysis'],['Kubernetes','Cloud Architecture','Infrastructure'],['Spanner','Database Design','SQL'],['Site Reliability','Distributed Systems','Monitoring'],['Deep Learning','NLP','Transformers'],['Android SDK','Mobile Dev','Kotlin'],['Internal Tools','Developer Workflow','Documentation'],['Performance Optimization','Profiling','C++'],['Design Systems','Figma','Prototyping'],
      ['Backend Systems','APIs','Go'],['Cross-functional Strategy','Roadmapping','Stakeholder Mgmt'],['Privacy Engineering','Data Security','Compliance'],['Cloud Networking','gRPC','Load Balancing'],['ML Pipelines','Data Engineering','BigQuery'],['Incident Response','Automation','SRE Practices'],['Product Analytics','Growth','AB Testing'],['Machine Learning','Computer Vision','Robotics'],['Distributed Systems','Message Queues','Kafka'],['Production Engineering','Capacity Planning','Chaos Engineering'],
      ['Statistical Modeling','A/B Testing','Causal Inference'],['Internal Tools','Automation','Scripting'],['Knowledge Management','Search','Taxonomy'],['Infrastructure','Containerization','Orchestration'],['Developer Relations','Technical Writing','Community'],['Mobile Infrastructure','iOS','Cross-platform'],['User Research','Qualitative Methods','Survey Design'],['Analytics','Data Products','Experimentation'],['Full Stack','Web Development','TypeScript'],['ML Infrastructure','Model Training','Data Pipelines']
    ][i],
    knowledgeScore: normalScore(),
    projects: 2 + irng(0, 15)
  }))
];

// Apply high-risk flags: 8 employees with score > 85 are marked high-risk
export const highRiskEmployees = employees.filter(e => e.knowledgeScore > 85).slice(0, 8);

export const projects = [
  { id: 'p1', name: 'Project Meridian', status: 'completed' as const, startDate: '2022-06-01', endDate: '2024-01-30', owner: 'e1', outcome: 'success' as const,
    lessonsLearned: [
      'Cross-team dependencies were underestimated by 40% — earlier architecture review would have prevented 3-month delay',
      'Investment in automated testing paid off: reduced regression bugs by 67% in production rollouts',
      'Weekly sync with Infrastructure team was critical for managing global rollout across 12 data centers',
      'Decision to use modular migration strategy allowed 60% of services to roll back independently when needed',
      'Documenting runbooks upfront saved 340 engineering hours during the cutover weekend'
    ],
    decisions: [
      'Migrate ML training pipeline before serving layer to minimize user-facing risk',
      'Standardize on gRPC for inter-service communication across all migrated services',
      'Staged rollout: APAC first → EMEA → AMER, with 2-week soak periods between each region'
    ]
  },
  { id: 'p2', name: 'Aurora Initiative', status: 'active' as const, startDate: '2024-03-01', endDate: null, owner: 'e19', outcome: null,
    lessonsLearned: [
      'Cloud cost optimization requires continuous monitoring — static budgets became obsolete within 4 weeks',
      'Right-sizing compute instances across 2,000+ workloads identified $4.7M in annual waste in first sprint',
      'Preemption-tolerant design patterns reduced spot instance disruption impact from 12% to 3%'
    ],
    decisions: [
      'Prioritize compute optimization before storage optimization (80% of waste was in compute)',
      'Implement automated rightsizing recommendations with one-click approval for safety',
      'Build internal cost dashboard in BigQuery rather than using third-party tools'
    ]
  },
  { id: 'p3', name: 'Helios Search Upgrade', status: 'completed' as const, startDate: '2023-09-01', endDate: '2024-08-15', owner: 'e20', outcome: 'success' as const,
    lessonsLearned: [
      'New ranking model improved top-1 accuracy by 23% but required 3x more TPU quota — underestimated compute cost by $1.2M',
      'User feedback integration loop reduced false positives by 41% over 6 iterations',
      'A/B experiment design flaws caused 2 weeks of wasted engineering time — need stricter statistical review gate'
    ],
    decisions: [
      'Deploy new ranking model to 5% of users for 4 weeks before full rollout',
      'Keep legacy search as fallback for minimum 6 months post-cutover',
      'Build real-time evaluation dashboard before launch to catch regressions immediately'
    ]
  },
  { id: 'p4', name: 'Titan Org Restructure', status: 'completed' as const, startDate: '2023-01-15', endDate: '2023-12-20', owner: 'e9', outcome: 'partial_success' as const,
    lessonsLearned: [
      'Org change communication needs 5x more channels than anticipated — 40% of org heard changes through informal channels first',
      'Knowledge transfer between teams was incomplete; 23 critical context items lost in first 90 days',
      'Cross-functional alignment took 3 full quarters instead of planned 1 — friction between Eng and Product was underestimated'
    ],
    decisions: [
      'Create dedicated knowledge preservation team during transition periods',
      'Implement 6-week overlap period for all reporting line changes',
      'Establish Org Change Champions in each pod for ground-level feedback'
    ]
  },
  { id: 'p5', name: 'Nexus Knowledge Audit', status: 'active' as const, startDate: '2024-06-01', endDate: null, owner: 'e3', outcome: null,
    lessonsLearned: [
      'Discovered 847 undocumented knowledge nodes in Search Infrastructure alone during initial audit',
      'Expertise mapping revealed 12 critical single points of failure where only one person holds key knowledge',
      'Teams with existing documentation culture adopted knowledge capture 3x faster than teams without'
    ],
    decisions: [
      'Mandate knowledge documentation as part of every L5+ engineer promotion packet',
      'Implement automated expertise extraction from code reviews, design docs, and bug comments',
      'Prioritize documentation for systems with fewer than 3 knowledgeable engineers'
    ]
  },
  { id: 'p6', name: 'Gemini Integration Platform', status: 'active' as const, startDate: '2024-05-15', endDate: null, owner: 'e5', outcome: null,
    lessonsLearned: [
      'LLM latency requirements for internal tools are dramatically different from consumer — 200ms vs 2s acceptable',
      'Prompt engineering guidelines reduced hallucination rate from 8% to 1.7% across all internal use cases',
      'On-premises model deployment was 3x more expensive than API — but required for sensitive data workloads'
    ],
    decisions: [
      'Use smaller distilled models for internal tools to meet latency requirements',
      'Implement human-in-the-loop for all knowledge extraction suggestions below 90% confidence',
      'Build unified prompt management system across all internal LLM integrations'
    ]
  },
  { id: 'p7', name: 'Knowledge Graph Pipeline', status: 'active' as const, startDate: '2024-08-01', endDate: null, owner: 'e4', outcome: null,
    lessonsLearned: [
      'Entity resolution across 50+ internal data sources required 3 redesigns to handle naming conflicts',
      'Real-time graph updates are overengineered for this use case — hourly batch updates suffice for knowledge analysis',
      'Graph database (Spanner + custom layer) outperformed dedicated graph DBs for Google-scale workloads'
    ],
    decisions: [
      'Use batch processing with 1-hour refresh window instead of real-time streaming',
      'Store graph edges in Spanner with adjacency lists for query performance',
      'Expose graph query API via gRPC with PageRank and shortest-path endpoints'
    ]
  },
  { id: 'p8', name: 'Internal Dev Productivity Initiative', status: 'completed' as const, startDate: '2023-04-01', endDate: '2024-02-28', owner: 'e7', outcome: 'success' as const,
    lessonsLearned: [
      'Reducing CI/CD pipeline time from 45min to 12min saved 14,000 engineer-hours in first quarter',
      'Developer survey response rates were below 15% until we introduced gamification and lunch credits',
      'Changes to internal tooling need 8-week deprecation windows — tool changes broke 47 CI pipelines in week 1'
    ],
    decisions: [
      'Invest in remote build caching before optimizing compilation',
      'Create dedicated Developer Productivity Engineering (DPE) team of 5 engineers',
      'Establish quarterly developer satisfaction survey with executive dashboard'
    ]
  },
  { id: 'p9', name: 'Privacy Engineering Sprint', status: 'completed' as const, startDate: '2023-10-01', endDate: '2024-06-30', owner: 'e15', outcome: 'success' as const,
    lessonsLearned: [
      'GDPR compliance required tracking data lineage across 342 distinct data pipelines — 60% were undocumented',
      'Privacy impact assessments reviewed 89 products in 9 months, uncovering 14 critical data exposure risks',
      'Automated PII detection reduced manual review time by 78% but missed 3% of borderline cases'
    ],
    decisions: [
      'Build automated data lineage tracking in all new pipeline deployments',
      'Mandate Privacy Engineer review for any feature processing user data',
      'Implement differential privacy by default in all analytics pipelines'
    ]
  },
  { id: 'p10', name: 'Deeptranslate Infrastructure', status: 'completed' as const, startDate: '2022-03-01', endDate: '2023-11-30', owner: 'e2', outcome: 'success' as const,
    lessonsLearned: [
      'GPU cluster utilization improved from 42% to 78% through intelligent job scheduling and preemption handling',
      'Cross-region model synchronization latency of 4.2s was acceptable for batch but unacceptable for real-time inference',
      'Tech debt in model serving layer caused 3 production incidents — dedicating 20% sprint time to debt was insufficient'
    ],
    decisions: [
      'Adopt hierarchical job queue with priority classes based on business impact',
      'Implement model compression (quantization + pruning) for real-time serving tier',
      'Dedicate 30% of engineering capacity to infrastructure tech debt reduction'
    ]
  },
  { id: 'p11', name: 'Ads Quality Refresh', status: 'active' as const, startDate: '2024-04-01', endDate: null, owner: 'e13', outcome: null,
    lessonsLearned: [
      'Real-time bidding model updates improved CTR by 8.3% but increased ad serving latency by 14ms',
      'Fighting adversarial traffic consumed 25% of ML engineering sprint capacity — automate detection first',
      'Auction system changes require 6-week validation windows due to revenue impact sensitivity'
    ],
    decisions: [
      'Implement ad quality prediction model with ensemble approach',
      'Build automated adversarial traffic detection using graph-based user behavior analysis',
      'Create staged rollout framework with revenue impact guardrails for auction changes'
    ]
  },
  { id: 'p12', name: 'Android Platform Refactor', status: 'cancelled' as const, startDate: '2023-06-01', endDate: '2024-01-15', owner: 'e6', outcome: 'failed' as const,
    lessonsLearned: [
      'Underestimated AOSP codebase complexity — dependency graph analysis revealed 1,247 interdependencies that needed untangling',
      'Rolling upgrade approach failed because API changes cascaded to 60+ Google apps',
      'Competing priorities from 8 different product teams made coordination impossible without executive mandate'
    ],
    decisions: [
      'Pivot to incremental API improvements instead of full platform refactor',
      'Establish cross-org API council before attempting similar platform changes',
      'Create graduated deprecation schedules with 12-month minimum migration windows'
    ]
  },
  // 8 generated projects with realistic patterns
  { id: 'p13', name: 'Cloud Cost Intelligence', status: 'active' as const, startDate: '2024-02-01', endDate: null, owner: 'e19', outcome: null,
    lessonsLearned: ['Initial cost anomaly detection had 40% false positive rate — needed 3 months labeled training data'],
    decisions: ['Build cost anomaly detection using historical usage patterns']
  },
  { id: 'p14', name: 'Internal Search 2.0', status: 'completed' as const, startDate: '2023-03-01', endDate: '2024-01-15', owner: 'e20', outcome: 'success' as const,
    lessonsLearned: ['Knowledge graph integration improved internal search relevance by 34% for technical queries'],
    decisions: ['Index all internal design docs and code reviews in unified search corpus']
  },
  { id: 'p15', name: 'Code Review Insights', status: 'active' as const, startDate: '2024-07-01', endDate: null, owner: 'e4', outcome: null,
    lessonsLearned: ['Extracting knowledge patterns from 2.5M code reviews required custom NLP pipeline for Google-internal terminology'],
    decisions: ['Build expertise detection model from code review comment patterns']
  },
  { id: 'p16', name: 'Talent Retention Analytics', status: 'active' as const, startDate: '2024-09-01', endDate: null, owner: 'e9', outcome: null,
    lessonsLearned: ['Predicted attrition risk model flagged 89% of eventual leavers 6+ months in advance using collaboration graph data'],
    decisions: ['Integrate attrition risk scores into manager dashboards with intervention playbooks']
  },
  { id: 'p17', name: 'Training Pipeline Automation', status: 'completed' as const, startDate: '2023-08-01', endDate: '2024-05-30', owner: 'e5', outcome: 'success' as const,
    lessonsLearned: ['Automating model retraining pipelines reduced mean time to deploy new models from 14 days to 8 hours'],
    decisions: ['Standardize on TFX pipeline format across all ML training workflows']
  },
  { id: 'p18', name: 'Privacy-First Analytics', status: 'completed' as const, startDate: '2023-11-01', endDate: '2024-08-30', owner: 'e15', outcome: 'success' as const,
    lessonsLearned: ['Differential privacy implementation reduced data utility by 12-18% — acceptable tradeoff for regulatory compliance'],
    decisions: ['Implement k-anonymity and l-diversity as intermediate privacy layers']
  },
  { id: 'p19', name: 'Knowledge Preservation Program', status: 'active' as const, startDate: '2024-01-01', endDate: null, owner: 'e9', outcome: null,
    lessonsLearned: ['Senior engineers leaving in 2024 Q1 resulted in estimated $340M in knowledge loss — retention bonuses saved only 30%'],
    decisions: ['Implement automated knowledge capture for all L6+ engineer-exclusive systems expertise']
  },
  { id: 'p20', name: 'Spanner Performance Sprint', status: 'cancelled' as const, startDate: '2024-04-01', endDate: '2024-09-30', owner: 'e17', outcome: 'failed' as const,
    lessonsLearned: ['Spanner schema optimization required deep understanding of interleaved tables — 3 engineers spent 8 weeks without measurable gains'],
    decisions: ['Postpone Spanner tuning until query pattern analysis complete']
  }
];

// Format projects with lessonsLearned as count and decisions as count for backward compatibility
export const projectsSummary = projects.map(p => ({
  id: p.id,
  name: p.name,
  status: p.status,
  startDate: p.startDate,
  endDate: p.endDate,
  owner: p.owner,
  outcome: p.outcome,
  lessonsLearned: p.lessonsLearned.length,
  decisions: p.decisions.length,
  lessonsLearnedArray: p.lessonsLearned,
  decisionsArray: p.decisions,
}));

export const kpiMetrics = {
  knowledgeRetentionScore: { current: 61, target: 75, trend: +8.4, baseline: 28 },
  knowledgeAtRisk: { current: 847, target: 400, trend: -12.6, totalEmployees: 140000, unit: 'employees' },
  estimatedAnnualLoss: { current: 340, target: 150, trend: -18.3, unit: 'M $' },
  timeToCompetency: { current: 73, target: 45, trend: -12.3, unit: 'days' },
  knowledgeCaptureRate: { current: 34, target: 60, trend: +15.2, unit: '%' },
  activeContributors: { current: 2847, target: 5000, trend: +22.1, unit: '' },
  duplicateWorkReduction: { current: 22, target: 50, trend: +8.7, unit: '%' },
  knowledgeLossPerDeparture: { current: 2.1, target: 0.8, trend: -9.4, unit: 'M $' }
};

export const graphNodes = [
  ...employees.map(e => ({ id: e.id, label: e.name.split(' ')[0], type: 'person' as const, group: 1, size: Math.max(8, e.knowledgeScore / 8) })),
  ...projects.map(p => ({ id: p.id, label: p.name.split(' ')[0], type: 'project' as const, group: 2, size: 12 })),
  ...Array.from({ length: 130 }, (_, i) => ({
    id: `c${i}`, label: [
      'Kubernetes','TensorFlow','Spanner','BigQuery','TPU','gRPC','Android','Search','Ads','Cloud',
      'Privacy','ML','NLP','Distributed Systems','Infrastructure','Performance','Mobile','API','Data','AI',
      'LLM','Security','Networking','Storage','Compute','Pipeline','Automation','Analytics','Ranking','Auction',
      'SRE','CI/CD','Testing','Monitoring','Deployment','Training','Inference','Optimization','Compression','Quantization'
    ][i % 40],
    type: 'concept' as const, group: 3, size: 6 + rng() * 6
  }))
];

// Deterministic graph links using seeded random
export const graphLinks = (() => {
  const links: Array<{ source: string; target: string; value: number }> = [];
  const nodeIds = graphNodes.map(n => n.id);
  const usedPairs = new Set<string>();
  for (let i = 0; i < 180; i++) {
    let s = nodeIds[Math.floor(rng() * nodeIds.length)];
    let t = nodeIds[Math.floor(rng() * nodeIds.length)];
    const key = `${s}|${t}`;
    if (s !== t && !usedPairs.has(key)) {
      usedPairs.add(key);
      usedPairs.add(`${t}|${s}`);
      links.push({ source: s, target: t, value: 0.3 + rng() * 0.7 });
    }
  }
  return links;
})();

export const sampleResponses: Record<string, { answer: string; confidence: number; sources: Array<{ title: string; date: string; author: string }>; experts: string[] }> = {
  "meridian": {
    answer: "Project Meridian was Google's ML infrastructure migration completed in January 2024. The project successfully migrated our ML training and serving infrastructure to a unified platform.\n\nKey findings:\n• Cross-team dependencies were underestimated by 40% — earlier architecture review would have prevented 3-month delay\n• Investment in automated testing paid off: regression bugs reduced by 67% in production rollouts\n• Decision to use modular migration strategy allowed 60% of services to roll back independently\n\nSarah Chen (VP Search Infrastructure) led the initiative. The project delivered 34% improvement in model deployment velocity and $12M annual infrastructure cost savings.",
    confidence: 0.87,
    sources: [
      { title: "Project Meridian Post-Mortem", date: "Feb 15, 2024", author: "Sarah Chen" },
      { title: "Architecture Decision Record 142", date: "Jan 30, 2024", author: "James Wilson" },
      { title: "Engineering Review Q1 2024", date: "Mar 10, 2024", author: "Amanda Foster" }
    ],
    experts: ["e1", "e4", "e5"]
  },
  "kubernetes k8s": {
    answer: "Google's internal Kubernetes expertise spans 340+ certified engineers across 8 departments. Here's the expertise map:\n\n🥇 Michael Roberts (Principal Engineer, Cloud Platform) - Primary K8s architect. Authored 23 internal design docs on cluster lifecycle management.\n🥈 Ryan Murphy (Director of Engineering) - Led the migration of 1,400+ microservices to GKE.\n🥉 David Kim (L6, Android) - K8s expert for mobile CI/CD pipelines.\n🏅 James Wilson (L7, ML Infrastructure) - K8s for TF training clusters.\n🏅 Priya Patel (Research Scientist) - K8s for large-scale NLP inference.\n\n12 additional L5+ engineers have production K8s experience. The org has 47 K8s clusters in production across 6 regions.",
    confidence: 0.92,
    sources: [],
    experts: ["e2", "e19", "e6"]
  },
  "onboarding new hire ramp": {
    answer: "Knowledge transfer gaps during new hire ramp-up are costing Google an estimated $47M annually in lost productivity during the critical first 6 months.\n\nPeople Operations data reveals:\n• Average time to first meaningful code contribution: 73 days (target: 45)\n• 62% of new L5 engineers report 'finding the right expert to ask' as their #1 challenge\n• Teams with documented onboarding playbooks see 34% faster ramp-up\n• Knowledge base search is the primary tool for 78% of new hires, but only 34% find what they need on first attempt\n\nRecommendation: Implement automated buddy pairing based on expertise graph proximity — cuts ramp time by 22%.",
    confidence: 0.79,
    sources: [
      { title: "People Ops Q3 Onboarding Analysis", date: "Oct 12, 2024", author: "Jennifer Adams" },
      { title: "New Hire Survey Results 2024", date: "Sep 30, 2024", author: "Emma Johansson" }
    ],
    experts: ["e9", "e18"]
  },
  "attrition leaving resignation": {
    answer: "Knowledge risk from senior engineer attrition is one of Google's most critical knowledge management challenges.\n\nKey data points:\n• Average knowledge loss per departing L7+ engineer: $2.1M (institutional knowledge, undocumented systems expertise, unspoken team context)\n• 847 knowledge nodes at risk from the 8 highest-scoring engineers identified by the Nexus audit\n• 60% of critical system knowledge exists exclusively in the heads of 1-2 individuals\n• Knowledge Preservation Program captured only 30% of at-risk knowledge in 2024\n\nRisk hotspots: Search Infrastructure (Sarah Chen, 97 score), ML Infrastructure (James Wilson, 96), Android Audio (Marcus Rodriguez, 95).",
    confidence: 0.84,
    sources: [
      { title: "Knowledge Preservation Program Q4 Report", date: "Jan 5, 2025", author: "Jennifer Adams" },
      { title: "Attrition Risk Analysis 2024", date: "Dec 15, 2024", author: "Thomas Anderson" }
    ],
    experts: ["e9", "e10", "e1"]
  }
};

export interface MonthlyData {
  month: string;
  retention: number;
  created: number;
  consumed: number;
}

export const monthlyRetentionData: MonthlyData[] = Array.from({ length: 12 }, (_, i) => {
  const baseRet = 42 + i * 2.8;
  return {
    month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
    retention: Math.round(baseRet + rng() * 10 - 5),
    created: Math.round(1200 + rng() * 800),
    consumed: Math.round(800 + rng() * 600),
  };
});