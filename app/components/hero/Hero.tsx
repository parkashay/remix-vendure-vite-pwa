// app/components/HeroSection.jsx
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';

const Hero = ({
  bannerImageUrl,
  bannerTitle,
  bannerSubtitle,
}: {
  bannerImageUrl: string;
  bannerTitle?: string | null;
  bannerSubtitle?: string | null;
}) => {
  return (
    <div
      className="group relative text-white py-24 px-8 flex items-center justify-center bg-cover bg-center bg-white rounded-2xl"
      style={{ backgroundImage: `url(${bannerImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-30 rounded-2xl"></div>
      <div className="relative z-10 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {bannerTitle || 'Grab Up to 50% Off On Selected Items'}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          {bannerSubtitle || 'Limited time offer on our exclusive collection.'}
        </p>
        <Link to="/search">
          <button className="bg-gradient-to-tl from-purple-700 via-purple-500 to-purple-900 text-white shadow-lg hover:backdrop-blur-sm font-semibold py-2 px-4 rounded-full inline-flex items-center hover:shadow-purple-400 ">
            <ShoppingBagIcon className="mr-2 h-8 w-8" />
            <span className="text-nowrap">Shop Now</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
