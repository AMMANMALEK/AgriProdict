import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage, useUser } from '../App';
import { 
  LayoutDashboard, 
  Sprout, 
  BarChart3, 
  Bell, 
  User, 
  LogOut,
  Wheat
} from 'lucide-react';

const Sidebar = () => {
  const { t, handleLogout } = useLanguage();
  const { userData } = useUser();
  const location = useLocation();

  const navItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: t('dashboard')
    },
    {
      path: '/crop-selection',
      icon: Wheat,
      label: t('cropSelection')
    },
    {
      path: '/reports',
      icon: BarChart3,
      label: t('reports')
    },
    {
      path: '/notifications',
      icon: Bell,
      label: t('notifications')
    },
    {
      path: '/profile',
      icon: User,
      label: t('profile')
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-green-200 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-green-200">
        <div className="flex items-center space-x-2">
          <Sprout className="h-8 w-8 text-green-600" />
          <h1 className="text-xl font-bold text-green-800">AgriPredict</h1>
        </div>
        {userData && (
          <div className="mt-3 text-sm text-gray-600">
            <p className="font-medium text-green-700">{userData.fullName}</p>
            <p className="text-xs">{userData.location}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-800 border-l-4 border-green-600'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-green-200">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center space-x-2 text-red-600 border-red-300 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;