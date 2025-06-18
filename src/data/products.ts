import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'GT3 RS T-Shirt',
    description: 'Premium cotton t-shirt featuring the iconic Turbo GT3 RS design. High-quality print that won\'t fade after washing.',
    price: 39.99,
    originalPrice: 59.99,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://blackstop.in/cdn/shop/files/10_3584fefd-385e-4eab-aaf0-a99e2681b3e5.jpg?v=1744640335&width=2288'],
    category: 'Car T-Shirts',
    tags: ['porsche', 'gt3', 'racing', 'supercar'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#ffffff' },
    ],
    featured: true,
    bestSeller: true,
    stock: 100,
  },
  {
    id: '2',
    name: 'Lightning McQueen Couple Tee',
    description: 'Pack of 2 matching t-shirts for couples featuring Lightning McQueen and Sally designs. Perfect gift for car enthusiast couples.',
    price: 69.99,
    originalPrice: 89.99,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Car T-Shirts',
    tags: ['cars', 'movie', 'couple', 'lightning mcqueen'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black/White', value: '#000000' },
    ],
    featured: true,
    stock: 50,
  },
  {
    id: '3',
    name: '911 GT3 RS V3 Tee',
    description: 'Premium cotton t-shirt featuring the legendary 911 GT3 RS design with detailed technical specifications on the back.',
    price: 42.99,
    originalPrice: 62.99,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Car T-Shirts',
    tags: ['porsche', '911', 'gt3', 'racing', 'supercar'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#000080' },
    ],
    bestSeller: true,
    stock: 75,
  },
  {
    id: '4',
    name: '911 GT3 RS V2 Tee',
    description: 'High-quality cotton t-shirt with the iconic 911 GT3 RS V2 design. Features technical specifications and blueprint details.',
    price: 39.99,
    originalPrice: 59.99,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Car T-Shirts',
    tags: ['porsche', '911', 'gt3', 'racing', 'supercar'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#ffffff' },
    ],
    featured: true,
    stock: 60,
  },
  {
    id: '5',
    name: 'BMW M3 GTR Tee',
    description: 'Premium cotton t-shirt featuring the legendary BMW M3 GTR design. High-quality print with detailed technical specifications.',
    price: 39.99,
    originalPrice: 59.99,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Car T-Shirts',
    tags: ['bmw', 'm3', 'gtr', 'racing'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#000080' },
    ],
    bestSeller: true,
    stock: 80,
  },
  {
    id: '6',
    name: 'Berry Purple GT3 RS - Limited',
    description: 'Limited edition berry purple t-shirt featuring the iconic 911 GT3 RS design. Only 100 pieces available worldwide.',
    price: 49.99,
    originalPrice: 79.99,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Car T-Shirts',
    tags: ['porsche', '911', 'gt3', 'limited edition', 'supercar'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Berry Purple', value: '#4e1d51' },
    ],
    new: true,
    stock: 25,
  },
  {
    id: '7',
    name: 'Kawasaki Ninja ZX10R Tee',
    description: 'High-quality cotton t-shirt featuring the Kawasaki Ninja ZX10R design with technical specifications on the back.',
    price: 39.99,
    originalPrice: 59.99,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Bike T-Shirts',
    tags: ['kawasaki', 'ninja', 'zx10r', 'motorcycle'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', value: '#ffffff' },
      { name: 'Black', value: '#000000' },
    ],
    featured: true,
    bestSeller: true,
    stock: 70,
  },
  {
    id: '8',
    name: 'F1 Racing Team Tee',
    description: 'Official F1 racing team t-shirt made from premium cotton. Features team logo and sponsors on front and back.',
    price: 44.99,
    originalPrice: 64.99,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'F1 T-Shirts',
    tags: ['f1', 'formula one', 'racing', 'team'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Red', value: '#ff0000' },
      { name: 'Black', value: '#000000' },
    ],
    new: true,
    bestSeller: true,
    stock: 55,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
};

export const getFeaturedProducts = (limit: number = 4): Product[] => {
  return products
    .filter(product => product.featured)
    .slice(0, limit);
};

export const getBestSellerProducts = (limit: number = 4): Product[] => {
  return products
    .filter(product => product.bestSeller)
    .slice(0, limit);
};

export const getNewProducts = (limit: number = 4): Product[] => {
  return products
    .filter(product => product.new)
    .slice(0, limit);
};
