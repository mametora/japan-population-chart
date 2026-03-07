import { ElementType, ReactNode } from "react";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

type Props = {
  as?: ElementType;
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

const styles: Record<Variant, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
  h5: "text-lg font-semibold",
  h6: "text-base font-semibold",
  p: "text-base",
};

const Typography = ({ as, variant = "p", className, children }: Props) => {
  const Component = as || variant;

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export default Typography;
