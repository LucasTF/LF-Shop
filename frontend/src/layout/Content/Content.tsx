import { tv } from "tailwind-variants";

const content = tv({
  slots: {
    base: "flex-1 text-white pt-16 md:w-11/12 lg:w-3/4 md:mx-auto",
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
