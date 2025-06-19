import React from 'react';
import { useUIStore } from '../store/uiStore';

const InfoRoller = () => {
  const { isDarkTheme } = useUIStore();

  const infoItems = [
    "BMW M INSPIRED STREETWEAR",
    "LIMITED EDITION DROPS",
    "FREE SHIPPING OVER €50", 
    "12 MONTH PAYMENT PLANS",
    "WORLDWIDE SHIPPING",
    "PREMIUM QUALITY MATERIALS",
    "50K+ HAPPY CUSTOMERS",
    "24/7 CUSTOMER SUPPORT",
    "EXCLUSIVE M PERFORMANCE DESIGNS",
    "100% SECURE PAYMENTS"
  ];

  return (
    <div className="py-6 overflow-hidden relative border-t border-b bg-[#16171E] border-gray-800"
          >
      {/* Rolling content - duplicated for seamless loop */}
      <div className="flex animate-scroll-left whitespace-nowrap">
        {/* First set */}
        <div className="flex items-center space-x-12 mr-12">
          {infoItems.map((item, index) => (
            <span 
              key={`first-${index}`}
              className="text-lg font-bold tracking-wide uppercase text-white"
            >
              {item}
            </span>
          ))}
        </div>
        
        {/* Second set for seamless loop */}
        <div className="flex items-center space-x-12 mr-12">
          {infoItems.map((item, index) => (
            <span 
              key={`second-${index}`}
              className="text-lg font-bold tracking-wide uppercase text-white"
            >
              {item}
            </span>
          ))}
        </div>
        
        {/* Third set for extra smoothness */}
        <div className="flex items-center space-x-12">
          {infoItems.map((item, index) => (
            <span 
              key={`third-${index}`}
              className="text-lg font-bold tracking-wide uppercase text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoRoller; 