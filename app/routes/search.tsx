import { Form, useLoaderData, useSearchParams } from '@remix-run/react';
import { useRef, useState } from 'react';
import Container from '~/components/Container';
import { FiltersButton } from '~/components/FiltersButton';
import FacetFilterControls from '~/components/facet-filter/FacetFilterControls';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { Pagination } from '~/components/products/Pagination';
import { ProductCard } from '~/components/products/ProductCard';
import { DEFAULT_PAGE_SIZE } from '~/constants';
import { filteredSearchLoader } from '~/utils/filtered-search-loader';

export const loader = filteredSearchLoader;

export default function Search() {
  const { result, resultWithoutFacetValueFilters, term, facetValueIds } =
    useLoaderData<typeof loader>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? 1;
  const pages = Math.ceil(result.totalItems / DEFAULT_PAGE_SIZE);
  return (
    <Container>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {term ? `Results for "${term}"` : 'All products'}
        </h2>

        <FiltersButton
          filterCount={facetValueIds.length}
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>

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
                rating={index % 2 == 0 ? 4.5 : 5}
              ></ProductCard>
            ))}
          </div>
          <div className="flex justify-end my-6">
            <Pagination
              currentPage={Number(currentPage || 1)}
              totalPages={pages}
              onPageChange={(page) => {
                const params = new URLSearchParams();
                params.set('page', page.toString());
                setSearchParams(params);
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
