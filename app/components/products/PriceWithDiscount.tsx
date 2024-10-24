import { FC } from 'react';
import { ProductCardProps } from './ProductCard';
import { Price } from './Price';

interface Props {
  priceWithTax: number | ProductCardProps['priceWithTax'];
  currencyCode: ProductCardProps['currencyCode'];
  markedPrice?: number | null;
}
export const PriceWithDiscount: FC<Props> = ({
  currencyCode,
  priceWithTax,
  markedPrice,
}) => {
  return (
    <div className="flex items-end justify-center gap-3">
      <p className="text-lg font-bold text-gray-900 sm:text-sm md:text-base">
        <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
      </p>
      {markedPrice && (
        <del className="text-xs">
          <Price priceWithTax={markedPrice} currencyCode={currencyCode} />
        </del>
      )}
    </div>
  );
};
