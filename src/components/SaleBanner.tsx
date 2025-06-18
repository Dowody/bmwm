import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';

const SaleBanner = () => {
  // Set the sale end date to 7 days from now
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 7);

  return (
    <section className="relative py-20 text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[calc(100%+90px)] object-cover transform -translate-y-20"
        >
          <source src="videoplayback2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay with reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/60 to-black/50"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="text-center lg:text-left flex-1">
            <div className="inline-block bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
              🔥 LIMITED TIME OFFER
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-bebasneue leading-tight">
              SUMMER SALE
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium">
              Don't miss out on <span className="text-red-400 font-bold">40% OFF</span> all products!
            </p>
            {/* Commented out to keep navigation on homepage */}
            {/* <Link
              to="/products"
              className="inline-block bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              SHOP SALE NOW
            </Link> */}
            <button
              className="inline-block bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              onClick={() => console.log('Shop Sale Now clicked')}
            >
              SHOP SALE NOW
            </button>
          </div>
          
          {/* Countdown */}
          <div className="text-center lg:text-right">
            <p className="text-lg lg:text-xl mb-6 text-gray-300 font-medium">Sale ends in:</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 lg:px-16 py-4 lg:py-8 border border-white/20 min-w-fit">
              <div className="scale-95 lg:scale-125">
                <CountdownTimer targetDate={saleEndDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;
