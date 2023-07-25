type CardProps = React.HTMLAttributes<HTMLElement>;

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={
        "p-2 border-gray-800 border-2 bg-gray-900 shadow-md shadow-gray-900 rounded" +
        " " +
        className
      }
    >
      {children}
    </div>
  );
};
export default Card;
