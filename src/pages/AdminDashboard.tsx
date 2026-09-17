import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, Calendar, DollarSign, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Settings, LogOut } from 'lucide-react';
import { tutors } from '../data/mockData';

export default function AdminDashboard() {
  const { t, logout } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: 2847,
    activeTutors: 156,
    totalBookings: 4523,
    revenue: 1250000,
    disputes: 3,
    newUsersToday: 24,
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cream pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 px-6 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-xs">Admin Panel</p>
            <h1 className="text-white text-xl font-bold">Vidi Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Settings className="w-4 h-4 text-gray-300" />
            </button>
            <button onClick={handleLogout} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/10 rounded-xl p-1 overflow-x-auto">
          {['overview', 'users', 'tutors', 'payments', 'disputes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab ? 'bg-white text-gray-900' : 'text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-crimson" />
              <span className="text-xs text-text-secondary">{t('totalUsers')}</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-success flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +{stats.newUsersToday} today
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-4 h-4 text-nepal-blue" />
              <span className="text-xs text-text-secondary">{t('activeTutors')}</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.activeTutors}</p>
            <p className="text-xs text-text-secondary">5.5% of total users</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-success" />
              <span className="text-xs text-text-secondary">{t('totalBookings')}</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.totalBookings.toLocaleString()}</p>
            <p className="text-xs text-success flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12% this month
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-warning" />
              <span className="text-xs text-text-secondary">{t('revenue')}</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">NPR {(stats.revenue / 100000).toFixed(1)}L</p>
            <p className="text-xs text-success flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +18% MoM
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="px-6 mt-6">
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Revenue Chart */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-primary text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-crimson" />
                  Monthly Revenue
                </h3>
                <span className="text-xs text-text-secondary">Last 6 months</span>
              </div>
              <div className="flex items-end gap-3 h-32">
                {[40, 55, 48, 70, 82, 95].map((height, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-nepal-blue to-nepal-blue-light"
                    />
                    <span className="text-[9px] text-text-secondary">
                      {['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="card p-4">
              <h3 className="font-semibold text-text-primary text-sm flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Alerts & Actions
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-warning/5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <p className="text-xs text-text-primary flex-1">{stats.disputes} pending disputes need review</p>
                  <button className="text-xs text-crimson font-medium">Review</button>
                </div>
                <div className="flex items-center gap-3 p-2 bg-nepal-blue/5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-nepal-blue" />
                  <p className="text-xs text-text-primary flex-1">12 new tutor applications pending</p>
                  <button className="text-xs text-crimson font-medium">Verify</button>
                </div>
                <div className="flex items-center gap-3 p-2 bg-success/5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <p className="text-xs text-text-primary flex-1">System running normally</p>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
              </div>
            </div>

            {/* City-wise Distribution */}
            <div className="card p-4">
              <h3 className="font-semibold text-text-primary text-sm mb-3">City-wise Distribution</h3>
              <div className="space-y-3">
                {[
                  { city: 'Kathmandu', users: 1245, percent: 44 },
                  { city: 'Pokhara', users: 680, percent: 24 },
                  { city: 'Lalitpur', users: 520, percent: 18 },
                  { city: 'Butwal', users: 280, percent: 10 },
                  { city: 'Bhaktapur', users: 122, percent: 4 },
                ].map(item => (
                  <div key={item.city}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-text-primary">{item.city}</span>
                      <span className="text-xs text-text-secondary">{item.users} users</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percent}%` }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-crimson to-nepal-blue rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'tutors' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <h3 className="font-semibold text-text-primary text-sm">Recent Tutor Applications</h3>
            {tutors.map(tutor => (
              <div key={tutor.id} className="card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-crimson">{tutor.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-text-primary">{tutor.name}</h4>
                    {tutor.verified && <CheckCircle className="w-3.5 h-3.5 text-success" />}
                  </div>
                  <p className="text-xs text-text-secondary">{tutor.subjects.map(s => t(s)).join(', ')}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-medium">
                    Approve
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-red-100 text-red-600 text-xs font-medium">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card p-4">
              <h3 className="font-semibold text-text-primary text-sm mb-3">User Management</h3>
              <div className="space-y-2">
                {['Total Registered', 'Active Today', 'Students', 'Teachers', 'Pending Verification'].map((label, idx) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-text-secondary">{label}</span>
                    <span className="text-sm font-bold text-text-primary">
                      {[2847, 892, 2691, 156, 12][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'payments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card p-4">
              <h3 className="font-semibold text-text-primary text-sm mb-3">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">eS</span>
                    </div>
                    <span className="text-sm font-medium">eSewa</span>
                  </div>
                  <span className="text-sm font-bold text-success">NPR 5.2L</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">K</span>
                    </div>
                    <span className="text-sm font-medium">Khalti</span>
                  </div>
                  <span className="text-sm font-bold text-purple-600">NPR 4.8L</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-nepal-blue flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">Bank Transfer</span>
                  </div>
                  <span className="text-sm font-bold text-nepal-blue">NPR 2.5L</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'disputes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card p-4">
              <h3 className="font-semibold text-text-primary text-sm mb-3">Active Disputes</h3>
              <div className="space-y-3">
                {[
                  { id: 1, issue: 'Payment not received', user: 'Aarav P.', tutor: 'Ram S.', priority: 'high' },
                  { id: 2, issue: 'Class timing mismatch', user: 'Sunita K.', tutor: 'Bikash G.', priority: 'medium' },
                  { id: 3, issue: 'Refund request', user: 'Priya S.', tutor: 'Sita T.', priority: 'low' },
                ].map(dispute => (
                  <div key={dispute.id} className="p-3 border border-gray-100 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        dispute.priority === 'high' ? 'bg-red-100 text-red-600' :
                        dispute.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {dispute.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-text-secondary">#{dispute.id}</span>
                    </div>
                    <p className="text-sm font-medium text-text-primary">{dispute.issue}</p>
                    <p className="text-xs text-text-secondary mt-1">{dispute.user} vs {dispute.tutor}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 py-1.5 rounded-lg bg-crimson/10 text-crimson text-xs font-medium">Resolve</button>
                      <button className="flex-1 py-1.5 rounded-lg bg-gray-100 text-text-secondary text-xs font-medium">Escalate</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
