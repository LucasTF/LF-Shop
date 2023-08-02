import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const select = tv({
  slots: {
    base: "bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded block w-full p-2.5",
  },
});

const Select = ({
  className,
  children,
  ...props
}: ComponentProps<"select">) => {
  return (
    <select className={select().base({ className })} {...props}>
      {children}
    </select>
  );
};

export default Select;
