import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

interface BottomNavProps {
  userRole: string | null;
}

export default function BottomNav({ userRole }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useApp();
  
  // Hide bottom nav on landing, login, admin, and tutor profile pages
  const hideOnPaths = ['/', '/login', '/admin'];
  if (hideOnPaths.includes(location.pathname)) {
    return null;
  }
  
  // Hide on chat detail view (has its own back button)
  if (location.pathname === '/chat' && location.search) {
    return null;
  }

  const getNavItems = () => {
    if (userRole === 'student') {
      return [
        { icon: 'fa-house', label: t('home'), id: 'home', path: '/student' },
        { icon: 'fa-magnifying-glass', label: t('search'), id: 'search', path: '/search' },
        { icon: 'fa-calendar', label: t('bookings'), id: 'bookings', path: '/bookings' },
        { icon: 'fa-comment', label: t('messages'), id: 'messages', path: '/chat' },
        { icon: 'fa-user', label: t('profile'), id: 'profile', path: '/profile' },
      ];
    } else if (userRole === 'teacher') {
      return [
        { icon: 'fa-house', label: t('home'), id: 'home', path: '/teacher' },
        { icon: 'fa-calendar', label: 'Schedule', id: 'schedule' },
        { icon: 'fa-users', label: 'Students', id: 'students' },
        { icon: 'fa-comment', label: t('messages'), id: 'messages', path: '/chat' },
        { icon: 'fa-user', label: t('profile'), id: 'profile', path: '/profile' },
      ];
    }
    return [];
  };

  const navItems = getNavItems();
  if (navItems.length === 0) return null;

  const getActiveTab = () => {
    const pathname = location.pathname;
    for (const item of navItems) {
      if (item.path && pathname.startsWith(item.path)) {
        return item.id;
      }
    }
    // For teacher dashboard special cases
    if (userRole === 'teacher') {
      if (pathname === '/teacher') return 'home';
      if (pathname.includes('schedule')) return 'schedule';
      if (pathname.includes('students')) return 'students';
    }
    return navItems[0]?.id || 'home';
  };

  const activeTab = getActiveTab();

  return (
    <div className="bottom-nav">
      <div className="flex items-center justify-around px-4">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          const activeColor = userRole === 'student' ? 'text-crimson' : 'text-nepal-blue';
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                }
              }}
              className={`flex flex-col items-center gap-1 py-2 px-3 ${
                isActive ? activeColor : 'text-gray-400'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
