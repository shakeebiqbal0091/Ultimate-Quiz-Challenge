import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, ((current) / total) * 100));

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-medium text-slate-500">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
