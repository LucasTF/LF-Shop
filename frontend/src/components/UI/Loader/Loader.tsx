import { Bars } from "react-loader-spinner";

type LoaderProps = {
  visible?: boolean;
};

const Loader = ({ visible = true }: LoaderProps) => {
  return (
    <div className="flex justify-center">
      <Bars height={100} width={100} color="white" visible={visible} />
    </div>
  );
};

export default Loader;
