"use client";

import { MachineCard } from "@/components/machines/MachineCard";
import { Machine } from "@/types";
import { Filter, Settings2 } from "lucide-react";

// Mock Data
const MOCK_MACHINES: Machine[] = [
  { id: "MCH-001", name: "Extruder Line Alpha", productionLine: "Line 1", protocol: "OPC-UA", status: "online", riskScore: 12, lastMaintenanceDate: "2024-10-01", nextScheduledDate: "2024-12-01", mtbf: 4500, openWorkOrders: 0, agentId: "agt-1" },
  { id: "MCH-002", name: "Cooling Tower 3", productionLine: "Cooling", protocol: "MQTT", status: "warning", riskScore: 54, lastMaintenanceDate: "2024-08-15", nextScheduledDate: "2024-11-20", mtbf: 3200, openWorkOrders: 1, agentId: "agt-2" },
  { id: "MCH-003", name: "Main Compressor", productionLine: "Infrastructure", protocol: "Modbus", status: "critical", riskScore: 89, lastMaintenanceDate: "2023-11-10", nextScheduledDate: "2024-10-30", mtbf: 1500, openWorkOrders: 3, agentId: "agt-3" },
  { id: "MCH-004", name: "Assembly Robot Arm B", productionLine: "Line 2", protocol: "REST", status: "online", riskScore: 28, lastMaintenanceDate: "2024-09-05", nextScheduledDate: "2025-01-10", mtbf: 6000, openWorkOrders: 0, agentId: "agt-4" },
  { id: "MCH-005", name: "Packaging Sealer", productionLine: "Line 3", protocol: "CSV", status: "offline", riskScore: 0, lastMaintenanceDate: "2024-10-20", nextScheduledDate: "2024-11-20", mtbf: 2000, openWorkOrders: 0, agentId: "agt-5" },
  { id: "MCH-006", name: "HVAC Unit North", productionLine: "Infrastructure", protocol: "MQTT", status: "online", riskScore: 35, lastMaintenanceDate: "2024-07-01", nextScheduledDate: "2025-01-01", mtbf: 8200, openWorkOrders: 0, agentId: "agt-6" },
];

export default function MachinesPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12 w-full max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings2 className="w-6 h-6 text-[var(--color-primary)]" />
            Machine Fleet Directory
          </h1>
          <p className="text-[var(--color-muted)] text-sm flex items-center gap-2 mt-1">
            Browse and manage all physical assets
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[var(--color-surface)] px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-border)]/50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_MACHINES.map(machine => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
}
