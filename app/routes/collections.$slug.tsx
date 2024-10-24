import { MetaFunction, useLoaderData } from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { useRef, useState } from 'react';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import Container from '~/components/Container';
import { FiltersButton } from '~/components/FiltersButton';
import { CollectionCard } from '~/components/collections/CollectionCard';
import FacetFilterControls from '~/components/facet-filter/FacetFilterControls';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { ProductCard } from '~/components/products/ProductCard';
import { APP_META_TITLE } from '~/constants';
import { filteredSearchLoader } from '~/utils/filtered-search-loader';
import { sdk } from '~/graphqlWrapper';

export const meta: MetaFunction = ({ data }) => {
  return [
    {
      //@ts-ignore
      title: data?.collection
        ? //@ts-ignore
          `${data.collection?.name} - ${APP_META_TITLE}`
        : APP_META_TITLE,
    },
  ];
};

export async function loader({ params, request, context }: DataFunctionArgs) {
  const { result, resultWithoutFacetValueFilters, facetValueIds } =
    await filteredSearchLoader({
      params,
      request,
      context,
    });
  const collection = (await sdk.collection({ slug: params.slug })).collection;
  if (!collection?.id || !collection?.name) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return {
    collection,
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  };
}

export default function CollectionSlug() {
  const { collection, result, resultWithoutFacetValueFilters, facetValueIds } =
    useLoaderData<typeof loader>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );
  return (
    <Container>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {collection.name}
        </h2>

        <FiltersButton
          filterCount={facetValueIds.length}
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>

      <Breadcrumbs items={collection.breadcrumbs}></Breadcrumbs>
      {collection.children?.length != 0 && (
        <h2 className="mt-8 sm:text-3xl text-2xl">Collections</h2>
      )}
      {collection.children?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {collection.children.map((child) => (
            <CollectionCard key={child.id} collection={child}></CollectionCard>
          ))}
        </div>
      ) : (
        ''
      )}

      <div className="mt-6 grid sm:grid-cols-5 gap-x-4">
        <FacetFilterControls
          facetFilterTracker={facetValuesTracker.current}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />
        <div className="sm:col-span-5 lg:col-span-4">
          <div className="grid gap-y-10 gap-x-6 grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {result.items.map((item, index) => (
              <ProductCard
                key={item.productId}
                {...item}
                rating={index % 2 === 0 ? 4 : 5}
              ></ProductCard>
            ))}
          </div>
        </div>
      </div>

      {collection.children?.length === 0 && result.items.length === 0 ? (
        <CategoryNotFound title="Empty Collection, Please check back later!" />
      ) : (
        ''
      )}
    </Container>
  );
}

export function CatchBoundary() {
  return (
    <Container>
      <CategoryNotFound />
    </Container>
  );
}

function CategoryNotFound({ title }: { title?: string }) {
  return (
    <>
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        {title ?? 'Collection not found!'}
      </h2>
      <div className="h-[50vh]"></div>
      {/* <div className="mt-6 grid sm:grid-cols-4 gap-x-4">
        <div className="space-y-6 mb-4">
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="sm:col-span-4 lg:col-span-4">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div className="relative">
              <div className="h-64 bg-slate-200 rounded"></div>
              <div className="absolute left-3 top-3">
                <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">
                  <div className="h-2 bg-slate-200 rounded col-span-1 w-20"></div>
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="h-64 bg-slate-200 rounded"></div>
              <div className="absolute left-3 top-3">
                <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">
                  <div className="h-2 bg-slate-200 rounded col-span-1 w-20"></div>
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="h-64 bg-slate-200 rounded"></div>
              <div className="absolute left-3 top-3">
                <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">
                  <div className="h-2 bg-slate-200 rounded col-span-1 w-20"></div>
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="h-64 bg-slate-200 rounded"></div>
              <div className="absolute left-3 top-3">
                <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">
                  <div className="h-2 bg-slate-200 rounded col-span-1 w-20"></div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
