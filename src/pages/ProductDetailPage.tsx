import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import ProductGallery from '../components/ProductGallery';
import ProductReviews from '../components/ProductReviews';
import RelatedProducts from '../components/RelatedProducts';
import CategorySlider from '../components/CategorySlider';
import { FiShoppingBag, FiHeart, FiShare2, FiCheck, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const addToCart = useCartStore(state => state.addItem);
  const { isDarkTheme } = useUIStore();
  
  useEffect(() => {
    // Auto-select first size and color if available
    if (product?.sizes?.length && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
    if (product?.colors?.length && !selectedColor) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  // Scroll to top when component mounts or product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Get images for the selected color
  const getImagesForColor = (colorName: string) => {
    if (!product) return [];
    
    // Map colors to different images based on color selection
    // This is a smart mapping that rotates through available images based on color
    const colorIndex = product.colors.findIndex(color => color.name === colorName);
    const images = [...product.images];
    
    // If we have multiple colors and images, rotate the primary image based on color
    if (product.colors.length > 1 && images.length > 1) {
      // Move the image at colorIndex to the front if it exists
      if (colorIndex < images.length) {
        const primaryImage = images[colorIndex];
        const otherImages = images.filter((_, index) => index !== colorIndex);
        return [primaryImage, ...otherImages];
      }
    }
    
    return images;
  };

  // Get current images based on selected color
  const currentImages = selectedColor ? getImagesForColor(selectedColor) : product?.images || [];

  // Reset cart state when product details change
  useEffect(() => {
    if (isAddedToCart) {
      setIsAddedToCart(false);
    }
  }, [selectedSize, selectedColor, quantity]);

  // Add visual feedback when color changes
  useEffect(() => {
    // Update images when color changes
    if (selectedColor && product) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        // Images are already updated via currentImages
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedColor, product]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/products')}
            className="bg-white text-black font-bold py-3 px-8 rounded-full transition duration-300 hover:bg-gray-100"
        >
          Browse Products
          </motion.button>
        </motion.div>
      </div>
    );
  }
  
  const handleAddToCart = async () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    
    if (!selectedColor && product.colors.length > 0) {
      setError('Please select a color');
      return;
    }
    
    setError('');
    setIsAddingToCart(true);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const colorName = selectedColor || product.colors[0].name;
    addToCart(product, quantity, selectedSize, colorName);
    
    setIsAddingToCart(false);
    setIsAddedToCart(true);
    
    // Keep the checkout state - don't reset automatically
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Section with Car Background */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/assets/categories/cars/x6m/bmw-x6m-competition-4.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="relative z-10">
          {/* Main Product Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="container mx-auto px-4 py-16 min-h-screen flex items-center max-w-7xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-12 lg:gap-10 w-full items-center">
        {/* Product Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative order-1 lg:order-1 flex justify-center"
              >
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl w-full max-w-lg">
        <ProductGallery key={selectedColor} images={currentImages} name={product.name} />
                </div>
              </motion.div>
        
        {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 order-2 lg:order-2 max-w-2xl mx-auto lg:mx-0"
              >
                {/* Title and Price */}
                <div className="space-y-4 text-center lg:text-left">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-4xl lg:text-5xl font-bold leading-tight font-bebasneue"
                  >
                    {product.name}
                  </motion.h1>
          
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-center lg:justify-start gap-4 flex-wrap"
                  >
                    <span className="text-2xl lg:text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                        <span className="text-lg lg:text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
                  </motion.div>
          </div>
          
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-gray-300 text-base lg:text-lg leading-relaxed text-center lg:text-left"
                >
                  {product.description}
                </motion.p>
          
          {/* Size Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-center lg:justify-start">
                    <h3 className="text-lg lg:text-xl font-semibold">Size</h3>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        // Scroll to sizing guide section
                        const sizingSection = document.querySelector('[data-sizing-guide]');
                        if (sizingSection) {
                          sizingSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="bg-white/10 ml-4 backdrop-blur-sm border border-white/20 text-white text-xs font-medium  px-3 py-1 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Size Guide
                    </motion.button>
            </div>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {product.sizes.map((size, index) => (
                      <motion.button
                  key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 min-w-[50px] ${
                    selectedSize === size
                            ? 'bg-white text-black shadow-lg'
                            : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {size}
                      </motion.button>
              ))}
            </div>
                </motion.div>
          
          {/* Color Selection */}
          {product.colors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg lg:text-xl font-semibold text-center lg:text-left">Color: {selectedColor || 'Select a color'}</h3>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {product.colors.map((color, index) => (
                        <motion.button
                    key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color.name)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                            selectedColor === color.name 
                              ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent shadow-lg transform scale-110' 
                              : 'hover:shadow-md hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                            <FiCheck className={`w-4 h-4 ${color.value === '#ffffff' ? 'text-black' : 'text-white'}`} />
                    )}
                        </motion.button>
                ))}
              </div>
                  </motion.div>
          )}
          
          {/* Quantity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-3"
                >
                  <h3 className="text-lg lg:text-xl font-semibold text-center lg:text-left">Quantity</h3>
                  <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="px-3 py-2 text-white hover:bg-white/10 rounded-l-xl transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-16 px-3 py-2 bg-transparent text-center text-white focus:outline-none"
              />
              <button
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                        className="px-3 py-2 text-white hover:bg-white/10 rounded-r-xl transition-colors"
              >
                +
              </button>
                    </div>
                    <span className="text-gray-400 text-sm">
                {product.stock} items available
              </span>
            </div>
                </motion.div>
          
          {/* Error Message */}
                <AnimatePresence>
          {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="p-3 bg-red-500/20 backdrop-blur-sm text-red-300 rounded-xl border border-red-500/30 text-center"
                    >
              {error}
                    </motion.div>
          )}
                </AnimatePresence>
          
                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={isAddedToCart ? handleCheckout : handleAddToCart}
                    disabled={isAddingToCart}
                    className={`font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                      isAddedToCart
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : isAddingToCart
                        ? 'bg-white/20 text-white cursor-not-allowed'
                        : 'bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isAddingToCart ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          >
                            <FiRefreshCw size={18} />
                          </motion.div>
                        </motion.div>
                      ) : isAddedToCart ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <PiShoppingCartSimpleBold size={18} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="cart"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <PiShoppingCartSimpleBold size={18} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="text-sm lg:text-base">
                      {isAddedToCart ? 'Continue to Checkout' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
                    </span>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
                  >
                    <FiHeart size={16} />
                    <span className="text-sm lg:text-base">Wishlist</span>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
                  >
                    <FiShare2 size={16} />
                    <span className="text-sm lg:text-base">Share</span>
                  </motion.button>
                </motion.div>

                                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="space-y-4 max-w-md mx-auto lg:mx-0"
                >
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <FiTruck className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-[10px] pt-2 lg:text-[12px] text-gray-300">Free Shipping</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <FiShield className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-[10px] pt-2 lg:text-[12px] text-gray-300">Secure Payment</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <FiRefreshCw className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-[10px] pt-2 lg:text-[12px] text-gray-300">Easy Returns</p>
                    </div>
          </div>
          
                  {/* Payment Icons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
                  >
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-xs text-gray-400">Accepted Payments:</span>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white/70 hover:text-white transition-colors duration-300"
                      >
                        <SiVisa className="text-3xl" />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white/70 hover:text-white transition-colors duration-300"
                      >
                        <SiMastercard className="text-2xl" />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white/70 hover:text-white transition-colors duration-300"
                      >
                        <SiPaypal className="text-xl" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

      {/* Product Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative pb-20"
      >
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-center mb-12 font-bebasneue"
          >
            Product Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 max-w-6xl mx-auto mb-16">
            {[
              "Premium quality cotton fabric",
              "High-quality print that won't fade after washing", 
              "Comfortable fit for all-day wear",
              "Detailed design with technical specifications",
              "Machine washable",
              "Sustainable and eco-friendly materials"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <FiCheck size={16} className="text-white" />
                </div>
                <span className="text-gray-300 text-sm lg:text-base">{feature}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Sizing Guide Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
            data-sizing-guide
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-center mb-8 font-bebasneue"
            >
              Size Guide
            </motion.h3>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/10 backdrop-blur-sm border-b border-white/10">
                      <th className="px-6 py-4 text-left font-semibold text-white">Size</th>
                      <th className="px-6 py-4 text-center font-semibold text-white">Chest (inches)</th>
                      <th className="px-6 py-4 text-center font-semibold text-white">Length (inches)</th>
                      <th className="px-6 py-4 text-center font-semibold text-white">Shoulder (inches)</th>
                      <th className="px-6 py-4 text-center font-semibold text-white">Sleeve (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'XS', chest: '32-34', length: '26', shoulder: '17', sleeve: '8' },
                      { size: 'S', chest: '34-36', length: '27', shoulder: '18', sleeve: '8.5' },
                      { size: 'M', chest: '36-38', length: '28', shoulder: '19', sleeve: '9' },
                      { size: 'L', chest: '38-40', length: '29', shoulder: '20', sleeve: '9.5' },
                      { size: 'XL', chest: '40-42', length: '30', shoulder: '21', sleeve: '10' },
                      { size: 'XXL', chest: '42-44', length: '31', shoulder: '22', sleeve: '10.5' },
                      { size: '3XL', chest: '44-46', length: '32', shoulder: '23', sleeve: '11' }
                    ].map((row, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        viewport={{ once: true }}
                        className={`border-b border-white/5 hover:bg-white/5 transition-all duration-300 ${
                          selectedSize === row.size ? 'bg-primary/10 ring-1 ring-primary/30' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${
                            selectedSize === row.size ? 'text-primary' : 'text-white'
                          }`}>
                            {row.size}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-300">{row.chest}</td>
                        <td className="px-6 py-4 text-center text-gray-300">{row.length}</td>
                        <td className="px-6 py-4 text-center text-gray-300">{row.shoulder}</td>
                        <td className="px-6 py-4 text-center text-gray-300">{row.sleeve}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Sizing Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-6 m-4 rounded-xl border border-white/10"
              >
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FiShield className="text-primary" size={18} />
                  Sizing Tips
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Measurements are taken flat across the garment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>For a relaxed fit, size up one size</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>All measurements are in inches</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Contact us if you need help choosing</span>
                  </div>
                </div>
              </motion.div>
          </div>
          </motion.div>
        </div>
      </motion.section>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <ProductReviews productId={product.id} />
      </motion.div>

      {/* Related Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute inset-0"></div>
        <div className="relative z-10">
      <RelatedProducts product={product} />
        </div>
      </motion.div>

      {/* Collections Slider Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold font-bebasneue text-center text-white mb-12"
          >
            Explore Collections
          </motion.h2>
          <CategorySlider />
        </div>
      </motion.div>
        </div>
      </div>
      
      
      
      
      
    </div>
  );
};

export default ProductDetailPage;
