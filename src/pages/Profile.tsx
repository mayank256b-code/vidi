import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Globe, Bell, Shield, HelpCircle, FileText, LogOut, ChevronRight, User, Award, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const { t, user, logout, toggleLanguage, language } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-crimson to-nepal-blue px-6 pt-8 pb-10 text-center" style={{background: 'linear-gradient(to bottom right, #DC143C, #003893)'}}>
        <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center border-3 border-white/40">
          <span className="text-3xl font-bold text-white">{user?.name?.[0] || 'A'}</span>
        </div>
        <h2 className="text-white text-xl font-bold mt-3">{user?.name || 'Aarav Student'}</h2>
        <p className="text-white/70 text-sm">{user?.phone || '+977 9800000000'}</p>
        <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20">
          <CheckCircle className="w-3.5 h-3.5 text-white" />
          <span className="text-white text-xs font-medium">Verified Account</span>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="px-6 -mt-5">
        <div className="card p-4 flex items-center justify-around">
          <div className="text-center">
            <p className="text-lg font-bold text-crimson">12</p>
            <p className="text-xs text-text-secondary">Sessions</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-lg font-bold text-nepal-blue">4.8</p>
            <p className="text-xs text-text-secondary">Avg Rating Given</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-lg font-bold text-success">3</p>
            <p className="text-xs text-text-secondary">Tutors Saved</p>
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="px-6 mt-6 space-y-2 page-content">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Settings</h3>
        
        <button 
          onClick={toggleLanguage}
          className="w-full card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-nepal-blue/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-nepal-blue" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-text-primary">{t('language')}</p>
            <p className="text-xs text-text-secondary">{language === 'en' ? 'English' : 'नेपाली'}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-crimson/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-crimson" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-text-primary">{t('notifications')}</p>
            <p className="text-xs text-text-secondary">Push & Email alerts</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-text-primary">Privacy & Security</p>
            <p className="text-xs text-text-secondary">Password, 2FA, Data</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-warning" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-text-primary">{t('help')}</p>
            <p className="text-xs text-text-secondary">FAQ, Contact support</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-text-primary">{t('terms')}</p>
            <p className="text-xs text-text-secondary">Terms, Privacy Policy</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Become a Tutor */}
      {user?.role === 'student' && (
        <div className="px-6 mt-6">
          <div className="card p-4 bg-gradient-to-r from-nepal-blue/5 to-crimson/5 border-nepal-blue/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-nepal-blue/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-nepal-blue" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-text-primary">Become a Tutor</p>
                <p className="text-xs text-text-secondary">Share your knowledge and earn</p>
              </div>
              <ChevronRight className="w-4 h-4 text-nepal-blue" />
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="px-6 mt-6">
        <button 
          onClick={handleLogout}
          className="w-full card p-4 flex items-center gap-3 border-red-100 active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-red-500" />
          </div>
          <span className="text-sm font-medium text-red-500">{t('logout')}</span>
        </button>
      </div>

      {/* App Info */}
      <div className="px-6 mt-8 text-center">
        <p className="text-xs text-text-secondary">Vidi v1.0.0</p>
        <p className="text-xs text-text-secondary mt-1">Made with care in Nepal</p>
      </div>
    </div>
  );
}
