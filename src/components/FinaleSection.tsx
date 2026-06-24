import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, PartyPopper, Heart } from 'lucide-react';

export default function FinaleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });
  const [fireworksLaunched, setFireworksLaunched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const launchConfetti = useCallback(() => {
    const defaults = { origin: { y: 0.7 }, zIndex: 100 };

    // Gold confetti
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 100,
      colors: ['#D4A017', '#F2D88A', '#B8860B', '#FFD700'],
      shapes: ['circle', 'square'],
    });

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 60,
        spread: 120,
        origin: { x: 0.2, y: 0.7 },
        colors: ['#D4A017', '#F2D88A', '#FFD700'],
      });
    }, 300);

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 60,
        spread: 120,
        origin: { x: 0.8, y: 0.7 },
        colors: ['#D4A017', '#F2D88A', '#FFD700'],
      });
    }, 600);
  }, []);

  // Canvas fireworks
  useEffect(() => {
    if (!isInView || fireworksLaunched) return;
    setFireworksLaunched(true);

    launchConfetti();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
    }

    let particles: Particle[] = [];

    const colors = ['#D4A017', '#F2D88A', '#FFD700', '#B8860B', '#FFF8DC', '#FFA500'];

    const createExplosion = (x: number, y: number) => {
      const count = 40 + Math.random() * 30;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 2 + Math.random() * 4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1 + Math.random() * 2,
        });
      }
    };

    // Launch multiple fireworks
    const launchFireworks = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height * 0.3 + Math.random() * canvas.height * 0.3;
      createExplosion(x, y);
    };

    // Launch initial batch
    for (let i = 0; i < 5; i++) {
      setTimeout(launchFireworks, i * 400);
    }

    // Continue launching
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        launchFireworks();
      }
    }, 1500);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= 0.008;
        p.vx *= 0.99;

        if (p.alpha <= 0) return false;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Trail
        ctx.beginPath();
        ctx.arc(p.x - p.vx * 2, p.y - p.vy * 2, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.5;
        ctx.fill();

        return true;
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(interval);
      cancelAnimationFrame(animRef.current);
    };
  }, [isInView, fireworksLaunched, launchConfetti]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden min-h-screen flex items-center justify-center">
      <div className="luxury-border absolute top-0 left-0 right-0" />

      {/* Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ opacity: 0.8 }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Sparkle icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8"
        >
          <PartyPopper className="w-16 h-16 mx-auto text-gold-400" />
        </motion.div>

        {/* Main message */}
        <motion.h2
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-black text-gold-gradient mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            textShadow: '0 0 40px rgba(212,160,23,0.3), 0 0 80px rgba(212,160,23,0.1)',
          }}
        >
          THANK YOU FOR
          <br />
          BEING AMAZING
        </motion.h2>

        <motion.div
          className="flex items-center justify-center gap-4 my-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
          <Sparkles className="w-5 h-5 text-gold-400" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
        </motion.div>

        <motion.p
          className="font-serif text-2xl md:text-4xl text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          HAPPY BIRTHDAY
        </motion.p>

        <motion.p
          className="font-serif text-3xl md:text-5xl font-bold text-gold-gradient"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.2, type: 'spring' }}
        >
          ANEEB
        </motion.p>

        {/* Hearts */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            >
              <Heart
                className="w-5 h-5 text-gold-400 fill-gold-400"
                style={{ opacity: 0.4 + i * 0.15 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          className="mt-16 text-gray-600 text-sm tracking-widest"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          Made with love for the best brother
        </motion.p>
      </div>
    </section>
  );
}
