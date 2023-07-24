import { Link, LinkProps } from "react-router-dom";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
  icon?: React.ReactNode;
}

interface ButtonLinkProps extends LinkProps {
  text: string;
  icon?: React.ReactNode;
}

export const Button = ({ text, icon, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={
        "flex p-2 items-center cursor-pointer rounded" + " " + className
      }
      onClick={props.onClick}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
};

export const ButtonLink = ({
  text,
  icon,
  className,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      {...props}
      className={
        "flex p-2 items-center cursor-pointer rounded" + " " + className
      }
      onClick={props.onClick}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  );
};
