import {
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowsPointingOutIcon,
  CheckIcon,
  CreditCardIcon,
  GlobeAmericasIcon,
  PhotoIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  FetcherWithComponents,
  MetaFunction,
  ShouldRevalidateFunction,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { useEffect, useMemo, useState } from 'react';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { APP_META_TITLE } from '~/constants';
import { getProductBySlug } from '~/providers/products/products';
import { CartLoaderData } from '~/routes/api.active-order';
// import { FetcherWithComponents } from '~/types';
import clsx from 'clsx';
import Alert from '~/components/Alert';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Rating from '~/components/products/Rating';
import Review from '~/components/products/Review';
import { ScrollableContainer } from '~/components/products/ScrollableContainer';
import { StockLevelLabel } from '~/components/products/StockLevelLabel';
import { ErrorCode, ErrorResult, SearchResultAsset } from '~/generated/graphql';
import { reviews } from '~/providers/dummy';
import { getSessionStorage } from '~/sessions';

import { placeholderImage } from '~/utils/image-helper';
import { ProductCard } from '~/components/products/ProductCard';
import { PriceWithDiscount } from '~/components/products/PriceWithDiscount';
import { QuantityAdjuster } from '~/components/cart/QuantityAdjuster';
import { FullscreenImage } from '~/components/products/FullscreenImage';
import { HorizontalScrollableContainer } from '~/components/products/HorizontalScrollableContainer';
import { ProductCardForScrollableContainer } from '~/components/products/ProductCardForScrollableContainer';

export const meta: MetaFunction = ({ data }) => {
  return [
    {
      //@ts-ignore
      title: data?.product?.name
        ? //@ts-ignore
          `${data.product.name} - ${APP_META_TITLE}`
        : APP_META_TITLE,
    },
  ];
};

export async function loader({ params, request }: DataFunctionArgs) {
  const { product } = await getProductBySlug(params.slug!, { request });
  if (!product || product.variants.length === 0) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  const sessionStorage = await getSessionStorage();
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );

  const error = session.get('activeOrderError');
  return json(
    { product: product!, error },
    {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    },
  );
}

const tabs = [
  'Description',
  'Reviews',
  // 'Support', // TODO: Add support tab
];

export const unstable_shouldReload: ShouldRevalidateFunction = () => true;

export default function ProductSlug() {
  const { product, error } = useLoaderData<typeof loader>();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};
  const addItemToOrderError = getAddItemToOrderError(error);
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  if (!product || product.variants.length === 0) {
    throw new Error('Not Found');
  }

  const findVariantById = (id: string) =>
    product.variants.find((v) => v.id === id);

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id,
  );
  const selectedVariant = findVariantById(selectedVariantId);
  if (!selectedVariant) {
    setSelectedVariantId(product.variants[0].id);
  }

  const [showFullScreen, setShowFullScreen] = useState(false);

  const qtyInCart =
    activeOrder?.lines.find((l) => l.productVariant.id === selectedVariantId)
      ?.quantity ?? 0;

  const [featuredAsset, setFeaturedAsset] = useState(
    selectedVariant?.featuredAsset,
  );

  useEffect(() => {
    setFeaturedAsset(selectedVariant?.featuredAsset);
  }, [selectedVariant]);

  const handleAddToCartAndCheckout = async (variantId: string) => {
    activeOrderFetcher.submit(
      {
        action: 'addItemToOrderAndCheckout',
        variantId: variantId,
      },
      {
        method: 'post',
        action: '/api/active-order',
      },
    );
  };

  const currentProductVariantLineId = useMemo(() => {
    const lineVariant = activeOrder?.lines?.find(
      (line) => line.productVariant.id === selectedVariantId,
    );
    return lineVariant?.id;
  }, [activeOrder?.lines, selectedVariantId]);

  return (
    <div className="mt-8">
      <Container>
        <Breadcrumbs
          items={
            product.collections[product.collections.length - 1]?.breadcrumbs ??
            []
          }
        ></Breadcrumbs>

        {showFullScreen && product?.featuredAsset?.preview && (
          <FullscreenImage
            imageUrl={product?.featuredAsset?.preview}
            setShowFullScreen={setShowFullScreen}
          />
        )}

        <section className="grid lg:grid-cols-5  mt-8 lg:mt-12 gap-y-12 lg:gap-y-0 lg:gap-x-12">
          <div className="lg:col-span-3">
            <div className="flex lg:flex-row flex-col">
              <div className="lg:order-2">
                <figure
                  className="rounded-lg relative border-2 border-transparent overflow-hidden min-w-full max-w-full w-full"
                  style={{
                    aspectRatio: '103/93',
                  }}
                >
                  <img
                    src={
                      (featuredAsset?.preview ||
                        product.featuredAsset?.preview) + '?w=800'
                    }
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = placeholderImage();
                    }}
                    className="w-full h-full object-center object-cover relative"
                  />

                  <button
                    onClick={() => setShowFullScreen(true)}
                    className="absolute bottom-3 right-3 text-slate-800 h-10 w-10 p-2 rounded-sm bg-slate-100 bg-opacity-50"
                  >
                    <ArrowsPointingOutIcon fontSize={16} />
                  </button>
                </figure>
              </div>
              <div className="mt-3 lg:mt-0">
                {product.assets.length > 1 && (
                  <ScrollableContainer>
                    {product.assets.map((asset) => (
                      <div
                        key={asset.id}
                        // type="button"
                        // title="Thumbnail"
                        className={`basis-1/3 md:basis-1/4 select-none touch-pan-x flex-shrink-0 min-h-[96px] max-h-36 border-2 transition-colors overflow-hidden rounded-lg ${
                          featuredAsset?.id == asset.id
                            ? 'border-black'
                            : 'border-transparent'
                        }`}
                        onClick={() => {
                          setFeaturedAsset(asset);
                        }}
                      >
                        <img
                          draggable="false"
                          className="select-none h-full w-full object-cover"
                          alt="Thumbnail"
                          src={
                            asset.preview +
                            '?preset=full' /* not ideal, but technically prevents loading 2 seperate images */
                          }
                          onError={(e) => {
                            e.currentTarget.src = placeholderImage();
                          }}
                        />
                      </div>
                    ))}
                  </ScrollableContainer>
                )}
              </div>
            </div>
          </div>
          <div className="lg:row-span-2 lg:col-span-2 ">
            <div className="lg:sticky lg:top-5 lg:max-h-screen lg:overflow-auto lg:pb-10">
              <h1 className="sm:text-3xl text-2xl font-bold">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <span className="text-zinc-500">{selectedVariant?.sku}</span>
                <StockLevelLabel stockLevel={selectedVariant?.stockLevel} />
              </div>
              <div className="mt-5 flex items-center">
                <Rating rating={4.6} />
                <span className="ml-2 text-sm font-medium text-zinc-400">
                  {product?.reviews?.totalItems} reviews
                </span>
                {product.totalSold > 0 && (
                  <div className="ml-2 text-primary bg-primary/10 text-sm font-medium px-3 w-fit rounded-full">
                    {product.totalSold} items sold.
                  </div>
                )}
              </div>
              <activeOrderFetcher.Form method="post" action="/api/active-order">
                <div className="mt-8 flex items-center">
                  <PriceWithDiscount
                    currencyCode={selectedVariant?.currencyCode!}
                    priceWithTax={selectedVariant?.priceWithTax!}
                    markedPrice={selectedVariant?.customFields?.mrp}
                  ></PriceWithDiscount>
                </div>

                <input type="hidden" name="action" value="addItemToOrder" />
                {1 < product.variants.length ? (
                  <div className="mt-4">
                    <label
                      htmlFor="option"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select option
                    </label>
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      id="productVariant"
                      value={selectedVariantId}
                      name="variantId"
                      onChange={(e) => {
                        setSelectedVariantId(e.target.value);

                        const variant = findVariantById(e.target.value);
                        if (variant) {
                          setFeaturedAsset(variant!.featuredAsset);
                        }
                      }}
                    >
                      {product.variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <input
                    type="hidden"
                    name="variantId"
                    value={selectedVariantId}
                  ></input>
                )}

                <div className="mt-10 flex items-center space-x-2 flex-wrap gap-3">
                  {!!currentProductVariantLineId && (
                    <QuantityAdjuster
                      lineId={currentProductVariantLineId}
                      quantity={qtyInCart}
                    />
                  )}
                  <Button
                    type="submit"
                    size="l"
                    disabled={
                      activeOrderFetcher.state !== 'idle' ||
                      selectedVariant?.stockLevel === 'OUT_OF_STOCK'
                    }
                  >
                    {qtyInCart ? (
                      <span className="flex items-center">
                        <CheckIcon className="w-5 h-5 mr-1" /> {qtyInCart} in
                        cart
                      </span>
                    ) : activeOrderFetcher.state === 'submitting' ? (
                      <span className="flex items-center gap-3">
                        Adding
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      </span>
                    ) : (
                      <span>Add to Cart</span>
                    )}
                  </Button>
                  {!qtyInCart ? (
                    <Button
                      onClick={() =>
                        handleAddToCartAndCheckout(selectedVariantId)
                      }
                      type="button"
                      size="l"
                      className="bg-primary/20 !text-primary hover:!text-white"
                    >
                      Buy Now <ArrowRightIcon width={20} />
                    </Button>
                  ) : (
                    <Button
                      to="/checkout"
                      size="l"
                      className="bg-white !text-primary hover:!text-white border "
                    >
                      Checkout <ArrowRightIcon width={20} />
                    </Button>
                  )}
                </div>

                {addItemToOrderError && (
                  <div className="mt-4">
                    <Alert message={addItemToOrderError} />
                  </div>
                )}
              </activeOrderFetcher.Form>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center space-x-2">
                  <GlobeAmericasIcon className="w-5 h-5 text-zinc-500" />
                  <span className="text-sm font-medium text-zinc-500">
                    Fast delivery
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CreditCardIcon className="w-5 h-5 text-zinc-500" />
                  <span className="text-sm font-medium text-zinc-500">
                    100% Secured Payment
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5 text-zinc-500" />
                  <span className="text-sm font-medium text-zinc-500">
                    Authentic and Genuine Products
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 lg:col-span-3">
            <div className="border-b border-zinc-200">
              <nav
                className="flex sm:space-x-14 space-x-8 "
                style={{ marginBottom: '-1px' }}
              >
                {tabs.map((tab) => (
                  <div
                    key={tab}
                    onClick={() => setCurrentTab(tab)}
                    className={clsx(
                      currentTab != tab
                        ? 'text-zinc-500'
                        : 'text-zinc-900 border-b-2 border-zinc-900',
                      'py-4 whitespace-nowrap  font-medium text-sm cursor-pointer',
                    )}
                  >
                    {tab}
                  </div>
                ))}
              </nav>
            </div>

            <main className="sm:mt-12 mt-8">
              {currentTab === 'Description' ? (
                <article className="prose prose-zinc prose-img:w-full prose-img:rounded-md">
                  <h1>{product.name}</h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </article>
              ) : (
                <>
                  <article className="space-y-8">
                    {reviews.map((review) => (
                      <Review key={review.id} {...review} />
                    ))}
                  </article>
                  {/* <div className='lg:mt-16 sm:mt-12 mt-8'>
                  <button className='text-zinc-400 uppercase font-bold text-xs flex items-center'>
                    <ArrowPathIcon width="1rem" />
                    <span className='ml-2'>Load more reviews</span>
                  </button>
                </div> */}
                </>
              )}
            </main>
          </div>
        </section>
        {product?.customFields?.upSell &&
          product?.customFields?.upSell?.length > 0 && (
            <div className="my-12 space-y-6">
              <h2
                id="category-heading"
                className="text-2xl text-gray-900 sm:text-3xl"
              >
                You may also like
              </h2>

              <HorizontalScrollableContainer>
                {product?.customFields?.upSell?.map((product, index) => (
                  <ProductCardForScrollableContainer
                    key={product.id}
                    productId={product.id}
                    currencyCode={product?.variants[0]?.currencyCode}
                    priceWithTax={product?.variants[0]?.priceWithTax as any}
                    productName={product.name}
                    slug={product.slug}
                    productAsset={product.featuredAsset as SearchResultAsset}
                    rating={index % 2 == 0 ? 4.5 : 5}
                  />
                ))}
              </HorizontalScrollableContainer>
            </div>
          )}
        {product?.customFields?.crossSell &&
          product?.customFields?.crossSell?.length > 0 && (
            <div className="my-12 space-y-6">
              <h2
                id="category-heading"
                className="text-2xl text-gray-900 sm:text-3xl"
              >
                Similar Purchases
              </h2>
              <HorizontalScrollableContainer>
                {product?.customFields?.crossSell?.map((product, index) => (
                  <ProductCardForScrollableContainer
                    key={product.id}
                    productId={product.id}
                    currencyCode={product?.variants[0]?.currencyCode}
                    priceWithTax={product?.variants[0]?.priceWithTax as any}
                    productName={product.name}
                    slug={product.slug}
                    productAsset={product.featuredAsset as SearchResultAsset}
                    rating={index % 2 == 0 ? 4.5 : 5}
                  />
                ))}
              </HorizontalScrollableContainer>
            </div>
          )}
      </Container>
    </div>
  );
}

export function CatchBoundary() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        Product not found!
      </h2>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
        {/* Image gallery */}
        <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <span className="rounded-md overflow-hidden">
            <div className="w-full h-96 bg-slate-200 rounded-lg flex content-center justify-center">
              <PhotoIcon className="w-48 text-white"></PhotoIcon>
            </div>
          </span>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="">We couldn't find any product at that address!</div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAddItemToOrderError(error?: ErrorResult): string | undefined {
  if (!error || !error.errorCode) {
    return undefined;
  }
  switch (error.errorCode) {
    case ErrorCode.OrderModificationError:
    case ErrorCode.OrderLimitError:
    case ErrorCode.NegativeQuantityError:
    case ErrorCode.InsufficientStockError:
      return error.message;
  }
}
