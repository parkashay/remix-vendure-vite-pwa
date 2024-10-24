import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Form, PrefetchPageLinks } from '@remix-run/react';

export function SearchBar({
  onSubmit,
}: {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  let initialQuery = '';
  if (typeof window === 'undefined') {
    // running in a server environment
  } else {
    // running in a browser environment
    initialQuery = new URL(window.location.href).searchParams.get('q') ?? '';
  }

  return (
    <Form
      method="get"
      action="/search"
      key={initialQuery}
      className="flex h-10 w-full group"
      onSubmit={onSubmit}
    >
      <input
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder="What's on your mind today?"
        className="w-full rounded-l-full border border-r-0 border-subdued peer focus:border-black px-4 text-sm focus:ring-0"
      />
      <button
        type="submit"
        className="flex h-10 items-center space-x-3 rounded-r-full border border-subdued peer-focus:border-black px-4 text-brand"
      >
        <MagnifyingGlassIcon width="16" color="#414141" />
        <div>Search</div>
      </button>
      <PrefetchPageLinks
        page={
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/search'
            : 'https://demo.hyperce.io/search'
        }
      />
    </Form>
  );
}
