import { BRLFormatter } from "../../../utils/currencyFormatter";

type ProductPriceProps = {
  value: number;
  label?: string;
};

const ProductPrice = ({ value, label }: ProductPriceProps) => {
  return (
    <div className="flex items-end">
      <p className="text-xl font-bold xl:text-3xl">{BRLFormatter(value)}</p>
      {label && (
        <span className="pl-1 text-sm text-gray-500 xl:pl-2">{label}</span>
      )}
    </div>
  );
};
export default ProductPrice;
