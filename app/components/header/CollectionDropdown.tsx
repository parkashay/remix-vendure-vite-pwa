import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from '@remix-run/react';
import { CollectionsQuery } from '~/generated/graphql';

interface Props {
  collections: CollectionsQuery['collections']['items'];
}
export function CollectionDropdown({ collections }: Props) {
  const navigate = useNavigate();
  return (
    <section className="hidden lg:flex cursor-pointer items-center space-x-2 rounded-sm px-2 py-3 group relative">
      <div>
        <svg
          className="text-black w-4"
          width={'16'}
          height={'16'}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_299_1717)">
            <path
              d="M2.5 3.5C2.36739 3.5 2.24021 3.44732 2.14645 3.35356C2.05268 3.25979 2 3.13261 2 3C2 2.86739 2.05268 2.74022 2.14645 2.64645C2.24021 2.55268 2.36739 2.5 2.5 2.5H13.5C13.6326 2.5 13.7598 2.55268 13.8536 2.64645C13.9473 2.74022 14 2.86739 14 3C14 3.13261 13.9473 3.25979 13.8536 3.35356C13.7598 3.44732 13.6326 3.5 13.5 3.5H2.5ZM4.5 1.5C4.36739 1.5 4.24021 1.44732 4.14645 1.35356C4.05268 1.25979 4 1.13261 4 1C4 0.867394 4.05268 0.740217 4.14645 0.646449C4.24021 0.55268 4.36739 0.500002 4.5 0.500002H11.5C11.6326 0.500002 11.7598 0.55268 11.8536 0.646449C11.9473 0.740217 12 0.867394 12 1C12 1.13261 11.9473 1.25979 11.8536 1.35356C11.7598 1.44732 11.6326 1.5 11.5 1.5H4.5ZM0 13C0 13.3978 0.158035 13.7794 0.43934 14.0607C0.720644 14.342 1.10218 14.5 1.5 14.5H14.5C14.8978 14.5 15.2794 14.342 15.5607 14.0607C15.842 13.7794 16 13.3978 16 13V6C16 5.60218 15.842 5.22065 15.5607 4.93934C15.2794 4.65804 14.8978 4.5 14.5 4.5H1.5C1.10218 4.5 0.720644 4.65804 0.43934 4.93934C0.158035 5.22065 0 5.60218 0 6L0 13ZM1.5 13.5C1.36739 13.5 1.24021 13.4473 1.14645 13.3536C1.05268 13.2598 1 13.1326 1 13V6C1 5.86739 1.05268 5.74022 1.14645 5.64645C1.24021 5.55268 1.36739 5.5 1.5 5.5H14.5C14.6326 5.5 14.7598 5.55268 14.8536 5.64645C14.9473 5.74022 15 5.86739 15 6V13C15 13.1326 14.9473 13.2598 14.8536 13.3536C14.7598 13.4473 14.6326 13.5 14.5 13.5H1.5Z"
              fill={'currentColor'}
            />
          </g>
          <defs>
            <clipPath id="clip0_299_1717">
              <rect width="16" height="16" fill="none" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div
        className="mr-1 text-sm font-medium text-[#202223]"
        onClick={() => navigate('/collections')}
      >
        Collections
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
    </section>
  );
}
