import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, Shield, Star, Heart, Award } from 'lucide-react';

interface SkillBarProps {
  label: string;
  percentage: number;
  icon: React.ReactNode;
  delay: number;
}

function SkillBar({ label, percentage, icon, delay }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(percentage), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage, delay]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-gold-400">{icon}</span>
          <span className="text-sm text-gray-300 tracking-wider uppercase">{label}</span>
        </div>
        <motion.span
          className="text-gold-400 font-mono text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          {width}%
        </motion.span>
      </div>
      <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gold-gradient rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}

export default function ProfileSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const skills = [
    { label: 'Leadership', percentage: 95, icon: <Crown className="w-4 h-4" />, delay: 0.2 },
    { label: 'Loyalty', percentage: 100, icon: <Shield className="w-4 h-4" />, delay: 0.4 },
    { label: 'Hard Work', percentage: 98, icon: <Star className="w-4 h-4" />, delay: 0.6 },
    { label: 'Family Love', percentage: 100, icon: <Heart className="w-4 h-4" />, delay: 0.8 },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Section divider */}
      <div className="luxury-border absolute top-0 left-0 right-0" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold-500/60 text-xs tracking-[0.4em] uppercase mb-3">Character Profile</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold-gradient">
            The Legend
          </h2>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="glass-card rounded-2xl p-8 md:p-12 gold-glow"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            {/* Avatar */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
            >
              <div className="w-28 h-28 rounded-full bg-gold-gradient flex items-center justify-center overflow-hidden p-1">
                <img src="/images/profile.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-dark-900 border-2 border-gold-400 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <Award className="w-4 h-4 text-gold-400" />
              </motion.div>
            </motion.div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <motion.h3
                className="font-serif text-3xl font-bold text-white mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Aneeb
              </motion.h3>
              <motion.p
                className="text-gold-400 text-sm tracking-widest uppercase mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                The Boss
              </motion.p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <motion.span
                  className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs text-gold-300 tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  Legendary
                </motion.span>
                <motion.span
                  className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs text-gold-300 tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  Birthday Edition
                </motion.span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mb-8" />

          {/* Skills */}
          <div>
            <p className="text-xs text-gray-500 tracking-[0.3em] uppercase mb-6">Attributes</p>
            {skills.map((skill) => (
              <SkillBar key={skill.label} {...skill} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
