import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../data/products';

const ProductComparer = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProductId, setSelectedProductId] = useState('1'); // GT3 RS T-Shirt
  
  const product = getProductById(selectedProductId);
  const frontImage = product?.images[0] || '/assets/products/tshirt-1.jpg';
  const backImage = product?.images[1] || '/assets/products/tshirt-1-back.jpg';

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const availableProducts = [
    { id: '1', name: 'GT3 RS T-Shirt' },
    { id: '5', name: 'BMW M3 GTR T-Shirt' },
    { id: '7', name: 'Kawasaki Ninja T-Shirt' },
    { id: '8', name: 'F1 Racing T-Shirt' }
  ];

  if (!product) return null;

  return (
    <section className="bg-white text-gray-900 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-bebasneue mb-4">
            Compare Views
          </h2>
          <p className="text-gray-600 text-lg font-medium tracking-wide max-w-2xl mx-auto">
            Drag the slider to compare front and back views of our t-shirts
          </p>
        </div>

        {/* Product Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-sm">
            {availableProducts.map((prod) => (
              <button
                key={prod.id}
                className={`py-2 px-4 font-medium rounded-full transition-all duration-200 text-sm ${
                  selectedProductId === prod.id
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setSelectedProductId(prod.id)}
              >
                {prod.name}
              </button>
            ))}
          </div>
        </div>

        {/* Image Comparison Container */}
        <div className="max-w-2xl mx-auto mb-12">
          <div 
            ref={containerRef}
            className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none"
            style={{ userSelect: 'none' }}
          >
            {/* Back Image (Right side) */}
            <div className="absolute inset-0">
              <img
                src={backImage}
                alt={`${product.name} - Back View`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                Back View
              </div>
            </div>

            {/* Front Image (Left side) - with clip path */}
            <div 
              className="absolute inset-0 transition-all duration-75 ease-out"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
              }}
            >
              <img
                src={frontImage}
                alt={`${product.name} - Front View`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                Front View
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-10 transition-all duration-75 ease-out"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              {/* Slider Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center cursor-col-resize hover:border-primary transition-colors duration-200">
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Instruction overlay for first-time users */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Drag to compare</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m-4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold font-bebasneue mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-primary">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link
              to={`/products/${product.id}`}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
            >
              View Product
            </Link>
            <Link
              to={`/products/${product.id}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-8 rounded-full transition-colors duration-200"
            >
              Add to Cart
            </Link>
          </div>
        </div>

        {/* View All Products Link */}
        <div className="text-center">
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
        </div>
      </div>
    </section>
  );
};

export default ProductComparer; 