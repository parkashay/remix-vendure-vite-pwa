import { ChevronDownIcon, TagIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from '@remix-run/react';
import { CollectionsQuery } from '~/generated/graphql';

interface Props {
  collections: CollectionsQuery['collections']['items'];
}
export function BrandsDropdown({ collections }: Props) {
  const navigate = useNavigate();
  return (
    <div className="hidden lg:flex cursor-pointer items-center space-x-2 rounded-sm px-2 py-3 group relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 6h.008v.008H6V6Z"
        />
      </svg>

      <div
        className="mr-1 text-sm font-medium text-[#202223]"
        onClick={() => navigate('/brands')}
      >
        Brands
      </div>
      <div>
        <ChevronDownIcon
          className="group-hover:rotate-180 transition-transform w-4"
          fontSize={16}
        />
      </div>

      <div className="absolute top-full z-50 group-hover:block hidden w-52 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <ul className="p-1 max-h-[500px] overflow-y-auto">
          {collections?.map((collection) => (
            <li
              key={collection.id}
              className="relative rounded-md text-sm hover:bg-primary-50/20"
              onClick={(e) => {
                const parent = e.currentTarget?.parentElement?.parentElement;
                parent?.classList.remove('group-hover:block');
                setTimeout(() => {
                  parent?.classList.add('group-hover:block');
                }, 100);
              }}
            >
              <div>
                <Link
                  to={'/collections/' + collection.slug}
                  prefetch="intent"
                  key={collection.id}
                  className="font-semibold text-gray-900 block  px-2 py-2"
                >
                  {collection.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
