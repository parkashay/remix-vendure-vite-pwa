import {
  RectangleStackIcon,
  ShoppingBagIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';
import { CollectionDropdown } from './CollectionDropdown';
import { ReactNode } from 'react';

interface Props {
  cartQuantity: number;
  onCartIconClick: () => void;
}
export function MobileNav({ cartQuantity, onCartIconClick }: Props) {
  return (
    <div className="block fixed bottom-0 w-full h-[70px] bg-white border-t border-primary z-40 lg:hidden">
      <div className="flex justify-evenly items-center w-full h-full">
        <Link
          to="/"
          className="hover:bg-primary/20 h-full flex items-center justify-center w-full"
        >
          <div
            aria-label="logo"
            className="flex items-center justify-center space-x-2 relative"
          >
            <img
              src="/purpleface.png"
              alt="Hyperce Logo"
              className="relative h-14 w-14"
            />
          </div>
        </Link>
        <Link
          to="/brands"
          className="hover:bg-primary/20 h-full flex items-center justify-center w-full"
        >
          <div className="flex items-center justify-center flex-col space-x-2 relative">
            <TagIcon className="h-6 w-6" />
            <span className="text-xs">Brands</span>
          </div>
        </Link>
        <Link
          to="/collections"
          className="hover:bg-primary/20 h-full flex items-center justify-center w-full"
        >
          <div className="flex items-center justify-center flex-col space-x-2 relative">
            <RectangleStackIcon className="h-6 w-6" />
            <span className="text-xs">Collections</span>
          </div>
        </Link>
        <div className="hover:bg-primary/20 h-full flex items-center justify-center w-full">
          <button
            className="relative"
            onClick={onCartIconClick}
            aria-label="Open cart tray"
          >
            <div className="flex items-center justify-center flex-col">
              <ShoppingBagIcon />
              <span className="text-xs">Cart</span>
            </div>
            {cartQuantity ? (
              <div className="absolute rounded-full -top-0 -right-0  w-4 h-4 flex justify-center items-center bg-primary text-white text-xs">
                {cartQuantity}
              </div>
            ) : (
              ''
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
