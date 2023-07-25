type ProductCardStockProps = {
  stock: number;
};

const ProductCardStock = ({ stock }: ProductCardStockProps) => {
  let stockStyle =
    stock > 0 ? "bg-green-700 border-green-800" : "bg-red-700 border-red-800";

  return (
    <span className={"p-1 rounded border-2 font-bold" + " " + stockStyle}>
      {stock > 0 ? `${stock} em estoque` : "Indisponível"}
    </span>
  );
};
export default ProductCardStock;
