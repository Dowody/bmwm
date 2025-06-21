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
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h3 className="text-4xl lg:text-5xl font-bold mb-12 font-bebasneue text-center text-white">You May Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
