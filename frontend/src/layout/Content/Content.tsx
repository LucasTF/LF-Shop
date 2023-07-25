const Content = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"main">) => {
  return (
    <main
      {...props}
      className="text-white pt-16 md:w-11/12 lg:w-3/4 md:mx-auto"
    >
      {children}
    </main>
  );
};
export default Content;
