import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../store/uiStore';
import { getCategoryById } from '../data/categories';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import CategorySlider from '../components/CategorySlider';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isDarkTheme } = useUIStore();
  const [category, setCategory] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  useEffect(() => {
    if (categoryId) {
      window.scrollTo(0, 0);
      const foundCategory = getCategoryById(categoryId);
      setCategory(foundCategory);
      setIsLoading(false);
    }
  }, [categoryId]);

  const scrollToCollection = () => {
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  // Filter products for this collection
  const collectionProducts = category.collectionProducts 
    ? products.filter(product => category.collectionProducts.includes(product.id))
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen relative ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
    >
        <div className="absolute inset-0 z-0">
            <motion.div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                backgroundImage: 'url(/assets/bg3.jpg)', 
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <div className={`absolute inset-0 ${
                isDarkTheme 
                ? 'bg-gradient-to-b from-black/80 via-black/75 to-black/70' 
                : 'bg-white/60 backdrop-blur-sm'
            }`} />
            <div className={`absolute inset-0 ${
                isDarkTheme 
                ? 'bg-gradient-to-r from-transparent via-black/20 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
            }`} />
        </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section ref={heroRef} variants={itemVariants} className="relative h-[92vh] lg:h-[50vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img
                    src={'/assets/categories/cars/x6m/bmw-x6m-competition-4.jpg'}                    alt={category.name}
                    className="absolute top-0 left-0 w-full h-[100%] object-cover"
                    style={{ y: backgroundY }}
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold mb-6 text-white font-bebasneue"
            >
                {category.carInfo?.model || category.name}
            </motion.h1>
            <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto"
            >
                {category.description}
            </motion.p>
            <motion.div 
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-4 mb-8"
            >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-primary">{category.carInfo?.horsepower || 'TBA'}</div>
                <div className="text-sm text-gray-300">HORSEPOWER</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-primary">{category.carInfo?.topSpeed || 'TBA'}</div>
                <div className="text-sm text-gray-300">TOP SPEED</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-primary">{category.carInfo?.acceleration || 'TBA'}</div>
                <div className="text-sm text-gray-300">ACCELERATION</div>
                </div>
            </motion.div>
            <motion.div variants={itemVariants}>
                <button
                onClick={scrollToCollection}
                className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                EXPLORE COLLECTION
                </button>
            </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
            >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
            </motion.div>
        </motion.section>

        {/* Car Specifications */}
        {category.carInfo && (
            <motion.section variants={itemVariants} className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Car Image Gallery */}
                <div className="space-y-4 min-w-0">
                    <div className="relative h-96 rounded-2xl overflow-hidden">
                    <img
                        src={category.carInfo.gallery[selectedImage]}
                        alt={`${category.carInfo.model} - Image ${selectedImage + 1}`}
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                    {category.carInfo.gallery.map((image: string, index: number) => (
                        <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === index 
                            ? 'border-primary' 
                            : 'border-gray-300 hover:border-primary/50'
                        }`}
                        >
                        <img
                            src={image}
                            alt={`${category.carInfo.model} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        </button>
                    ))}
                    </div>
                </div>

                {/* Specifications */}
                <div className="space-y-8">
                    <div>
                    <h2 className="text-5xl font-bold mb-6 text-primary font-bebasneue">Specifications</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Model</div>
                        <div className="text-xl font-semibold">{category.carInfo.model}</div>
                        </div>
                        <div className="space-y-2">
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Year</div>
                        <div className="text-xl font-semibold">{category.carInfo.year}</div>
                        </div>
                        <div className="space-y-2">
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Engine</div>
                        <div className="text-xl font-semibold">{category.carInfo.engine}</div>
                        </div>
                        <div className="space-y-2">
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Horsepower</div>
                        <div className="text-xl font-semibold text-primary">{category.carInfo.horsepower}</div>
                        </div>
                        <div className="space-y-2">
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Top Speed</div>
                        <div className="text-xl font-semibold">{category.carInfo.topSpeed}</div>
                        </div>
                        <div className="space-y-2">
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Acceleration</div>
                        <div className="text-xl font-semibold">{category.carInfo.acceleration}</div>
                        </div>
                    </div>
                    </div>
                    {category.carInfo.history && (
                        <div className="pt-0">
                            <div className={`prose prose-lg max-w-none ${ isDarkTheme ? 'prose-invert' : '' }`}>
                                <p className="text-lg leading-relaxed text-justify">
                                    {category.carInfo.history}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>
            </motion.section>
        )}

        {/* Collection Products */}
        <motion.section 
            id="collection"
            variants={itemVariants} 
            className="py-20 px-4"
        >
            <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-12 text-primary font-bebasneue">
                {category.name} Collection
            </h2>
            
            {collectionProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collectionProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            ) : (
                <div className="text-center py-12">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-2xl font-bold mb-4">Collection Coming Soon</h3>
                <p className="text-gray-600 mb-8">
                    We're working hard to bring you the perfect {category.name} collection.
                    Stay tuned for updates!
                </p>
                <Link
                    to="/products"
                    className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
                >
                    Browse All Products
                </Link>
                </div>
            )}
            </div>
        </motion.section>

        {/* Other Collections */}
        <motion.section variants={itemVariants} className="pb-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-center mb-12 text-primary font-bebasneue">
                    Browse other collections
                </h2>
                <CategorySlider />
            </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default CategoryPage; 