import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export function FiltersButton({
  filterCount,
  onClick,
}: {
  filterCount: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex space-x-2 items-center border rounded p-2 ml-4 sm:ml-6 text-gray-900 hover:text-gray-800 lg:hidden"
      onClick={onClick}
    >
      {!!filterCount ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500 text-white">
          {filterCount}
        </span>
      ) : (
        ''
      )}
      <span>Filters</span>
      <AdjustmentsHorizontalIcon className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
