import {ReactNode} from "react";

type Props = {
  children: ReactNode;
  className?: string;
}

const Card = ({
                children,
                className,
}: Props) => {
  return (
    <div className={`p-4 rounded-lg border border-gray-100 dark:border-gray-900 shadow-md shadow-black/10 dark:shadow-white/10 ${className}`}>
      {children}
    </div>
  )
}

export default Card;
