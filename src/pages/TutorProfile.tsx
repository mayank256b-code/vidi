import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, CheckCircle, Award, Video, BookOpen, Shield, Calendar, MessageCircle, FileCheck } from 'lucide-react';
import { tutors, reviews } from '../data/mockData';

export default function TutorProfile() {
  const { t } = useApp();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('about');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const tutor = tutors.find(t => t.id === id);
  const tutorReviews = reviews.filter(r => r.tutorId === id);

  if (!tutor) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-text-secondary">Tutor not found</p>
      </div>
    );
  }

  const handleBook = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setShowBooking(false);
      navigate('/bookings');
    }, 2000);
  };

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      day: date.toLocaleDateString('en', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en', { month: 'short' }),
      full: date.toISOString().split('T')[0],
    };
  });

  const timeSlots = ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-crimson to-nepal-blue px-6 pt-6 pb-10">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <i className="fa-solid fa-arrow-left text-white text-sm" />
        </button>
        
        <div className="text-center pt-8">
          {/* Avatar */}
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-3 border-white/40">
              <span className="text-3xl font-bold text-white">{tutor.name[0]}</span>
            </div>
            {tutor.verified && (
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-success flex items-center justify-center border-2 border-white">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <h1 className="text-white text-xl font-bold mt-3">{tutor.name}</h1>
          <p className="text-white/80 text-sm mt-1">{tutor.subjects.map(s => t(s)).join(', ')}</p>
          
          {/* Badge */}
          {tutor.badge !== 'new' && (
            <div className="mt-2 inline-flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                tutor.badge === 'gold' ? 'badge-gold' : tutor.badge === 'silver' ? 'badge-silver' : 'badge-bronze'
              }`}>
                <Award className="w-3 h-3 inline mr-1" />
                {tutor.badge.toUpperCase()} BADGE
              </span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-white font-bold">{tutor.rating}</span>
              </div>
              <p className="text-white/60 text-xs">{tutor.reviewCount} {t('reviews')}</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-white font-bold">{tutor.experience}+</p>
              <p className="text-white/60 text-xs">{t('yearsTeaching')}</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-white font-bold">{tutor.studentsTaught}+</p>
              <p className="text-white/60 text-xs">{t('studentsTaught')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Card */}
      <div className="px-6 -mt-5">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-secondary">{t('hourlyRate')}</p>
              <p className="text-xl font-bold text-crimson">NPR {tutor.hourlyRate}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary">{t('monthlyRate')}</p>
              <p className="text-xl font-bold text-nepal-blue">NPR {tutor.monthlyRate}</p>
            </div>
          </div>
          {tutor.trialAvailable && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-text-primary">{t('trialClass')}</span>
              </div>
              <span className="text-sm font-bold text-success">
                {tutor.trialPrice === 0 ? t('freeTrial') : `NPR ${tutor.trialPrice}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="px-6 mt-5">
        <div className="flex gap-1 bg-white rounded-xl p-1 card">
          {[
            { id: 'about', label: t('aboutTeacher'), icon: BookOpen },
            { id: 'reviews', label: t('reviews'), icon: Star },
            { id: 'certs', label: t('certificates'), icon: FileCheck },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all ${
                activeSection === tab.id ? 'bg-crimson text-white' : 'text-text-secondary'
              }`}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="px-6 mt-4">
        {activeSection === 'about' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="card p-4">
              <h3 className="font-semibold text-text-primary text-sm mb-2">{t('aboutTeacher')}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{tutor.about}</p>
            </div>

            <div className="card p-4">
              <h3 className="font-semibold text-text-primary text-sm mb-3">{t('qualifications')}</h3>
              <div className="space-y-2">
                {tutor.qualifications.map((q, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-4">
              <h3 className="font-semibold text-text-primary text-sm mb-3">{t('availability')}</h3>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <span
                    key={day}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      tutor.availability.includes(day)
                        ? 'bg-crimson/10 text-crimson'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-crimson" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{t(tutor.location)}</p>
                  <p className="text-xs text-text-secondary">{tutor.ward}</p>
                </div>
              </div>
              {tutor.onlineAvailable && (
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                  <Video className="w-4 h-4 text-nepal-blue" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t('onlineTuition')}</p>
                    <p className="text-xs text-text-secondary">Zoom / Google Meet</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeSection === 'reviews' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {tutorReviews.length > 0 ? tutorReviews.map(review => (
              <div key={review.id} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-nepal-blue/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-nepal-blue">{review.studentName[0]}</span>
                    </div>
                    <span className="text-sm font-medium text-text-primary">{review.studentName}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-warning fill-warning' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{review.text}</p>
                <p className="text-xs text-text-secondary mt-2">{review.date}</p>
              </div>
            )) : (
              <div className="card p-6 text-center">
                <Star className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-text-secondary">{t('noReviews')}</p>
              </div>
            )}
          </motion.div>
        )}

        {activeSection === 'certs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="card p-4">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {tutor.verified ? t('verified') : 'Pending Verification'}
                  </p>
                  <p className="text-xs text-text-secondary">ID and certificates verified</p>
                </div>
              </div>
              <div className="space-y-2">
                {tutor.certificates.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-warm-gray rounded-lg">
                    <FileCheck className="w-4 h-4 text-nepal-blue" />
                    <span className="text-sm text-text-primary">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge System */}
            <div className="card p-4">
              <h3 className="font-semibold text-text-primary text-sm mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-warning" />
                {t('badges')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className={`p-3 rounded-xl text-center ${tutor.badge === 'gold' ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200' : 'bg-gray-50'}`}>
                  <Award className={`w-6 h-6 mx-auto mb-1 ${tutor.badge === 'gold' ? 'text-yellow-500' : 'text-gray-300'}`} />
                  <p className="text-xs font-medium">{t('goldBadge')}</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${tutor.badge === 'silver' ? 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200' : 'bg-gray-50'}`}>
                  <Award className={`w-6 h-6 mx-auto mb-1 ${tutor.badge === 'silver' ? 'text-gray-500' : 'text-gray-300'}`} />
                  <p className="text-xs font-medium">{t('silverBadge')}</p>
                </div>
                <div className={`p-3 rounded-xl text-center ${tutor.badge === 'bronze' ? 'bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200' : 'bg-gray-50'}`}>
                  <Award className={`w-6 h-6 mx-auto mb-1 ${tutor.badge === 'bronze' ? 'text-orange-600' : 'text-gray-300'}`} />
                  <p className="text-xs font-medium">{t('bronzeBadge')}</p>
                </div>
                <div className="p-3 rounded-xl text-center bg-gray-50">
                  <Award className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                  <p className="text-xs font-medium">{t('topRated')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end"
          onClick={() => !bookingConfirmed && setShowBooking(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="w-full max-w-[430px] mx-auto bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {bookingConfirmed ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-success" />
                </motion.div>
                <h3 className="text-lg font-bold text-text-primary">{t('bookingConfirmed')}</h3>
                <p className="text-sm text-text-secondary mt-2">Your session has been booked successfully.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-text-primary">{t('bookSession')}</h3>
                  <button onClick={() => setShowBooking(false)} className="p-2">
                    <i className="fa-solid fa-xmark text-text-secondary" />
                  </button>
                </div>

                {/* Date Selection */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-text-secondary mb-2">{t('selectDate')}</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {dates.map(d => (
                      <button
                        key={d.full}
                        onClick={() => setSelectedDate(d.full)}
                        className={`flex-shrink-0 w-14 py-2 rounded-xl text-center transition-all ${
                          selectedDate === d.full
                            ? 'bg-crimson text-white'
                            : 'bg-warm-gray text-text-secondary'
                        }`}
                      >
                        <p className="text-[10px]">{d.day}</p>
                        <p className="text-lg font-bold">{d.date}</p>
                        <p className="text-[10px]">{d.month}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-text-secondary mb-2">{t('selectTime')}</p>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-nepal-blue text-white'
                            : 'bg-warm-gray text-text-secondary'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mode Selection */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-text-secondary mb-2">Session Mode</p>
                  <div className="flex gap-2">
                    {tutor.onlineAvailable && (
                      <button className="flex-1 py-3 rounded-xl bg-nepal-blue/10 border-2 border-nepal-blue text-center">
                        <Video className="w-4 h-4 mx-auto text-nepal-blue mb-1" />
                        <p className="text-xs font-medium text-nepal-blue">{t('onlineTuition')}</p>
                      </button>
                    )}
                    <button className="flex-1 py-3 rounded-xl bg-crimson/10 border-2 border-crimson text-center">
                      <MapPin className="w-4 h-4 mx-auto text-crimson mb-1" />
                      <p className="text-xs font-medium text-crimson">{t('inPerson')}</p>
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-warm-gray rounded-xl p-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">{t('hourlyRate')}</span>
                    <span className="font-bold text-text-primary">NPR {tutor.hourlyRate}</span>
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-primary w-full py-4 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('confirmBooking')} - NPR {tutor.hourlyRate}
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-6 py-4 flex gap-3 z-40">
        <button 
          onClick={() => navigate('/chat')}
          className="w-12 h-12 rounded-xl bg-warm-gray flex items-center justify-center"
        >
          <MessageCircle className="w-5 h-5 text-text-secondary" />
        </button>
        {tutor.trialAvailable && (
          <button 
            onClick={() => setShowBooking(true)}
            className="flex-1 py-3 rounded-xl border-2 border-crimson text-crimson font-bold text-sm"
          >
            {t('bookTrial')}
          </button>
        )}
        <button 
          onClick={() => setShowBooking(true)}
          className="flex-[2] btn-primary py-3 text-sm font-bold"
        >
          {t('bookSession')}
        </button>
      </div>
    </div>
  );
}
