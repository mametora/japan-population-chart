import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-black/10 dark:shadow-white/5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
