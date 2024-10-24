import gql from 'graphql-tag';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export function getMetadata(options: QueryOptions) {
  return sdk.metadata({}, options);
}

gql`
  query metadata {
    metadata {
      bannerImage {
        preview
      }
      bannerTitle
      bannerSubtitle
      hotProducts {
        id
        name
        slug
        featuredAsset {
          preview
        }
        variants {
          id
          priceWithTax
          currencyCode
        }
      }
    }
  }
`;
