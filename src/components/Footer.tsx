import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiPhone, FiArrowRight, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#16171E] via-black to-[#16171E] text-white pt-24 pb-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Section - Spans 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl font-bold mb-2 font-owned tracking-wide">PURE.<span className="text-primary">BMWM</span></h3>
                <p className="text-gray-400 text-sm font-owned text-[0.9rem] font-medium tracking-wider mb-4">DREAM. BUY. BUILD.</p>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  Premium quality cotton hoodies and t-shirts for car enthusiasts. Starting at just $24.99.
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                    <FiMapPin className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium">Visit Us</h4>
                    <p className="text-gray-400">123 Fashion Street, New York</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                    <FiPhone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium">Call Us</h4>
                    <p className="text-gray-400">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                    <FiMail className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium">Email Us</h4>
                    <p className="text-gray-400">contact@pure.bmwm.com</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                {[
                  { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
                  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
                  { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl group-hover:bg-primary/20 transition-all duration-300">
                      <social.icon className="text-white text-xl" />
                    </div>
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold mb-8 text-white/90">Quick Links</h3>
            <ul className="space-y-6">
              {[
                { path: '/products', label: 'Shop All' },
                { path: '/about', label: 'About Us' },
                { path: '/contact', label: 'Contact' },
                { path: '/faq', label: 'FAQ' },
                { path: '/blog', label: 'Blog' }
              ].map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter - Spans 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-white/90">Stay Updated</h3>
              <p className="text-gray-400 mb-8">Subscribe to our newsletter for exclusive offers and updates!</p>
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    className="w-full bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/20 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-white p-3 rounded-lg transition duration-300"
                  >
                    <FiArrowRight className="text-xl" />
                  </motion.button>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PURE.BMWM. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-gray-400 text-sm">Secure Payments:</span>
            <div className="flex space-x-4">
              {[
                { icon: SiVisa, label: 'Visa' },
                { icon: SiMastercard, label: 'Mastercard' },
                { icon: SiPaypal, label: 'PayPal' },
              ].map((payment, index) => (
                <motion.div
                  key={payment.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${payment.label === 'PayPal' ? 'text-xl' : 'text-2xl'} text-white/70 hover:text-white transition-colors duration-300`}
                >
                  <payment.icon />
                  <span className="sr-only">{payment.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Separate Developer Credit Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className=" mt-8 pt-6 text-center lg:text-left"
        >
          <p className="text-gray-500 text-sm">
            Crafted with love by{' '}
            <a 
              href="https://dowody.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors duration-300 font-medium"
            >
              dowody.dev
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
