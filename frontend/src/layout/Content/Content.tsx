const Content = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"main">) => {
  return (
    <main {...props} className="text-white pt-16">
      {children}
    </main>
  );
};
export default Content;
