import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Thumbnails */}
      <div className="order-2 md:order-1 md:col-span-1 flex md:flex-col gap-2 mt-4 md:mt-0">
        {images.map((image, index) => (
          <button
            key={index}
            className={`border rounded overflow-hidden ${
              mainImage === image ? 'border-primary' : 'border-gray-200'
            }`}
            onClick={() => setMainImage(image)}
          >
            <img
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              className="w-full h-20 object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Main Image */}
      <div className="order-1 md:order-2 md:col-span-4">
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-[500px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
