import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add the first size and color by default
    addToCart(product, 1, product.sizes[0], product.colors[0].name);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Link to={`/products/${product.id}`} className="product-card group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-64 object-cover object-center"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.new && (
              <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
            )}
            {product.bestSeller && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">BEST SELLER</span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">-{discountPercentage}%</span>
            )}
          </div>
          
          {/* Quick add to cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white text-primary hover:bg-primary hover:text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label="Add to cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.category}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            
            <div className="flex">
              {product.colors.slice(0, 3).map((color, index) => (
                <div 
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300 ml-1"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                ></div>
              ))}
              {product.colors.length > 3 && (
                <span className="ml-1 text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
