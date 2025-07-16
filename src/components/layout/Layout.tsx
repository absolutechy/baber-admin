import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} isCollapsed={isSidebarCollapsed} />
      <div className={`flex flex-col ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-72'} transition-all duration-300`}>
        <Navbar toggleMobileSidebar={toggleMobileSidebar} toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
        <main className="flex-1 p-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-gray-600 bg-opacity-75" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
} 