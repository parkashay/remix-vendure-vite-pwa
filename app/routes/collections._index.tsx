import { useLoaderData } from '@remix-run/react';
import { json, LoaderArgs } from '@remix-run/server-runtime';
import { CollectionCard } from '~/components/collections/CollectionCard';
import Container from '~/components/Container';
import { getCollections } from '~/providers/collections/collections';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request);
  const filteredCollections = collections.filter(
    (collection) =>
      collection.parent?.name.toLowerCase() !== 'brands' &&
      collection.name.toLowerCase() !== 'brands' &&
      collection?.parent?.name === '__root_collection__',
  );
  return json({ collections: filteredCollections });
}

export default function Brands() {
  const { collections } = useLoaderData<typeof loader>();
  return (
    <Container>
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        Collections
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </Container>
  );
}
