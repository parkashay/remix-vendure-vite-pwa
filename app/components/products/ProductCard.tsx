import { Link } from '@remix-run/react';
import { SearchQuery } from '~/generated/graphql';
import { placeholderImage } from '~/utils/image-helper';
import { Price } from './Price';
import Rating from './Rating';

export type ProductCardProps = SearchQuery['search']['items'][number] & {
  rating: number;
};
export function ProductCard({
  productAsset,
  productName,
  slug,
  priceWithTax,
  currencyCode,
  rating,
}: ProductCardProps) {
  return (
    <div className="rounded-md transition-all group hover:shadow-lg  pb-2">
      <Link className="relative" prefetch="intent" to={`/products/${slug}`}>
        <div className="overflow-hidden aspect-square w-full max-w-full min-w-full">
          <img
            className="object-cover bg-[#fbfbfb] w-full h-full transition-all duration-300 group-hover:scale-110 rounded-t-md"
            src={productAsset?.preview + '?w=400&h=400'}
            onError={(e) => {
              e.currentTarget.src = placeholderImage(400, 400);
            }}
            alt={productName}
          />
        </div>
        {/* <div className="absolute left-3 top-3">
        <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">
          New
        </p>
      </div> */}
        <div className="flex items-center space-x-2 mt-3 px-2">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
            <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
          </p>
          {/* <del className="text-xs sm:text-sm font-bold text-gray-500">
            {' '}
            $99.00{' '}
          </del> */}
        </div>
        <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base mt-1 px-2">
          <Link
            prefetch="intent"
            to={`/products/${slug}`}
            title=""
            className="line-clamp-2"
          >
            {productName}
          </Link>
        </h3>
      </Link>
      <div className="flex items-center justify-between mt-1 px-2">
        <Rating rating={rating} />
        {/* <button className="text-right w-8 h-8 flex justify-center items-center rounded-full group/cart bg-gray-300 hover:bg-primary transition-all">
          <ShoppingBagIcon className="w-4 h-4 text-gray-900 group-hover/cart:text-white" />
        </button> */}
      </div>
    </div>
  );
}
