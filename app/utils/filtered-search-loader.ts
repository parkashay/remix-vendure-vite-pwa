import { DataFunctionArgs } from '@remix-run/cloudflare';
import { search, searchFacetValues } from '~/providers/products/products';
import { sdk } from '~/graphqlWrapper';
import { DEFAULT_PAGE_SIZE } from '~/constants';

/**
 * This loader deals with loading product searches, which is used in both the search page and the
 * category list page.
 */
export async function filteredSearchLoader({
  params,
  request,
}: DataFunctionArgs) {
  const url = new URL(request.url);
  const term = url.searchParams.get('q');
  const facetValueIds = url.searchParams.getAll('fvid');
  const page = url.searchParams.get('page');

  let resultPromises: [
    ReturnType<typeof search>,
    ReturnType<typeof searchFacetValues>,
  ];
  const searchResultPromise = search(
    {
      input: {
        groupByProduct: true,
        term,
        facetValueFilters: [{ or: facetValueIds }],
        collectionSlug: params.slug,
        take: DEFAULT_PAGE_SIZE,
        skip: Math.max(Number(page) - 1 || 0, 0) * DEFAULT_PAGE_SIZE,
      },
    },
    { request },
  );
  if (facetValueIds.length) {
    resultPromises = [
      searchResultPromise,
      searchFacetValues(
        {
          input: {
            groupByProduct: true,
            term,
            collectionSlug: params.slug,
          },
        },
        { request },
      ),
    ];
  } else {
    resultPromises = [searchResultPromise, searchResultPromise];
  }
  const [result, resultWithoutFacetValueFilters] = await Promise.all(
    resultPromises,
  );
  return {
    term,
    facetValueIds,
    result: result.search,
    resultWithoutFacetValueFilters: resultWithoutFacetValueFilters.search,
  };
}
