import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiUser, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore(state => state.getTotalItems());
  const { isDarkTheme, toggleTheme } = useUIStore();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) {
        setIsVisible(true);
        return;
      }

      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Show navbar when scrolled past 80% of the hero height
      if (scrollPosition > heroHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Set initial visibility based on route
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add effect to close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/bmwm/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
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
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`fixed top-0 left-0 right-0 z-40 shadow-sm transition-colors duration-300 ${
            isDarkTheme ? 'bg-[#16171E]' : 'bg-[#F9FAFB]'
          }`}
        >
          <div className="container mx-auto px-4 py-5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center group">
                <div className={`flex items-center group cursor-pointer ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                  <div>
                    <motion.h1 
                      className={`text-3xl font-bold font-owned ${isDarkTheme ? 'text-white' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      PURE.<span className="text-primary group-hover:text-primary/80 transition-colors duration-300">BMWM</span>
                    </motion.h1>
                    <p className={`text-[0.85rem] font-owned font-medium tracking-wider ${isDarkTheme ? 'text-white/70' : 'text-gray-600'}`}>
                      DREAM. BUY. BUILD.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/products', label: 'All Collection' },
                  { path: '/about', label: 'About' }
                ].map((item) => (
                  <motion.div
                    key={item.path}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link 
                      to={item.path} 
                      className={`font-medium relative ${
                        isActive(item.path) 
                          ? 'text-primary' 
                          : (isDarkTheme ? 'text-white hover:text-primary' : 'text-gray-900 hover:text-primary')
                      }`}
                    >
                      {item.label}
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="mainActiveIndicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  <motion.button 
                    className={`font-medium flex items-center ${
                      isDarkTheme ? 'text-white hover:text-primary' : 'text-gray-900 hover:text-primary'
                    }`}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Categories
                    <motion.svg 
                      className="w-4 h-4 ml-1"
                      animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </motion.svg>
                  </motion.button>
                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute left-0 top-full pt-2 w-48 z-10"
                      >
                        <div className={`${
                          isDarkTheme ? 'bg-[#F9FAFB]' : 'bg-white'
                        } shadow-lg rounded-md py-2`}>
                        {['Car T-Shirts', 'F1 T-Shirts', 'Bike T-Shirts', 'Streetwear'].map((category, index) => (
                          <motion.div
                            key={category}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link 
                              to={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                              className={`block px-4 py-2 text-left w-full transition-colors duration-200 ${
                                isDarkTheme 
                                  ? 'text-black hover:bg-gray-700 hover:text-white' 
                                  : 'text-gray-900 hover:bg-[#16171E]'
                              }`}
                              onClick={() => setIsCategoriesOpen(false)}
                            >
                              {category}
                            </Link>
                          </motion.div>
                        ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Search, User, and Cart */}
              <div className="hidden md:flex items-center space-x-6">
                <motion.form 
                  onSubmit={handleSearch} 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="text"
                    placeholder="I'm looking for..."
                    className={`backdrop-blur-md border border-gray-200/50 rounded-full py-2 pl-4 pr-10 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 ${
                      isDarkTheme 
                        ? 'text-white placeholder-gray-400 border-gray-600/50 focus:border-gray-500/50 bg-gray-800/30' 
                        : 'text-gray-900 placeholder-gray-500 bg-gray-50/50'
                    }`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <motion.button 
                    type="submit" 
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-primary'
                    }`}
                  >
                    <FiSearch size={18} />
                  </motion.button>
                </motion.form>
                <motion.button 
                  className={`${isDarkTheme ? 'text-white/70 hover:text-white' : 'text-gray-700 hover:text-primary'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUser size={22} />
                </motion.button>
                <motion.button 
                  onClick={toggleTheme}
                  className={`${isDarkTheme ? 'text-white/70 hover:text-white' : 'text-gray-700 hover:text-primary'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
                >
                  {isDarkTheme ? <FiSun size={22} /> : <FiMoon size={22} />}
                </motion.button>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/cart" className={`${isDarkTheme ? 'text-white/70 hover:text-white' : 'text-gray-700 hover:text-primary'} relative`}>
                    <PiShoppingCartSimpleBold size={22} className='relative top-0.5'/>
                    {totalItems > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-4">
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={toggleTheme}
                      className={`${isDarkTheme ? 'text-white/70 hover:text-white' : 'text-gray-700 hover:text-primary'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
                    >
                      {isDarkTheme ? <FiSun size={22} /> : <FiMoon size={22} />}
                    </motion.button>
                  )}
                </AnimatePresence>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/cart" className={`${isDarkTheme ? 'text-white/70 hover:text-white' : 'text-gray-700 hover:text-primary'} relative`}>
                    <PiShoppingCartSimpleBold size={22} className='relative top-0.5'/>
                    {totalItems > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
                <motion.button 
                  onClick={toggleMenu} 
                  className={`${isDarkTheme ? 'text-white/70 hover:text-white' : 'text-gray-700 hover:text-primary'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <FiX size={24} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 0, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <FiMenu size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, maxHeight: 0}}
                  animate={{ opacity: 1, maxHeight: 600}}
                  exit={{ opacity: 0, maxHeight: 0}}
                  transition={{ 
                    maxHeight: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
                    y: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
                  }}
                  style={{ overflow: 'hidden' }}
                  className="md:hidden relative"
                >
                  <motion.div 
                    className="flex flex-col space-y-4 mt-4 mb-4 px-1"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={{ 
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    {[
                      { path: '/', label: 'Home' },
                      { path: '/products', label: 'All Collection' },
                      { path: '/about', label: 'About' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ 
                          delay: index * 0.1,
                          duration: 0.2,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                      >
                        <Link 
                          to={item.path} 
                          className={`font-medium block relative text-left w-full ${
                            isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-primary'
                          }`} 
                          onClick={toggleMenu}
                        >
                          {item.label}
                          {isActive(item.path) && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="absolute"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ 
                        delay: 0.3,
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="space-y-0"
                    >
                      <motion.button 
                        onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                        className={`flex items-center justify-between w-full text-left ${isDarkTheme ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-primary'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-medium">Categories</span>
                        <motion.div
                          animate={{ rotate: isMobileCategoriesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {isMobileCategoriesOpen && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 space-y-2 pt-2">
                              {['Car T-Shirts', 'F1 T-Shirts', 'Bike T-Shirts', 'Streetwear'].map((category, index) => (
                                <motion.div
                                  key={category}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  transition={{ 
                                    delay: index * 0.1,
                                    duration: 0.2,
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                >
                                  <Link 
                                    to={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={`block text-sm transition-colors duration-200 text-left w-full ${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-primary'}`}
                                    onClick={() => {
                                      setIsMobileCategoriesOpen(false);
                                      toggleMenu();
                                    }}
                                  >
                                    {category}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ 
                        delay: 0.5,
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="pt-8 relative top-2 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="space-y-3">
                        {/* Mobile Search Bar */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: 0.1, duration: 0.2 }}
                          className="mb-4"
                        >
                          <motion.form 
                            onSubmit={handleSearch} 
                            className="relative"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <input
                              type="text"
                              placeholder="Search for products..."
                              className={`backdrop-blur-md border border-gray-200/50 rounded-full py-3 pl-4 pr-12 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 ${
                                isDarkTheme 
                                  ? 'text-white placeholder-gray-400 border-gray-600/50 focus:border-gray-500/50 bg-gray-800/30' 
                                  : 'text-gray-900 placeholder-gray-500 bg-gray-50/50'
                              }`}
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <motion.button 
                              type="submit" 
                              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                                isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-primary'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiSearch size={18} />
                            </motion.button>
                          </motion.form>
                        </motion.div>
                        
                        {/* Authentication Section */}
                        <motion.button 
                          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                            isDarkTheme 
                              ? 'bg-primary text-white hover:bg-primary/90' 
                              : 'bg-primary text-white hover:bg-primary/90'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            console.log('Login clicked');
                            toggleMenu();
                          }}
                        >
                          <FiUser size={16} />
                          <span>Sign In</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MainNavbar; 