import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { FiCheck } from 'react-icons/fi';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  background?: 'light' | 'white';
  layout?: 'slider' | 'grid';
}

const ArrowButton = ({ onClick, left }: { onClick?: () => void; left?: boolean }) => (
  <button
    onClick={onClick}
    className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-primary p-3 rounded-full shadow-sm transition-colors duration-200"
    aria-label={left ? 'Previous' : 'Next'}
    type="button"
  >
    {left ? <FaChevronLeft size={14} /> : <FaChevronRight size={14} />}
  </button>
);

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
  const frontImage = product.images[0] || 'public/assets/products/e30_2.jpg';
  const backImage = product.images[1] || 'public/assets/products/e30_3.jpg';

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
          className="relative w-full h-[315px] cursor-pointer bg-white border-0 border-gray-200 hover:border-gray-300 hover:shadow-lg rounded-[20px] shadow-sm"
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
                  addItem(product, 1, product.sizes[0] || 'M', product.colors[0]?.name || 'Black');
                  
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
            <h3 className={`font-bold text-lg transition-colors truncate ${
              isDarkTheme ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700'
            }`}>
              {product.name}
            </h3>
          </div>
          {/* </Link> */}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className={`font-bold text-xl ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}>
                €{product.price.toLocaleString('en-EU', { minimumFractionDigits: 2 })}
              </p>
              {product.originalPrice && (
                <p className={`text-sm line-through ${
                  isDarkTheme ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  €{product.originalPrice.toLocaleString('en-EU', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
            
            {/* Add to cart button - commented out link, kept as button */}
            {/* <Link
              to={`/products/${product.id}`}
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-full transition-colors duration-200 text-sm"
            >
              BUY
            </Link> */}
            <button
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-full transition-colors duration-200 text-sm"
              onClick={() => console.log('Buy clicked for:', product.name)}
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = ({ title, subtitle, products, background = 'light', layout = 'slider' }: FeaturedProductsProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const { isDarkTheme } = useUIStore();

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase().includes(activeTab));

  // Ensure we have enough products for the slider
  let displayProducts = filteredProducts;
  
  // If no products match the filter, fall back to showing all products
  if (filteredProducts.length === 0) {
    displayProducts = products;
  }
  
  if (displayProducts.length < 8) {
    displayProducts = Array(8).fill(null).map((_, i) => displayProducts[i % displayProducts.length]);
  }

  const sliderRef = useRef<Slider>(null);
  
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const bgClass = background === 'white' 
    ? (isDarkTheme ? 'bg-[#16171E]' : 'bg-white') 
    : (isDarkTheme ? 'bg-[#16171E]' : 'bg-[#F9FAFB]');

  return (
    <section className={`${bgClass} py-16 px-4 transition-colors duration-300 ${
      isDarkTheme ? 'text-white' : 'text-gray-900'
    }`}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-bebasneue mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className={`text-lg font-medium tracking-wide ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {subtitle}
              </p>
            )}
          </div>
          {layout === 'slider' && (
            <div className="flex space-x-3">
              <ArrowButton left onClick={() => sliderRef.current?.slickPrev()} />
              <ArrowButton onClick={() => sliderRef.current?.slickNext()} />
            </div>
          )}
        </div>

        {/* Tabs - only show for slider layout */}
        {layout === 'slider' && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
              <button
                className={`py-3 px-6 font-medium rounded-full transition-all duration-200 ${
                  activeTab === 'all' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`py-3 px-6 font-medium rounded-full transition-all duration-200 ${
                  activeTab === 'car' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('car')}
              >
                Car
              </button>
              <button
                className={`py-3 px-6 font-medium rounded-full transition-all duration-200 ${
                  activeTab === 'f1' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('f1')}
              >
                F1
              </button>
              <button
                className={`py-3 px-6 font-medium rounded-full transition-all duration-200 ${
                  activeTab === 'bike' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('bike')}
              >
                Motorbike
              </button>
            </div>
          </div>
        )}
        
        {/* Content Area - Slider or Grid */}
        {layout === 'slider' ? (
          <div className="overflow-visible">
            <Slider ref={sliderRef} {...sliderSettings} className="editorial-slider overflow-visible">
              {displayProducts.map((product, idx) => (
                <ProductCard key={idx} product={product} idx={idx} />
              ))}
            </Slider>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.slice(0, 8).map((product, idx) => (
              <ProductCard key={idx} product={product} idx={idx} />
            ))}
          </div>
        )}

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

export default FeaturedProducts;
