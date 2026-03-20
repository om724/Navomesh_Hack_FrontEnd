"use client";

import { NLChatBubble } from "@/components/agents/NLChatBubble";
import { ChatMessage } from "@/types";
import { Bot, FileText, Send, Sparkles, AlertTriangle } from "lucide-react";

export default function QueryPage() {
  const MOCK_MESSAGES: ChatMessage[] = [
    { id: "1", role: "user", content: "What failed most last quarter across Line 1?", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: "2", role: "assistant", content: "Based on analysis of 47 logs and telemetry data from Line 1 over the last quarter, the most frequent point of failure was the Extruder Drive Belt (4 incidents). Secondary issue was Main Compressor bearing wear (2 incidents).", timestamp: new Date(Date.now() - 3590000).toISOString(), agentType: "Orchestrator" },
    { id: "3", role: "user", content: "Which machines need attention this week?", timestamp: new Date(Date.now() - 3000000).toISOString() },
    { id: "4", role: "assistant", content: "I've prioritized the following for immediate attention based on their predictive risk models:\n\n1. Main Compressor (89% risk) - Imminent bearing failure predicted.\n2. Cooling Tower 3 (54% risk) - Coolant levels dropping linearly.\n\nShould I generate work orders for these?", timestamp: new Date(Date.now() - 2950000).toISOString(), agentType: "Orchestrator" }
  ];

  return (
    <div className="flex flex-col animate-in fade-in duration-500 h-[calc(100vh-80px)]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[var(--color-primary)]" /> Orchestrator Query
          </h1>
          <p className="text-[var(--color-muted)] text-sm mt-1">Natural language insights across the entire plant matrix.</p>
        </div>
      </div>

      <div className="flex gap-6 h-full min-h-0 flex-1 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex-1 w-full overflow-y-auto custom-scrollbar px-4 pt-4 pb-8 flex flex-col gap-6 items-center">
            <div className="py-8 text-center text-[var(--color-muted)] max-w-lg">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-bold mb-2 text-[var(--color-foreground)]">Plant-wide Orchestrator Online</h3>
              <p className="text-sm">I have access to 4 years of historical telemetry, maintenance logs, and live data feeds. How can I assist?</p>
              
              <div className="grid grid-cols-2 gap-2 mt-6">
                {["What failed most last quarter?", "Which machines need attention this week?", "Explain Pump A vibration anomaly", "Generate a compliance report"].map(q => (
                  <button key={q} className="bg-[var(--color-surface)] border border-[var(--color-border)] p-2 text-xs rounded-xl hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/5 transition-colors line-clamp-1">
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            {MOCK_MESSAGES.map(m => <NLChatBubble key={m.id} message={m} />)}
            
            <div className="w-full max-w-4xl text-[10px] text-center text-[var(--color-muted)] font-mono uppercase tracking-widest my-2">
              Processing Context Vectors...
            </div>
            
            {/* Loading Indicator */}
            <div className="flex w-full gap-4 max-w-4xl justify-start opacity-70">
              <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-primary)]/50 flex items-center justify-center text-[var(--color-primary)]">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="glass-panel rounded-xl rounded-tl-none border-l-4 border-l-[var(--color-primary)] p-4 flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-2 flex items-center gap-2 mb-4 mt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
            <input 
              type="text" 
              placeholder="Ask the Orchestrator..." 
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm px-4"
              autoFocus
            />
            <button className="w-10 h-10 rounded-lg bg-[var(--color-primary)] text-[#0D1117] flex items-center justify-center hover:bg-[#00e6b8] transition-colors shadow-[0_0_15px_var(--color-primary)]/30 shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Context Panel */}
        <div className="w-80 glass-panel rounded-xl flex flex-col flex-shrink-0 hidden xl:flex">
          <div className="p-4 border-b border-[var(--color-border)]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)] flex items-center gap-2">
              <FileText className="w-4 h-4" /> Context Panel
            </h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <p className="text-[10px] font-mono uppercase text-[var(--color-primary)] tracking-wider mb-2">Sources Retrieved</p>
            <div className="flex flex-col gap-2">
              <div className="bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                <span className="text-xs font-bold block mb-1">MCH-003 Telemetry</span>
                <span className="text-[10px] text-[var(--color-muted)]">Time-series data: 30 days</span>
              </div>
              <div className="bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                <span className="text-xs font-bold block mb-1">MCH-001 Logs</span>
                <span className="text-[10px] text-[var(--color-muted)]">4 work orders</span>
              </div>
              <div className="bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                <span className="text-xs font-bold block mb-1">MCH-002 Telemetry</span>
                <span className="text-[10px] text-[var(--color-muted)]">Coolant sensors: 14 days</span>
              </div>
            </div>

            <div className="mt-6 border-t border-[var(--color-border)] pt-4">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-warning)] font-bold flex items-center gap-1 mb-2">
                <AlertTriangle className="w-3 h-3" /> Confidence Metric
              </span>
              <div className="w-full bg-[var(--color-border)] rounded-full h-1.5 mb-1 overflow-hidden">
                <div className="bg-[var(--color-warning)] h-full rounded-full w-[94%]" />
              </div>
              <span className="text-xs font-mono text-[var(--color-muted)]">94.2% overall accuracy bound</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
