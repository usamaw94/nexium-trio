import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bgColor?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  bgColor = '#267275',
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center text-white"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
