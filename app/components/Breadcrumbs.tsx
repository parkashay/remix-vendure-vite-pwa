import { Link } from '@remix-run/react';

export function Breadcrumbs({
  items,
}: {
  items: { name: string; slug: string; id: string }[];
}) {
  return (
    <nav className="flex " aria-label="Breadcrumb">
      <ol role="list" className="flex items-center">
        <li>
          <div>
            <Link
              to="/"
              prefetch="intent"
              className="text-zinc-500 hover:text-zinc-800 text-base leading-tight"
            >
              Home
            </Link>
          </div>
        </li>
        {items
          .filter((item) => item.name !== '__root_collection__')
          .map((item, index) => (
            <li key={item.name}>
              <div className="flex items-center">
                <svg
                  className="text-zinc-300 shrink-0 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                </svg>
                <Link
                  to={'/collections/' + item.slug}
                  prefetch="intent"
                  className=" text-zinc-500 hover:text-zinc-800 text-base leading-tight"
                >
                  {item.name}
                </Link>
              </div>
            </li>
          ))}
      </ol>
    </nav>
  );
}
