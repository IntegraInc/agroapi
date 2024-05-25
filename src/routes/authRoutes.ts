import { Router } from "express";
import { getOne } from "../api/auth/getOne";
import { authGoogle } from "../api/auth/AuthGoogle";
import { postGoogle } from "../api/auth/postGoogle";
const authRoutes = Router();
authRoutes.get("/auth", getOne);
authRoutes.get("/google", authGoogle);
authRoutes.get("/query", postGoogle);

export default authRoutes;
