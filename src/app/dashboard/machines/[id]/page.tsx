"use client";

import { use } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { ChevronRight, MessageSquare, Plus, FileDown } from "lucide-react";
import { ProtocolBadge } from "@/components/machines/ProtocolBadge";
import { StatusDot } from "@/components/ui/StatusDot";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { AgentPanel } from "@/components/agents/AgentPanel";
import { MaintenanceTable } from "@/components/machines/MaintenanceTable";
import { Machine, TelemetryPoint, MaintenanceTask } from "@/types";

// Dynamic import for heavy chart component
const TelemetryChart = dynamic(
  () => import("@/components/charts/TelemetryChart").then(mod => mod.TelemetryChart),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-[300px] w-full bg-[#1C2128]/50 animate-pulse rounded-xl border border-[var(--color-border)] flex items-center justify-center">
        <span className="text-slate-500 font-mono text-xs">Loading telemetry...</span>
      </div>
    ) 
  }
);

// Mock data
const MOCK_MACHINE: Machine = {
  id: "MCH-001",
  name: "Extruder Line Alpha",
  productionLine: "Line 1",
  protocol: "OPC-UA",
  status: "warning",
  riskScore: 54,
  lastMaintenanceDate: "2024-10-01",
  nextScheduledDate: "2024-12-01",
  mtbf: 4500,
  openWorkOrders: 1,
  agentId: "agt-1"
};

const MOCK_TELEMETRY: TelemetryPoint[] = Array.from({ length: 24 }).map((_, i) => ({
  timestamp: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
  temperature: 65 + Math.random() * 15,
  vibration: 2.1 + Math.random() * 0.8,
  pressure: 4.5 + Math.random() * 0.5,
  rpm: 1450 + Math.random() * 100
}));

const MOCK_LOGS: MaintenanceTask[] = [
  { id: "1", machineId: "MCH-001", machineName: "Extruder Line Alpha", title: "Replace Drive Belt", description: "", aiReason: "", priority: "high", status: "completed", dueDate: "2024-10-01", assignedTo: "Sarah C.", estimatedHours: 2, createdAt: "2024-10-01" },
  { id: "2", machineId: "MCH-001", machineName: "Extruder Line Alpha", title: "Lubricate Bearings", description: "", aiReason: "", priority: "medium", status: "in_progress", dueDate: "2024-12-01", assignedTo: "Mike T.", estimatedHours: 1, createdAt: "2024-11-15" }
];

export default function MachineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Normally we'd fetch based on params.id
  const resolvedParams = use(params);
  const idStr = resolvedParams.id;
  const machine = MOCK_MACHINE; 

  return (
    <div className="flex flex-col gap-6 pb-12 animate-in fade-in duration-500">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
        <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors">Plant</Link>
        <ChevronRight className="w-3 h-3" />
        <span>{machine.productionLine}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[var(--color-foreground)]">{machine.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <StatusDot status={machine.status} />
            <h1 className="text-3xl font-bold tracking-wide">{machine.name}</h1>
            <ProtocolBadge protocol={machine.protocol} />
          </div>
          <p className="text-sm font-mono text-[var(--color-muted)]">ID: {idStr}</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-all flex items-center gap-2">
            <FileDown className="w-4 h-4" /> Export Report
          </button>
          <button className="bg-[var(--color-primary)] text-[#0D1117] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#00e6b8] transition-colors flex items-center gap-2 shadow-[0_0_10px_var(--color-primary)]/30">
            <Plus className="w-4 h-4" /> Work Order
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-muted)] mb-2">Risk Score</span>
          <RiskBadge score={machine.riskScore} className="text-2xl px-4 py-1" />
        </div>
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-muted)] mb-1">MTBF</span>
          <span className="text-2xl font-bold font-mono text-[var(--color-foreground)]">{machine.mtbf} <span className="text-sm text-[var(--color-muted)]">hrs</span></span>
        </div>
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-muted)] mb-1">Days since Maint</span>
          <span className="text-2xl font-bold font-mono text-[var(--color-foreground)]">
            {Math.floor((Date.now() - new Date(machine.lastMaintenanceDate).getTime()) / (1000 * 3600 * 24))}
          </span>
        </div>
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-muted)] mb-1">Open Work Orders</span>
          <span className="text-2xl font-bold font-mono text-[var(--color-warning)]">{machine.openWorkOrders}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-panel rounded-xl flex flex-col">
            <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center">
              <h3 className="font-semibold text-sm uppercase tracking-widest text-[var(--color-muted)]">Telemetry Live (Last 24h)</h3>
            </div>
            <TelemetryChart data={MOCK_TELEMETRY} className="border-0 bg-transparent shadow-none" />
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-[var(--color-muted)] pl-1">Maintenance History</h3>
            <MaintenanceTable logs={MOCK_LOGS} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <AgentPanel 
            analysis={`The ${machine.name} is exhibiting a 15% increase in vibration signatures highly correlated with bearing wear. Current trajectory risks a forced outage within 14 days. Recommend scheduling a bearing inspection and relubrication during the next available downtime window.`}
            confidence={88}
          />
          
          {/* Ask AI Context Box */}
          <div className="glass-panel p-4 rounded-xl mt-auto border-[var(--color-primary)]/30 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none" />
            <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />
              Ask Machine Agent
            </h4>
            <div className="relative">
              <input 
                type="text" 
                placeholder="What caused the last failure?" 
                className="w-full bg-[var(--color-surface)]/50 border border-[var(--color-border)] rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)] transition-all font-mono"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-primary)] hover:scale-110 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
