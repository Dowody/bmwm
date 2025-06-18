import { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement newsletter signup logic
    console.log('Newsletter signup:', email);
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-bebasneue mb-4">
              STAY IN THE LOOP
            </h2>
            <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Get exclusive access to new drops, special offers, and car culture content delivered straight to your inbox
            </p>
          </div>
          
          {/* Form */}
          {isSubmitted ? (
            <div className="bg-green-500/20 border border-green-400/30 text-green-300 p-8 rounded-2xl backdrop-blur-sm max-w-md mx-auto">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-lg mb-2">Welcome to the club!</p>
              <p className="text-sm">You'll receive our latest drops and exclusive offers first.</p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  JOIN THE COMMUNITY
                </button>
              </form>
              
              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          )}

          {/* Social proof */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-gray-400 text-sm mb-4">Join 25,000+ car enthusiasts already subscribed</p>
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold font-bebasneue text-white">25K+</div>
                <div className="text-xs text-gray-400">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold font-bebasneue text-white">Weekly</div>
                <div className="text-xs text-gray-400">Updates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold font-bebasneue text-white">Exclusive</div>
                <div className="text-xs text-gray-400">Offers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
