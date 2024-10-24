import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { useField } from 'remix-validated-form';

type FormElementProps = {
  name: string;
  label?: string;
  required?: boolean;
};

const FormElement: React.FC<PropsWithChildren<FormElementProps>> = ({
  children,
  label,
  name,
  required = false,
}) => {
  const { error } = useField(name);

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={clsx('block text-base text-zinc-900 capitalize')}
        >
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className={label && 'mt-2'}>{children}</div>
      {error && (
        <div className="text-xs text-red-700 mt-1">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormElement;
