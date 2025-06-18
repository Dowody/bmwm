import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { useUIStore } from '../store/uiStore';
import Announcement from './Announcement';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const controls = useAnimation();
  const lastScrollTime = useRef(Date.now());
  const fadeTimeout = useRef<NodeJS.Timeout>();
  const { setContentVisible, isContentVisible } = useUIStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Listen for menu state changes
  useEffect(() => {
    const handleMenuState = (e: CustomEvent) => {
      setIsMenuOpen(e.detail);
    };
    window.addEventListener('menuStateChange', handleMenuState as EventListener);
    return () => {
      window.removeEventListener('menuStateChange', handleMenuState as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollTime.current = Date.now();
      controls.start({ opacity: 1, y: 0 });
      setContentVisible(true);
      
      // Clear existing timeout
      if (fadeTimeout.current) {
        clearTimeout(fadeTimeout.current);
      }
      
      // Set new timeout only if search is not focused, menu is not open, and search query is empty
      if (!isSearchFocused && !isMenuOpen && !searchQuery) {
        fadeTimeout.current = setTimeout(() => {
          controls.start({ opacity: 0, y: 20 });
          setContentVisible(false);
        }, 5000);
      }
    };

    const handleShowContent = () => {
      lastScrollTime.current = Date.now();
      controls.start({ opacity: 1, y: 0 });
      setContentVisible(true);
      
      // Clear existing timeout
      if (fadeTimeout.current) {
        clearTimeout(fadeTimeout.current);
      }
      
      // Set new timeout only if search is not focused, menu is not open, and search query is empty
      if (!isSearchFocused && !isMenuOpen && !searchQuery) {
        fadeTimeout.current = setTimeout(() => {
          controls.start({ opacity: 0, y: 20 });
          setContentVisible(false);
        }, 5000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('showContent', handleShowContent);
    
    // Initial fade out after 3 seconds only if search is not focused, menu is not open, and search query is empty
    if (!isSearchFocused && !isMenuOpen && !searchQuery) {
      fadeTimeout.current = setTimeout(() => {
        controls.start({ opacity: 0, y: 20 });
        setContentVisible(false);
      }, 5000);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('showContent', handleShowContent);
      if (fadeTimeout.current) {
        clearTimeout(fadeTimeout.current);
      }
    };
  }, [controls, isSearchFocused, setContentVisible, isMenuOpen, searchQuery]);

  // Add effect to ensure content is visible when search query changes
  useEffect(() => {
    if (searchQuery) {
      setContentVisible(true);
      if (fadeTimeout.current) {
        clearTimeout(fadeTimeout.current);
      }
    }
  }, [searchQuery, setContentVisible]);

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative bg-black text-white overflow-hidden">
      <Announcement />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 scale-150 md:scale-125"
        >
        <source src="/videoplayback.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mobile Search Bar - Moved to top */}
      <motion.form 
        onSubmit={handleSearch} 
        className="relative w-full px-4 py-4 md:hidden z-20 pt-5 top-32"
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-white/10 backdrop-blur-sm text-white placeholder-white/70 rounded-full py-3 pl-6 pr-12 w-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsSearchFocused(true);
              controls.start({ opacity: 1, y: 0 });
            }}
            onBlur={() => {
              setIsSearchFocused(false);
              // Start fade out timer when search loses focus
              fadeTimeout.current = setTimeout(() => {
                controls.start({ opacity: 0, y: 20 });
              }, 5000);
            }}
          />
          <motion.button 
            type="submit" 
            className="absolute right-7 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSearch size={20} />
          </motion.button>
        </div>
      </motion.form>

      <button
        onClick={handleToggleMute}
        className="absolute z-20 bottom-10 right-6 lg:right-12 bg-black bg-opacity-60 text-white p-3 rounded-full shadow-lg opacity-50 hover:opacity-80 transition"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          // Muted icon (Speaker Off)
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="sound-mute-alt" className="h-6 w-6" fill="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.38,4.08a1,1,0,0,0-1.09.21L6.59,8H4a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H6.59l3.7,3.71A1,1,0,0,0,11,20a.84.84,0,0,0,.38-.08A1,1,0,0,0,12,19V5A1,1,0,0,0,11.38,4.08Z"></path><path d="M16,15.5a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l5-5a1,1,0,0,1,1.42,1.42l-5,5A1,1,0,0,1,16,15.5Z"></path><path d="M21,15.5a1,1,0,0,1-.71-.29l-5-5a1,1,0,0,1,1.42-1.42l5,5a1,1,0,0,1,0,1.42A1,1,0,0,1,21,15.5Z"></path></g></svg>
        ) : (
          // Unmuted icon (Speaker On)
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="sound-max" className="h-6 w-6" fill="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18.36,19.36a1,1,0,0,1-.7-.29,1,1,0,0,1,0-1.41,8,8,0,0,0,0-11.32,1,1,0,0,1,1.41-1.41,10,10,0,0,1,0,14.14A1,1,0,0,1,18.36,19.36Z" ></path><path d="M15.54,16.54a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41,4,4,0,0,0,0-5.66,1,1,0,0,1,1.41-1.41,6,6,0,0,1,0,8.48A1,1,0,0,1,15.54,16.54Z"></path><path d="M11.38,4.08a1,1,0,0,0-1.09.21L6.59,8H4a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H6.59l3.7,3.71A1,1,0,0,0,11,20a.84.84,0,0,0,.38-.08A1,1,0,0,0,12,19V5A1,1,0,0,0,11.38,4.08Z"></path></g></svg>
        )}
      </button>

      {/* Social Media Icons */}
      <div className="absolute z-20 bottom-10 left-6 lg:left-12 flex space-x-3">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black bg-opacity-60 text-white p-3 rounded-full shadow-lg opacity-50 hover:opacity-80 transition"
          aria-label="Instagram"
        >
          <FaInstagram className="h-6 w-6" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black bg-opacity-60 text-white p-3 rounded-full shadow-lg opacity-50 hover:opacity-80 transition"
          aria-label="Facebook"
        >
          <FaFacebook className="h-6 w-6" />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black bg-opacity-60 text-white p-3 rounded-full shadow-lg opacity-50 hover:opacity-80 transition"
          aria-label="TikTok"
        >
          <FaTiktok className="h-6 w-6" />
        </a>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-[32vh] below400:py-[30vh] below385:py-[28vh] lg:py-[30vh] top-0 lg:top-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          className="text-center relative bottom-20 top-0 lg:bottom-0"
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-4 font-bebasneue">Welcome to PUREBMWM</h1>
          <p className="text-xl mb-8">Discover the latest in car-inspired merch.</p>
          <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center">
            {/* Commented out to keep navigation on homepage */}
            {/* <Link
              to="/products"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 w-[300px] lg:py-3 lg:w-auto lg:px-8 rounded-full transition duration-300 text-center"
            >
              SHOP NOW
            </Link>
            <Link
              to="/about"
              className="bg-transparent border-2 border-white text-white font-bold py-3 w-[300px] lg:py-3 lg:w-auto lg:px-8 rounded-full hover:bg-white hover:text-black transition duration-300 text-center"
            >
              LEARN MORE
            </Link> */}
            <button
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 w-[300px] lg:py-3 lg:w-auto lg:px-8 rounded-full transition duration-300 text-center"
              onClick={() => console.log('Shop Now clicked')}
            >
              SHOP NOW
            </button>
            <button
              className="bg-transparent border-2 border-white text-white font-bold py-3 w-[300px] lg:py-3 lg:w-auto lg:px-8 rounded-full hover:bg-white hover:text-black transition duration-300 text-center"
              onClick={() => console.log('Learn More clicked')}
            >
              LEARN MORE
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
