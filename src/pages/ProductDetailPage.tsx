import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCartStore } from '../store/cartStore';
import ProductGallery from '../components/ProductGallery';
import ProductReviews from '../components/ProductReviews';
import RelatedProducts from '../components/RelatedProducts';
import { FiShoppingBag, FiHeart, FiShare2 } from 'react-icons/fi';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>('');
  
  const addToCart = useCartStore(state => state.addItem);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg transition duration-300"
        >
          Browse Products
        </button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    
    if (!selectedColor && product.colors.length > 0) {
      setError('Please select a color');
      return;
    }
    
    setError('');
    const colorName = selectedColor || product.colors[0].name;
    addToCart(product, quantity, selectedSize, colorName);
    
    // Show success message or redirect to cart
    navigate('/cart');
  };
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <ProductGallery images={product.images} name={product.name} />
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900 mr-3">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-500 line-through mr-3">${product.originalPrice.toFixed(2)}</span>
                <span className="bg-primary text-white text-sm font-bold px-2 py-1 rounded">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Size</h3>
              <button className="text-primary text-sm hover:underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Color: {selectedColor || 'Select a color'}</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedColor === color.name ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <span className={`text-${color.value === '#ffffff' ? 'black' : 'white'}`}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-16 px-3 py-1 border-t border-b border-gray-300 text-center focus:outline-none"
              />
              <button
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
              <span className="ml-4 text-gray-500">
                {product.stock} items available
              </span>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center gap-2"
            >
              <FiShoppingBag size={20} />
              Add to Cart
            </button>
            <button className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center gap-2">
              <FiHeart size={20} />
              Wishlist
            </button>
            <button className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center gap-2">
              <FiShare2 size={20} />
              Share
            </button>
          </div>
          
          {/* Product Tags */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Product Features */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold mb-4">Product Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Premium quality cotton fabric</li>
              <li>High-quality print that won't fade after washing</li>
              <li>Comfortable fit for all-day wear</li>
              <li>Detailed design with technical specifications</li>
              <li>Machine washable</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      <ProductReviews productId={product.id} />
      
      {/* Related Products */}
      <RelatedProducts product={product} />
    </div>
  );
};

export default ProductDetailPage;
