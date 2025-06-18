import { Product } from '../types';
import { getRelatedProducts } from '../data/products';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  product: Product;
}

const RelatedProducts = ({ product }: RelatedProductsProps) => {
  const relatedProducts = getRelatedProducts(product);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold mb-6 font-Rajdhani">You May Also Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
