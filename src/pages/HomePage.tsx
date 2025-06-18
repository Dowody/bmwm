import Hero from '../components/Hero';
import LimitedDrops from '../components/LimitedDrops';
import ProductComparer from '../components/ProductComparer';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import SaleBanner from '../components/SaleBanner';
import FeatureSection from '../components/FeatureSection';
import TestimonialSection from '../components/TestimonialSection';
import FAQ from '../components/FAQ';
import NewsletterSection from '../components/NewsletterSection';
import { getFeaturedProducts, getBestSellerProducts } from '../data/products';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellerProducts = getBestSellerProducts();

  return (
    <div>
      <Hero />
      <LimitedDrops />
      <TestimonialSection />

      {/* <ProductComparer /> */}
      <SaleBanner />
      <FeatureSection />
      <FeaturedProducts 
        title="Best Selling" 
        subtitle="Unmatched design - superior performance and customer satisfaction in one."
        products={bestSellerProducts}
        background="light"
        layout="grid"
      />
      
      <FAQ />
    </div>
  );
};

export default HomePage;
