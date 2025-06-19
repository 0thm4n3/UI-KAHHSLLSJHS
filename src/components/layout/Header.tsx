import React, { useState, useEffect } from 'react';
import { Shield, Bell, User, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900 bg-opacity-95 shadow-md'
          : 'bg-gray-900 bg-opacity-80'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-3 lg:hidden text-gray-300 hover:text-white transition-colors duration-200"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <X size={24} className="transition-all duration-300" />
            ) : (
              <Menu size={24} className="transition-all duration-300" />
            )}
          </button>

          <div className="flex items-center">
            <Shield className="h-8 w-8 text-indigo-500" />
            <h1 className="ml-2 text-xl font-bold text-white tracking-tight">SecureScope</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors duration-200 relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-700">
                <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="text-white font-medium">Notifications</h3>
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">3 new</span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <div>
                        <p className="text-sm text-white">Critical vulnerability discovered in Project: Web Application Security Audit</p>
                        <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <div>
                        <p className="text-sm text-white">New task assigned: Manual testing - Authorization</p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <div>
                        <p className="text-sm text-white">Project report is ready for review</p>
                        <p className="text-xs text-gray-400 mt-1">Yesterday at 3:45 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gray-900">
                  <button className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors duration-150 w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="User profile"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center overflow-hidden">
                <User size={18} className="text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium">Alex Morgan</span>
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-700">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm text-white">Alex Morgan</p>
                  <p className="text-xs text-gray-400 truncate">alex@securityfirm.com</p>
                </div>
                <div>
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-150">
                    Profile
                  </a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-150">
                    Settings
                  </a>
                  <a href="#logout" className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-150">
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;