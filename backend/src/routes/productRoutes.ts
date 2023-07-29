import express from "express";
import ProductController from "../controllers/ProductController";

const router = express.Router();

const productController = new ProductController();

router.route("/").get(productController.indexAll);
router.route("/:id").get(productController.index);

export default router;
