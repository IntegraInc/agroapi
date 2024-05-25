import express from "express";
import authRoutes from "./routes/authRoutes";
const server = express();
const port = 3333;
server.use(authRoutes);
server.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
server.use(express.json());
