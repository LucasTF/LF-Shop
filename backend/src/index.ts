import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import serverSetup from "./config/server";

const port = process.env.PORT || 5000;

// Database
connectDB();

// Server
const server = serverSetup();

server.listen(port, () => console.log(`Server running on port ${port}`));
