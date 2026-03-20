"use client";

import { TaskCard } from "@/components/schedule/TaskCard";
import { MaintenanceTask } from "@/types";
import { Filter, Calendar as CalendarIcon, Bot, Plus } from "lucide-react";

const MOCK_TASKS: MaintenanceTask[] = [
  { id: "1", machineId: "MCH-003", machineName: "Main Compressor", title: "Bearing Inspection & Replacement", description: "", aiReason: "Vibration signature indicates 89% risk of failure in 48h", priority: "critical", status: "pending", dueDate: new Date().toISOString(), assignedTo: "Mike T.", estimatedHours: 4, createdAt: new Date().toISOString() },
  { id: "2", machineId: "MCH-001", machineName: "Extruder Line Alpha", title: "Clear Feed Line Blockage", description: "", aiReason: "Pressure drop pattern detected. Requires clearing.", priority: "medium", status: "pending", dueDate: new Date(Date.now() + 86400000).toISOString(), assignedTo: "Sarah C.", estimatedHours: 2, createdAt: new Date().toISOString() },
  { id: "3", machineId: "MCH-002", machineName: "Cooling Tower 3", title: "Top-up Coolant", description: "", aiReason: "Level dropping faster than nominal model.", priority: "medium", status: "in_progress", dueDate: new Date().toISOString(), assignedTo: "Alex J.", estimatedHours: 1, createdAt: new Date().toISOString() },
  { id: "4", machineId: "MCH-006", machineName: "HVAC Unit North", title: "Replace Air Filters", description: "", aiReason: "Flow reduced by 5%. Scheduled preventative maintenance.", priority: "low", status: "completed", dueDate: new Date(Date.now() - 86400000).toISOString(), assignedTo: "Sarah C.", estimatedHours: 1, createdAt: new Date().toISOString() }
];

export default function SchedulePage() {
  const pendingTasks = MOCK_TASKS.filter(t => t.status === 'pending');
  const inProgressTasks = MOCK_TASKS.filter(t => t.status === 'in_progress');
  const completedTasks = MOCK_TASKS.filter(t => t.status === 'completed');

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold border-l-4 border-[var(--color-primary)] pl-3 ml-[-4px]">Maintenance Schedule</h1>
          <p className="text-[var(--color-muted)] text-sm mt-1">Manage active work orders and assign technicians</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/50 px-4 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_var(--color-primary)]/20 hover:bg-[var(--color-primary)]/30 transition-all">
            <Bot className="w-4 h-4" /> AI Generate Schedule
          </button>
          <div className="flex bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-1">
            <button className="px-3 py-1 rounded bg-[var(--color-border)]/50 text-sm font-medium">Board</button>
            <button className="px-3 py-1 rounded hover:bg-[var(--color-border)]/50 transition-colors text-sm font-medium text-[var(--color-muted)]">List</button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 py-2 border-y border-[var(--color-border)] overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Filter className="w-4 h-4 text-[var(--color-muted)]" />
          <span className="text-sm font-semibold text-[var(--color-muted)] mr-2">Filters:</span>
        </div>
        {["All Machines", "Critical Priority", "My Tasks", "Due This Week"].map(f => (
          <span key={f} className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-xs font-mono font-medium whitespace-nowrap cursor-pointer hover:border-[var(--color-primary)]/50 transition-colors">
            {f}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-[var(--color-surface)] px-4 py-3 rounded-t-xl border-b-[3px] border-b-[#8B949E]">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[#8B949E]">Pending</h3>
            <span className="bg-[#8B949E]/20 text-[#8B949E] px-2 py-0.5 rounded text-xs font-bold">{pendingTasks.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {pendingTasks.map((t) => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-[var(--color-surface)] px-4 py-3 rounded-t-xl border-b-[3px] border-b-[var(--color-warning)]">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--color-warning)]">In Progress</h3>
            <span className="bg-[var(--color-warning)]/20 text-[var(--color-warning)] px-2 py-0.5 rounded text-xs font-bold">{inProgressTasks.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {inProgressTasks.map((t) => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-[var(--color-surface)] px-4 py-3 rounded-t-xl border-b-[3px] border-b-[var(--color-success)]">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--color-success)]">Completed</h3>
            <span className="bg-[var(--color-success)]/20 text-[var(--color-success)] px-2 py-0.5 rounded text-xs font-bold">{completedTasks.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {completedTasks.map((t) => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
