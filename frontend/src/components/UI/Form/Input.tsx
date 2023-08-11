import { forwardRef, ComponentProps, LegacyRef } from "react";
import { VariantProps, tv } from "tailwind-variants";

type InputProps = ComponentProps<"input"> & VariantProps<typeof input>;

const input = tv({
  slots: {
    base: "bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded block w-full p-2.5",
  },
  variants: {
    isInvalid: {
      true: "bg-red-400 border-red-500 placeholder-red-700",
    },
  },
});

const Input = forwardRef(
  (
    { className, isInvalid, ...props }: InputProps,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <input
        className={input({ isInvalid }).base({ className })}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
