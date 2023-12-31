import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

type MessageProps = ComponentProps<"div"> & {
  type?: "info" | "success" | "danger";
};

const message = tv({
  slots: {
    base: "p-2 rounded border-2",
  },
  variants: {
    type: {
      success: "bg-green-700 border-green-800 font-bold",
      info: "bg-cyan-700 border-cyan-800",
      danger: "bg-red-700 border-red-800 font-bold",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

const Message = ({
  type = "info",
  className,
  children,
  ...props
}: MessageProps) => {
  return (
    <div className={message({ type }).base({ className })} {...props}>
      {children}
    </div>
  );
};

export default Message;
