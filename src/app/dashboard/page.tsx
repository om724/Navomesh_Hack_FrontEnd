'use client';

import { useState, useEffect, useRef } from "react";
import { MachineCard } from "@/components/machines/MachineCard";
import { MachineCardSkeleton } from "@/components/machines/MachineCardSkeleton";
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
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const updateBuffer = useRef<Map<string, Partial<Machine>>>(new Map());

  useEffect(() => {
    // Simulate initial network fetch
    const initTimer = setTimeout(() => {
      setMachines(MOCK_MACHINES);
      setIsLoading(false);
      setIsLive(true);
    }, 1500);

    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (!isLive) return;

    // Simulate high-frequency incoming WS messages (e.g. 2 updates per sec)
    const wsMockInterval = setInterval(() => {
      const machineToUpdate = MOCK_MACHINES[Math.floor(Math.random() * MOCK_MACHINES.length)];
      if (machineToUpdate.status === 'offline') return;
      const shift = Math.floor(Math.random() * 5) - 2;
      
      // Store in buffer rather than immediately triggering a React render
      const existing = updateBuffer.current.get(machineToUpdate.id);
      updateBuffer.current.set(machineToUpdate.id, { 
        riskScore: (existing?.riskScore || 0) + shift 
      });
    }, 500);

    // Batch flush to state every 3 seconds
    const flushInterval = setInterval(() => {
      if (updateBuffer.current.size === 0) return;
      
      setMachines(current => 
        current.map(m => {
          const update = updateBuffer.current.get(m.id);
          if (!update || m.status === 'offline') return m;
          
          const newScore = Math.max(0, Math.min(100, m.riskScore + (update.riskScore || 0)));
          let status = m.status;
          if (newScore >= 70) status = 'critical';
          else if (newScore >= 40) status = 'warning';
          else status = 'online';
          
          return { ...m, riskScore: newScore, status };
        })
      );
      updateBuffer.current.clear();
    }, 3000);

    return () => {
      clearInterval(wsMockInterval);
      clearInterval(flushInterval);
    };
  }, [isLive]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-8 xl:pb-12 w-full max-w-[1600px] mx-auto overflow-x-hidden">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Plant Overview</h1>
          <p className="text-[var(--color-muted)] text-sm flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              {isLive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-[var(--color-success)]' : 'bg-slate-500'}`}></span>
            </span>
            {isLive ? 'Live Telemetry feed active' : 'Connecting to fleet...'}
          </p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Machines", value: isLoading ? "-" : machines.length, icon: Settings2, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Active Alerts", value: isLoading ? "-" : machines.filter(m => m.status === 'critical' || m.status === 'warning').length, icon: AlertTriangle, color: "text-[var(--color-warning)]", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "Scheduled Tasks", value: isLoading ? "-" : "4", icon: Calendar, color: "text-[var(--color-info)]", bg: "bg-blue-400/10 border-blue-400/20" },
          { label: "Avg Risk Score", value: isLoading ? "-" : Math.round(machines.reduce((a,b)=>a+b.riskScore,0)/(machines.length || 1)), icon: Activity, color: "text-[var(--color-destructive)]", bg: "bg-red-500/10 border-red-500/20" },
        ].map((kpi, i) => (
          <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 md:p-4 rounded-xl flex items-start sm:items-center justify-between flex-col-reverse sm:flex-row gap-2 sm:gap-0 shadow-sm">
            <div className="flex flex-col w-full">
              <span className="text-[var(--color-muted)] text-[10px] md:text-xs uppercase font-bold tracking-wider truncate">{kpi.label}</span>
              <span className="text-2xl md:text-3xl font-bold font-mono mt-1 text-[var(--color-foreground)]">{kpi.value}</span>
            </div>
            <div className={`p-2 sm:p-3 rounded-full ${kpi.bg} ${kpi.color} self-end sm:self-auto`}>
              <kpi.icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row-reverse gap-6">
        {/* AI Recommendations Panel */}
        <div className="w-full xl:w-[380px] 2xl:w-[420px] flex-shrink-0 flex flex-col min-w-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            Orchestrator Insights
          </h2>
          {/* Mobile horizontal scroll container, desktop vertical */}
          <div className="flex flex-row xl:flex-col gap-4 overflow-x-auto xl:overflow-x-visible pb-4 xl:pb-0 snap-x custom-scrollbar -mx-4 px-4 xl:mx-0 xl:px-0">
            <div className="w-[85vw] sm:w-[320px] xl:w-full flex-shrink-0 snap-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 border-l-[3px] border-l-[var(--color-destructive)] shadow-md min-h-[160px] flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-bold text-[var(--color-destructive)] uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded">Priority 1</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-[var(--color-foreground)] flex-1">Main Compressor is showing an 89% risk of bearing failure within 48 hours. Recommend immediately assigning a technician.</p>
              <button className="mt-4 text-xs font-semibold bg-[var(--color-primary)] text-black px-4 py-2 rounded-md hover:brightness-110 transition-all self-start shadow-[0_2px_10px_rgba(0,212,170,0.2)]">
                Create Work Order
              </button>
            </div>
            
            <div className="w-[85vw] sm:w-[320px] xl:w-full flex-shrink-0 snap-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 border-l-[3px] border-l-[var(--color-warning)] shadow-md min-h-[160px] flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-bold text-[var(--color-warning)] uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded">Priority 2</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-[var(--color-foreground)] flex-1">Cooling Tower 3 coolant levels dropping 2% faster than expected model. Monitor closely over next shift.</p>
              <button className="mt-4 text-xs font-semibold border border-[var(--color-border)] text-[var(--color-muted)] hover:text-white px-4 py-2 rounded-md hover:bg-[var(--color-surface)] transition-all self-start">
                View Telemetry
              </button>
            </div>
            
            <div className="w-[85vw] sm:w-[320px] xl:w-full flex-shrink-0 snap-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 border-l-[3px] border-l-[var(--color-success)] shadow-md min-h-[160px] flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-bold text-[var(--color-success)] uppercase tracking-wider bg-green-500/10 px-2 py-0.5 rounded">Optimization</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-[var(--color-foreground)] flex-1">Extruder Line Alpha could safely decrease maintenance frequency by 15% based on pristine vibration history.</p>
              <button className="mt-4 text-xs font-semibold border border-[var(--color-border)] text-teal-400 hover:text-teal-300 hover:border-teal-500/50 px-4 py-2 rounded-md hover:bg-teal-500/10 transition-all self-start">
                Adjust Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)] mb-3">Machine Fleet</h2>
          <div 
            className="grid gap-4 xl:gap-5" 
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {isLoading 
              ? Array.from({ length: 6 }).map((_, i) => <MachineCardSkeleton key={i} />)
              : machines.map(machine => (
                  <MachineCard key={machine.id} machine={machine} />
                ))
            }
          </div>
        </div>
      </div>
      
    </div>
  );
}
