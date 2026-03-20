"use client";
import { MaintenanceTask } from "@/types";

interface MaintenanceTableProps {
  logs: MaintenanceTask[];
}

export function MaintenanceTable({ logs }: MaintenanceTableProps) {
  return (
    <div className="w-full overflow-x-auto glass-panel rounded-xl">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-[var(--color-muted)] uppercase bg-[var(--color-surface)] border-b border-[var(--color-border)]">
          <tr>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Action Taken</th>
            <th className="px-4 py-3 font-semibold">Technician</th>
            <th className="px-4 py-3 font-semibold">Outcome</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)]/50 transition-colors">
              <td className="px-4 py-3 font-mono text-[var(--color-muted)]">
                {new Date(log.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-[var(--color-foreground)]">{log.title}</td>
              <td className="px-4 py-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--color-border)] flex items-center justify-center text-xs font-bold">
                  {log.assignedTo.charAt(0)}
                </div>
                <span>{log.assignedTo}</span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  log.status === 'completed' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' 
                  : log.status === 'in_progress' ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                  : 'bg-[var(--color-info)]/10 text-[var(--color-info)]'
                }`}>
                  {log.status.replace('_', ' ').toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
