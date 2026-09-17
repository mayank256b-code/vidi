import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Video, MapPin, CheckCircle, XCircle, CreditCard } from 'lucide-react';
import { bookings } from '../data/mockData';

export default function Bookings() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [showPayment, setShowPayment] = useState(false);

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed');
  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <i className="fa-solid fa-arrow-left text-text-primary" />
          </button>
          <h1 className="text-xl font-bold text-text-primary">{t('bookings')}</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-warm-gray rounded-xl p-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'upcoming' ? 'bg-white text-crimson shadow-sm' : 'text-text-secondary'
            }`}
          >
            {t('upcomingSessions')} ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'past' ? 'bg-white text-crimson shadow-sm' : 'text-text-secondary'
            }`}
          >
            {t('pastSessions')} ({pastBookings.length})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-6 py-4 space-y-3">
        {displayBookings.length > 0 ? displayBookings.map((booking, idx) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-text-primary">{booking.subject}</h3>
                <p className="text-sm text-text-secondary">with {booking.tutorName}</p>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                booking.status === 'upcoming' ? 'bg-nepal-blue/10 text-nepal-blue' :
                booking.status === 'completed' ? 'bg-success/10 text-success' :
                'bg-red-100 text-red-600'
              }`}>
                {booking.status === 'upcoming' ? 'Upcoming' : booking.status === 'completed' ? 'Completed' : 'Cancelled'}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-crimson" />
                <span className="text-sm text-text-primary">{booking.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-crimson" />
                <span className="text-sm text-text-primary">{booking.time}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {booking.mode === 'online' ? (
                  <>
                    <Video className="w-4 h-4 text-nepal-blue" />
                    <span className="text-sm text-nepal-blue font-medium">{t('onlineTuition')}</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-crimson" />
                    <span className="text-sm text-crimson font-medium">{t('inPerson')}</span>
                  </>
                )}
              </div>
              <span className="text-sm font-bold text-text-primary">NPR {booking.amount}</span>
            </div>

            {booking.status === 'upcoming' && (
              <div className="flex gap-2 mt-3">
                {booking.mode === 'online' && booking.meetingLink && (
                  <button className="flex-1 py-2.5 rounded-xl bg-nepal-blue text-white text-sm font-medium flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" />
                    {t('joinVideoCall')}
                  </button>
                )}
                <button 
                  onClick={() => setShowPayment(true)}
                  className="flex-1 py-2.5 rounded-xl bg-crimson/10 text-crimson text-sm font-medium flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  {t('payNow')}
                </button>
              </div>
            )}

            {booking.status === 'completed' && (
              <button 
                onClick={() => navigate(`/tutor/${booking.tutorId}`)}
                className="w-full mt-3 py-2.5 rounded-xl bg-warning/10 text-warning text-sm font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {t('writeReview')}
              </button>
            )}
          </motion.div>
        )) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-text-secondary">
              {activeTab === 'upcoming' ? 'No upcoming sessions' : 'No past sessions'}
            </p>
            <button 
              onClick={() => navigate('/search')}
              className="mt-3 text-sm text-crimson font-medium"
            >
              Find a tutor &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end"
          onClick={() => setShowPayment(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="w-full max-w-[430px] mx-auto bg-white rounded-t-3xl p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-text-primary">{t('payment')}</h3>
              <button onClick={() => setShowPayment(false)}>
                <XCircle className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <div className="bg-warm-gray rounded-xl p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-text-secondary">Session Fee</span>
                <span className="text-sm font-bold">NPR 500</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-text-secondary">Platform Fee</span>
                <span className="text-sm font-bold">NPR 25</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-sm font-bold text-text-primary">{t('totalAmount')}</span>
                <span className="text-lg font-bold text-crimson">NPR 525</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <button className="w-full p-4 rounded-xl border-2 border-green-500 bg-green-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">eS</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-text-primary text-sm">{t('payWithEsewa')}</p>
                  <p className="text-xs text-text-secondary">Instant payment</p>
                </div>
              </button>

              <button className="w-full p-4 rounded-xl border-2 border-purple-500 bg-purple-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-text-primary text-sm">{t('payWithKhalti')}</p>
                  <p className="text-xs text-text-secondary">Instant payment</p>
                </div>
              </button>

              <button className="w-full p-4 rounded-xl border-2 border-gray-300 bg-gray-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-nepal-blue flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-text-primary text-sm">{t('bankTransfer')}</p>
                  <p className="text-xs text-text-secondary">1-2 business days</p>
                </div>
              </button>
            </div>

            <button className="btn-primary w-full py-4 text-base font-bold">
              {t('payNow')} - NPR 525
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
