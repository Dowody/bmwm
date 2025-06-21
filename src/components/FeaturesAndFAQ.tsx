import { FaShieldAlt, FaHeadset, FaShippingFast, FaCreditCard } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiPlus, FiMinus, FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import { useUIStore } from '../store/uiStore';

const FeaturesAndFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { isDarkTheme } = useUIStore();
  
  const features = [
    {
      icon: <FaShieldAlt className="w-7 h-7" />,
      title: "Designed for Your Comfort",
      description: "Premium quality materials that feel as good as they look",
      emoji: "😎"
    },
    {
      icon: <FaCreditCard className="w-7 h-7" />,
      title: "100% Secure Payment",
      description: "Split it into 12 payments - because we get it, style costs money",
      emoji: "💳"
    },
    {
      icon: <FaHeadset className="w-7 h-7" />,
      title: "24/7 Support Squad",
      description: "Hit us up on Instagram or WhatsApp - we're always here",
      emoji: "🤝"
    },
    {
      icon: <FaShippingFast className="w-7 h-7" />,
      title: "€50+ Free Shipping",
      description: "Enjoy free delivery on all orders over €50 – fast, trackable, and hassle-free",
      emoji: "⚡"
    }
  ];

  const paymentMethods = [
    { icon: SiVisa, label: 'Visa' },
    { icon: SiMastercard, label: 'Mastercard' },
    { icon: SiPaypal, label: 'PayPal' },
  ];

  const faqs = [
    {
      question: "What's the quality like? Is it worth the price?",
      answer: "Our gear is made from premium 100% cotton with reinforced stitching. We're talking thick, comfortable fabric that gets softer with every wash. Plus, all our designs are hand-selected by car enthusiasts, for car enthusiasts. Once you feel the quality, you'll understand why our customers keep coming back."
    },
    {
      question: "How fast is shipping? I need my gear ASAP! 🏎️",
      answer: "We get it - when you want something, you want it NOW! Orders over €50 get free express shipping, and we usually get your gear out within 24 hours. Most customers receive their orders within 2-3 business days in Europe. We'll send you tracking info so you can follow your package's journey."
    },
    {
      question: "What if the size doesn't fit? Can I exchange it?",
      answer: "Absolutely! We know ordering clothes online can be tricky. If the fit isn't perfect, you've got 30 days to return or exchange for free. Just make sure the item is unworn with tags attached. Check our size guide for the best fit, but don't stress - we've got you covered if it's not right."
    },
    {
      question: "Do you have designs for other car brands?",
      answer: "Right now we're all about that BMW M life, but we're always working on new designs! Follow us on Instagram @purebmwm to be the first to know when we drop new collections. Got a specific request? Hit us up - we love hearing from the community about what they want to see next."
    },
    {
      question: "Is my payment info secure? Can I pay in installments?",
      answer: "100% secure! We use bank-level encryption and never store your payment details. You can pay with Visa, Mastercard, or PayPal. Plus, we offer 12-month payment plans on all orders because we know good style shouldn't break the bank. Split it up and rock your gear while you pay!"
    },
    {
      question: "How do I contact support if I need help?",
      answer: "We're here 24/7! Slide into our DMs on Instagram @purebmwm or hit us up on WhatsApp - we usually respond within minutes during business hours. Got a complex issue? Email us at support@purebmwm.com and we'll sort you out. We're real people who actually care about helping you out."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form on success
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FeatureCard = ({ feature, idx }: { feature: any; idx: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    return (
      <div
        ref={cardRef}
        className={`group relative rounded-3xl p-8 border transition-all duration-300 ${
          isDarkTheme
            ? 'bg-[#23242a] border-gray-800 hover:border-gray-700 hover:shadow-2xl'
            : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-xl'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Emoji Badge */}
        <div className={`absolute -top-4 -right-4 text-3xl rounded-full w-14 h-14 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
          isDarkTheme ? 'bg-[#23242a] border-gray-800' : 'bg-white border-gray-100'
        } border`}>
          {feature.emoji}
        </div>
        
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
          isDarkTheme
            ? 'bg-gray-800 text-gray-300 group-hover:bg-primary group-hover:text-white'
            : 'bg-gray-100 text-gray-600 group-hover:bg-primary group-hover:text-white'
        }`}>
          {feature.icon}
        </div>
        
        {/* Content */}
        <h3 className={`text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 leading-tight ${
          isDarkTheme ? 'text-white' : 'text-gray-900'
        }`}>
          {feature.title}
        </h3>
        <p className={`text-base leading-relaxed ${
          isDarkTheme ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {feature.description}
        </p>
      </div>
    );
  };

  return (
    <section className={`py-20 px-4 overflow-visible transition-colors duration-300 relative overflow-hidden ${
      isDarkTheme ? 'bg-[#16171E]' : 'bg-[#F9FAFB]'
    }`}>
      {/* Street background - always visible */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(assets/bg3.jpg)',
          backgroundSize: 'cover',
          minHeight: '100%',
          width: '100%'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Overlay for better text readability */}
      <div className={`absolute inset-0 ${
        isDarkTheme 
          ? 'bg-gradient-to-b from-black/80 via-black/75 to-black/70' 
          : 'bg-white/60 backdrop-blur-sm'
      }`} />
      <div className={`absolute inset-0 ${
        isDarkTheme 
          ? 'bg-gradient-to-r from-transparent via-black/20 to-transparent' 
          : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
      }`} />
      
      <div className="container mx-auto max-w-7xl overflow-visible relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-bold font-bebasneue mb-6 ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}
          >
            Why We're Different
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={`text-xl font-medium max-w-3xl mx-auto leading-relaxed ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            More than just streetwear - we're building a community of car enthusiasts
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 px-4">
          {features.map((feature, index) => (
            <div key={index} className="relative overflow-visible">
              <FeatureCard feature={feature} idx={index} />
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className={`rounded-3xl p-12 shadow-sm mb-20 border transition-colors duration-300 ${
            isDarkTheme ? 'bg-[#23242a] border-gray-800' : 'bg-white border-gray-100'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold font-bebasneue text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className={`text-base font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Happy Drivers</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold font-bebasneue text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                4.8★
              </div>
              <div className={`text-base font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Customer Love</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold font-bebasneue text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                24H
              </div>
              <div className={`text-base font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Fast Shipping</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold font-bebasneue text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className={`text-base font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Secure</div>
            </div>
          </div>
        </motion.div> */}

        {/* Payment Methods */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className={`text-base font-medium mb-6 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>We accept all the good stuff 💳</p>
          <div className="flex justify-center items-center space-x-8 opacity-70">
            {paymentMethods.map((payment, index) => (
              <motion.div
                key={payment.label}
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                className={`${payment.label === 'PayPal' ? 'text-2xl' : 'text-3xl'} transition-all duration-300 cursor-pointer ${isDarkTheme ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'}`}
              >
                <payment.icon />
                <span className="sr-only">{payment.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          {/* FAQ Header */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold font-bebasneue mb-6 ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}
            >
              Got Questions?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`text-xl font-medium max-w-2xl mx-auto leading-relaxed ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              We've got answers! Here's everything you need to know about ordering your gear
            </motion.p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isDarkTheme
                    ? 'bg-[#23242a] border-gray-800 hover:border-gray-700'
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none group"
                >
                  <h3 className={`text-lg font-bold pr-4 transition-colors duration-300 group-hover:text-primary ${
                    isDarkTheme ? 'text-white' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm group-hover:bg-primary ${
                    isDarkTheme ? 'bg-[#23242a]' : 'bg-white'
                  }`}>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openIndex === index ? (
                        <FiMinus className={`w-4 h-4 group-hover:text-white ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`} />
                      ) : (
                        <FiPlus className={`w-4 h-4 group-hover:text-white ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`} />
                      )}
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className={`w-full h-px mb-6 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        <p className={`text-base leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

                    {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h3 className={`text-3xl md:text-4xl font-bold font-bebasneue mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                Still have questions?
              </h3>
              <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Drop us a message and we'll get back to you faster than a BMW M3 on the Autobahn.
              </p>
            </div>

            {/* Form Container */}
            <div className={`rounded-[1rem] border max-w-2xl mx-auto backdrop-blur-md transition-all duration-300 shadow-2xl ${
              isDarkTheme
                ? 'bg-white/5 border-white/10 hover:border-white/20'
                : 'bg-white/60 border-white/30 hover:border-white/50'
            }`}>
              <form onSubmit={handleContactFormSubmit} className="p-6 md:p-6">
                <div className="w-[100%] space-y-8">
                  {/* Name Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="relative">
                      <FiUser className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        isDarkTheme ? 'text-gray-400 group-focus-within:text-primary' : 'text-gray-500 group-focus-within:text-primary'
                      }`} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactFormChange}
                        required
                        className={`w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                          isDarkTheme
                            ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder:text-gray-500 focus:bg-white/70'
                        }`}
                        placeholder="Your name"
                      />
                    </div>
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="relative">
                      <FiMail className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        isDarkTheme ? 'text-gray-400 group-focus-within:text-primary' : 'text-gray-500 group-focus-within:text-primary'
                      }`} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactFormChange}
                        required
                        className={`w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                          isDarkTheme
                            ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder:text-gray-500 focus:bg-white/70'
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </motion.div>

                  {/* Subject Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="relative">
                      <FiMessageSquare className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 pointer-events-none z-10 ${
                        isDarkTheme ? 'text-gray-400 group-focus-within:text-primary' : 'text-gray-500 group-focus-within:text-primary'
                      }`} />
                      <select
                        id="subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactFormChange}
                        required
                        className={`w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer ${
                          isDarkTheme
                            ? 'bg-white/5 border-white/10 text-white focus:bg-white/10'
                            : 'bg-white/50 border-white/30 text-gray-900 focus:bg-white/70'
                        }`}
                      >
                        <option value="" className={isDarkTheme ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}>What can we help with?</option>
                        <option value="order-inquiry" className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>Order Inquiry</option>
                        <option value="sizing-help" className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>Sizing Help</option>
                        <option value="shipping-info" className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>Shipping Information</option>
                        <option value="return-exchange" className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>Return/Exchange</option>
                        <option value="product-question" className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>Product Question</option>
                        <option value="partnership" className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>Partnership</option>
                        <option value="other" className={isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>Other</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className={`w-5 h-5 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Message Textarea */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="relative">
                      <FiMessageSquare className={`absolute left-4 top-6 transition-colors duration-300 ${
                        isDarkTheme ? 'text-gray-400 group-focus-within:text-primary' : 'text-gray-500 group-focus-within:text-primary'
                      }`} />
                      <textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        required
                        rows={6}
                        className={`w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none ${
                          isDarkTheme
                            ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder:text-gray-500 focus:bg-white/70'
                        }`}
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="pt-0"
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`group relative w-full overflow-hidden rounded-2xl py-4 px-8 font-bold text-lg transition-all duration-500 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed ${
                        isSubmitting
                          ? 'bg-gray-500 text-white'
                          : 'bg-primary hover:bg-primary-dark text-white hover:shadow-primary/25'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <FiSend className="w-5 h-5" />
                            <span>Send Message</span>
                            <motion.div
                              className="ml-1"
                              animate={{ x: [0, 4, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                              →
                            </motion.div>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className="mt-8 text-center p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl"
                    >
                      <p className="text-green-400 font-medium text-lg">
                        ✓ Message sent successfully! We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className="mt-8 text-center p-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-2xl"
                    >
                      <p className="text-red-400 font-medium text-lg">
                        ⚠ Something went wrong. Please try again or email us directly.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Alternative Contact Methods */}
            <div className="mt-12 text-center">
              <p className={`text-sm mb-6 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                Or reach out directly
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:support@purebmwm.com"
                  className={`group inline-flex items-center  space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkTheme
                      ? 'text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500'
                      : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span>support@purebmwm.com</span>
                </a>
                <a
                  href="https://instagram.com/purebmwm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkTheme
                      ? 'text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500'
                      : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span>@purebmwm</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndFAQ; 