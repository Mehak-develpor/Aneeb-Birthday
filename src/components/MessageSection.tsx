import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Quote } from 'lucide-react';

export default function MessageSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const lines = [
    'Every family has a hero.',
    'For us, that hero is you.',
    '',
    'Your strength, kindness, and support',
    'mean more than words can express.',
    '',
    'May this year bring success,',
    'happiness, and endless blessings.',
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="luxury-border absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold-500/60 text-xs tracking-[0.4em] uppercase mb-3">A Special Letter</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold-gradient">
            Birthday Wishes
          </h2>
        </motion.div>

        {/* Letter Card */}
        <motion.div
          className="relative glass-card rounded-2xl p-8 md:p-14 gold-glow"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Quote icon */}
          <motion.div
            className="absolute -top-4 left-8 md:left-14 w-8 h-8 rounded-full bg-dark-900 border border-gold-500/30 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <Quote className="w-4 h-4 text-gold-400" />
          </motion.div>

          {/* Letter content */}
          <div className="space-y-1">
            {lines.map((line, index) => (
              <motion.p
                key={index}
                className={`font-serif text-lg md:text-2xl leading-relaxed ${
                  line === '' ? 'h-4' : 'text-gray-200'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            className="mt-10 pt-6 border-t border-gold-500/10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-gold-400 fill-gold-400" />
              <p className="font-serif text-xl text-gold-gradient">
                Happy Birthday Aneeb
              </p>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-gold-500/10 rounded-br-xl" />
          <div className="absolute top-4 left-4 w-16 h-16 border-l border-t border-gold-500/10 rounded-tl-xl" />
        </motion.div>
      </div>
    </section>
  );
}
