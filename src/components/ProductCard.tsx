import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { useState, useRef, useEffect } from 'react';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { FiCheck } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showBackImage, setShowBackImage] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const addedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const addItem = useCartStore((state) => state.addItem);
  const { isDarkTheme } = useUIStore();
  
  const frontImage = product.images[0];
  const backImage = product.images[1] || product.images[0];

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
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    };

    const handleMouseEnter = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowBackImage(true);
      }, 200);
    };

    const handleMouseLeaveComplete = () => {
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
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (addedTimeoutRef.current) clearTimeout(addedTimeoutRef.current);
    };
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAdded) {
      addItem(product, 1, product.sizes[0], product.colors[0].name);
      setIsAdded(true);
      addedTimeoutRef.current = setTimeout(() => {
        setIsAdded(false);
      }, 1000);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="px-0 pt-4 pb-2">
      <div className="flex flex-col group">
        <div 
          ref={cardRef}
          className={`relative w-full h-[280px] cursor-pointer rounded-[20px] shadow-sm transition-all duration-500 overflow-visible border ${
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
          <Link to={`/products/${product.id}`} className="block w-full h-full relative overflow-hidden rounded-2xl">
            <img
              src={frontImage}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
                showBackImage ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
            <img
              src={backImage}
              alt={`${product.name} back`}
              className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
                showBackImage ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          </Link>
          
          <div className={`absolute top-4 right-4 z-10 transition-all duration-300 ${
            (isHovered || isAdded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button 
              className={`bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 ${
                isAdded 
                  ? 'text-black scale-110' 
                  : 'text-gray-900 hover:!bg-red-500 hover:!text-white'
              }`}
              onClick={handleAddToCart}
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

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.new && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">-{discountPercentage}%</span>
            )}
          </div>
        </div>
        
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
          
          <Link to={`/products/${product.id}`} className="block cursor-pointer">
            <h3 className={`font-bold text-lg transition-colors truncate ${
              isDarkTheme ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700'
            }`}>
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className={`ml-2 text-sm line-through ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`group relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-medium transition-all duration-300 ease-out rounded-full overflow-hidden ${
                isAdded
                  ? (isDarkTheme ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-700 border border-green-200')
                  : (isDarkTheme 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40' 
                    : 'bg-gray-900/5 hover:bg-gray-900/10 text-gray-700 border border-gray-200 hover:border-gray-300')
              }`}
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                {isAdded ? <FiCheck className="w-3.5 h-3.5" /> : <PiShoppingCartSimpleBold className="w-3.5 h-3.5" />}
                <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
