import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;