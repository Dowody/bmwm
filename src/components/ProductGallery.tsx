import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleZoomToggle = (e: React.MouseEvent) => {
    // Prevent zoom if clicking on navigation elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[data-navigation]')) {
      return;
    }
    setIsZoomed(!isZoomed);
  };

  return (
    <motion.div 
      className="relative w-full h-[380px] lg:h-[500px] rounded-2xl overflow-hidden group cursor-zoom-in"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsZoomed(false);
      }}
      onMouseMove={handleMouseMove}
      onClick={handleZoomToggle}
    >
      {/* Main Image - Full Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mainImage}
          className="absolute inset-0 bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 1, scale: 1.01, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 1, scale: 1.01, filter: "blur(3px)" }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
            opacity: { duration: 0.25 },
            scale: { duration: 0.4 },
            filter: { duration: 0.4 }
          }}
        >
          <motion.img
            src={mainImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300"
            animate={{
              scale: isZoomed ? 2.5 : 1,
              transformOrigin: isZoomed ? `${mousePosition.x}% ${mousePosition.y}%` : 'center'
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
          
          {/* Gradient overlays for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails Overlay - Bottom */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 z-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isHovered || images.length <= 4 ? 1 : 0.7, 
          y: 0 
        }}
        transition={{ duration: 0.3 }}
        data-navigation="true"
      >
        <div className="flex gap-2 bg-black/40 backdrop-blur-md rounded-full p-3 border border-white/20 justify-center items-center">
          {images.map((image, index) => (
            <motion.button
              key={index}
              className={`relative w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden transition-all duration-300 border-2 ${
                mainImage === image 
                  ? 'border-white shadow-lg scale-110' 
                  : 'border-white/30 hover:border-white/60 hover:scale-105'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setMainImage(image);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              data-navigation="true"
            >
              <img
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Active state overlay */}
              {mainImage === image && (
                <motion.div
                  className="absolute inset-0 bg-white/20 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Image Counter - Top Right */}
      <motion.div
        className="absolute top-4 right-4 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
          <span className="text-white text-sm font-medium">
            {images.findIndex(img => img === mainImage) + 1} / {images.length}
          </span>
        </div>
      </motion.div>

      {/* Navigation Arrows - Left/Right (for desktop) */}
      {images.length > 1 && (
        <>
          <motion.button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/20 text-white hover:bg-black/60 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = images.findIndex(img => img === mainImage);
              const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
              setMainImage(images[prevIndex]);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-navigation="true"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/20 text-white hover:bg-black/60 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = images.findIndex(img => img === mainImage);
              const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
              setMainImage(images[nextIndex]);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-navigation="true"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </>
      )}

      {/* Zoom indicator - Top Left */}
      <motion.div
        className="absolute top-4 left-4 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isZoomed ? 1 : 0.6, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/20">
          <motion.svg 
            className="w-4 h-4 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: isZoomed ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
            {!isZoomed && <path d="M11 8v6M8 11h6"></path>}
            {isZoomed && <path d="M8 11h6"></path>}
          </motion.svg>
        </div>
      </motion.div>

      {/* Zoom instructions overlay */}
      <AnimatePresence>
        {isHovered && !isZoomed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <span className="text-white text-sm font-medium">Click to zoom</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit zoom overlay */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="absolute top-4 right-20 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
              <span className="text-white text-xs font-medium">Click to exit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductGallery;
