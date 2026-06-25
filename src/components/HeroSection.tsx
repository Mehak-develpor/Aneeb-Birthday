import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Crown } from 'lucide-react';

export default function HeroSection() {
  const [glowIntensity, setGlowIntensity] = useState(0.3);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity((prev) => {
        const next = prev + 0.05;
        return next > 1 ? 0.3 : next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 z-0 pointer-events-none"
        style={{ objectPosition: 'center top' }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Background gradient overlay to dim video and blend it */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/85 to-black z-0 pointer-events-none" />

      {/* Animated radial glow behind name */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(212,160,23,${0.1 + glowIntensity * 0.15}) 0%, rgba(212,160,23,${0.05 + glowIntensity * 0.05}) 30%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Crown Icon */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <Crown className="w-12 h-12 mx-auto text-gold-400" />
        </motion.div>

        {/* Happy Birthday */}
        <motion.p
          className="text-gold-300 text-sm md:text-base tracking-[0.4em] uppercase mb-4 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Happy Birthday
        </motion.p>

        {/* ANEEB - Main Name */}
        <motion.h1
          className="font-serif text-7xl md:text-9xl lg:text-[10rem] font-black text-gold-gradient leading-none tracking-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, type: 'spring', stiffness: 100 }}
          style={{
            textShadow: `0 0 ${20 + glowIntensity * 40}px rgba(212,160,23,${0.3 + glowIntensity * 0.4}), 0 0 ${40 + glowIntensity * 60}px rgba(212,160,23,${0.1 + glowIntensity * 0.2})`,
          }}
        >
          ANEEB
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-gray-400 text-base md:text-lg tracking-[0.3em] uppercase font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          A Man. A Brother. A Legend.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
          <div className="w-2 h-2 rotate-45 border border-gold-500/50" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 mx-auto text-gold-500/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
