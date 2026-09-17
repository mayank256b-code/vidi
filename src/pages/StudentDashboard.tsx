import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MessageCircle, User, Star, MapPin, Clock, CheckCircle, Video } from 'lucide-react';
import { tutors, bookings } from '../data/mockData';

export default function StudentDashboard() {
  const { t, toggleLanguage, language } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const topTutors = tutors.filter(t => t.rating >= 4.7).slice(0, 3);
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-crimson to-crimson-dark px-6 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-xs">Namaste!</p>
            <h1 className="text-white text-xl font-bold">Aarav</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{language === 'en' ? 'ने' : 'EN'}</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <button 
          onClick={() => navigate('/search')}
          className="w-full bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-400">{t('searchTutors')}</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-4">
        <div className="card p-4 flex items-center justify-around">
          <div className="text-center">
            <p className="text-lg font-bold text-crimson">{upcomingBookings.length}</p>
            <p className="text-xs text-text-secondary">{t('bookings')}</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-lg font-bold text-nepal-blue">{tutors.length}</p>
            <p className="text-xs text-text-secondary">Tutors</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-lg font-bold text-success">4.7</p>
            <p className="text-xs text-text-secondary">Avg Rating</p>
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-text-primary">{t('upcomingSessions')}</h2>
          <button className="text-xs text-crimson font-medium">{t('bookings')} &rarr;</button>
        </div>
        
        {upcomingBookings.length > 0 ? (
          <div className="space-y-3">
            {upcomingBookings.map(booking => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary text-sm">{booking.subject}</h3>
                    <p className="text-xs text-text-secondary mt-1">with {booking.tutorName}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Calendar className="w-3 h-3" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Clock className="w-3 h-3" />
                        {booking.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {booking.mode === 'online' ? (
                      <button className="px-3 py-1.5 bg-nepal-blue/10 rounded-lg flex items-center gap-1">
                        <Video className="w-3 h-3 text-nepal-blue" />
                        <span className="text-xs font-medium text-nepal-blue">Join</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 bg-success/10 rounded-lg">
                        <span className="text-xs font-medium text-success">{t('inPerson')}</span>
                      </span>
                    )}
                    <span className="text-xs text-text-secondary">NPR {booking.amount}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No upcoming sessions</p>
          </div>
        )}
      </div>

      {/* Top Rated Tutors */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-text-primary">Top Rated Tutors</h2>
          <button onClick={() => navigate('/search')} className="text-xs text-crimson font-medium">View All &rarr;</button>
        </div>

        <div className="space-y-3">
          {topTutors.map((tutor, idx) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(`/tutor/${tutor.id}`)}
              className="card p-4 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-crimson/20 to-nepal-blue/20 flex items-center justify-center">
                <span className="text-lg font-bold text-crimson">{tutor.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-text-primary text-sm truncate">{tutor.name}</h3>
                  {tutor.verified && (
                    <CheckCircle className="w-3.5 h-3.5 text-success flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-text-secondary truncate">
                  {tutor.subjects.map(s => t(s)).join(', ')}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-warning fill-warning" />
                    <span className="text-xs font-medium">{tutor.rating}</span>
                  </span>
                  <span className="flex items-center gap-0.5 text-xs text-text-secondary">
                    <MapPin className="w-3 h-3" />
                    {t(tutor.location)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-crimson">NPR {tutor.hourlyRate}</p>
                <p className="text-xs text-text-secondary">/hr</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h2 className="font-bold text-text-primary mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Search, label: t('search'), color: 'bg-crimson/10 text-crimson', path: '/search' },
            { icon: Calendar, label: t('bookings'), color: 'bg-nepal-blue/10 text-nepal-blue', path: '/bookings' },
            { icon: MessageCircle, label: t('messages'), color: 'bg-success/10 text-success', path: '/chat' },
            { icon: Star, label: 'Reviews', color: 'bg-warning/10 text-warning', path: '/reviews' },
          ].map((action, idx) => (
            <button
              key={idx}
              onClick={() => navigate(action.path)}
              className="card p-3 flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-text-primary">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="flex items-center justify-around px-4">
          {[
            { icon: 'fa-house', label: t('home'), id: 'home', path: '/student' },
            { icon: 'fa-magnifying-glass', label: t('search'), id: 'search', path: '/search' },
            { icon: 'fa-calendar', label: t('bookings'), id: 'bookings', path: '/bookings' },
            { icon: 'fa-comment', label: t('messages'), id: 'messages', path: '/chat' },
            { icon: 'fa-user', label: t('profile'), id: 'profile', path: '/profile' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                navigate(item.path);
              }}
              className={`flex flex-col items-center gap-1 py-2 px-3 ${
                activeTab === item.id ? 'text-crimson' : 'text-gray-400'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
