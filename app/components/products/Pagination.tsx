import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { classNames } from '~/utils/class-names';

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}) {
  if (Number.isNaN(Number(totalPages)) || currentPage > totalPages) return null;
  let pages = [];
  for (let i = Math.max(currentPage - 2, 1); i <= totalPages; i++) {
    if (pages.length < 4) {
      pages.push(i);
    } else {
      break;
    }
  }
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={currentPage <= 1}
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
        className={classNames(
          'bg-white text-primary p-1 rounded',
          currentPage < 1 ? 'opacity-50' : '',
        )}
      >
        <ArrowLeftIcon className="text-primary h-3 w-3" />
      </button>
      {pages.map((pageNumber) => (
        <button
          key={`page-button-${pageNumber}`}
          onClick={() => onPageChange(pageNumber)}
          className={classNames(
            'bg-white text-primary px-1.5 rounded',
            pageNumber === currentPage ? 'bg-primary !text-white' : '',
          )}
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={currentPage >= totalPages}
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        className={classNames(
          'bg-white text-primary p-1 rounded',
          currentPage >= totalPages ? 'opacity-50' : '',
        )}
      >
        <ArrowRightIcon className="text-primary h-3 w-3" />
      </button>
    </div>
  );
}
