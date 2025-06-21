import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { FiCheck, FiShield, FiTruck, FiRefreshCw, FiCreditCard, FiUser, FiMapPin } from 'react-icons/fi';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'state', 'zipCode', 'country'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Payment method validation
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.cardName) {
        newErrors.cardName = 'Name on card is required';
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please use MM/YY format';
      }
      
      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Process order
      console.log('Order submitted:', { items, formData });
      
      // Show success state
      setOrderPlaced(true);
      setIsProcessing(false);
      
      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
      }, 1000);
    }
  };
  
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax for demo
  const total = subtotal + shipping + tax;
  
  // Redirect to products if cart is empty
  if (items.length === 0 && !orderPlaced) {
    navigate('/products');
    return null;
  }
  
  // Order success screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Hero Background */}
        <div 
          className="relative min-h-screen bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('assets/categories/cars/x6m/bmw-x6m-competition-2.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
          
          <div className="relative z-10 min-h-screen flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-md mx-auto px-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-24 h-24 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30"
              >
                <FiCheck size={48} className="text-green-400" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-4xl lg:text-5xl font-bold font-bebasneue mb-6"
              >
                Order Placed Successfully!
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-gray-300 mb-8 text-lg leading-relaxed"
              >
                Thank you for your purchase. Your order has been received and is being processed.
                You will receive an email confirmation shortly.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8"
              >
                <p className="font-bold text-xl mb-2">Order Number</p>
                <p className="text-primary text-2xl font-mono">TW-{Math.floor(100000 + Math.random() * 900000)}</p>
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
                className="bg-white text-black font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-100 shadow-lg hover:shadow-xl"
              >
                Continue Shopping
              </motion.button>
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
          backgroundImage: "url('assets/bg1.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold font-bebasneue text-center mb-16"
            >
              Checkout
            </motion.h1>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <motion.div 
                initial={{ opacity: 1, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="xl:col-span-2"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <FiUser className="text-primary" size={20} />
                      </div>
                      <h2 className="text-2xl font-bold">Personal Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-300 mb-2 font-medium">First Name *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                            errors.firstName ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                          }`}
                          placeholder="Enter your first name"
                        />
                        <AnimatePresence>
                          {errors.firstName && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.firstName}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-gray-300 mb-2 font-medium">Last Name *</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                            errors.lastName ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                          }`}
                          placeholder="Enter your last name"
                        />
                        <AnimatePresence>
                          {errors.lastName && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.lastName}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                            errors.email ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                          }`}
                          placeholder="your.email@example.com"
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-300 mb-2 font-medium">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                            errors.phone ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                          }`}
                          placeholder="(555) 123-4567"
                        />
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.phone}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Shipping Address */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <FiMapPin className="text-primary" size={20} />
                      </div>
                      <h2 className="text-2xl font-bold">Shipping Address</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-gray-300 mb-2 font-medium">Street Address *</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                            errors.address ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                          }`}
                          placeholder="123 Main Street, Apt 4B"
                        />
                        <AnimatePresence>
                          {errors.address && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.address}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-gray-300 mb-2 font-medium">City *</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                            errors.city ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                          }`}
                          placeholder="Enter city"
                        />
                        <AnimatePresence>
                          {errors.city && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.city}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-gray-300 mb-2 font-medium">State *</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                            errors.state ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                          }`}
                          placeholder="Enter state"
                        />
                        <AnimatePresence>
                          {errors.state && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.state}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-gray-300 mb-2 font-medium">ZIP Code *</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                            errors.zipCode ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                          }`}
                          placeholder="12345"
                        />
                        <AnimatePresence>
                          {errors.zipCode && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-400 text-sm mt-2"
                            >
                              {errors.zipCode}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-gray-300 mb-2 font-medium">Country *</label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white hover:border-white/30"
                        >
                          <option value="United States" className="bg-gray-800 text-white">United States</option>
                          <option value="Canada" className="bg-gray-800 text-white">Canada</option>
                          <option value="United Kingdom" className="bg-gray-800 text-white">United Kingdom</option>
                          <option value="Australia" className="bg-gray-800 text-white">Australia</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Payment Method */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <FiCreditCard className="text-primary" size={20} />
                      </div>
                      <h2 className="text-2xl font-bold">Payment Method</h2>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <input
                          type="radio"
                          id="credit-card"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          className="mr-4 w-4 h-4 text-primary"
                        />
                        <label htmlFor="credit-card" className="flex items-center flex-1 cursor-pointer">
                          <span className="mr-4 font-medium">Credit Card</span>
                          <div className="flex space-x-2">
                            <SiVisa className="text-2xl text-blue-500" />
                            <SiMastercard className="text-2xl text-red-500" />
                          </div>
                        </label>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="mr-4 w-4 h-4 text-primary"
                        />
                        <label htmlFor="paypal" className="flex items-center flex-1 cursor-pointer">
                          <span className="mr-4 font-medium">PayPal</span>
                          <SiPaypal className="text-2xl text-blue-600" />
                        </label>
                      </motion.div>
                      
                      <AnimatePresence>
                        {formData.paymentMethod === 'credit-card' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="md:col-span-2">
                                <label htmlFor="cardNumber" className="block text-gray-300 mb-2 font-medium">Card Number *</label>
                                <input
                                  type="text"
                                  id="cardNumber"
                                  name="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  value={formData.cardNumber}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                                    errors.cardNumber ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                                  }`}
                                />
                                <AnimatePresence>
                                  {errors.cardNumber && (
                                    <motion.p 
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      className="text-red-400 text-sm mt-2"
                                    >
                                      {errors.cardNumber}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                              
                              <div className="md:col-span-2">
                                <label htmlFor="cardName" className="block text-gray-300 mb-2 font-medium">Name on Card *</label>
                                <input
                                  type="text"
                                  id="cardName"
                                  name="cardName"
                                  value={formData.cardName}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                                    errors.cardName ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                                  }`}
                                  placeholder="John Doe"
                                />
                                <AnimatePresence>
                                  {errors.cardName && (
                                    <motion.p 
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      className="text-red-400 text-sm mt-2"
                                    >
                                      {errors.cardName}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                              
                              <div>
                                <label htmlFor="expiryDate" className="block text-gray-300 mb-2 font-medium">Expiry Date *</label>
                                <input
                                  type="text"
                                  id="expiryDate"
                                  name="expiryDate"
                                  placeholder="MM/YY"
                                  value={formData.expiryDate}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                                    errors.expiryDate ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                                  }`}
                                />
                                <AnimatePresence>
                                  {errors.expiryDate && (
                                    <motion.p 
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      className="text-red-400 text-sm mt-2"
                                    >
                                      {errors.expiryDate}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                              
                              <div>
                                <label htmlFor="cvv" className="block text-gray-300 mb-2 font-medium">CVV *</label>
                                <input
                                  type="text"
                                  id="cvv"
                                  name="cvv"
                                  placeholder="123"
                                  value={formData.cvv}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400 ${
                                    errors.cvv ? 'border-red-500' : 'border-white/20 hover:border-white/30'
                                  }`}
                                />
                                <AnimatePresence>
                                  {errors.cvv && (
                                    <motion.p 
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      className="text-red-400 text-sm mt-2"
                                    >
                                      {errors.cvv}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isProcessing}
                      whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                      className={`w-full font-bold py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-3 ${
                        isProcessing
                          ? 'bg-white/20 text-white cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {isProcessing ? (
                          <motion.div
                            key="processing"
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          >
                            <FiRefreshCw size={20} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="normal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <FiCreditCard size={20} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="text-lg">
                        {isProcessing ? 'Processing Order...' : 'Place Order'}
                      </span>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
              
              {/* Order Summary */}
              <motion.div 
                initial={{ opacity: 1, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="xl:col-span-1"
              >
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  
                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center bg-white/5 rounded-xl p-4"
                      >
                        <div className="w-16 h-16 flex-shrink-0 bg-white/10 rounded-xl overflow-hidden mr-4 border border-white/10">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-white mb-1">{item.product.name}</h3>
                          <p className="text-xs text-gray-400 mb-2">Size: {item.size} • Color: {item.color}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-300">Qty: {item.quantity}</p>
                            <p className="text-sm font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Summary */}
                  <div className="space-y-4 border-t border-white/10 pt-6 mb-6">
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
                    <div className="flex justify-between text-gray-300">
                      <span>Tax (10%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-white/10 pt-6 mb-6">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                  
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
                  
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-6">
                    <p className="text-sm text-gray-300 text-center">
                      By placing your order, you agree to our{' '}
                      <a href="#" className="text-primary hover:underline">Terms</a> and{' '}
                      <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-3">Secure Checkout</p>
                    <div className="flex justify-center space-x-4">
                      <SiVisa className="text-2xl " />
                      <SiMastercard className="text-2xl " />
                      <SiPaypal className="text-2xl " />
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

export default CheckoutPage;
