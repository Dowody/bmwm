import { useRef, useState, useEffect } from 'react';
import { reviews } from '../data/reviews';
import { getProductById } from '../data/products';
import { useUIStore } from '../store/uiStore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ArrowButton = ({ onClick, left, isDarkTheme }: { onClick?: () => void; left?: boolean; isDarkTheme: boolean }) => (
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

const TestimonialCard = ({ review, idx, isDarkTheme }: { review: any; idx: number; isDarkTheme: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Get product data for this review
  const product = getProductById(review.productId);

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

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="px-0 pt-10 pb-10">
      <div className="flex flex-col group">
        {/* Testimonial card with 3D effect */}
        <div 
          ref={cardRef}
          className={`relative w-full h-[450px] cursor-pointer rounded-[20px] shadow-md transition-all duration-500 overflow-hidden border ${
            isDarkTheme
              ? 'bg-gradient-to-br from-[#23242a] to-[#16171E] border-gray-800 hover:border-gray-700'
              : 'bg-gradient-to-br from-white to-gray-50/30 border-gray-100 hover:border-gray-200'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Quote icon */}
          <div className={`absolute top-6 right-6 opacity-5 group-hover:opacity-15 transition-opacity duration-300 ${isDarkTheme ? 'text-gray-700' : 'text-gray-400'}`}>
            <FaQuoteRight className="w-8 h-8" />
          </div>

          <div className="p-8 flex flex-col h-full">
            {/* Product Image Section */}
            {product && (
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={product.images[0] || 'public/assets/products/e30_2.jpg'}
                      alt={product.name}
                      className={`w-16 h-16 object-cover rounded-xl border-2 shadow-sm ${isDarkTheme ? 'border-gray-800' : 'border-gray-100'}`}
                      loading="lazy"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 flex items-center justify-center ${isDarkTheme ? 'border-gray-900' : 'border-white'}`}>
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    {/* Commented out to keep navigation on homepage */}
                    {/* <Link 
                      to={`/products/${product.id}`}
                      className="text-sm font-bold text-gray-900 hover:text-primary transition-colors duration-200 truncate block"
                    >
                      {product.name}
                    </Link> */}
                    <div className={`text-sm font-bold transition-colors duration-200 truncate cursor-pointer ${isDarkTheme ? 'text-white hover:text-primary' : 'text-gray-900 hover:text-primary'}`}>
                      {product.name}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, starIdx) => (
                  <HiStar
                    key={starIdx}
                    className={`w-5 h-5 ${starIdx < review.rating ? 'text-yellow-400' : isDarkTheme ? 'text-gray-700' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className={`ml-3 text-sm font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>({review.rating}.0)</span>
            </div>

            {/* Review Content */}
            <div className="flex-grow mb-6">
              <p className={`text-base leading-relaxed font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>"{review.comment}"</p>
            </div>

            {/* Customer Info */}
            <div className={`flex items-center pt-4 border-t ${isDarkTheme ? 'border-gray-800' : 'border-gray-100'}`}>
              {/* Simple avatar */}
              <div className="relative mr-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${isDarkTheme ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-200'}`}>
                  <span className={`font-bold text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{review.userName.split(' ').map((n: string) => n[0]).join('')}</span>
                </div>
                {/* Small verification dot - minimal red */}
                <div className={`absolute -bottom-[-1px] -right-[-1px] w-3 h-3 bg-primary rounded-full border ${isDarkTheme ? 'border-gray-900' : 'border-white'}`}></div>
              </div>
              
              <div className="flex-grow">
                <h4 className={`font-bold text-base mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{review.userName}</h4>
                <p className={`text-sm font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const { isDarkTheme } = useUIStore();
  
  // Duplicate reviews to ensure smooth infinite scroll
  let extendedReviews = [...reviews, ...reviews];
  if (extendedReviews.length < 6) {
    extendedReviews = Array(6).fill(null).map((_, i) => extendedReviews[i % extendedReviews.length]);
  }

  const sliderRef = useRef<Slider>(null);
  
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { 
          slidesToShow: 3,
          centerMode: true,
        }
      },
      {
        breakpoint: 768,
        settings: { 
          slidesToShow: 1,
          centerMode: false,
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
              backgroundImage: 'url(assets/bg2.jpg)', 
              backgroundPosition: window.innerWidth < 768 ? 'center center' : 'center -900px',
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
              Customer Reviews
            </h2>
            <p className={`text-lg font-medium tracking-wide ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Hear what our customers say about their favorite products
            </p>
          </div>
          <div className="flex space-x-3">
            <ArrowButton left onClick={() => sliderRef.current?.slickPrev()} isDarkTheme={isDarkTheme} />
            <ArrowButton onClick={() => sliderRef.current?.slickNext()} isDarkTheme={isDarkTheme} />
          </div>
        </div>
        
        <div className="overflow-visible pb-0">
          <Slider ref={sliderRef} {...sliderSettings} className="testimonial-stage-slider overflow-visible">
            {extendedReviews.map((review, idx) => (
              <TestimonialCard key={idx} review={review} idx={idx} isDarkTheme={isDarkTheme} />
            ))}
          </Slider>
        </div>

        {/* Stats Section with minimal red */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[{
            value: '50,000+',
            label: 'Happy Customers'
          }, {
            value: '4.8/5',
            label: 'Average Rating'
          }, {
            value: '98%',
            label: 'Would Recommend'
          }].map((stat, i) => (
            <div
              key={stat.value}
              className={`rounded-2xl p-8 border transition-all duration-300 group ${
                isDarkTheme
                  ? 'bg-[#23242a] border-gray-800 hover:border-gray-700'
                  : 'bg-white/70 backdrop-blur-sm border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`text-4xl font-bold font-bebasneue mb-2 group-hover:text-primary transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
              <div className={`font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
              <div className="w-8 h-0.5 bg-primary mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-center"></div>
            </div>
          ))}
        </div>

        {/* Minimal CTA Section */}
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
      </div>
    </section>
  );
};

export default TestimonialSection;
