import express from "express";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import clientsRoutes from "./routes/clientsRoutes";

require("dotenv").config();

const server = express();
server.use(express.json());
server.use(cors({ origin: "*" }));
const port = 3333;
server.use(authRoutes);
server.use(clientsRoutes);

server.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
