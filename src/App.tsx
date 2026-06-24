import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import VaultScreen from './components/VaultScreen';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import ProfileSection from './components/ProfileSection';
import GallerySection from './components/GallerySection';
import CountdownSection from './components/CountdownSection';
import MessageSection from './components/MessageSection';
import FinaleSection from './components/FinaleSection';
import MusicButton from './components/MusicButton';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Vault Screen */}
      <AnimatePresence>
        {!isLoading && !isUnlocked && (
          <motion.div
            key="vault"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VaultScreen onUnlock={handleUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <ParticleBackground />
            <main>
              <HeroSection />
              <ProfileSection />
              <GallerySection />
              <CountdownSection />
              <MessageSection />
              <FinaleSection />
            </main>
            <MusicButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
