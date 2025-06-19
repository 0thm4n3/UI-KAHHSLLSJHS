import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, icon, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-2 py-2 text-sm rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-indigo-700 text-white'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </Link>
  );
};