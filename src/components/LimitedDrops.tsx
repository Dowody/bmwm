import { Link } from 'react-router-dom';
import { getNewProducts } from '../data/products';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { FiCheck } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { motion } from 'framer-motion';

const ArrowButton = ({ onClick, left }: { onClick?: () => void; left?: boolean }) => {
  const { isDarkTheme } = useUIStore();
  return (
  <button
    onClick={onClick}
      className={`p-3 rounded-full shadow-sm transition-colors duration-200 ${
        isDarkTheme
          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-primary'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-primary'
      }`}
    aria-label={left ? 'Previous' : 'Next'}
    type="button"
  >
    {left ? <FaChevronLeft size={14} /> : <FaChevronRight size={14} />}
  </button>
);
};

const ProductCard = ({ product, idx }: { product: any; idx: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showBackImage, setShowBackImage] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const addedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const { isDarkTheme } = useUIStore();
  
  // Create front and back image paths
  const frontImage = 'assets/products/e30_2.jpg';
  const backImage = 'assets/products/e30_3.jpg';

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to the card
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Find center of the card
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate 3D rotation angles
      const rotateX = (y - centerY) / 15;  // Up/down tilt
      const rotateY = (centerX - x) / 15;  // Left/right tilt
      
      // Apply 3D transform with perspective
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateY(-10px)
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    };

    const handleMouseEnter = () => {
      // Start the timer for showing back image after 0.3 seconds
      hoverTimeoutRef.current = setTimeout(() => {
        setShowBackImage(true);
      }, 200);
    };

    const handleMouseLeaveComplete = () => {
      // Clear timeout and reset states
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setShowBackImage(false);
      handleMouseLeave();
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeaveComplete);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeaveComplete);
      
      // Clean up timeout on unmount
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (addedTimeoutRef.current) {
        clearTimeout(addedTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="px-0 pt-4 pb-2">
      <div className="flex flex-col group">
        {/* Product card with 3D effect */}
        <div 
          ref={cardRef}
          className={`relative w-full h-[315px] cursor-pointer rounded-[20px] shadow-sm transition-all duration-500 overflow-visible border ${
            isDarkTheme
              ? 'bg-[#23242a] border-gray-800 hover:border-gray-700'
              : 'bg-white border-0 border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            overflow: 'visible'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Commented out to keep navigation on homepage */}
          {/* <Link to={`/products/${product.id}`} className="block w-full h-full relative overflow-hidden rounded-2xl"> */}
          <div className="block w-full h-full relative overflow-hidden rounded-2xl cursor-pointer">
            {/* Front Image */}
            <img
              src={frontImage}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
                showBackImage ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
            {/* Back Image */}
            <img
              src={backImage}
              alt={`${product.name} back`}
              className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
                showBackImage ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          </div>
          {/* </Link> */}
          
          {/* Cart Button - appears on hover - outside Link to avoid conflicts */}
          <div className={`absolute top-4 right-4 z-10 transition-all duration-300 ${
            (isHovered || isAdded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button 
              className={`bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 ${
                isAdded 
                  ? 'text-black scale-110' 
                  : 'text-gray-900 hover:!bg-red-500 hover:!text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (!isAdded) {
                  // Add to cart with default values
                  addItem(product, 1, 'M', 'Black');
                  
                  // Show checkmark briefly
                  setIsAdded(true);
                  
                  // Reset after checkmark animation completes
                  addedTimeoutRef.current = setTimeout(() => {
                    setIsAdded(false);
                  }, 1000);
                }
              }}
              aria-label={isAdded ? "Added to cart" : "Add to cart"}
              disabled={isAdded}
            >
              <div className="relative">
                <PiShoppingCartSimpleBold 
                  className={`w-5 h-5 transition-all duration-500 ${
                    isAdded ? 'opacity-0 scale-75' : 'opacity-100 scale-100 rotate-0 hover:scale-110'
                  }`}
                />
                <FiCheck 
                  className={`w-4.5 h-4.5 absolute top-0.5 left-0.5 transition-all duration-500 ${
                    isAdded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-90'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium tracking-wide ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {product.category}
            </p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, starIdx) => (
                <span
                  key={starIdx}
                  className={`text-xs ${starIdx < 4 ? 'text-yellow-400' : (isDarkTheme ? 'text-gray-600' : 'text-gray-300')}`}
                >
                  ★
                </span>
              ))}
              <span className={`text-xs ml-1 font-medium ${
                isDarkTheme ? 'text-gray-500' : 'text-gray-400'
              }`}>(4.0)</span>
            </div>
          </div>
          
          {/* Commented out to keep navigation on homepage */}
          {/* <Link to={`/products/${product.id}`} className="block"> */}
          <div className="block cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className={`font-bold text-lg transition-colors truncate ${
                isDarkTheme ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700'
              }`}>
                {product.name}
              </h3>
              
              {/* Redesigned button positioned next to title */}
              <button
                className={`group relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-medium transition-all duration-300 ease-out rounded-full overflow-hidden ${
                  isDarkTheme 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40' 
                    : 'bg-gray-900/5 hover:bg-gray-900/10 text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => console.log('View Details clicked for:', product.name)}
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span>View Details</span>
                  <svg 
                    className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          {/* </Link> */}
          
          <div className="flex items-center justify-between">
            {/* Price section removed */}
          </div>
        </div>
      </div>
    </div>
  );
};

const LimitedDrops = () => {
  const { isDarkTheme } = useUIStore();
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  
  let newProducts = getNewProducts(8);
  if (newProducts.length < 8) {
    newProducts = Array(8).fill(null).map((_, i) => newProducts[i % newProducts.length]);
  }

  const sliderRef = useRef<Slider>(null);
  
  // Add wheel scroll functionality for trackpad
  useEffect(() => {
    const container = sliderContainerRef.current;
    if (!container) return;

    let isThrottled = false;
    const throttleDelay = 150; // ms between slide changes

    const handleWheel = (e: WheelEvent) => {
      // Throttle to prevent rapid firing
      if (isThrottled) return;
      
      // Prevent default scroll behavior
      e.preventDefault();
      
      // Handle horizontal scroll (trackpad swipe) or vertical scroll with shift key
      const deltaX = e.deltaX;
      const deltaY = e.deltaY;
      
      // If there's horizontal scroll or shift+vertical scroll
      if (Math.abs(deltaX) > Math.abs(deltaY) || e.shiftKey) {
        const scrollAmount = deltaX !== 0 ? deltaX : deltaY;
        
        // Only proceed if scroll amount is significant enough
        if (Math.abs(scrollAmount) < 10) return;
        
        // Set throttle
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, throttleDelay);
        
        if (scrollAmount > 0) {
          // Scroll right - next slide
          sliderRef.current?.slickNext();
        } else if (scrollAmount < 0) {
          // Scroll left - previous slide
          sliderRef.current?.slickPrev();
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { 
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 900,
        settings: { 
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: { 
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className={`py-16 px-4 transition-colors duration-300 relative ${
      isDarkTheme ? 'bg-[#16171E] text-white' : 'bg-[#F9FAFB] text-gray-900'
    }`}>
      {/* Street background with overlay for dark theme */}
      {isDarkTheme && (
        <>
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(assets/bg1.jpg)', 
              backgroundPosition: window.innerWidth < 768 ? 'center center' : 'center -300px',
              backgroundSize: 'cover'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        </>
      )}
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-bebasneue mb-2">
              Limited Drops
            </h2>
            <p className={`text-lg font-medium tracking-wide ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover the latest in car-inspired streetwear
            </p>
          </div>
          <div className="flex space-x-3">
            <ArrowButton left onClick={() => sliderRef.current?.slickPrev()} />
            <ArrowButton onClick={() => sliderRef.current?.slickNext()} />
          </div>
        </div>
        
        <div ref={sliderContainerRef} className="overflow-visible">
          <Slider ref={sliderRef} {...sliderSettings} className="editorial-slider overflow-visible">
            {newProducts.map((product, idx) => (
              <ProductCard key={idx} product={product} idx={idx} />
            ))}
          </Slider>
        </div>

        {/* Minimal CTA Section - commented out to keep navigation on homepage */}
        {/* <div className="mt-12 flex justify-center">
          <Link
            to="/products"
            className="group inline-flex items-center space-x-2 text-gray-700 hover:text-primary font-medium transition-colors duration-200"
          >
            <span className="text-lg tracking-wide">View All Products</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div> */}
        <div className="mt-12 flex justify-center">
          <button
            className={`group inline-flex items-center space-x-2 font-medium transition-colors duration-200 hover:text-primary ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-700'
            }`}
            onClick={() => console.log('View All Products clicked')}
          >
            <span className="text-lg tracking-wide">View All Products</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LimitedDrops; 