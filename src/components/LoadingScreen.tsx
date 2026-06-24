import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  const displayProgress = Math.min(progress, 100);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-900"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gold-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            {/* Crown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="mb-8"
            >
              <Crown className="w-16 h-16 mx-auto text-gold-400" />
            </motion.div>

            {/* Title */}
            <motion.h2
              className="font-serif text-2xl md:text-3xl font-bold text-gold-gradient mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Preparing Something Special
            </motion.h2>
            <motion.p
              className="text-gray-500 text-sm tracking-wider mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              For the Birthday Legend
            </motion.p>

            {/* Progress Bar */}
            <div className="w-64 mx-auto">
              <div className="h-1 bg-dark-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold-gradient rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.p
                className="mt-3 text-gold-400 font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {Math.round(displayProgress)}%
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
