import {
  CreditCardIcon,
  GiftIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { useRef, WheelEvent } from 'react';
import Container from '~/components/Container';
import { CollectionCard } from '~/components/collections/CollectionCard';
import Hero from '~/components/hero/Hero';
import { ProductCard } from '~/components/products/ProductCard';
import { SortOrder } from '~/generated/graphql';
import { activeChannel } from '~/providers/channel/channel';
import { getProducts } from '~/providers/products/products';
import { placeholderImage } from '~/utils/image-helper';
import { useRootLoader } from '~/utils/use-root-loader';

export async function loader({ request }: LoaderFunctionArgs) {
  const channel = await activeChannel({ request });

  const bannerImage = channel?.customFields?.bannerImage;
  const recentProducts = await getProducts(
    { take: 12, sort: { createdAt: SortOrder.Desc } },
    { request },
  );
  const mostSoldProducts = await getProducts(
    { take: 12, sort: { sold: SortOrder.Desc } },
    { request },
  );
  return {
    hotProducts: channel?.customFields?.hotProducts,
    bannerImage,
    bannerTitle: channel?.customFields?.bannerTitle,
    bannerSubtitle: channel?.customFields?.bannerSubtitle,
    recentProducts: recentProducts?.products?.items,
    mostSoldProducts: mostSoldProducts?.products?.items,
  };
}

const services = [
  {
    icon: GiftIcon,
    title: 'Exclusive Offers',
    description:
      'Grab up to 50% off on selected clothes from our exclusive collection. Don’t miss out on these limited-time offers!',
  },
  {
    icon: CreditCardIcon,
    title: 'Secure Payment Options',
    description:
      'We prioritize your security. Our secure payment options ensure that your transactions are protected, and your personal information is safe',
  },
  {
    icon: TruckIcon,
    title: 'Free Worldwide Delivery',
    description:
      'Enjoy free delivery on all orders, regardless of where you are located. We aim to make your shopping experience as seamless as possible',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality Products',
    description:
      'We use only the finest materials to ensure they are long-lasting and of the highest quality',
  },
];

export default function Index() {
  const {
    hotProducts,
    bannerImage,
    bannerTitle,
    bannerSubtitle,
    recentProducts,
    mostSoldProducts,
  } = useLoaderData<typeof loader>();

  const collections = useRootLoader()?.collections;

  const sliderRef = useRef<HTMLDivElement>(null);
  const handleWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="pt-4">
        <Container>
          <Hero
            bannerImageUrl={
              bannerImage?.preview ?? placeholderImage(1000, 1000)
            }
            bannerTitle={bannerTitle}
            bannerSubtitle={bannerSubtitle}
          />
        </Container>
      </section>
      <section
        aria-labelledby="category-heading"
        className="pt-12"
        id="category"
      >
        <Container>
          <h2
            id="category-heading"
            className="text-2xl text-gray-900 sm:text-3xl"
          >
            Shop by Category
          </h2>

          <div className="mt-4">
            <div className="-my-2 h-[200px] overflow-hidden">
              <div
                onWheel={handleWheelScroll}
                ref={sliderRef}
                className="flex items-center gap-3 overflow-x-auto pb-3 overscroll-contain"
              >
                {collections.map((collection) => (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                    noWrap
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>

        {!!hotProducts && hotProducts?.length > 0 && (
          <Container>
            <div className="my-12 space-y-6">
              <h2
                id="category-heading"
                className="text-2xl text-gray-900 sm:text-3xl"
              >
                Hot Products
              </h2>

              <div className="grid grid-cols-2 gap-6 mt-4 lg:mt-5 lg:gap-4 lg:grid-cols-4">
                {hotProducts?.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    productId={product.id}
                    currencyCode={product?.variants[0]?.currencyCode}
                    priceWithTax={product?.variants[0]?.priceWithTax as any}
                    productName={product.name}
                    slug={product.slug}
                    productAsset={product?.featuredAsset as any}
                    rating={index % 2 == 0 ? 4.5 : 5}
                  />
                ))}
              </div>
            </div>
          </Container>
        )}

        {!!recentProducts && recentProducts?.length > 0 && (
          <Container>
            <div className="my-12 space-y-6">
              <h2
                id="category-heading"
                className="text-2xl text-gray-900 sm:text-3xl"
              >
                Recent Products
              </h2>

              <div className="grid grid-cols-2 gap-6 mt-4 lg:mt-5 lg:gap-4 lg:grid-cols-4">
                {recentProducts?.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    productId={product.id}
                    currencyCode={product?.variants[0]?.currencyCode}
                    priceWithTax={product?.variants[0]?.priceWithTax as any}
                    productName={product.name}
                    slug={product.slug}
                    productAsset={product?.featuredAsset as any}
                    rating={index % 2 == 0 ? 4.5 : 5}
                  />
                ))}
              </div>
            </div>
          </Container>
        )}

        {!!mostSoldProducts && mostSoldProducts?.length > 0 && (
          <Container>
            <div className="my-12 space-y-6">
              <h2
                id="category-heading"
                className="text-2xl text-gray-900 sm:text-3xl"
              >
                Our Best Sellers
              </h2>

              <div className="grid grid-cols-2 gap-6 mt-4 lg:mt-5 lg:gap-4 lg:grid-cols-4">
                {mostSoldProducts?.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    productId={product.id}
                    currencyCode={product?.variants[0]?.currencyCode}
                    priceWithTax={product?.variants[0]?.priceWithTax as any}
                    productName={product.name}
                    slug={product.slug}
                    productAsset={product?.featuredAsset as any}
                    rating={index % 2 == 0 ? 4.5 : 5}
                  />
                ))}
              </div>
            </div>
          </Container>
        )}

        <div className="mt-20">
          <Container>
            <h1 className="text-2xl text-gray-900 sm:text-3xl">Our Services</h1>
            <section className="grid gap-8 sm:gap-12 md:grid-cols-2 py-10">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="flex space-x-6">
                    <Icon className="w-11 h-11 text-zinc-500" />
                    <div>
                      <h2 className="text-lg font-bold">{service.title}</h2>
                      <p className="text-zinc-600 text-sm mt-3">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </section>
          </Container>
        </div>
      </section>
    </>
  );
}
