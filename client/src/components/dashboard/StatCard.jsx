import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = '#D94B4B' }) => {
  return (
    <div className="bg-[#121923] border border-[#293444] rounded-xl p-5 hover:border-[#293444]/80 transition-all flex items-center justify-between">
      <div>
        <p className="text-xs font-mono uppercase text-[#9CA3AF] tracking-wider">{title}</p>
        <p className="text-2xl font-heading font-bold text-white mt-1">{value}</p>
      </div>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
        style={{
          backgroundColor: `${color}15`,
          borderColor: `${color}30`,
          color: color,
        }}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
