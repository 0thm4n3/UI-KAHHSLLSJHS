import React from 'react';

interface ProgressBarProps {
  value: number;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className = '',
  variant = 'default',
  showLabel = true,
  size = 'md'
}) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  // Determine color based on variant
  let barColor = 'bg-indigo-600';
  
  switch (variant) {
    case 'success':
      barColor = 'bg-green-600';
      break;
    case 'warning':
      barColor = 'bg-yellow-600';
      break;
    case 'danger':
      barColor = 'bg-red-600';
      break;
    default:
      barColor = 'bg-indigo-600';
  }
  
  // Determine height based on size
  let barHeight = 'h-2';
  
  switch (size) {
    case 'sm':
      barHeight = 'h-1';
      break;
    case 'lg':
      barHeight = 'h-3';
      break;
    default:
      barHeight = 'h-2';
  }
  
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        {showLabel && (
          <div className="flex justify-between w-full">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs font-medium text-gray-300">{Math.round(normalizedValue)}%</span>
          </div>
        )}
      </div>
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${barHeight}`}>
        <div
          className={`${barColor} ${barHeight} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${normalizedValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;