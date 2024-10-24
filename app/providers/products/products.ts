import gql from 'graphql-tag';
import { QueryOptions, sdk } from '../../graphqlWrapper';
import { ProductListOptions, SearchQueryVariables } from '~/generated/graphql';

export function search(variables: SearchQueryVariables, options: QueryOptions) {
  return sdk.search(variables, options);
}

export function searchFacetValues(
  variables: SearchQueryVariables,
  options: QueryOptions,
) {
  return sdk.searchFacetValues(variables, options);
}

export function getProductBySlug(slug: string, options: QueryOptions) {
  return sdk.product({ slug }, options);
}

export function getProducts(
  productOptions: ProductListOptions,
  options: QueryOptions,
) {
  return sdk.Products({ options: productOptions }, options);
}

export const detailedProductFragment = gql`
  fragment DetailedProduct on Product {
    id
    name
    description
    slug
    totalSold
    reviews {
      totalItems
      items {
        id
        authorName
        body
        rating
        summary
      }
    }
    customFields {
      upSell {
        id
        name
        slug
        variants {
          id
          name
          priceWithTax
          currencyCode
        }
        featuredAsset {
          id
          preview
        }
      }
      crossSell {
        id
        name
        slug
        variants {
          id
          name
          priceWithTax
          currencyCode
        }
        featuredAsset {
          id
          preview
        }
      }
    }
    collections {
      id
      slug
      name
      breadcrumbs {
        id
        name
        slug
      }
    }
    facetValues {
      facet {
        id
        code
        name
      }
      id
      code
      name
    }
    featuredAsset {
      id
      preview
    }
    assets {
      id
      preview
    }
    variants {
      id
      name
      priceWithTax
      currencyCode
      sku
      stockLevel
      featuredAsset {
        id
        preview
      }
      customFields {
        mrp
      }
    }
  }
`;

gql`
  query product($slug: String, $id: ID) {
    product(slug: $slug, id: $id) {
      ...DetailedProduct
    }
  }
`;

export const listedProductFragment = gql`
  fragment ListedProduct on SearchResult {
    productId
    productName
    slug
    productAsset {
      id
      preview
    }
    currencyCode
    priceWithTax {
      ... on PriceRange {
        min
        max
      }
      ... on SinglePrice {
        value
      }
    }
  }
`;

gql`
  query search($input: SearchInput!) {
    search(input: $input) {
      totalItems
      items {
        ...ListedProduct
      }
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
  ${listedProductFragment}
`;

gql`
  query searchFacetValues($input: SearchInput!) {
    search(input: $input) {
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
  ${listedProductFragment}
`;

gql`
  query Products($options: ProductListOptions) {
    products(options: $options) {
      items {
        ...DetailedProduct
      }
    }
  }
`;
