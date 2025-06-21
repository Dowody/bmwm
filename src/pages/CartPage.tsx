import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { FiTrash2, FiArrowLeft, FiShoppingBag, FiPlus, FiMinus, FiShield, FiTruck, FiRefreshCw, FiTag, FiCreditCard } from 'react-icons/fi';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleQuantityChange = (index: number, quantity: number) => {
    updateQuantity(index, quantity);
  };
  
  const handleRemoveItem = async (index: number) => {
    setRemovingItems(prev => new Set(prev).add(index));
    // Add a small delay for animation
    setTimeout(() => {
      removeItem(index);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 300);
  };
  
  const handleCouponApply = () => {
    // Simple coupon logic for demo purposes
    if (couponCode.toLowerCase() === 'turbo20') {
      setCouponDiscount(20);
      setCouponError('');
    } else if (couponCode.toLowerCase() === 'speed10') {
      setCouponDiscount(10);
      setCouponError('');
    } else {
      setCouponDiscount(0);
      setCouponError('Invalid coupon code');
    }
  };
  
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const discount = (subtotal * couponDiscount) / 100;
  const total = subtotal + shipping - discount;
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Hero Background */}
        <div 
          className="relative min-h-screen bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/assets/bg1.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 min-h-screen flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-md mx-auto px-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20"
              >
                <FiShoppingBag size={48} className="text-white" />
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-4xl lg:text-5xl font-bold font-bebasneue mb-6"
              >
                Your Cart is Empty
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-gray-300 mb-8 text-lg leading-relaxed"
              >
                Looks like you haven't added any items to your cart yet. Start exploring our collection!
              </motion.p>
              
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Link
                  to="/products"
                  className="bg-white text-black font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-100 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
                >
                  <FiShoppingBag size={20} />
                  Start Shopping
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/assets/bg1.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-between mb-16"
            >
              <h1 className="text-4xl lg:text-6xl font-bold font-bebasneue">Shopping Cart</h1>
              <div className="text-right">
                <p className="text-gray-300">Total Items</p>
                <p className="text-2xl font-bold text-primary">{items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="xl:col-span-2"
              >
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10">
                  {/* Desktop Header */}
                  <div className="hidden lg:grid grid-cols-12 gap-6 p-4 mb-6 border-b border-white/10">
                    <div className="col-span-6">
                      <h3 className="font-bold text-gray-300">Product</h3>
                    </div>
                    <div className="col-span-2 text-center">
                      <h3 className="font-bold text-gray-300">Price</h3>
                    </div>
                    <div className="col-span-2 text-center">
                      <h3 className="font-bold text-gray-300">Quantity</h3>
                    </div>
                    <div className="col-span-2 text-right">
                      <h3 className="font-bold text-gray-300">Total</h3>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        layout
                        initial={{ scale: 1 }}
                        exit={{ scale: 0.8, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-4 border border-white/10 ${
                          removingItems.has(index) ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Product */}
                          <div className="col-span-1 lg:col-span-6">
                            <div className="flex items-center gap-4">
                              <div className="w-24 h-24 flex-shrink-0 bg-white/10 rounded-xl overflow-hidden border border-white/10">
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-white mb-2 text-lg">
                                  <Link 
                                    to={`/products/${item.product.id}`} 
                                    className="hover:text-primary transition-colors duration-300"
                                  >
                                    {item.product.name}
                                  </Link>
                                </h3>
                                <div className="flex flex-wrap gap-3 mb-3">
                                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                    Size: {item.size}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">Color:</span>
                                    <div 
                                      className="w-4 h-4 rounded-full border border-white/30"
                                      style={{ backgroundColor: item.color.toLowerCase() }}
                                    ></div>
                                    <span className="text-sm">{item.color}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveItem(index)}
                                  disabled={removingItems.has(index)}
                                  className="text-red-400 text-sm flex items-center hover:text-red-300 transition-colors duration-300 lg:hidden"
                                >
                                  <FiTrash2 size={14} className="mr-2" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="col-span-1 lg:col-span-2 lg:text-center">
                            <div className="flex justify-between lg:block">
                              <span className="lg:hidden font-medium text-gray-300">Price:</span>
                              <span className="text-white font-bold">${item.product.price.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          {/* Quantity */}
                          <div className="col-span-1 lg:col-span-2 lg:text-center">
                            <div className="flex justify-between items-center lg:justify-center">
                              <span className="lg:hidden font-medium text-gray-300">Quantity:</span>
                              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleQuantityChange(index, Math.max(1, item.quantity - 1))}
                                  className="p-2 hover:bg-white/10 rounded-l-xl transition-colors duration-300"
                                >
                                  <FiMinus size={16} className="text-white" />
                                </motion.button>
                                <input
                                  type="number"
                                  min="1"
                                  max={item.product.stock}
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(index, Math.min(item.product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                                  className="w-16 px-2 py-2 bg-transparent text-center text-white focus:outline-none"
                                />
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleQuantityChange(index, Math.min(item.product.stock, item.quantity + 1))}
                                  className="p-2 hover:bg-white/10 rounded-r-xl transition-colors duration-300"
                                >
                                  <FiPlus size={16} className="text-white" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Total */}
                          <div className="col-span-1 lg:col-span-2 lg:text-right">
                            <div className="flex justify-between lg:block">
                              <span className="lg:hidden font-medium text-gray-300">Total:</span>
                              <span className="font-bold text-primary text-lg">${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                          
                          {/* Remove Button (Desktop) */}
                          <div className="hidden lg:block absolute top-4 right-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRemoveItem(index)}
                              disabled={removingItems.has(index)}
                              className="p-2 text-gray-400 hover:text-red-400 bg-white/5 rounded-full border border-white/10 hover:border-red-400/30 transition-all duration-300"
                              aria-label="Remove item"
                            >
                              <FiTrash2 size={18} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Cart Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/10">
                    <Link
                      to="/products"
                      className="flex items-center text-white hover:text-primary transition-colors duration-300 font-medium"
                    >
                      <FiArrowLeft size={16} className="mr-2" />
                      Continue Shopping
                    </Link>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => clearCart()}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300 font-medium"
                    >
                      Clear Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              
              {/* Order Summary */}
              <motion.div 
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="xl:col-span-1"
              >
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  
                  {/* Coupon Code */}
                  <motion.div 
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <FiTag className="text-primary" size={16} />
                      </div>
                      <label htmlFor="coupon" className="font-medium text-gray-300">Coupon Code</label>
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        placeholder="Enter code"
                        className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCouponApply}
                        className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-r-xl transition-all duration-300"
                      >
                        Apply
                      </motion.button>
                    </div>
                    <AnimatePresence>
                      {couponError && (
                        <motion.p 
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          exit={{ y: -10 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {couponError}
                        </motion.p>
                      )}
                      {couponDiscount > 0 && (
                        <motion.p 
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          exit={{ y: -10 }}
                          className="text-green-400 text-sm mt-2"
                        >
                          Coupon applied successfully! {couponDiscount}% off
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Summary */}
                  <div className="space-y-4 border-b border-white/10 pb-6 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <AnimatePresence>
                      {couponDiscount > 0 && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="flex justify-between text-green-400"
                        >
                          <span>Discount ({couponDiscount}%)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mb-6"
                  >
                    <FiCreditCard size={20} />
                    Proceed to Checkout
                  </motion.button>
                  
                  {/* Features */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <FiTruck className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-gray-300">Free Shipping</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <FiShield className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-gray-300">Secure Payment</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <FiRefreshCw className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-gray-300">Easy Returns</p>
                    </div>
                  </div>
                  
                  {/* Payment Methods */}
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-3">We Accept</p>
                    <div className="flex justify-center space-x-4">
                      <SiVisa className="text-2xl" />
                      <SiMastercard className="text-2xl" />
                      <SiPaypal className="text-2xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
