import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Bars3Icon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

interface NavbarProps {
  toggleMobileSidebar: () => void;
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export default function Navbar({ toggleMobileSidebar, toggleSidebar, isSidebarCollapsed }: NavbarProps) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings');
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    // Since you don't have a profile page, we'll create a simple one or redirect to settings
    navigate('/profile'); // You can change this to '/profile' if you create a profile page
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 lg:px-6 shadow-sm">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center justify-start">
          <button 
            onClick={toggleMobileSidebar}
            type="button" 
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="w-6 h-6" />
          </button>
          
          <button
            onClick={toggleSidebar}
            type="button"
            className="hidden md:inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ml-2"
          >
            <span className="sr-only">{isSidebarCollapsed ? 'Expand' : 'Collapse'} sidebar</span>
            {isSidebarCollapsed ? (
              <ChevronRightIcon className="w-6 h-6" />
            ) : (
              <ChevronLeftIcon className="w-6 h-6" />
            )}
          </button>
          <span className="self-center text-xl font-semibold whitespace-nowrap ml-2.5 md:hidden">
            Barber Admin
          </span>
        </div>
        <div className="flex items-center lg:order-2">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-2 text-gray-800 hover:bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline-block">{user?.name}</span>
              <ChevronDownIcon className="w-5 h-5 ml-1 text-gray-400" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleSettingsClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}