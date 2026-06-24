import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Shield, AlertCircle, Sparkles } from 'lucide-react';

interface VaultScreenProps {
  onUnlock: () => void;
}

export default function VaultScreen({ onUnlock }: VaultScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const p = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(p);
  }, []);

  const handleSubmit = useCallback(() => {
    if (password === '25/06/1999') {
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 2500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }, [password, onUnlock]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Vault Doors */}
      <AnimatePresence>
        {isUnlocking && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-1/2 h-full bg-dark-800 z-[60]"
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212,160,23,0.03) 2px, rgba(212,160,23,0.03) 4px)`,
              }}
            >
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-gold-500/30 rounded-full" />
            </motion.div>
            <motion.div
              className="fixed top-0 right-0 w-1/2 h-full bg-dark-800 z-[60]"
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212,160,23,0.03) 2px, rgba(212,160,23,0.03) 4px)`,
              }}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-gold-500/30 rounded-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Unlock Glow Effect */}
      <AnimatePresence>
        {isUnlocking && (
          <motion.div
            className="fixed inset-0 z-[55] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gold-500/10" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212,160,23,0.4) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 3, 5], opacity: [0.5, 0.3, 0] }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-md px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Lock Icon */}
        <motion.div
          className="flex justify-center mb-8"
          animate={isUnlocking ? { rotate: 0, scale: 1.2 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/30"
              animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {isUnlocking ? (
                <Unlock className="w-10 h-10 text-gold-400" />
              ) : (
                <Lock className="w-10 h-10 text-gold-400" />
              )}
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border border-gold-500/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div className="text-center mb-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold-gradient tracking-wide">
            Secret Birthday Surprise
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-center text-gray-400 text-sm md:text-base mb-10 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Only the Birthday Legend Can Enter
        </motion.p>

        {/* Password Input */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500/50" />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="DD/MM/YYYY"
              disabled={isUnlocking}
              className="w-full pl-12 pr-4 py-4 bg-dark-100/50 border border-gold-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-all text-center tracking-widest text-lg font-mono disabled:opacity-50"
            />
          </div>
          <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-500/50" />
            Enter your Date of Birth
            <Sparkles className="w-3 h-3 text-gold-500/50" />
          </p>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={isUnlocking || !password}
          className="w-full py-4 bg-gold-gradient text-dark-900 font-bold text-lg rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed tracking-wider uppercase"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {isUnlocking ? 'Unlocking...' : 'Enter Vault'}
        </motion.button>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-6 flex items-center justify-center gap-2 text-red-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium tracking-wider">Access Denied</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unlock Success Message */}
        <AnimatePresence>
          {isUnlocking && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-gold-400 font-serif text-xl tracking-wider">
                Welcome, Legend...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
