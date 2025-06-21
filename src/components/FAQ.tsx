import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useUIStore } from '../store/uiStore';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { isDarkTheme } = useUIStore();

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

  return (
    <section className={`py-20 px-4 transition-colors duration-300 relative ${
      isDarkTheme ? 'bg-[#16171E]' : 'bg-white'
    }`}>
      {/* Street background with overlay for dark theme */}
      {isDarkTheme && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/assets/bg1.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        </>
      )}
      <div className="container mx-auto max-w-4xl relative z-10">
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
        <div className="space-y-4">
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

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className={`mt-16 text-center rounded-3xl p-12 border transition-colors duration-300 ${
            isDarkTheme
              ? 'bg-[#23242a] border-gray-800'
              : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Still have questions? 🤔
          </h3>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Our support squad is always ready to help! Hit us up and we'll get back to you faster than a BMW M3 on the Autobahn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:support@purebmwm.com"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              Contact Support
            </a>
            <a
              href="https://instagram.com/purebmwm"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold py-3 px-8 rounded-full border transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-[#23242a] text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600'
                  : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-300 hover:border-gray-400'
              }`}
            >
              DM us on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 