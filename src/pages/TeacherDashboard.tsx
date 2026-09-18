import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Star, DollarSign, Clock, CheckCircle, Award, TrendingUp, Edit, Eye } from 'lucide-react';
import { bookings } from '../data/mockData';

export default function TeacherDashboard() {
  const { t, toggleLanguage, language } = useApp();
  const navigate = useNavigate();

  const todaySessions = bookings.filter(b => b.status === 'upcoming').slice(0, 2);
  const stats = {
    totalStudents: 45,
    thisMonth: 12,
    earnings: 45000,
    rating: 4.8,
    completionRate: 96,
  };

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-nepal-blue to-nepal-blue-dark px-6 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-xs">Welcome back!</p>
            <h1 className="text-white text-xl font-bold">Sita Teacher</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{language === 'en' ? 'ने' : 'EN'}</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
          </div>
        </div>

        {/* Teacher Badge */}
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Silver Badge Teacher</p>
            <p className="text-white/60 text-xs">8 years experience | 150+ students</p>
          </div>
          <button onClick={() => navigate('/profile')} className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-medium">
            <Edit className="w-3 h-3 inline mr-1" /> Edit
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-crimson" />
              <span className="text-xs text-text-secondary">Students</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.totalStudents}</p>
            <p className="text-xs text-success">+{stats.thisMonth} this month</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-success" />
              <span className="text-xs text-text-secondary">Earnings</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">NPR {(stats.earnings / 1000).toFixed(0)}K</p>
            <p className="text-xs text-success">This month</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-warning" />
              <span className="text-xs text-text-secondary">Rating</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.rating}</p>
            <p className="text-xs text-text-secondary">32 reviews</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-nepal-blue" />
              <span className="text-xs text-text-secondary">Completion</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.completionRate}%</p>
            <p className="text-xs text-success">Rate</p>
          </motion.div>
        </div>
      </div>

      {/* Today's Sessions */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-text-primary">Today's Sessions</h2>
          <button className="text-xs text-nepal-blue font-medium">View All &rarr;</button>
        </div>

        <div className="space-y-3">
          {todaySessions.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary text-sm">{session.subject}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Student: Aarav P.</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <Clock className="w-3 h-3" />
                    {session.time}
                  </div>
                  <span className={`mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                    session.mode === 'online' ? 'bg-nepal-blue/10 text-nepal-blue' : 'bg-crimson/10 text-crimson'
                  }`}>
                    {session.mode === 'online' ? 'Online' : 'In Person'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h2 className="font-bold text-text-primary mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => navigate('/profile')} className="card p-3 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-crimson/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-crimson" />
            </div>
            <span className="text-xs font-medium text-text-primary">My Profile</span>
          </button>
          <button className="card p-3 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-nepal-blue/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-nepal-blue" />
            </div>
            <span className="text-xs font-medium text-text-primary">Schedule</span>
          </button>
          <button className="card p-3 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <span className="text-xs font-medium text-text-primary">Analytics</span>
          </button>
        </div>
      </div>

      {/* Earnings Chart Placeholder */}
      <div className="px-6 mt-6">
        <div className="card p-4">
          <h3 className="font-semibold text-text-primary text-sm mb-3">Weekly Earnings</h3>
          <div className="flex items-end gap-2 h-24">
            {[60, 80, 45, 90, 70, 85, 50].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-crimson to-crimson-light"
                />
                <span className="text-[9px] text-text-secondary">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
