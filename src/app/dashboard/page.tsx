"use client";

import { useState, useEffect } from "react";
import { MachineCard } from "@/components/machines/MachineCard";
import { Machine } from "@/types";
import { Activity, AlertTriangle, Calendar, Settings2, Sparkles } from "lucide-react";

// Mock Data
const MOCK_MACHINES: Machine[] = [
  { id: "MCH-001", name: "Extruder Line Alpha", productionLine: "Line 1", protocol: "OPC-UA", status: "online", riskScore: 12, lastMaintenanceDate: "2024-10-01", nextScheduledDate: "2024-12-01", mtbf: 4500, openWorkOrders: 0, agentId: "agt-1" },
  { id: "MCH-002", name: "Cooling Tower 3", productionLine: "Cooling", protocol: "MQTT", status: "warning", riskScore: 54, lastMaintenanceDate: "2024-08-15", nextScheduledDate: "2024-11-20", mtbf: 3200, openWorkOrders: 1, agentId: "agt-2" },
  { id: "MCH-003", name: "Main Compressor", productionLine: "Infrastructure", protocol: "Modbus", status: "critical", riskScore: 89, lastMaintenanceDate: "2023-11-10", nextScheduledDate: "2024-10-30", mtbf: 1500, openWorkOrders: 3, agentId: "agt-3" },
  { id: "MCH-004", name: "Assembly Robot Arm B", productionLine: "Line 2", protocol: "REST", status: "online", riskScore: 28, lastMaintenanceDate: "2024-09-05", nextScheduledDate: "2025-01-10", mtbf: 6000, openWorkOrders: 0, agentId: "agt-4" },
  { id: "MCH-005", name: "Packaging Sealer", productionLine: "Line 3", protocol: "CSV", status: "offline", riskScore: 0, lastMaintenanceDate: "2024-10-20", nextScheduledDate: "2024-11-20", mtbf: 2000, openWorkOrders: 0, agentId: "agt-5" },
  { id: "MCH-006", name: "HVAC Unit North", productionLine: "Infrastructure", protocol: "MQTT", status: "online", riskScore: 35, lastMaintenanceDate: "2024-07-01", nextScheduledDate: "2025-01-01", mtbf: 8200, openWorkOrders: 0, agentId: "agt-6" },
];

export default function DashboardPage() {
  const [machines, setMachines] = useState<Machine[]>(MOCK_MACHINES);
  const [isLive, setIsLive] = useState(false);

  // Simulate live data updates
  useEffect(() => {
    setIsLive(true);
    const interval = setInterval(() => {
      setMachines(current => 
        current.map(m => {
          if (m.status === 'offline') return m;
          const shift = Math.floor(Math.random() * 5) - 2;
          const newScore = Math.max(0, Math.min(100, m.riskScore + shift));
          let status = m.status;
          if (newScore >= 70) status = 'critical';
          else if (newScore >= 40) status = 'warning';
          else status = 'online';
          
          return { ...m, riskScore: newScore, status };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12 w-full max-w-[1400px] mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Plant Overview</h1>
          <p className="text-[var(--color-muted)] text-sm flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              {isLive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
            </span>
            Live Telemetry feed active
          </p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Machines", value: machines.length, icon: Settings2, color: "text-blue-500" },
          { label: "Active Alerts", value: machines.filter(m => m.status === 'critical' || m.status === 'warning').length, icon: AlertTriangle, color: "text-[var(--color-warning)]" },
          { label: "Scheduled Tasks Today", value: "4", icon: Calendar, color: "text-[var(--color-info)]" },
          { label: "Avg Risk Score", value: Math.round(machines.reduce((a,b)=>a+b.riskScore,0)/machines.length), icon: Activity, color: "text-[var(--color-destructive)]" },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[var(--color-muted)] text-xs uppercase font-semibold tracking-wider">{kpi.label}</span>
              <span className="text-3xl font-bold font-mono mt-1">{kpi.value}</span>
            </div>
            <div className={`p-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] ${kpi.color}`}>
              <kpi.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Main Grid */}
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)] mb-4">Machine Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {machines.map(machine => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="w-full xl:w-96 flex-shrink-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)] mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            Orchestrator Insights
          </h2>
          <div className="glass-panel rounded-xl p-5 border-l-2 border-l-[var(--color-primary)] flex flex-col gap-4">
            <div className="pb-4 border-b border-[var(--color-border)]">
              <span className="text-xs font-mono text-[var(--color-destructive)] uppercase tracking-wider block mb-1">Priority 1</span>
              <p className="text-sm font-medium">Main Compressor is showing an 89% risk of bearing failure within 48 hours. Recommend immediately assigning a technician.</p>
              <button className="mt-3 text-xs bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1.5 rounded hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/50 transition-colors text-[var(--color-primary)]">
                Create Work Order
              </button>
            </div>
            <div className="pb-4 border-b border-[var(--color-border)]">
              <span className="text-xs font-mono text-[var(--color-warning)] uppercase tracking-wider block mb-1">Priority 2</span>
              <p className="text-sm font-medium">Cooling Tower 3 coolant levels dropping 2% faster than expected model. Monitor closely.</p>
            </div>
            <div>
              <span className="text-xs font-mono text-[var(--color-success)] uppercase tracking-wider block mb-1">Optimization</span>
              <p className="text-sm font-medium text-[var(--color-muted)]">Extruder Line Alpha could safely decrease maintenance frequency by 15% based on pristine vibration history.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
