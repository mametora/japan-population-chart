import { ReactNode } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupSingleProps,
  type ToggleGroupMultipleProps,
} from "@radix-ui/react-toggle-group";

type ToggleGroupOption =
  | string
  | {
      value: string;
      label: ReactNode;
    };

type BaseProps = {
  options: readonly ToggleGroupOption[];
};

type Props =
  | (ToggleGroupSingleProps & BaseProps)
  | (ToggleGroupMultipleProps & BaseProps);

const StyledToggleGroup = ({ className, options, ...props }: Props) => {
  return (
    <ToggleGroup
      className={`inline-flex rounded-sm bg-gray-100 dark:bg-gray-800 shadow-sm shadow-black/10 dark:shadow-white/5 ${className}`}
      {...props}
    >
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;

        return (
          <ToggleGroupItem
            className="flex items-center justify-center p-2 ml-px first:ml-0 first:rounded-l-sm last:rounded-r-sm bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 data-[state=on]:bg-gray-100 data-[state=on]:dark:bg-gray-600"
            key={value}
            value={value}
          >
            {label}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};

export default StyledToggleGroup;
