"use client";

import { AlertTriangle, Filter, CheckCircle2, AlertCircle, Info, ArrowUpRight } from "lucide-react";
import { Alert } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_ALERTS: Alert[] = [
  { id: "ALT-01", machineId: "MCH-003", machineName: "Main Compressor", severity: "critical", title: "Bearing Vibration Exceeds Threshold", description: "Vibration on bearing 2 has increased by 45% in the last 24h.", aiAnalysis: "High correlation (92%) with previous catastrophic failure patterns. Requires immediate inspection to prevent rotor damage.", status: "new", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "ALT-02", machineId: "MCH-001", machineName: "Extruder Line Alpha", severity: "warning", title: "Line Pressure Drop", description: "Pressure briefly dropped below 4.2 bar for 2 seconds.", aiAnalysis: "Likely a minor blockage in the feed line. Recommend scheduling a clean during the next shift change.", status: "acknowledged", createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "ALT-03", machineId: "MCH-006", machineName: "HVAC Unit North", severity: "info", title: "Filter Efficiency Reduced", description: "Intake flow has decreased by 5%.", aiAnalysis: "Expected degradation over time. Recommend replacing filter within the next 30 days.", status: "new", createdAt: new Date(Date.now() - 86400000).toISOString() }
];

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12 h-[calc(100vh-80px)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alert & Notification Center</h1>
          <p className="text-[var(--color-muted)] text-sm">Triage and manage machine anomalies</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--color-surface)] px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-border)]/50 transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="flex gap-6 h-full min-h-0">
        <div className="w-1/2 lg:w-2/5 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          {MOCK_ALERTS.map((alert) => (
            <div key={alert.id} className={cn(
              "p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] cursor-pointer hover:border-[var(--color-primary)]/50 transition-all",
              alert.id === "ALT-01" && "border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5 shadow-[0_0_15px_var(--color-primary)]/10"
            )}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {alert.severity === 'critical' ? <AlertTriangle className="w-4 h-4 text-[var(--color-destructive)]" /> : 
                   alert.severity === 'warning' ? <AlertCircle className="w-4 h-4 text-[var(--color-warning)]" /> :
                   <Info className="w-4 h-4 text-[var(--color-info)]" />}
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-muted)]">{alert.machineName}</span>
                </div>
                <span className="text-[10px] text-[var(--color-muted)]">{new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
              <p className="text-xs text-[var(--color-muted)] line-clamp-1">{alert.description}</p>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="flex-1 glass-panel rounded-xl p-6 flex flex-col overflow-y-auto relative custom-scrollbar">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-destructive)]/5 rounded-full blur-[80px]" />
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] rounded-xl border border-[var(--color-destructive)]/20 shadow-[0_0_15px_var(--color-destructive)]/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{MOCK_ALERTS[0].title}</h2>
              <p className="text-sm font-mono text-[var(--color-muted)] flex items-center gap-1">
                {MOCK_ALERTS[0].machineName} <ArrowUpRight className="w-4 h-4 text-[var(--color-primary)] cursor-pointer" />
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-2">Description</h4>
              <p className="text-sm">{MOCK_ALERTS[0].description}</p>
            </div>
            
            <div className="border-l-4 border-l-[var(--color-primary)] bg-[var(--color-primary)]/5 p-4 rounded-r-xl">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2 flex items-center gap-2">
                <SparklesIcon /> AI Root Cause Analysis
              </h4>
              <p className="text-sm leading-relaxed">{MOCK_ALERTS[0].aiAnalysis}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center gap-4">
              <button className="flex-1 bg-[var(--color-primary)] text-[#0D1117] font-bold py-3 rounded-lg hover:bg-[#00e6b8] transition-colors shadow-[0_0_15px_var(--color-primary)]/30">
                1-Click Work Order
              </button>
              <button className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] py-3 rounded-lg hover:bg-[var(--color-surface)]/80 font-medium transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Acknowledge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  );
}
