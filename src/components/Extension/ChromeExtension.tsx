import React from 'react';
import { LayoutGrid, ExternalLink, Download, Code, CheckCircle } from 'lucide-react';

const ChromeExtension = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="max-w-xl text-center">
        <div className="w-20 h-20 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-6">
          <LayoutGrid className="w-10 h-10 text-electric" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Chrome Extension</h2>
        <p className="text-slate mb-8 leading-relaxed">
          Install the Synapse Chrome extension to capture knowledge directly from your browser.
          Highlight text, save decisions, and tag experts — all without leaving your workflow.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-8 text-left">
          {[{ title: 'Quick Capture', desc: 'Highlight any text and save to Synapse with a right-click' },
            { title: 'Auto-Tagging', desc: 'AI automatically identifies people, projects, and concepts' },
            { title: 'Org Search', desc: 'Search organizational knowledge directly from your address bar' }
          ].map((f, i) => (
            <div key={i} className="card p-4 text-center">
              <CheckCircle className="w-6 h-6 text-electric mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-slate">{f.desc}</p>
            </div>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-navy font-semibold rounded-xl hover:bg-electric-dark">
          <Download className="w-5 h-5" /> Download Extension
        </button>
      </div>
    </div>
  );
};
export default ChromeExtension;