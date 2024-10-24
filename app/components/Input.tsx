import clsx from 'clsx';
import React from 'react';
import { useField } from 'remix-validated-form';
import FormElement from './FormElement';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'placeholder'
> & {
  label?: string;
  name: string;
};

export const ValidatedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, required, title, ...props }, ref) => {
    const { error, getInputProps } = useField(name);

    return (
      <FormElement name={name} label={label} required={required}>
        <input
          ref={ref}
          title={label}
          {...props}
          {...getInputProps()}
          className={clsx(
            'appearance-none caret-zinc-900 text-zinc-900 font-normal text-sm block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed',
            {
              'border-rose-500 focus:border-rose-500': error,
            },
            props.className,
          )}
        >
          {props.children}
        </input>
      </FormElement>
    );
  },
);

export default function Input({
  label,
  error,
  name,
  className,
  title,
  required,
  ...rest
}: {
  label?: string;
  error?: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-base text-zinc-900 capitalize"
      >
        {label ?? name}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={name}
        title={label}
        required={required}
        name={name}
        className={clsx(
          'appearance-none mt-2 caret-zinc-900 text-zinc-900 font-normal text-sm block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed',
          {
            'border-rose-500 focus:border-rose-500': error,
          },
        )}
        {...rest}
      />
      {error && <div className="text-xs text-red-700 mt-1">{error}</div>}
    </div>
  );
}
