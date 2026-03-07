import { ReactNode, useId, useState } from "react";

type RadioOption<T extends string> = {
  value: T;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

type Props<T extends string> = {
  name: string;
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  options: RadioOption<T>[];
  legend?: ReactNode;
  error?: ReactNode;
  direction?: "horizontal" | "vertical" | "inline";
};

const Radio = <T extends string>({
  name,
  value,
  defaultValue,
  onValueChange,
  options,
  legend,
  error,
  direction = "vertical",
}: Props<T>) => {
  const groupId = useId();
  const errorId = error ? `${groupId}-error` : undefined;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || undefined);

  const currentValue = isControlled ? value : internalValue;

  const handleChange = (value: T) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onValueChange?.(value);
  };

  return (
    <fieldset
      className={`flex ${direction === "horizontal" ? "flex-row" : "flex-col"} gap-2`}
    >
      {legend && <legend>{legend}</legend>}

      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <input
            id={`${groupId}-${option.value}`}
            name={name}
            type="radio"
            value={option.value}
            checked={currentValue === option.value}
            onChange={() => handleChange(option.value)}
            disabled={option.disabled}
          />

          <label htmlFor={`${groupId}-${option.value}`}>{option.label}</label>
          {option.description && (
            <p
              id={`${groupId}-${option.value}-description`}
              className="text-gray-500"
            >
              {option.description}
            </p>
          )}
        </div>
      ))}
      {error && (
        <p id={errorId} className="text-red-500">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default Radio;
