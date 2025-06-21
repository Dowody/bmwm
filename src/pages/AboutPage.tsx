import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiRefreshCw, FiHeart, FiUsers, FiAward, FiTarget, FiTrendingUp, FiCheck, FiArrowRight, FiStar, FiGlobe } from 'react-icons/fi';

const AboutPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: FiAward,
      title: "Premium Quality",
      description: "We use only the finest materials and cutting-edge printing techniques to ensure every piece meets our exacting standards.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: FiTarget,
      title: "Authentic Design",
      description: "Created by true automotive enthusiasts with meticulous attention to technical accuracy and racing heritage.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: FiUsers,
      title: "Community First",
      description: "Building a global community of car lovers who share their passion through exclusive events and releases.",
      gradient: "from-pink-500 to-red-600"
    },
    {
      icon: FiGlobe,
      title: "Global Impact",
      description: "Delivering exceptional service and sustainable practices that make a positive difference worldwide.",
      gradient: "from-red-500 to-orange-600"
    }
  ];

  const process = [
    {
      number: "01",
      title: "Conceptualization",
      description: "Our design team studies iconic BMW models, analyzing every curve, detail, and technical specification to capture their essence.",
      features: ["Technical research", "Design sketches", "CAD modeling", "Color analysis"]
    },
    {
      number: "02",
      title: "Material Selection",
      description: "We source premium, sustainable fabrics that match BMW's commitment to quality and environmental responsibility.",
      features: ["Organic cotton", "Sustainable dyes", "Quality testing", "Durability analysis"]
    },
    {
      number: "03",
      title: "Precision Manufacturing",
      description: "State-of-the-art production facilities ensure every piece meets our exacting standards for fit, finish, and longevity.",
      features: ["Advanced printing", "Quality control", "Embroidery details", "Final inspection"]
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: FiUsers },
    { number: "100+", label: "Unique Designs", icon: FiStar },
    { number: "25+", label: "Countries Served", icon: FiGlobe },
    { number: "99%", label: "Satisfaction Rate", icon: FiHeart }
  ];

  return (
    <div className="min-h-screen bg-black/10 text-white">
      {/* Hero Section */}
      <section className="relative h-[93vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/assets/bg2.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 text-center max-w-6xl">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-5xl lg:text-8xl font-bold font-bebasneue mb-8 leading-tight">
                ABOUT <span className="text-primary">PURE.BMWM</span>
              </h1>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl lg:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-gray-300"
              >
                Where automotive passion meets premium streetwear. We craft exclusive designs for enthusiasts who live and breathe BMW M performance.
              </motion.p>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Link
                  to="/products"
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
                >
                  <span>Explore Collection</span>
                  <FiArrowRight size={20} />
                </Link>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-white/20 hover:border-white/30">
                  Watch Our Story
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20"
          style={{
            backgroundImage: "url('/assets/bg3.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h2 className="text-4xl lg:text-5xl font-bold font-bebasneue mb-8 text-primary">Our Story</h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    Founded in 2020 by a passionate group of BMW enthusiasts, PURE.BMWM was born from the desire to create premium automotive streetwear that captures the essence of M performance.
                  </p>
                  <p className="text-lg">
                    What began as a small collection of meticulously designed t-shirts has evolved into a comprehensive line of premium streetwear. Each piece reflects the precision engineering, innovative design, and racing heritage that defines BMW M.
                  </p>
                  <p className="text-lg">
                    Today, we're more than just a brand – we're a global community of automotive enthusiasts who share an unwavering passion for performance, quality, and the ultimate driving experience.
                  </p>
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-2 gap-6 mt-12">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <stat.icon className="text-primary mx-auto mb-2" size={24} />
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
                <img 
                  src="/assets/about-image.jpg" 
                  alt="PURE.BMWM Team" 
                  className="rounded-xl w-full h-[500px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/bg4.jpg';
                  }}
                />
              </div>
              
              {/* Floating Achievement Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 lg:-bottom-6 left-[80px] lg:-left-6 bg-primary backdrop-blur-md rounded-2xl p-6 border border-primary/20 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <FiAward className="text-white" size={32} />
                  <div>
                    <div className="text-white font-bold text-lg">Premium Quality</div>
                    <div className="text-white/80 text-sm">Certified Excellence</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

      {/* Values Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
         
        />
        
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold font-bebasneue mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that drive everything we do, from design to delivery
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 h-full transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      {/* Process Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-15"
         
        />
        
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold font-bebasneue mb-6">Our Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From concept to creation, every step is crafted with precision and passion
            </p>
          </motion.div>
          
          <div className="space-y-16">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                <div className="lg:w-1/2">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {step.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <FiCheck className="text-primary flex-shrink-0" size={16} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                      <div className="text-6xl text-white/30">{step.number}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </section>

      </section>


      {/* Call to Action Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/assets/bg2.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold font-bebasneue mb-8">
              Join the <span className="text-primary">PURE.BMWM</span> Community
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Connect with fellow BMW enthusiasts worldwide. Be the first to know about exclusive releases, limited editions, and community events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/products"
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
                >
                  <span>Shop Collection</span>
                  <FiArrowRight size={20} />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-white/20 hover:border-white/30 flex items-center gap-3">
                  <FiHeart size={20} />
                  <span>Follow Our Journey</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
