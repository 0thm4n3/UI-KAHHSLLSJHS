import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'severity';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default' }) => {
  let bgColor = '';
  let textColor = '';

  if (variant === 'severity') {
    switch (status.toLowerCase()) {
      case 'critical':
        bgColor = 'bg-red-900/30';
        textColor = 'text-red-400';
        break;
      case 'high':
        bgColor = 'bg-orange-900/30';
        textColor = 'text-orange-400';
        break;
      case 'medium':
        bgColor = 'bg-yellow-900/30';
        textColor = 'text-yellow-400';
        break;
      case 'low':
        bgColor = 'bg-blue-900/30';
        textColor = 'text-blue-400';
        break;
      case 'info':
        bgColor = 'bg-gray-900/30';
        textColor = 'text-gray-400';
        break;
      default:
        bgColor = 'bg-gray-900/30';
        textColor = 'text-gray-400';
    }
  } else {
    switch (status.toLowerCase()) {
      case 'planning':
      case 'todo':
        bgColor = 'bg-gray-900/30';
        textColor = 'text-gray-400';
        break;
      case 'in-progress':
        bgColor = 'bg-blue-900/30';
        textColor = 'text-blue-400';
        break;
      case 'review':
        bgColor = 'bg-yellow-900/30';
        textColor = 'text-yellow-400';
        break;
      case 'completed':
      case 'resolved':
        bgColor = 'bg-green-900/30';
        textColor = 'text-green-400';
        break;
      case 'open':
        bgColor = 'bg-red-900/30';
        textColor = 'text-red-400';
        break;
      case 'accepted':
        bgColor = 'bg-purple-900/30';
        textColor = 'text-purple-400';
        break;
      default:
        bgColor = 'bg-gray-900/30';
        textColor = 'text-gray-400';
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default StatusBadge;