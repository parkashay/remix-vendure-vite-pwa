import { Link } from '@remix-run/react';
import clsx from 'clsx';
import { CollectionsQuery } from '~/generated/graphql';
import resolveImage, { placeholderImage } from '~/utils/image-helper';

export function CollectionCard({
  collection,
  noWrap = false,
}: {
  collection: CollectionsQuery['collections']['items'][number];
  noWrap?: boolean;
}) {
  return (
    <Link
      to={'/collections/' + collection.slug}
      prefetch="intent"
      key={collection.id}
      className={clsx(
        'relative group block overflow-hidden rounded aspect-square',
        {
          'min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px]': noWrap,
        },
      )}
    >
      <div className="overflow-hidden aspect-square">
        <img
          src={resolveImage(
            collection.featuredAsset?.preview ??
              collection.featuredAsset?.preview,
            350,
            350,
          )}
          alt={collection.name}
          onError={(e) => {
            e.currentTarget.src = placeholderImage(350, 350);
          }}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125 rounded"
        />
      </div>
      {/* <span
        aria-hidden="true"
        className="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
      /> */}
      <div className="absolute left-3 top-3">
        <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">
          {collection.name}
        </p>
      </div>
    </Link>
  );
}
