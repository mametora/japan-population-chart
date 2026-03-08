import { ReactNode, useId } from "react";
import {
  Checkbox,
  CheckboxIndicator,
  type CheckboxProps,
} from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";

type Props = Omit<CheckboxProps, "className"> & {
  label: ReactNode;
  className?: string;
};

const StyledCheckbox = ({ id, label, className, ...props }: Props) => {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={className}>
      <Checkbox
        id={inputId}
        className="bg-white dark:bg-gray-900 transition w-6 h-6 rounded flex items-center justify-center inset-shadow-sm inset-shadow-black/10 dark:inset-shadow-white/10"
        {...props}
      >
        <CheckboxIndicator>
          <CheckIcon />
        </CheckboxIndicator>
      </Checkbox>
      <Label htmlFor={inputId}>{label}</Label>
    </div>
  );
};

export default StyledCheckbox;
