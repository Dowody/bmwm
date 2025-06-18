import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiUser, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

const GeneralNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore(state => state.getTotalItems());
  const { isDarkTheme, toggleTheme } = useUIStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 shadow-sm transition-colors duration-300 ${
      isDarkTheme ? 'bg-[#16171E]' : 'bg-[#F9FAFB]'
    }`}>
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* Commented out to keep navigation on homepage */}
          {/* <Link to="/" className="flex items-center group"> */}
          <div className="flex items-center group cursor-pointer">
            <motion.h1 
              className="text-3xl font-bold font-rajdhani"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              PURE<span className="text-primary group-hover:text-primary/80 transition-colors duration-300">BMWM</span>
            </motion.h1>
          </div>
          {/* </Link> */}

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
                {/* Commented out to keep navigation on homepage */}
                {/* <Link 
                  to={item.path} 
                  className={`font-medium relative ${isActive(item.path) ? 'text-primary' : 'hover:text-primary'}`}
                > */}
                <button 
                  className={`font-medium relative ${isActive(item.path) ? 'text-primary' : 'hover:text-primary'}`}
                  onClick={() => console.log(`${item.label} clicked`)}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="generalActiveIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
                {/* </Link> */}
              </motion.div>
            ))}
            <div 
              className="relative group"
              onMouseEnter={() => setIsCategoriesOpen(true)} 
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="font-medium hover:text-primary">
                Categories
              </button>
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute left-0 top-full pt-2 w-48 z-10"
                  >
                    <div className="bg-white shadow-lg rounded-md py-2">
                    {['Car T-Shirts', 'F1 Racing T-Shirts', 'Bike T-Shirts', 'Streetwear'].map((category, index) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {/* Commented out to keep navigation on homepage */}
                        {/* <Link 
                          to={`/products?category=${category.toLowerCase().replace(' ', '-')}`}
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                        >
                          {category}
                        </Link> */}
                        <button 
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => console.log(`${category} clicked`)}
                        >
                          {category}
                        </button>
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
                className="bg-gray-100 rounded-full py-2 pl-4 pr-10 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <motion.button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <FiSearch size={18} />
              </motion.button>
            </motion.form>
            <motion.button 
              className="text-gray-700 hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUser size={22} />
            </motion.button>
            <motion.button 
              onClick={toggleTheme}
              className="text-gray-700 hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDarkTheme ? <FiSun size={22} /> : <FiMoon size={22} />}
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              {/* Commented out to keep navigation on homepage */}
              {/* <Link to="/cart" className="text-gray-700 hover:text-primary relative"> */}
              <button className="text-gray-700 hover:text-primary relative" onClick={() => console.log('Cart clicked')}>
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
              </button>
              {/* </Link> */}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button 
              onClick={toggleTheme}
              className="text-gray-700 hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDarkTheme ? <FiSun size={22} /> : <FiMoon size={22} />}
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              {/* Commented out to keep navigation on homepage */}
              {/* <Link to="/cart" className="text-gray-700 hover:text-primary relative"> */}
              <button className="text-gray-700 hover:text-primary relative" onClick={() => console.log('Cart clicked')}>
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
              </button>
              {/* </Link> */}
            </motion.div>
            <motion.button 
              onClick={toggleMenu} 
              className="text-gray-700 hover:text-primary"
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
              className="md:hidden"
            >
              <motion.div 
                className="flex flex-col space-y-4 mt-4 mb-4"
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
                    {/* Commented out to keep navigation on homepage */}
                    {/* <Link 
                      to={item.path} 
                      className={`font-medium block relative ${isActive(item.path) ? 'text-primary' : ''}`} 
                      onClick={toggleMenu}
                    >
                      {item.label}
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="generalMobileActiveIndicator"
                          className="absolute"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link> */}
                    <button 
                      className={`font-medium block relative text-left w-full ${isActive(item.path) ? 'text-primary' : ''}`} 
                      onClick={() => {
                        console.log(`${item.label} clicked`);
                        toggleMenu();
                      }}
                    >
                      {item.label}
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="generalMobileActiveIndicator"
                          className="absolute"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
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
                  className="space-y-2"
                >
                  <p className="font-medium">Categories</p>
                  <div className="pl-4 space-y-2">
                    {['Car T-Shirts', 'F1 Racing T-Shirts', 'Bike T-Shirts', 'Streetwear'].map((category, index) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ 
                          delay: 0.4 + index * 0.1,
                          duration: 0.2,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                      >
                        {/* Commented out to keep navigation on homepage */}
                        {/* <Link 
                          to={`/products?category=${category.toLowerCase().replace(' ', '-')}`}
                          className="block text-sm hover:text-primary transition-colors duration-200"
                          onClick={toggleMenu}
                        >
                          {category}
                        </Link> */}
                        <button 
                          className="block text-sm hover:text-primary transition-colors duration-200 text-left w-full"
                          onClick={() => {
                            console.log(`${category} clicked`);
                            toggleMenu();
                          }}
                        >
                          {category}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default GeneralNavBar; 