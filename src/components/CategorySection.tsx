import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-bebasneue text-gray-900 mb-4">
            SHOP BY CATEGORY
          </h2>
          <p className="text-gray-600 text-lg font-medium tracking-wide max-w-2xl mx-auto">
            Discover our premium collection of car-inspired streetwear
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-sm hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-center font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 text-sm md:text-base">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/products"
            className="group inline-flex items-center space-x-2 text-gray-700 hover:text-primary font-medium transition-colors duration-200"
          >
            <span className="text-lg tracking-wide">Browse All Categories</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
