import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getReviewsByProductId, getAverageRating } from '../data/reviews';
import { getProductById } from '../data/products';
import { Review } from '../types';
import { useUIStore } from '../store/uiStore';
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductReviewsProps {
  productId: string;
}

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

const ReviewCard = ({ review, idx, isDarkTheme, product }: { review: any; idx: number; isDarkTheme: boolean; product: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
        {/* Review card with 3D effect */}
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
                      src={product.images[0] || '/assets/products/e30_2.jpg'}
                      alt={product.name}
                      className={`w-16 h-16 object-cover rounded-xl border-2 shadow-sm ${isDarkTheme ? 'border-gray-800' : 'border-gray-100'}`}
                      loading="lazy"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 flex items-center justify-center ${isDarkTheme ? 'border-gray-900' : 'border-white'}`}>
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <div className={`text-sm font-bold transition-colors duration-200 truncate cursor-pointer ${isDarkTheme ? 'text-white hover:text-primary' : 'text-gray-900 hover:text-primary'}`}>
                      {product.name}
                    </div>
                    <div className={`mt-1 flex items-center space-x-2 text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                      {product.sizes.length > 0 && (
                        <>
                          <span className="opacity-50">&bull;</span>
                          <span>{product.sizes[0]}</span>
                        </>
                      )}
                      {product.colors.length > 0 && (
                        <>
                          <span className="opacity-50">&bull;</span>
                          <div className="flex items-center space-x-1.5">
                            <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: product.colors[0].value }}></div>
                            <span>{product.colors[0].name}</span>
                          </div>
                        </>
                      )}
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
                {/* Small verification dot */}
                {review.verified && (
                  <div className={`absolute -bottom-[-1px] -right-[-1px] w-3 h-3 bg-primary rounded-full border ${isDarkTheme ? 'border-gray-900' : 'border-white'}`}></div>
                )}
              </div>
              
              <div className="flex-grow">
                <h4 className={`font-bold text-base mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{review.userName}</h4>
                <p className={`text-sm font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                  {review.verified ? 'Verified Customer' : 'Customer'}
                </p>
              </div>
              
              <div className="text-right">
                <p className={`text-xs ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const reviews: Review[] = getReviewsByProductId(productId);
  const averageRating = getAverageRating(productId);
  const { isDarkTheme } = useUIStore();
  const product = getProductById(productId);
  const sliderRef = useRef<Slider>(null);

  // Duplicate reviews to ensure smooth scroll if needed
  let extendedReviews = [...reviews];
  if (extendedReviews.length > 0 && extendedReviews.length < 6) {
    extendedReviews = [...reviews, ...reviews];
  }

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: reviews.length > 1,
    speed: 700,
    slidesToShow: Math.min(3, reviews.length),
    slidesToScroll: 1,
    autoplay: reviews.length > 3,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerMode: reviews.length > 1,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { 
          slidesToShow: Math.min(2, reviews.length),
          centerMode: reviews.length > 1,
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

  if (reviews.length === 0) {
    return (
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`py-16 px-4 transition-colors duration-300 relative overflow-hidden ${
          isDarkTheme ? 'bg-[#16171E] text-white' : 'bg-[#F9FAFB] text-gray-900'
        }`}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold font-bebasneue mb-4">Customer Reviews</h2>
          <div className={`rounded-3xl p-12 border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-gradient-to-br from-[#23242a] to-[#16171E] border-gray-800'
              : 'bg-gradient-to-br from-white to-gray-50/30 border-gray-100'
          }`}>
            <div className={`text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              <HiStar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No reviews yet for this product.</p>
              <p className="text-sm mt-2">Be the first to share your experience!</p>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`py-16 px-4 transition-colors duration-300 relative overflow-hidden`}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-bebasneue mb-2">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating) 
                        ? 'text-yellow-400' 
                        : isDarkTheme ? 'text-gray-700' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <span className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
            </div>
            <p className={`text-lg font-medium tracking-wide ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}>
              What customers say about {product?.name || 'this product'}
            </p>
          </div>
          {reviews.length > 1 && (
            <div className="flex space-x-3">
              <ArrowButton left onClick={() => sliderRef.current?.slickPrev()} isDarkTheme={isDarkTheme} />
              <ArrowButton onClick={() => sliderRef.current?.slickNext()} isDarkTheme={isDarkTheme} />
            </div>
          )}
        </div>
        
        {reviews.length === 1 ? (
          <div className="flex justify-center">
            <div className="max-w-md">
              <ReviewCard review={reviews[0]} idx={0} isDarkTheme={isDarkTheme} product={product} />
            </div>
          </div>
        ) : (
          <div className="overflow-visible pb-0">
            <Slider ref={sliderRef} {...sliderSettings} className="testimonial-stage-slider overflow-visible">
              {extendedReviews.map((review, idx) => (
                <ReviewCard key={`${review.id}-${idx}`} review={review} idx={idx} isDarkTheme={isDarkTheme} product={product} />
              ))}
            </Slider>
            </div>
        )}

        {/* Call to Action */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className={`rounded-2xl p-8 border transition-all duration-300 max-w-2xl mx-auto ${
            isDarkTheme
              ? 'bg-gradient-to-br from-[#23242a] to-[#16171E] border-gray-800 hover:border-gray-700'
              : 'bg-gradient-to-br from-white to-gray-50/30 border-gray-100 hover:border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              Share Your Experience
            </h3>
            <p className={`mb-6 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Help other customers by sharing your thoughts about this product
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Write a Review
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </motion.section>
  );
};

export default ProductReviews;