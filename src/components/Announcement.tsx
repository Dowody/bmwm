import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';

const announcements = [
  {
    id: 1,
    message: "🔥 Super June Special Sale is Live - Shop your favorite T-Shirt at 40% discount! 🔥",
  },
  {
    id: 2,
    message: "🏎️💨 New Car-Inspired Collection Just Dropped - Check out our latest designs! 🏎️💨",
  },
  {
    id: 3,
    message: "⚡ Free Shipping on Orders Over $100 - Limited Time Offer! ⚡",
  },
];

const MOBILE_WIDTH = 640;

const Announcement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);
  const [direction, setDirection] = useState('right');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_WIDTH);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMobile) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 12000); // match marquee duration
    } else {
      timer = setInterval(() => {
        if (!isAnimating) {
          const newIndex = (currentIndex + 1) % announcements.length;
          setDirection('right');
          setNextIndex(newIndex);
          setIsAnimating(true);
          setTimeout(() => {
            setCurrentIndex(newIndex);
            setIsAnimating(false);
          }, 500);
        }
      }, 10000);
    }
    return () => clearInterval(timer);
  }, [isAnimating, currentIndex, isMobile]);

  const handlePrevious = () => {
    if (!isAnimating && !isMobile) {
      const prevIndex = (currentIndex - 1 + announcements.length) % announcements.length;
      setDirection('left');
      setNextIndex(prevIndex);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleNext = () => {
    if (!isAnimating && !isMobile) {
      const newIndex = (currentIndex + 1) % announcements.length;
      setDirection('right');
      setNextIndex(newIndex);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setIsAnimating(false);
      }, 500);
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-black/40 backdrop-blur-sm text-white py-2 lg:py-3 absolute top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <button
          onClick={handlePrevious}
          className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 
            text-white/40 hover:text-white/80 transition-all duration-150
            hover:scale-105 active:scale-95 z-10"
          aria-label="Previous announcement"
          disabled={isMobile}
        >
          <IoIosArrowBack size={20} />
        </button>

        <div className="relative w-full overflow-hidden h-6 flex items-center justify-center">
          {/* Mobile: Marquee */}
          <div className="sm:hidden w-full h-full flex items-center">
            <div className="whitespace-nowrap animate-marquee text-sm font-medium tracking-wide text-center w-max">
              {announcements[currentIndex].message}
            </div>
          </div>
          {/* Desktop: Slide/Fade */}
          <div className="hidden sm:block w-full h-full">
            <div
              className={`
                absolute w-full
                ${isAnimating ? direction === 'right' ? 'animate-slideCenterToRight' : 'animate-slideCenterToLeft' : ''}
              `}
            >
              <p className="text-sm font-medium tracking-wide text-center">
                {announcements[currentIndex].message}
              </p>
            </div>
            {isAnimating && (
              <div
                className={`absolute w-full ${direction === 'right' ? 'animate-slideLeftToCenter' : 'animate-slideRightToCenter'}`}
              >
                <p className="text-sm font-medium tracking-wide text-center">
                  {announcements[nextIndex].message}
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 
            text-white/40 hover:text-white/80 transition-all duration-150
            hover:scale-105 active:scale-95 z-10"
          aria-label="Next announcement"
          disabled={isMobile}
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default Announcement;
