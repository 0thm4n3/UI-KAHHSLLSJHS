import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center space-x-2 text-red-400">
        <AlertTriangle size={20} />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;