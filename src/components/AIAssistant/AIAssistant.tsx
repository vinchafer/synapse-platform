import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Bot, User, Sparkles, Copy, ThumbsUp, ThumbsDown, FileText, Users, Share2, History, Download, Check } from 'lucide-react';
import { sampleResponses, employees } from '../../data/mockData';
import type { Message, ChatHistory } from '../../types';
import { useTheme } from '../../hooks/useTheme';

const genId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

const AIAssistant = () => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>(() => {
    const state = location.state as any;
    if (state?.prefillQuery) {
      return [{ id: genId(), type: 'assistant', content: "Hello! I'm Synapse. Ask me about projects, people, or expertise.", timestamp: new Date() }];
    }
    const saved = localStorage.getItem('synapse-chat-history');
    if (saved) try { const p: ChatHistory[] = JSON.parse(saved); if (p.length > 0) return p[0].messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) })); } catch {}
    return [{ id: genId(), type: 'assistant', content: "Hello! I'm Synapse. Ask me about projects, people, or expertise.", timestamp: new Date() }];
  });
  const [input, setInput] = useState<string>(() => {
    const state = location.state as any;
    return state?.prefillQuery || '';
  });
  const [typing, setTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const respond = (q: string) => {
    const lq = q.toLowerCase();
    for (const [k, v] of Object.entries(sampleResponses)) if (lq.includes(k.split(' ')[0])) return v as any;
    return { answer: `I couldn't find a direct match for "${q}". Try asking about projects like "Project Phoenix" or expertise like "Kubernetes".`, confidence: 0.45, sources: [], experts: [] };
  };

  const followUpList = (q: string) => {
    const l = q.toLowerCase();
    if (l.includes('phoenix')) return ['What lessons were learned?', 'Who owned Project Phoenix?', 'What was the outcome?'];
    if (l.includes('kubernetes')) return ['Who else knows Kubernetes?', 'What projects used it?'];
    if (l.includes('europe')) return ['What was the revenue impact?', 'Which countries?'];
    return ['What happened with Project Phoenix?', 'Who knows about Kubernetes?', 'Tell me about our European expansion'];
  };

  const submit = async (e?: React.FormEvent, q?: string) => {
    if (e) e.preventDefault();
    const text = q || input; if (!text.trim()) return;
    setMessages(p => [...p, { id: genId(), type: 'user', content: text, timestamp: new Date() }]);
    setInput(''); setTyping(true); setFollowUps([]);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
    const r = respond(text);
    setMessages(p => [...p, { id: genId(), type: 'assistant', content: r.answer, timestamp: new Date(), sources: r.sources, confidence: r.confidence, experts: r.experts, feedback: null }]);
    setTyping(false);
    setFollowUps(followUpList(text));
  };

  const saveChat = useCallback((msgs: Message[]) => {
    const title = msgs.length > 1 ? msgs[1].content.substring(0, 40) + '...' : 'New Chat';
    const chats: ChatHistory[] = [{ id: genId(), title, messages: msgs, timestamp: new Date() }];
    localStorage.setItem('synapse-chat-history', JSON.stringify(chats.map(h => ({ ...h, timestamp: h.timestamp.toISOString(), messages: h.messages.map(m => ({ ...m, timestamp: m.timestamp.toISOString() })) }))));
  }, []);

  useEffect(() => { saveChat(messages); }, [messages, saveChat]);

  const handleExport = async () => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      doc.text('Synapse AI Conversation', 20, 20);
      let y = 30;
      messages.forEach(m => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(m.type === 'user' ? 'You:' : 'Synapse:', 20, y);
        y += 6;
        const lines = doc.splitTextToSize(m.content, 170);
        lines.forEach((l: string) => { if (y > 270) { doc.addPage(); y = 20; } doc.text(l, 20, y); y += 5; });
        y += 5;
      });
      doc.save('synapse-conversation.pdf');
    } catch {}
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-navy-lightest">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center"><Bot className="w-6 h-6 text-electric" /></div>
          <div><h2 className={`text-xl font-bold ${theme === 'light' ? 'text-light-text' : 'text-white'}`}>AI Assistant</h2><p className={`text-sm ${theme === 'light' ? 'text-light-muted' : 'text-slate'}`}>Ask anything about your organization</p></div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowHistory(!showHistory)} className={`p-2 rounded-lg ${showHistory ? 'bg-electric/20 text-electric' : 'bg-navy-lightest text-slate'}`}><History className="w-4 h-4" /></button>
        </div>
      </div>
      {showHistory && <div className="bg-navy-light border-b border-navy-lightest p-4"><p className="text-xs text-slate">Conversations are saved automatically.</p></div>}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex gap-3 ${m.type === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${m.type === 'user' ? 'bg-navy-lightest' : 'bg-electric/10'}`}>
              {m.type === 'user' ? <User className="w-4 h-4 text-slate-light" /> : <Bot className="w-4 h-4 text-electric" />}
            </div>
            <div className={`max-w-3xl ${m.type === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block p-3 rounded-xl text-sm ${m.type === 'user' ? 'bg-electric text-navy' : 'bg-navy-light border border-navy-lightest'}`}>{m.content}</div>
              {m.type === 'assistant' && (
                <div className="mt-2 space-y-2">
                  {m.confidence && <div className="flex items-center gap-1 text-xs text-slate"><Sparkles className="w-3 h-3 text-electric" /> Confidence: {Math.round(m.confidence * 100)}%</div>}
                  {m.sources && m.sources.length > 0 && <div className="text-xs text-slate"><FileText className="w-3 h-3 inline" /> {m.sources.length} source(s)</div>}
                  {m.experts && m.experts.length > 0 && <div className="flex flex-wrap gap-1">{m.experts.map((e, i) => <span key={i} className="text-xs px-2 py-0.5 bg-navy-lightest rounded text-electric">{employees.find(em => em.id === e)?.name || e}</span>)}</div>}
                  <div className="flex gap-1 pt-1">
                    <button onClick={() => navigator.clipboard.writeText(m.content)} className="p-1 rounded text-slate hover:text-white hover:bg-navy-lightest"><Copy className="w-3.5 h-3.5" /></button>
                    <button onClick={() => navigator.clipboard.writeText(`Synapse AI:\n${m.content}`)} className="p-1 rounded text-slate hover:text-white hover:bg-navy-lightest"><Share2 className="w-3.5 h-3.5" /></button>
                    <button onClick={handleExport} className="p-1 rounded text-slate hover:text-white hover:bg-navy-lightest"><Download className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && <div className="flex gap-3"><div className="w-9 h-9 rounded-lg bg-electric/10 flex items-center justify-center"><Bot className="w-4 h-4 text-electric" /></div><div className="flex gap-1 items-center"><div className="w-1.5 h-1.5 rounded-full bg-electric animate-bounce" /><div className="w-1.5 h-1.5 rounded-full bg-electric animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-1.5 h-1.5 rounded-full bg-electric animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>}
        <div ref={endRef} />
      </div>
      {followUps.length > 0 && <div className="px-4 pb-2 flex gap-2 overflow-x-auto">{followUps.map((q, i) => <button key={i} onClick={() => submit(undefined, q)} className="flex-shrink-0 px-3 py-1.5 bg-navy-lightest rounded-full text-xs text-slate-light hover:text-electric border border-navy-lightest">{q}</button>)}</div>}
      <form onSubmit={submit} className="p-4 border-t border-navy-lightest">
        <div className="flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask Synapse anything..."
            className="flex-1 px-4 py-3 bg-navy-lightest border border-navy-lightest rounded-xl text-white placeholder-slate focus:outline-none focus:border-electric/50" />
          <button type="submit" disabled={!input.trim() || typing}
            className="px-5 py-3 bg-electric text-navy font-semibold rounded-xl hover:bg-electric-dark disabled:opacity-50"><Send className="w-4 h-4" /></button>
        </div>
      </form>
    </div>
  );
};
export default AIAssistant;