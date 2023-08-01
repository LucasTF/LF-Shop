import { ComponentProps } from "react";
import { Link, LinkProps } from "react-router-dom";
import { tv, VariantProps } from "tailwind-variants";

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    text: string;
    icon?: React.ReactNode;
  };

type ButtonLinkProps = LinkProps &
  VariantProps<typeof button> & {
    text: string;
    icon?: React.ReactNode;
  };

const button = tv({
  slots: {
    base: "flex p-2 items-center cursor-pointer rounded w-fit",
  },
  variants: {
    mode: {
      confirm: "bg-green-700 hover:bg-green-600 transition duration-200",
      danger: "bg-red-700 hover:bg-red-600 transition duration-200",
      default: "hover:text-cyan-500 transition duration-200",
    },
    disabled: {
      true: "disabled:bg-gray-600 disabled:cursor-not-allowed",
    },
  },
  defaultVariants: {
    mode: "default",
  },
});

export const Button = ({
  text,
  icon,
  mode,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={button({ disabled, mode }).base({ className })}
      onClick={props.onClick}
      {...props}
    >
      {icon}
      <span className={icon ? "ml-2" : ""}>{text}</span>
    </button>
  );
};

export const ButtonLink = ({
  text,
  icon,
  mode,
  className,
  children,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      {...props}
      className={button({ mode }).base({ className })}
      onClick={props.onClick}
    >
      {icon}
      <span className={icon ? "ml-2" : ""}>{text}</span>
      {children}
    </Link>
  );
};
