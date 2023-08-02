import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const input = tv({
  slots: {
    base: "bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded block w-full p-2.5",
  },
});

const Input = ({ className, ...props }: ComponentProps<"input">) => {
  return <input className={input().base({ className })} {...props} />;
};

export default Input;
