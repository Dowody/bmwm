import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email Us",
      content: "support@purebmwm.com",
      description: "We usually respond within 2-4 hours",
      link: "mailto:support@purebmwm.com",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: FiPhone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST",
      link: "tel:+15551234567",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      content: "123 BMW Street, Auto City, AC 12345",
      description: "Flagship Store & Showroom",
      link: "https://maps.google.com",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: FiClock,
      title: "Business Hours",
      content: "Mon-Fri: 9AM-6PM",
      description: "Weekend: 10AM-4PM",
      link: null,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const socialLinks = [
    {
      icon: FaInstagram,
      name: "Instagram",
      handle: "@purebmwm",
      link: "https://instagram.com/purebmwm",
      color: "text-pink-500"
    },
    {
      icon: FaFacebook,
      name: "Facebook",
      handle: "PURE.BMWM",
      link: "https://facebook.com/purebmwm",
      color: "text-blue-500"
    },
    {
      icon: FaTiktok,
      name: "TikTok",
      handle: "@purebmwm",
      link: "https://tiktok.com/@purebmwm",
      color: "text-white"
    },
    {
      icon: FaWhatsapp,
      name: "WhatsApp",
      handle: "+1 (555) 123-4567",
      link: "https://wa.me/15551234567",
      color: "text-green-500"
    }
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('assets/bg3.jpg')",
            backgroundPosition: "center -1400px",
                  }}
        />
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold font-bebasneue mb-6 leading-tight">
                Get In <span className="text-primary">Touch</span>
              </h1>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300"
              >
                Ready to join the BMW M community? We're here to help with anything you need.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Contact Form Section */}
      <section className="relative py-20 overflow-hidden">

      {/* Contact Information Cards */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          
        />
        
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-bebasneue mb-6">Contact Information</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Multiple ways to reach us - choose what works best for you
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                {info.link ? (
                  <a href={info.link} target="_blank" rel="noopener noreferrer">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 h-full transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 cursor-pointer">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${info.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                        {info.title}
                      </h3>
                      <p className="text-white font-medium mb-2">{info.content}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </a>
                ) : (
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 h-full transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${info.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                      {info.title}
                    </h3>
                    <p className="text-white font-medium mb-2">{info.content}</p>
                    <p className="text-gray-400 text-sm">{info.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-15"
          style={{
            backgroundImage: "url('assets/bg1.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-bebasneue mb-6">Send Us A Message</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Got questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          {/* Form Container */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-2xl mx-auto">
            <form onSubmit={handleFormSubmit} className="p-8">
              <div className="space-y-8">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleFormChange}
                      required
                      className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/10"
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
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleFormChange}
                      required
                      className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/10"
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
                    <FiMessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300 pointer-events-none z-10" />
                    <select
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleFormChange}
                      required
                      className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 bg-white/5 border-white/10 text-white transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/10 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-gray-800 text-gray-400">What can we help with?</option>
                      <option value="general" className="bg-gray-800 text-white">General Inquiry</option>
                      <option value="order" className="bg-gray-800 text-white">Order Support</option>
                      <option value="sizing" className="bg-gray-800 text-white">Sizing Help</option>
                      <option value="shipping" className="bg-gray-800 text-white">Shipping Information</option>
                      <option value="returns" className="bg-gray-800 text-white">Returns & Exchanges</option>
                      <option value="wholesale" className="bg-gray-800 text-white">Wholesale Inquiry</option>
                      <option value="partnership" className="bg-gray-800 text-white">Partnership</option>
                      <option value="press" className="bg-gray-800 text-white">Press & Media</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <FiMessageSquare className="absolute left-4 top-6 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleFormChange}
                      required
                      rows={6}
                      className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/10 resize-none"
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
        </div>
      </section>

      {/* Social Media Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('assets/bg2.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ y: 30, opacity: 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-bebasneue mb-8">
              Follow Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Stay connected with the PURE.BMWM community across all platforms
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 1 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    <social.icon className={`w-8 h-8 mx-auto mb-3 ${social.color} group-hover:scale-110 transition-transform duration-300`} />
                    <h3 className="text-white font-bold mb-1">{social.name}</h3>
                    <p className="text-gray-400 text-sm">{social.handle}</p>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 