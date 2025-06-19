import { useRef, useState, useEffect } from 'react';
import { useUIStore } from '../store/uiStore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CategorySlider = () => {
  const { isDarkTheme } = useUIStore();
  const sliderRef = useRef<Slider>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

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
          nextSlide();
        } else if (scrollAmount < 0) {
          // Scroll left - previous slide
          prevSlide();
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const categories = [
    {
      id: 'bmw-1',
      name: 'BMW X6M COMPETITION',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'High-performance BMW vehicle'
    },
    {
      id: 'bmw-2',
      name: 'BMW X6M COMPETITION',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'High-performance BMW vehicle'
    },
    {
      id: 'bmw-3',
      name: 'BMW X6M COMPETITION',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'High-performance BMW vehicle'
    },
    {
      id: 'bmw-4',
      name: 'BMW X6M COMPETITION',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'High-performance BMW vehicle'
    },
    {
      id: 'bmw-5',
      name: 'BMW X6M COMPETITION',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'High-performance BMW vehicle'
    },
    {
      id: 'upcoming-1',
      name: 'UPCOMING',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'Coming soon - stay tuned'
    },
    {
      id: 'upcoming-2',
      name: 'UPCOMING',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'Coming soon - stay tuned'
    },
    {
      id: 'upcoming-3',
      name: 'UPCOMING',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'Coming soon - stay tuned'
    },
    {
      id: 'upcoming-4',
      name: 'UPCOMING',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'Coming soon - stay tuned'
    },
    {
      id: 'upcoming-5',
      name: 'UPCOMING',
      image: 'assets/categories/collection-1.jpg',
      backImage: 'assets/categories/collection-1-back.jpg',
      description: 'Coming soon - stay tuned'
    }
  ];

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const CategoryCard = ({ category, idx }: { category: any; idx: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showBackImage, setShowBackImage] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
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
        // Start the timer for showing back image after 200ms
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
      };
    }, []);

    return (
      <div className="px-2 pt-4 pb-2">
        <div className="flex flex-col items-center group">
          {/* Circular category image */}
          <div 
            ref={cardRef}
            className={`relative w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 cursor-pointer rounded-full shadow-lg transition-all duration-500 overflow-hidden border-0 ${
              isDarkTheme
                ? 'border-gray-700 hover:shadow-2xl'
                : 'border-gray-200 hover:shadow-xl'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => console.log(`${category.name} clicked`)}
          >
            {/* Inner container to maintain circular boundary */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Front Image */}
              <img
                src={category.image}
                alt={category.name}
                className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
                  showBackImage ? 'opacity-0' : 'opacity-100'
                } ${idx >= 5 ? 'blur-sm' : ''}`}
                loading="lazy"
              />
              {/* Back Image */}
              <img
                src={category.backImage}
                alt={`${category.name} back`}
                className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
                  showBackImage ? 'opacity-100' : 'opacity-0'
                } ${idx >= 5 ? 'blur-sm' : ''}`}
                loading="lazy"
              />
              
              {/* Secret overlay for hidden categories */}
              {idx >= 5 && (
                <div className={`absolute inset-0 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 pointer-events-none z-20 ${
                  isDarkTheme ? 'bg-black/80' : 'bg-black/70'
                }`}>
                  <div className={`text-6xl font-bold transition-all duration-300 group-hover:scale-110 ${
                    isDarkTheme ? 'text-white' : 'text-white'
                  }`}>
                    ?
                  </div>
                </div>
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-30" />
            </div>
          </div>
          
          {/* Category name below the circle */}
          <div className="mt-4 text-center">
            <h3 className={`text-sm font-bold tracking-wider transition-colors duration-300 group-hover:text-primary ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}>
              {category.name}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { 
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: { 
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: { 
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Create display categories with minimal duplication for smooth infinite loop
  const displayCategories = [...categories.slice(0, 10)];

  return (
    <div className="py-8">
      {/* Category Slider */}
      <div ref={sliderContainerRef} className="overflow-visible">
        <Slider ref={sliderRef} {...sliderSettings} className="category-slider overflow-visible">
          {displayCategories.map((category, idx) => (
            <CategoryCard key={`${category.id}-${idx}`} category={category} idx={idx} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorySlider; 