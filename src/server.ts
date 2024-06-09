import express from "express";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import clientsRoutes from "./routes/clientsRoutes";

require("dotenv").config();
const corsOptions = {
 origin: function (origin: any, callback: any) {
  if (origin.endsWith(".vercel.app")) {
   callback(null, true); // Se a origem está na lista branca ou termina com "vercel.app", permitir
  } else {
   callback(new Error("Not allowed by CORS")); // Caso contrário, rejeitar
  }
 },
 credentials: true,
 optionSuccessStatus: 200,
};
const server = express();
server.use(express.json());
server.use(cors(corsOptions));
const port = 3333;
server.use(authRoutes);
server.use(clientsRoutes);

server.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
