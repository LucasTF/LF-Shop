import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";

import productRoutes from "./routes/productRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
