import { Router } from "express";
import { getAll } from "../api/clients/sheets/getAll";
import { getOne } from "../api/clients/sheets/getOne";
import { createPassword } from "../api/clients/sheets/createPassword";
const clientsRoutes = Router();
clientsRoutes.get("/clients", getAll);
clientsRoutes.get("/clients/:document", getOne);
clientsRoutes.post("/clients/:document/password", createPassword);

export default clientsRoutes;
