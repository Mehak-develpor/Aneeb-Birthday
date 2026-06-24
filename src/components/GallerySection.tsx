import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
}

// Placeholder photos - user will replace with Aneeb's actual photos
const photos: Photo[] = [
  { id: 1, src: '/images/1.jpg', title: 'The Legend', category: 'Memories' },
  { id: 2, src: '/images/2.jpg', title: 'The Boss', category: 'Portrait' },
  { id: 3, src: '/images/3.jpg', title: 'Brotherhood', category: 'Family' },
  { id: 4, src: '/images/4.jpg', title: 'Golden Moments', category: 'Celebration' },
  { id: 5, src: '/images/5.jpg', title: 'Strength', category: 'Power' },
  { id: 6, src: '/images/6.jpg', title: 'Together', category: 'Family' },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="luxury-border absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold-500/60 text-xs tracking-[0.4em] uppercase mb-3">Memories</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold-gradient">
            Hall of Fame
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer gold-glow"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/60 rounded-xl transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="text-xs text-gold-400 tracking-widest uppercase mb-1">{photo.category}</p>
                <h3 className="font-serif text-xl text-white">{photo.title}</h3>
                <ZoomIn className="w-5 h-5 text-gold-400 mt-3" />
              </div>

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold-500/0 group-hover:border-gold-500/60 transition-all duration-500 rounded-tl" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold-500/0 group-hover:border-gold-500/60 transition-all duration-500 rounded-tr" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold-500/0 group-hover:border-gold-500/60 transition-all duration-500 rounded-bl" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold-500/0 group-hover:border-gold-500/60 transition-all duration-500 rounded-br" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

            {/* Close button */}
            <button
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-dark-100/50 border border-gold-500/20 hover:bg-dark-100 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-5 h-5 text-gold-400" />
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-4xl max-h-[85vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden border border-gold-500/20">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-xs text-gold-400 tracking-widest uppercase">{selectedPhoto.category}</p>
                  <h3 className="font-serif text-2xl text-white mt-1">{selectedPhoto.title}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
