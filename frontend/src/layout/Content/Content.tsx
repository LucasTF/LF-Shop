const Content = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"main">) => {
  return (
    <main {...props} className="pt-16">
      {children}
    </main>
  );
};
export default Content;
