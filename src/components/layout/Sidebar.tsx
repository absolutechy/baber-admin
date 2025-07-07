import { NavLink } from 'react-router-dom';
import { 
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  UserIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isSidebarOpen: boolean;
  isCollapsed: boolean;
}

export default function Sidebar({ isSidebarOpen, isCollapsed }: SidebarProps) {
  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: HomeIcon
    },
    { 
      name: 'Appointments', 
      href: '/appointments', 
      icon: CalendarIcon
    },
    { 
      name: 'Clients', 
      href: '/clients', 
      icon: UserGroupIcon
    },
    { 
      name: 'Services', 
      href: '/services', 
      icon: DocumentTextIcon
    },
    { 
      name: 'Staff', 
      href: '/staff', 
      icon: UserIcon
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Cog6ToothIcon
    },
  ];

  const sidebarClasses = isSidebarOpen
    ? "fixed top-0 left-0 z-40 h-screen transition-transform md:translate-x-0"
    : "fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full md:translate-x-0";

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";

  return (
    <aside className={`${sidebarClasses} ${sidebarWidth} transition-all duration-300`} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'pl-2.5'} mb-5`}>
          {isCollapsed ? (
            <UserCircleIcon className="w-8 h-8 text-white" />
          ) : (
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white flex items-center gap-2">
              <UserCircleIcon className="w-8 h-8" />
              Barber Admin
            </span>
          )}
        </div>
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center ${isCollapsed ? 'justify-center' : ''} p-2 rounded-lg ${
                      isActive 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    } group`
                  }
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span className="ms-3">{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className={`pt-5 mt-5 space-y-2 border-t border-gray-700 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          <a
            href="https://github.com/your-username/barber-admin" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-2 text-gray-300 rounded-lg hover:bg-gray-700 group`}
            title={isCollapsed ? "Help" : undefined}
          >
            <QuestionMarkCircleIcon className="w-5 h-5" />
            {!isCollapsed && <span className="ms-3">Help</span>}
          </a>
        </div>
      </div>
    </aside>
  );
} 