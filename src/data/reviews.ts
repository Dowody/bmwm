import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '1',
    productId: '5',
    userName: 'Aarav Sharma',
    rating: 5,
    comment: 'The BMW T-shirts I ordered is fantastic! Great design, high-quality material, and super comfy. I\'m really happy with it!',
    date: '2023-06-15',
    verified: true
  },
  {
    id: '2',
    productId: '6',
    userName: 'Akash Joshi',
    rating: 5,
    comment: 'I bought the Porsche t-shirt and it\'s perfect! The quality is outstanding, and it fits so well. It\'s super soft and comfortable. Definitely worth every rupee!',
    date: '2023-06-10',
    verified: true
  },
  {
    id: '3',
    productId: '1',
    userName: 'Priya Patel',
    rating: 4,
    comment: 'Love the design and quality of the GT3 RS t-shirt. The print is detailed and vibrant. Only giving 4 stars because it runs slightly small.',
    date: '2023-06-05',
    verified: true
  },
  {
    id: '4',
    productId: '7',
    userName: 'Rahul Mehta',
    rating: 5,
    comment: 'The Kawasaki Ninja t-shirt is amazing! The design is exactly as shown in the pictures, and the quality is top-notch. Will definitely buy more!',
    date: '2023-05-28',
    verified: true
  }
];

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(review => review.productId === productId);
};

export const getAverageRating = (productId: string): number => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  
  const sum = productReviews.reduce((total, review) => total + review.rating, 0);
  return sum / productReviews.length;
};
