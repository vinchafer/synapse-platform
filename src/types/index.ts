export interface Employee { id: string; name: string; title: string; department: string; expertise: string[]; knowledgeScore: number; projects: number; }
export interface Project { id: string; name: string; status: 'active' | 'completed' | 'cancelled'; startDate: string; endDate: string | null; owner: string; outcome: 'success' | 'partial_success' | 'failed' | null; lessonsLearned: number; decisions: number; }
export interface GraphNode { id: string; label: string; type: 'person' | 'project' | 'concept'; group: number; size: number; x?: number; y?: number; }
export interface GraphLink { source: string | GraphNode; target: string | GraphNode; value: number; }
export interface AIResponse { answer: string; confidence: number; sources: Array<{ title: string; date: string; author: string }>; experts: string[]; }
export interface Message { id: string; type: 'user' | 'assistant'; content: string; timestamp: Date; sources?: Array<{ title: string; date: string; author: string }>; confidence?: number; experts?: string[]; feedback?: 'thumbsUp' | 'thumbsDown' | null; }
export interface KnowledgeFeedEvent { id: string; type: 'atRisk' | 'new' | 'gap' | 'confirmed'; title: string; description: string; timestamp: Date; employee?: Employee; project?: Project; }
export interface SearchResult { id: string; type: 'employee' | 'project' | 'concept' | 'answer'; label: string; subtitle: string; relevance: number; }
export interface RecentSearch { query: string; timestamp: Date; }
export interface ChatHistory { id: string; title: string; messages: Message[]; timestamp: Date; }
export interface OnboardingStep { id: number; title: string; description: string; targetElement: string; position: 'top' | 'bottom' | 'left' | 'right'; }