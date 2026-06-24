import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      // Create audio element with a placeholder
      audioRef.current = new Audio();
      // Note: User should replace this URL with actual birthday song
      audioRef.current.src = '';
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Since we don't have an actual audio file, we'll just toggle the visual state
      // In production, user should add: audioRef.current.play().then(() => setIsPlaying(true))
      setIsPlaying(true);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-dark-100/80 backdrop-blur-sm border border-gold-500/30 flex items-center justify-center hover:bg-dark-100 transition-colors gold-glow"
          title="Background Music"
        >
          <motion.div
            animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-gold-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-500" />
            )}
          </motion.div>

          {/* Sound wave animation when playing */}
          {isPlaying && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border border-gold-500/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-gold-500/20"
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
