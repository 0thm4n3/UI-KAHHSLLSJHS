import React from 'react';
import { 
  LayoutDashboard, 
  FolderClosed, 
  Shield, 
  Server, 
  Users, 
  FileText, 
  CheckSquare,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { NavLink } from '../ui/NavLink';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 pt-16 bg-gray-900 border-r border-gray-800 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:z-30`}
      >
        <div className="h-full flex flex-col justify-between overflow-y-auto">
          <nav className="px-4 py-6 space-y-1">
            <h3 className="text-xs uppercase text-gray-500 font-medium px-2 mb-2">Main</h3>
            <NavLink to="/" icon={<LayoutDashboard size={18} />} onClick={closeSidebar}>
              Dashboard
            </NavLink>
            <NavLink to="/projects" icon={<FolderClosed size={18} />} onClick={closeSidebar}>
              Projects
            </NavLink>
            <NavLink to="/vulnerabilities" icon={<Shield size={18} />} onClick={closeSidebar}>
              Vulnerabilities
            </NavLink>
            <NavLink to="/assets" icon={<Server size={18} />} onClick={closeSidebar}>
              Assets
            </NavLink>
            <NavLink to="/tasks" icon={<CheckSquare size={18} />} onClick={closeSidebar}>
              Tasks
            </NavLink>
            <NavLink to="/reports" icon={<FileText size={18} />} onClick={closeSidebar}>
              Reports
            </NavLink>
            <NavLink to="/team" icon={<Users size={18} />} onClick={closeSidebar}>
              Team
            </NavLink>

            <h3 className="text-xs uppercase text-gray-500 font-medium px-2 mt-6 mb-2">Other</h3>
            <NavLink to="/settings" icon={<Settings size={18} />} onClick={closeSidebar}>
              Settings
            </NavLink>
            <NavLink to="/help" icon={<HelpCircle size={18} />} onClick={closeSidebar}>
              Help & Support
            </NavLink>
            <NavLink to="/logout" icon={<LogOut size={18} />} onClick={closeSidebar}>
              Logout
            </NavLink>
          </nav>
          
          <div className="p-4 border-t border-gray-800">
            <div className="bg-gray-800 rounded-lg p-3">
              <h4 className="text-gray-300 text-sm font-medium mb-2">Pro Tip</h4>
              <p className="text-gray-400 text-xs">Use keyboard shortcut <kbd className="bg-gray-700 px-2 py-1 rounded text-gray-300">⌘ + K</kbd> to quickly search for projects and vulnerabilities.</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;