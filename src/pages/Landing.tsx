import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Shield, Star, MapPin } from 'lucide-react';

export default function Landing() {
  const { t, setShowLoading } = useApp();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream overflow-hidden">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson via-crimson-dark to-nepal-blue opacity-95" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        </div>
        
        <div className="relative px-6 pt-12 pb-16 text-center text-white">
          {/* Red Panda Mascot */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="mx-auto mb-6 w-32 h-32 relative"
          >
            {/* Mascot Image */}
            <img 
              src="https://image.qwenlm.ai/generated-images/83ee63c6-26e9-46ff-833a-0a1b9388a034/_result.png" 
              alt="Vidi Red Panda Mascot" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
            >
              <span className="text-xs">★</span>
            </motion.div>
            <motion.div
              animate={{ y: [3, -3, 3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -bottom-1 -left-3 w-5 h-5 rounded-full bg-white/15 flex items-center justify-center"
            >
              <span className="text-[10px]">✓</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold tracking-tight"
          >
            Vidi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-lg font-medium opacity-90"
          >
            {t('tagline')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-2 text-sm opacity-75 max-w-xs mx-auto"
          >
            {t('description')}
          </motion.p>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="card p-4 text-center"
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-crimson/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-crimson" />
            </div>
            <p className="text-sm font-semibold text-text-primary">500+ Tutors</p>
            <p className="text-xs text-text-secondary mt-1">Verified & Trusted</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="card p-4 text-center"
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-nepal-blue/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-nepal-blue" />
            </div>
            <p className="text-sm font-semibold text-text-primary">All Subjects</p>
            <p className="text-xs text-text-secondary mt-1">Grade 1 to +2</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="card p-4 text-center"
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-success/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <p className="text-sm font-semibold text-text-primary">Safe & Secure</p>
            <p className="text-xs text-text-secondary mt-1">Verified Profiles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="card p-4 text-center"
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-warning/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-warning" />
            </div>
            <p className="text-sm font-semibold text-text-primary">Rated & Reviewed</p>
            <p className="text-xs text-text-secondary mt-1">By Real Students</p>
          </motion.div>
        </div>
      </div>

      {/* Cities */}
      <div className="px-6 pb-6">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-crimson" />
            <h3 className="font-semibold text-text-primary text-sm">Available Cities</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Kathmandu', 'Pokhara', 'Butwal', 'Lalitpur', 'Bhaktapur'].map(city => (
              <span key={city} className="px-3 py-1.5 bg-warm-gray rounded-full text-xs font-medium text-text-secondary">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          onClick={handleGetStarted}
          className="btn-primary w-full py-4 text-lg font-bold rounded-2xl flex items-center justify-center gap-2"
        >
          <GraduationCap className="w-5 h-5" />
          {t('getStarted')}
        </motion.button>
        
        <p className="text-center text-xs text-text-secondary mt-4">
          Nepal's #1 Tuition Matching Platform
        </p>
      </div>
    </div>
  );
}
