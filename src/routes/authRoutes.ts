import { Router } from "express";
import { authGoogle } from "../api/IntegrationGoogle/AuthGoogle";
import { postGoogle } from "../api/IntegrationGoogle/postGoogle";
const authRoutes = Router();
authRoutes.get("/google", authGoogle);
authRoutes.get("/query", postGoogle);

export default authRoutes;
