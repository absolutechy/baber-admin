import { NavLink } from 'react-router-dom';
import { 
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  UserIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  CalendarIcon as CalendarIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  UserIcon as UserIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid
} from '@heroicons/react/24/solid';

interface SidebarProps {
  isSidebarOpen: boolean;
  isCollapsed: boolean;
}

export default function Sidebar({ isSidebarOpen, isCollapsed }: SidebarProps) {
  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      name: 'Appointments', 
      href: '/appointments', 
      icon: CalendarIcon,
      iconSolid: CalendarIconSolid,
      color: 'from-green-500 to-emerald-600'
    },
    { 
      name: 'Clients', 
      href: '/clients', 
      icon: UserGroupIcon,
      iconSolid: UserGroupIconSolid,
      color: 'from-purple-500 to-violet-600'
    },
    { 
      name: 'Services', 
      href: '/services', 
      icon: DocumentTextIcon,
      iconSolid: DocumentTextIconSolid,
      color: 'from-orange-500 to-amber-600'
    },
    { 
      name: 'Staff', 
      href: '/staff', 
      icon: UserIcon,
      iconSolid: UserIconSolid,
      color: 'from-pink-500 to-rose-600'
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Cog6ToothIcon,
      iconSolid: Cog6ToothIconSolid,
      color: 'from-gray-500 to-slate-600'
    },
  ];

  const sidebarClasses = isSidebarOpen
    ? "fixed top-0 left-0 z-40 h-screen transition-transform md:translate-x-0"
    : "fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full md:translate-x-0";

  const sidebarWidth = isCollapsed ? "w-20" : "w-72";

  return (
    <aside className={`${sidebarClasses} ${sidebarWidth} transition-all duration-300 ease-in-out`} aria-label="Sidebar">
      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" />
      )}
      
      <div className="h-full relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-r border-slate-700">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 pointer-events-none" />
        
        <div className="relative h-full px-4 py-6 overflow-y-auto">
          {/* Logo/Brand Section */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'pl-2'} mb-8`}>
            {isCollapsed ? (
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UserCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <UserCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Barber Admin</h1>
                  <p className="text-xs text-slate-400">Management Panel</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const IconSolid = item.iconSolid;
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group relative flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-xl transition-all duration-200 ease-in-out ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50 hover:scale-105'
                    } transform`
                  }
                  title={isCollapsed ? item.name : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator line */}
                      {isActive && !isCollapsed && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full shadow-lg" />
                      )}
                      
                      {/* Icon container */}
                      <div className={`relative flex items-center justify-center ${isCollapsed ? 'w-8 h-8' : 'w-6 h-6'}`}>
                        {isActive ? (
                          <IconSolid className="w-full h-full drop-shadow-sm" />
                        ) : (
                          <Icon className="w-full h-full group-hover:scale-110 transition-transform duration-200" />
                        )}
                        
                        {/* Hover effect for collapsed state */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-6 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-slate-600">
                            {item.name}
                            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-600"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Text and chevron */}
                      {!isCollapsed && (
                        <div className="flex items-center justify-between flex-1 ml-3">
                          <span className="font-medium tracking-wide">{item.name}</span>
                          {isActive && (
                            <ChevronRightIcon className="w-4 h-4 opacity-60" />
                          )}
                        </div>
                      )}
                      
                      {/* Ripple effect */}
                      <div className={`absolute inset-0 rounded-xl opacity-0 group-active:opacity-20 bg-white transition-opacity duration-150`} />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-slate-700/50" />

          {/* Help Section */}
          <div className="space-y-2">
            <a
              href="https://github.com/your-username/barber-admin" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 text-slate-400 rounded-xl hover:text-white hover:bg-slate-700/50 transition-all duration-200 transform hover:scale-105`}
              title={isCollapsed ? "Help & Support" : undefined}
            >
              <div className="relative">
                <QuestionMarkCircleIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-6 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-slate-600">
                    Help & Support
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-600"></div>
                  </div>
                )}
              </div>
              
              {!isCollapsed && (
                <span className="ml-3 font-medium">Help & Support</span>
              )}
            </a>
          </div>

          {/* User Status */}
          {!isCollapsed && (
            <div className="absolute bottom-6 left-4 right-4">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      JD
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">John Doe</p>
                    <p className="text-xs text-slate-400">Administrator</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}