import { FaShieldAlt, FaHeadset, FaShippingFast, FaCreditCard } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useUIStore } from '../store/uiStore';

const FeatureSection = () => {
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
    <section className={`py-20 px-4 overflow-visible transition-colors duration-300 ${
      isDarkTheme ? 'bg-[#16171E]' : 'bg-[#F9FAFB]'
    }`}>
      <div className="container mx-auto max-w-7xl overflow-visible">
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className={`rounded-3xl p-12 shadow-sm mb-12 border transition-colors duration-300 ${
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
        </motion.div>

        {/* Payment Methods - More casual */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
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
      </div>
    </section>
  );
};

export default FeatureSection;
