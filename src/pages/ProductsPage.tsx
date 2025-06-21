import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX, FiGrid, FiSearch, FiSliders, FiTag, FiDollarSign, FiLayers } from 'react-icons/fi';

// URL to category mapping function
const urlToCategory = (urlCategory: string): string => {
  // Convert URL format back to proper category name
  const categoryMappings: Record<string, string> = {
    'car-t-shirts': 'Car T-Shirts',
    'f1-t-shirts': 'F1 T-Shirts',  // Now matches the corrected navigation
    'bike-t-shirts': 'Bike T-Shirts',
    'streetwear': 'Car T-Shirts', // Default streetwear to Car T-Shirts since no dedicated category
    // BMW category mappings
    'bmw-x6m-competition': 'BMW X6M COMPETITION',
    'bmw-m3-competition': 'BMW M3 COMPETITION',
    'bmw-m4-competition': 'BMW M4 COMPETITION',
    'bmw-m5-competition': 'BMW M5 COMPETITION',
    'bmw-m8-competition': 'BMW M8 COMPETITION',
  };
  
  return categoryMappings[urlCategory] || urlCategory;
};

const ProductsPage = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Get all available categories, sizes, and colors
  const categories = Array.from(new Set(products.map(product => product.category)));
  const sizes = Array.from(new Set(products.flatMap(product => product.sizes)));
  const colors = Array.from(
    new Set(products.flatMap(product => product.colors.map(color => color.name)))
  );
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Parse query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    
    if (category) {
      // Convert URL format to proper category name
      const properCategoryName = urlToCategory(category);
      setCategoryFilter(properCategoryName);
    } else {
      setCategoryFilter('');
    }
    
    if (search) {
      // Set search term from URL parameter
      setSearchTerm(decodeURIComponent(search));
    } else {
      setSearchTerm('');
    }
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm && searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase().trim();
      const searchResults = result.filter(product => {
        // Search in name
        const nameMatch = product.name.toLowerCase().includes(searchTermLower);
        
        // Search in category
        const categoryMatch = product.category.toLowerCase().includes(searchTermLower);
        
        // Search in description
        const descriptionMatch = product.description.toLowerCase().includes(searchTermLower);
        
        // Search in tags (includes car brands like bmw, porsche, etc.)
        const tagsMatch = product.tags && product.tags.some(tag => 
          tag.toLowerCase().includes(searchTermLower)
        );
        
        // Enhanced car brand search - check for specific brand matches
        const carBrands = ['bmw', 'porsche', 'ferrari', 'mercedes', 'audi', 'lamborghini', 'mclaren', 'nissan', 'toyota', 'honda', 'ford', 'chevrolet', 'kawasaki', 'yamaha', 'ducati', 'suzuki'];
        const brandMatch = carBrands.some(brand => {
          if (searchTermLower.includes(brand.toLowerCase())) {
            // If searching for a brand, check if product has that brand in tags or name
            return (product.tags && product.tags.some(tag => tag.toLowerCase().includes(brand.toLowerCase()))) ||
                   product.name.toLowerCase().includes(brand.toLowerCase()) ||
                   product.description.toLowerCase().includes(brand.toLowerCase());
          }
          return false;
        });
        
        // Search in individual keywords (split search term)
        const keywords = searchTermLower.split(' ').filter(word => word.length > 0);
        const keywordMatch = keywords.length > 0 && keywords.some(keyword => {
          // Check each keyword against all searchable fields
          const keywordInName = product.name.toLowerCase().includes(keyword);
          const keywordInCategory = product.category.toLowerCase().includes(keyword);
          const keywordInDescription = product.description.toLowerCase().includes(keyword);
          const keywordInTags = product.tags && product.tags.some(tag => tag.toLowerCase().includes(keyword));
          
          // Also check if keyword is a car brand
          const isCarBrand = carBrands.includes(keyword.toLowerCase());
          const brandInProduct = isCarBrand && (
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))) ||
            product.name.toLowerCase().includes(keyword.toLowerCase()) ||
            product.description.toLowerCase().includes(keyword.toLowerCase())
          );
          
          return keywordInName || keywordInCategory || keywordInDescription || keywordInTags || brandInProduct;
        });
        
        return nameMatch || categoryMatch || descriptionMatch || tagsMatch || brandMatch || keywordMatch;
      });
      
      result = searchResults;
    }
    // If search term is empty or only whitespace, don't filter by search (show all products)
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => 
        product.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1] * 100
    );
    
    // Apply size filter
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => selectedColors.includes(color.name))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter(product => product.new).concat(
          result.filter(product => !product.new)
        );
        break;
      case 'best-selling':
        result = result.filter(product => product.bestSeller).concat(
          result.filter(product => !product.bestSeller)
        );
        break;
      default: // featured
        result = result.filter(product => product.featured).concat(
          result.filter(product => !product.featured)
        );
    }
    
    setFilteredProducts(result);
  }, [categoryFilter, priceRange, selectedSizes, selectedColors, sortBy, searchTerm]);
  
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };
  
  const resetFilters = () => {
    setCategoryFilter('');
    setPriceRange([0, 100]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('featured');
    setSearchTerm('');
  };
  
  const getActiveFiltersCount = () => {
    let count = 0;
    if (categoryFilter) count++;
    if (priceRange[1] < 100) count++;
    if (selectedSizes.length > 0) count++;
    if (selectedColors.length > 0) count++;
    if (searchTerm) count++;
    return count;
  };
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('assets/bg1.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            {/* Header */}
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl lg:text-6xl font-bold font-bebasneue mb-4">
                {categoryFilter || 'All Collection'}
              </h1>
              <p className="text-gray-300 text-lg">
                Discover our premium automotive merchandise
              </p>
            </motion.div>
            
            {/* Search Bar */}
                         <motion.div 
               initial={{ y: 20 }}
               animate={{ y: 0 }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="max-w-2xl mx-auto mb-12"
             >
               <div className="relative">
                 <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 z-10" size={20} />
                 <input
                   type="text"
                   placeholder="Search by name, category, car brands (BMW, Porsche, etc.), or keywords..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white placeholder-gray-400"
                 />
               </div>
             </motion.div>
            
            {/* Filters Section */}
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10 mb-12"
            >
              {/* Filter Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <FiSliders className="text-primary" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Filters</h2>
                  {getActiveFiltersCount() > 0 && (
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {getActiveFiltersCount()} active
                    </span>
                  )}
                </div>
                
                                 <div className="flex items-center gap-4">
                   <button
                     onClick={() => setIsFilterOpen(!isFilterOpen)}
                     className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
                   >
                     <FiFilter size={16} />
                     {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                   </button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetFilters}
                    className="text-red-400 hover:text-red-300 transition-colors duration-300 font-medium"
                  >
                    Reset All
                  </motion.button>
                </div>
              </div>
              
                                            {/* Filter Content */}
               <AnimatePresence>
                 {isFilterOpen && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.3, ease: 'easeInOut' }}
                     className="overflow-hidden"
                   >
                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-6">
                  {/* Categories */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FiLayers className="text-primary" size={16} />
                      <h3 className="font-bold text-gray-300">Categories</h3>
                    </div>
                    <div className="space-y-3">
                      <motion.button
                        onClick={() => setCategoryFilter('')}
                        className={`w-full text-left px-4 py-2 rounded-xl transition-all duration-300 ${
                          categoryFilter === ''
                            ? 'bg-primary text-white'
                            : 'bg-white/10 hover:bg-white/20 text-gray-300'
                        }`}
                      >
                        All Categories
                      </motion.button>
                      {categories.map((category, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCategoryFilter(category)}
                          className={`w-full text-left px-4 py-2 rounded-xl transition-all duration-300 ${
                            categoryFilter === category
                              ? 'bg-primary text-white'
                              : 'bg-white/10 hover:bg-white/20 text-gray-300'
                          }`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FiDollarSign className="text-primary" size={16} />
                      <h3 className="font-bold text-gray-300">Price Range</h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full mb-3 accent-primary"
                      />
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1] * 100}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sizes */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FiTag className="text-primary" size={16} />
                      <h3 className="font-bold text-gray-300">Sizes</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSize(size)}
                          className={`px-4 py-2 rounded-xl border transition-all duration-300 ${
                            selectedSizes.includes(size)
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white/10 text-gray-300 border-white/20 hover:border-white/30'
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Colors */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FiGrid className="text-primary" size={16} />
                      <h3 className="font-bold text-gray-300">Colors</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {colors.map((color, index) => {
                        const colorValue = products.find(p => 
                          p.colors.some(c => c.name === color)
                        )?.colors.find(c => c.name === color)?.value || '#000000';
                        
                        return (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleColor(color)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                              selectedColors.includes(color) 
                                ? 'border-primary ring-2 ring-primary/30' 
                                : 'border-white/20 hover:border-white/40'
                            }`}
                            style={{ backgroundColor: colorValue }}
                            title={color}
                          >
                            {selectedColors.includes(color) && (
                              <span className="text-white font-bold">✓</span>
                            )}
                          </motion.button>
                        );
                      })}
                                           </div>
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
             </motion.div>
            
            {/* Results Header */}
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {filteredProducts.length} Products Found
                </h2>
                <p className="text-gray-300">
                  {categoryFilter ? `in ${categoryFilter}` : 'in all categories'}
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-white"
                >
                  <option value="featured" className="bg-gray-800 text-white">Featured</option>
                  <option value="price-low-high" className="bg-gray-800 text-white">Price: Low to High</option>
                  <option value="price-high-low" className="bg-gray-800 text-white">Price: High to Low</option>
                  <option value="newest" className="bg-gray-800 text-white">Newest</option>
                  <option value="best-selling" className="bg-gray-800 text-white">Best Selling</option>
                </select>
              </div>
            </motion.div>
            
                         {/* Products Grid */}
             <AnimatePresence mode="wait">
               {filteredProducts.length > 0 ? (
                 <motion.div 
                   key={`${categoryFilter}-${sortBy}-${selectedSizes.join(',')}-${selectedColors.join(',')}-${priceRange.join(',')}-${searchTerm}`}
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -20, opacity: 0 }}
                   transition={{ duration: 0.2 }}
                   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                 >
                   {filteredProducts.map((product, index) => (
                     <motion.div
                       key={product.id}
                       initial={{ scale: 0.8, opacity: 0, y: 30 }}
                       animate={{ scale: 1, opacity: 1, y: 0 }}
                       exit={{ scale: 0.8, opacity: 0, y: -30 }}
                       transition={{ 
                         duration: 0.2, 
                         delay: index * 0.03,
                         type: "spring",
                         stiffness: 150,
                         damping: 20
                       }}
                       whileHover={{ 
                         scale: 1.05,
                         transition: { duration: 0.2 }
                       }}
                       layout
                     >
                       <ProductCard product={product} />
                     </motion.div>
                   ))}
                 </motion.div>
                             ) : (
                 <motion.div 
                   key="empty-state"
                   initial={{ scale: 0.8, opacity: 0, y: 30 }}
                   animate={{ scale: 1, opacity: 1, y: 0 }}
                   exit={{ scale: 0.8, opacity: 0, y: -30 }}
                   transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
                   className="text-center py-20"
                 >
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiSearch size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">No products found</h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      Try adjusting your filters or search terms to find what you're looking for.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetFilters}
                      className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Reset All Filters
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
