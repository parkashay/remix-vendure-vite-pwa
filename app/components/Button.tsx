import { Link } from '@remix-run/react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xl' | 'l' | 'm' | 's';
  glow?: boolean;
  to?: string;
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  children: React.ReactNode;
}

export default function Button({
  size = 'l',
  className,
  glow = false,
  to,
  type,
  children,
  fullWidth = false,
  target = '_self',
  onClick,
  variant = 'primary',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <>
      {to == undefined ? (
        <button
          onClick={onClick}
          type={type ?? 'button'}
          style={{ transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)' }}
          className={clsx(
            'block focus:outline-none text-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 w-full relative border-none rounded-full group transition-all overflow-hidden duration-700  whitespace-nowrap',
            className,
            {
              'text-sm': size != 'xl',
              'text-base': size == 'xl',
            },
            {
              'py-1': size === 's',
              'py-2': size === 'm',
              'py-3': size === 'l' || size === 'xl',
            },
            {
              'px-3': size === 's',
              'px-4': size === 'm',
              'px-5': size === 'l' || size === 'xl',
            },
            {
              'max-w-max': !fullWidth,
            },
            {
              'bg-primary-700 text-white': variant === 'primary' && !disabled,
              'text-black bg-white hover:bg-gray-100 transition-colors':
                variant === 'ghost' && !disabled,
              'bg-gray-100 text-gray-400 cursor-not-allowed': disabled,
            },
          )}
          disabled={disabled}
          {...rest}
        >
          <span className="z-2 relative flex gap-2 items-center justify-center text-center whitespace-nowrap">
            {children}
          </span>
          {variant === 'primary' && !disabled && (
            <div className="absolute bg-primary rounded-full w-[110%] aspect-square left-1/2 -translate-x-1/2 top-1/2 translate-y-1/3 transition-all duration-700 group-hover:-translate-y-1/2 z-1" />
          )}
        </button>
      ) : (
        <Link
          // @ts-ignore
          onClick={onClick}
          target={target}
          to={to}
          prefetch="intent"
          role="button"
          style={{ transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)' }}
          className={clsx(
            'block focus:outline-none text-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500  w-full relative border-none rounded-full group transition-all overflow-hidden duration-700  whitespace-nowrap',
            className,
            {
              'text-sm': size != 'xl',
              'text-base': size == 'xl',
            },
            {
              'py-1': size === 's',
              'py-2': size === 'm',
              'py-3': size === 'l' || size === 'xl',
            },
            {
              'px-3': size === 's',
              'px-4': size === 'm',
              'px-5': size === 'l' || size === 'xl',
            },
            {
              'max-w-max': !fullWidth,
            },
            {
              'bg-primary-700 text-white': variant === 'primary' && !disabled,
              'text-black bg-white hover:bg-gray-100 transition-colors':
                variant === 'ghost' && !disabled,
              'bg-gray-100 text-gray-400 cursor-not-allowed': disabled,
            },
          )}
        >
          <span className="z-2 relative flex items-center justify-center gap-2 text-center whitespace-nowrap">
            {children}
          </span>
          {variant === 'primary' && (
            <div className="absolute bg-primary rounded-full w-[110%] aspect-square left-1/2 -translate-x-1/2 top-1/2 translate-y-1/3 transition-all duration-700 group-hover:-translate-y-1/2 z-1" />
          )}
        </Link>
      )}
    </>
  );
}
