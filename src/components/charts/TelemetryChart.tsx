"use client";

import { TelemetryPoint } from "@/types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TelemetryChartProps {
  data: TelemetryPoint[];
  className?: string;
}

export function TelemetryChart({ data, className }: TelemetryChartProps) {
  return (
    <div className={`glass-panel p-4 rounded-xl w-full h-[300px] ${className || ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
          <XAxis 
            dataKey="timestamp" 
            stroke="#8B949E" 
            fontSize={12}
            tickFormatter={(val) => new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          />
          <YAxis stroke="#8B949E" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1C2128', borderColor: '#30363D', color: '#E6EDF3', borderRadius: '8px' }}
            labelStyle={{ color: '#8B949E', marginBottom: '4px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Line type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Temp (\u00b0C)" />
          <Line type="monotone" dataKey="vibration" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Vibration (mm/s)" />
          <Line type="monotone" dataKey="pressure" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Pressure (bar)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
