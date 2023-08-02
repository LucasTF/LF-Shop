import express from "express";

import productRoutes from "../routes/productRoutes";
import userRoutes from "../routes/userRoutes";
import { errorHandler, notFound } from "../middleware/errorMiddleware";

const serverSetup = () => {
  const server = express();

  // Routes
  server.use("/api/products", productRoutes);
  server.use("/api/users", userRoutes);

  // 404 Not Found Handler Middleware
  server.use(notFound);

  // Error Handler Middleware
  server.use(errorHandler);

  // JSON Body Parser Middleware
  server.use(express.json());

  // URLEncoded Body Parser Middleware
  server.use(express.urlencoded({ extended: true }));

  server.get("/", (req, res) => {
    res.send("API is running...");
  });

  return server;
};

export default serverSetup;
