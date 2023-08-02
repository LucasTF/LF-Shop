import express from "express";

import productRoutes from "../routes/productRoutes";
import userRoutes from "../routes/userRoutes";
import { errorHandler, notFound } from "../middleware/errorMiddleware";

const serverSetup = () => {
  const app = express();

  // Routes
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);

  // 404 Not Found Handler Middleware
  app.use(notFound);

  // Error Handler Middleware
  app.use(errorHandler);

  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  return app;
};

export default serverSetup;
