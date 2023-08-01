import { tv } from "tailwind-variants";

const content = tv({
  slots: {
    base: "flex-1 text-white py-16 max-sm:px-4 md:w-11/12 md:mx-auto lg:w-4/5",
  },
});

const Content = ({
  children,
  className,
  ...props
}: React.ComponentProps<"main">) => {
  return (
    <main {...props} className={content().base({ className })}>
      {children}
    </main>
  );
};
export default Content;
