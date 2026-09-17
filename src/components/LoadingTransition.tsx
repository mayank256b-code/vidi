import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

export default function LoadingTransition() {
  const { showLoading } = useApp();

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Red Panda SVG Animation */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 3, -3, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative"
            >
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <motion.ellipse 
                  cx="60" cy="72" rx="28" ry="22" 
                  fill="#C85A2A"
                  animate={{ rx: [28, 30, 28] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                {/* Belly */}
                <ellipse cx="60" cy="76" rx="18" ry="14" fill="#8B3A1A" />
                {/* Head */}
                <motion.circle 
                  cx="60" cy="42" r="20" 
                  fill="#C85A2A"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                {/* Face mask (white) */}
                <ellipse cx="60" cy="46" rx="14" ry="10" fill="#FFF5EE" />
                {/* Eyes */}
                <motion.circle 
                  cx="53" cy="42" r="3.5" fill="#1A1A2E"
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle 
                  cx="67" cy="42" r="3.5" fill="#1A1A2E"
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Eye shine */}
                <circle cx="54" cy="41" r="1.2" fill="white" />
                <circle cx="68" cy="41" r="1.2" fill="white" />
                {/* Nose */}
                <ellipse cx="60" cy="48" rx="3" ry="2" fill="#1A1A2E" />
                {/* Mouth */}
                <path d="M57 51 Q60 54 63 51" stroke="#1A1A2E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* Ears */}
                <motion.circle 
                  cx="44" cy="28" r="8" fill="#C85A2A"
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <circle cx="44" cy="28" r="5" fill="#FFB6A3" />
                <motion.circle 
                  cx="76" cy="28" r="8" fill="#C85A2A"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <circle cx="76" cy="28" r="5" fill="#FFB6A3" />
                {/* Tail */}
                <motion.path 
                  d="M88 72 Q100 60 95 50 Q92 44 88 48" 
                  stroke="#C85A2A" strokeWidth="8" fill="none" strokeLinecap="round"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ transformOrigin: '88px 72px' }}
                />
                {/* Tail stripes */}
                <motion.path 
                  d="M92 58 Q96 54 94 50" 
                  stroke="#8B3A1A" strokeWidth="3" fill="none" strokeLinecap="round"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ transformOrigin: '88px 72px' }}
                />
                {/* Paws */}
                <ellipse cx="45" cy="88" rx="7" ry="5" fill="#8B3A1A" />
                <ellipse cx="75" cy="88" rx="7" ry="5" fill="#8B3A1A" />
                {/* Cheek marks */}
                <ellipse cx="48" cy="47" rx="4" ry="2.5" fill="#FFB6A3" opacity="0.6" />
                <ellipse cx="72" cy="47" rx="4" ry="2.5" fill="#FFB6A3" opacity="0.6" />
              </svg>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h3 className="text-lg font-bold text-crimson">Vidi</h3>
              <motion.p 
                className="text-sm text-text-secondary mt-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading...
              </motion.p>
            </motion.div>

            {/* Progress dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-crimson"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
