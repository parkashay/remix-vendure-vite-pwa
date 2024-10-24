import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type HighlightedButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
  isSubmitting?: boolean;
};

export function HighlightedButton({
  isSubmitting = false,
  ...props
}: HighlightedButtonProps) {
  return (
    <button
      disabled={isSubmitting}
      {...props}
      className={clsx(
        'max-w-max focus:outline-none text-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 w-full relative text-sm border-none rounded-full group transition-all overflow-hidden duration-700  whitespace-nowrap',
        'disabled:opacity-50 disabled:hover:opacity-30 py-3 px-5 bg-primary-700 text-white',
        props.className,
      )}
    >
      <div className="z-2 flex items-center justify-around gap-2 whitespace-nowrap relative">
        {props.children}
        {isSubmitting && (
          <ArrowPathIcon className="w-4 h-4 animate-spin"></ArrowPathIcon>
        )}
      </div>
      <div className="absolute bg-primary rounded-full w-[110%] aspect-square left-1/2 -translate-x-1/2 top-1/2 translate-y-1/3 transition-all duration-700 group-hover:-translate-y-1/2 z-1" />
    </button>
  );
}
