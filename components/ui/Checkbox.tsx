import { InputHTMLAttributes, ReactNode, useId } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
};

const Checkbox = ({
  id,
  label,
  description,
  error,
  className,
  ...props
}: Props) => {
  const autoId = useId();
  const inputId = id || autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={className}>
      <input id={inputId} type="checkbox" {...props} />
      <label htmlFor={inputId}>{label}</label>
      {description && (
        <p id={descriptionId} className="text-gray-500">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
