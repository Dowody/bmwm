import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';

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
  
  // Get all available categories, sizes, and colors
  const categories = Array.from(new Set(products.map(product => product.category)));
  const sizes = Array.from(new Set(products.flatMap(product => product.sizes)));
  const colors = Array.from(
    new Set(products.flatMap(product => product.colors.map(color => color.name)))
  );
  
  // Parse query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      setCategoryFilter(category.replace(/-/g, ' '));
    } else {
      setCategoryFilter('');
    }
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
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
  }, [categoryFilter, priceRange, selectedSizes, selectedColors, sortBy]);
  
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
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden w-full">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 py-3 px-4 rounded-lg"
          >
            {isFilterOpen ? (
              <>
                <FiX /> Close Filters
              </>
            ) : (
              <>
                <FiFilter /> Show Filters
              </>
            )}
          </button>
        </div>
        
        {/* Filters Sidebar */}
        <div className={`w-full md:w-1/4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-primary text-sm hover:underline"
              >
                Reset All
              </button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-all"
                    name="category"
                    checked={categoryFilter === ''}
                    onChange={() => setCategoryFilter('')}
                    className="mr-2"
                  />
                  <label htmlFor="category-all">All Categories</label>
                </div>
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${index}`}
                      name="category"
                      checked={categoryFilter === category}
                      onChange={() => setCategoryFilter(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${index}`}>{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1] * 100}</span>
                </div>
              </div>
            </div>
            
            {/* Sizes */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 border rounded-md ${
                      selectedSizes.includes(size)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Colors</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color, index) => {
                  const colorValue = products.find(p => 
                    p.colors.some(c => c.name === color)
                  )?.colors.find(c => c.name === color)?.value || '#000000';
                  
                  return (
                    <button
                      key={index}
                      onClick={() => toggleColor(color)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedColors.includes(color) ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: colorValue }}
                      title={color}
                    >
                      {selectedColors.includes(color) && (
                        <span className="text-white">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {/* Header with count and sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">
              {categoryFilter || 'All Products'} 
              <span className="text-gray-500 text-lg ml-2">({filteredProducts.length} products)</span>
            </h1>
            
            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>
          </div>
          
          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or browse our categories</p>
              <button
                onClick={resetFilters}
                className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
