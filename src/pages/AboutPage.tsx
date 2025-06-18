import { Link } from 'react-router-dom';
import { FiTruck, FiPackage, FiThumbsUp, FiUsers } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-bebasneue">ABOUT PURE.BMWM</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Premium car-inspired streetwear for enthusiasts who live and breathe automotive culture.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="/src/assets/about-image.jpg" 
                alt="PURE.BMWM Team" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 font-rajdhani">Our Story</h2>
              <p className="text-gray-700 mb-4">
                PURE.BMWM was born from a passion for cars and fashion. Founded in 2020 by a group of automotive enthusiasts, we set out to create high-quality apparel that celebrates iconic cars, motorsports, and the driving culture.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small collection of t-shirts has grown into a comprehensive line of premium streetwear that captures the essence of automotive design and performance. Each piece in our collection is carefully crafted to reflect the precision, innovation, and excitement that defines the world of cars.
              </p>
              <p className="text-gray-700">
                Today, PURE.BMWM is more than just clothing – it's a community of like-minded enthusiasts who share our love for automotive culture and quality design. We're committed to creating products that allow you to express your passion for cars through your personal style.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-rajdhani">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiThumbsUp className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                We use only premium materials and printing techniques to ensure our products look great and last long.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
              <p className="text-gray-600">
                Our designs are created by car enthusiasts for car enthusiasts, with attention to detail and technical accuracy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                We foster a community of car lovers who share their passion through our products and events.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Service</h3>
              <p className="text-gray-600">
                We're committed to providing exceptional customer service and a seamless shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-rajdhani">Our Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Design</h3>
              <p className="text-gray-600">
                Our in-house designers create detailed, technically accurate illustrations of iconic cars and racing elements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Materials</h3>
              <p className="text-gray-600">
                We source high-quality, sustainable fabrics that provide comfort, durability, and a premium feel.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Production</h3>
              <p className="text-gray-600">
                Our products are manufactured using state-of-the-art printing and embroidery techniques for vibrant, long-lasting results.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-rajdhani">Join the PURE.BMWM Community</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Connect with fellow car enthusiasts and be the first to know about new releases, exclusive offers, and events.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Shop Collection
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Follow Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
