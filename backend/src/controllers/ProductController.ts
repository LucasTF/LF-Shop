import Controller from "./Controller";
import Product from "../models/productModel";
import asyncHandler from "../middleware/asyncHandler";

class ProductController implements Controller {
  indexAll = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  });

  index = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    res.status(404).json({ message: "Product not found" });
  });
}

export default ProductController;
