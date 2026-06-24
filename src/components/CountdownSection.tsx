import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function TimeUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative w-20 h-24 md:w-28 md:h-32 flex items-center justify-center bg-dark-100/50 border border-gold-500/20 rounded-xl overflow-hidden">
        {/* Background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent" />

        {/* Number */}
        <motion.span
          className="font-serif text-3xl md:text-5xl font-bold text-gold-gradient"
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-500/30" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-500/30" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-500/30" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-500/30" />
      </div>
      <span className="mt-3 text-xs text-gray-500 tracking-[0.2em] uppercase">{label}</span>
    </motion.div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setMonth(5); // June (0-indexed)
    targetDate.setDate(25);
    targetDate.setHours(0, 0, 0, 0);

    // If birthday has passed this year, target next year
    if (targetDate < new Date()) {
      targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="luxury-border absolute top-0 left-0 right-0" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold-500/60 text-xs tracking-[0.4em] uppercase mb-3">The Countdown</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold-gradient">
            Time Until Celebration
          </h2>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="flex justify-center items-center gap-4 md:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <TimeUnit value={timeLeft.days} label="Days" delay={0.2} />
          <span className="text-gold-500/40 text-2xl md:text-4xl font-light -mt-6">:</span>
          <TimeUnit value={timeLeft.hours} label="Hours" delay={0.3} />
          <span className="text-gold-500/40 text-2xl md:text-4xl font-light -mt-6">:</span>
          <TimeUnit value={timeLeft.minutes} label="Minutes" delay={0.4} />
          <span className="text-gold-500/40 text-2xl md:text-4xl font-light -mt-6">:</span>
          <TimeUnit value={timeLeft.seconds} label="Seconds" delay={0.5} />
        </motion.div>

        {/* Date info */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <Calendar className="w-4 h-4 text-gold-500/50" />
          <p className="text-sm text-gray-500 tracking-wider">June 25th - The Legend&apos;s Day</p>
        </motion.div>
      </div>
    </section>
  );
}
