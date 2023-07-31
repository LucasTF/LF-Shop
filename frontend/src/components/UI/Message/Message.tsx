import { tv } from "tailwind-variants";

type MessageProps = {
  text: string;
  type: "info" | "success" | "danger";
};

const message = tv({
  slots: {
    base: "p-2 rounded border-2 font-bold",
  },
  variants: {
    type: {
      success: "bg-green-700 border-green-800",
      info: "bg-cyan-700 border-cyan-800",
      danger: "bg-red-700 border-red-800",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

const Message = ({ text, type }: MessageProps) => {
  return <div className={message({ type }).base()}>{text}</div>;
};

export default Message;
