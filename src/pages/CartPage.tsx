import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { FiTrash2, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  const handleQuantityChange = (index: number, quantity: number) => {
    updateQuantity(index, quantity);
  };
  
  const handleRemoveItem = (index: number) => {
    removeItem(index);
  };
  
  const handleCouponApply = () => {
    // Simple coupon logic for demo purposes
    if (couponCode.toLowerCase() === 'turbo20') {
      setCouponDiscount(20);
      setCouponError('');
    } else {
      setCouponDiscount(0);
      setCouponError('Invalid coupon code');
    }
  };
  
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const discount = (subtotal * couponDiscount) / 100;
  const total = subtotal + shipping - discount;
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <FiShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/products"
            className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-full transition duration-300 inline-block"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 font-Rajdhani">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
              <div className="col-span-6">
                <h3 className="font-semibold">Product</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold">Price</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold">Quantity</h3>
              </div>
              <div className="col-span-2 text-right">
                <h3 className="font-semibold">Total</h3>
              </div>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="border-b last:border-b-0 p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="col-span-1 md:col-span-6">
                    <div className="flex items-center">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden mr-4">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          <Link to={`/products/${item.product.id}`} className="hover:text-primary">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p>
                        <p className="text-sm text-gray-500 mb-2">Color: {item.color}</p>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 text-sm flex items-center hover:underline md:hidden"
                        >
                          <FiTrash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 md:text-center">
                    <div className="flex justify-between md:block">
                      <span className="md:hidden font-medium">Price:</span>
                      <span>${item.product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 md:text-center">
                    <div className="flex justify-between items-center md:justify-center">
                      <span className="md:hidden font-medium">Quantity:</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(index, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={item.product.stock}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(index, Math.min(item.product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                          className="w-12 px-2 py-1 border-t border-b border-gray-300 text-center focus:outline-none"
                        />
                        <button
                          onClick={() => handleQuantityChange(index, Math.min(item.product.stock, item.quantity + 1))}
                          className="px-2 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="col-span-1 md:col-span-2 md:text-right">
                    <div className="flex justify-between md:block">
                      <span className="md:hidden font-medium">Total:</span>
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Remove Button (Desktop) */}
                  <div className="hidden md:block absolute right-4">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-gray-400 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Cart Actions */}
            <div className="p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link
                to="/products"
                className="flex items-center text-primary hover:underline"
              >
                <FiArrowLeft size={16} className="mr-2" />
                Continue Shopping
              </Link>
              
              <button
                onClick={() => clearCart()}
                className="text-gray-600 hover:text-red-500"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            {/* Coupon Code */}
            <div className="mb-6">
              <label htmlFor="coupon" className="block text-gray-700 mb-2">Coupon Code</label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  onClick={handleCouponApply}
                  className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-r-lg transition duration-300"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm mt-1">{couponError}</p>
              )}
              {couponDiscount > 0 && (
                <p className="text-green-500 text-sm mt-1">Coupon applied successfully!</p>
              )}
            </div>
            
            {/* Summary */}
            <div className="space-y-3 border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({couponDiscount}%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Proceed to Checkout
            </button>
            
            {/* Payment Methods */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm mb-2">We Accept</p>
              <div className="flex justify-center space-x-2">
                <img src="/src/assets/payment-visa.svg" alt="Visa" className="h-8" />
                <img src="/src/assets/payment-mastercard.svg" alt="Mastercard" className="h-8" />
                <img src="/src/assets/payment-paypal.svg" alt="PayPal" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
