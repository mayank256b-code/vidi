import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, MapPin, CheckCircle, X, Video, Award, ArrowLeft } from 'lucide-react';
import { tutors, subjects, grades, locations } from '../data/mockData';

export default function SearchPage() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filteredTutors = tutors.filter(tutor => {
    if (selectedSubject && !tutor.subjects.includes(selectedSubject)) return false;
    if (selectedGrade && !tutor.grades.includes(selectedGrade)) return false;
    if (selectedLocation && tutor.location !== selectedLocation) return false;
    if (tutor.hourlyRate > priceRange) return false;
    if (onlineOnly && !tutor.onlineAvailable) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return tutor.name.toLowerCase().includes(q) || 
             tutor.subjects.some(s => s.includes(q));
    }
    return true;
  });

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedGrade('');
    setSelectedLocation('');
    setPriceRange(1000);
    setOnlineOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedSubject || selectedGrade || selectedLocation || onlineOnly || priceRange < 1000;

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm page-header">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="nav-icon-btn">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold text-text-primary">{t('searchTutors')}</h1>
        </div>

        {/* Search Input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`${t('searchTutors')}...`}
              className="w-full pl-10 pr-4 py-3 bg-warm-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-crimson/20"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              showFilters || hasActiveFilters ? 'bg-crimson text-white' : 'bg-warm-gray text-text-secondary'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {/* Subject */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-2 block">{t('subject')}</label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.slice(0, 8).map(subject => (
                      <button
                        key={subject}
                        onClick={() => setSelectedSubject(selectedSubject === subject ? '' : subject)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedSubject === subject
                            ? 'bg-crimson text-white'
                            : 'bg-warm-gray text-text-secondary'
                        }`}
                      >
                        {t(subject)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grade */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-2 block">{t('grade')}</label>
                  <div className="flex flex-wrap gap-2">
                    {grades.slice(0, 10).map(grade => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(selectedGrade === grade ? '' : grade)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedGrade === grade
                            ? 'bg-nepal-blue text-white'
                            : 'bg-warm-gray text-text-secondary'
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-2 block">{t('location')}</label>
                  <div className="flex flex-wrap gap-2">
                    {locations.map(loc => (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(selectedLocation === loc ? '' : loc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedLocation === loc
                            ? 'bg-success text-white'
                            : 'bg-warm-gray text-text-secondary'
                        }`}
                      >
                        {t(loc)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-2 block">
                    {t('price')}: Up to NPR {priceRange}/hr
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="1000"
                    step="50"
                    value={priceRange}
                    onChange={e => setPriceRange(Number(e.target.value))}
                    className="w-full accent-crimson"
                  />
                </div>

                {/* Online Only */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-nepal-blue" />
                    <span className="text-sm font-medium text-text-primary">{t('onlineTuition')}</span>
                  </div>
                  <button
                    onClick={() => setOnlineOnly(!onlineOnly)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      onlineOnly ? 'bg-crimson' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      onlineOnly ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {/* Filter Actions */}
                <div className="flex gap-2 pt-2">
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-text-secondary">
                      {t('clearFilters')}
                    </button>
                  )}
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-2.5 rounded-xl bg-crimson text-white text-sm font-medium"
                  >
                    {t('applyFilters')} ({filteredTutors.length})
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div className="px-6 py-4 page-content">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-text-secondary">
            <span className="font-bold text-text-primary">{filteredTutors.length}</span> {t('results')}
          </p>
          {hasActiveFilters && (
            <button onClick={() => { clearFilters(); }} className="flex items-center gap-1 text-xs text-crimson">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {filteredTutors.length > 0 ? (
          <div className="space-y-3">
            {filteredTutors.map((tutor, idx) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => navigate(`/tutor/${tutor.id}`)}
                className="card p-4 cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-crimson/20 to-nepal-blue/20 flex items-center justify-center">
                      <span className="text-xl font-bold text-crimson">{tutor.name[0]}</span>
                    </div>
                    {tutor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-text-primary text-sm truncate">{tutor.name}</h3>
                      {tutor.badge === 'gold' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold badge-gold flex items-center gap-0.5">
                          <Award className="w-2.5 h-2.5" /> GOLD
                        </span>
                      )}
                      {tutor.badge === 'silver' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold badge-silver flex items-center gap-0.5">
                          <Award className="w-2.5 h-2.5" /> SILVER
                        </span>
                      )}
                      {tutor.badge === 'bronze' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold badge-bronze flex items-center gap-0.5">
                          <Award className="w-2.5 h-2.5" /> BRONZE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5 truncate">
                      {tutor.subjects.map(s => t(s)).join(', ')}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs font-semibold">{tutor.rating}</span>
                        <span className="text-xs text-text-secondary">({tutor.reviewCount})</span>
                      </span>
                      <span className="flex items-center gap-0.5 text-xs text-text-secondary">
                        <MapPin className="w-3 h-3" />
                        {t(tutor.location)}
                      </span>
                      {tutor.onlineAvailable && (
                        <span className="flex items-center gap-0.5 text-xs text-nepal-blue">
                          <Video className="w-3 h-3" /> Online
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-crimson">NPR {tutor.hourlyRate}</p>
                    <p className="text-[10px] text-text-secondary">per hour</p>
                    {tutor.trialAvailable && (
                      <span className="mt-1 inline-block px-2 py-0.5 bg-success/10 rounded text-[10px] font-medium text-success">
                        {tutor.trialPrice === 0 ? t('freeTrial') : `NPR ${tutor.trialPrice}`}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-text-secondary">{t('noResults')}</p>
            <button onClick={clearFilters} className="mt-3 text-sm text-crimson font-medium">
              {t('clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
