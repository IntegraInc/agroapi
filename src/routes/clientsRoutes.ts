import { Router } from "express";
import { getAll } from "../api/clients/sheets/getAll";
import { getOne } from "../api/clients/sheets/getOne";
import { createPassword } from "../api/clients/sheets/createPassword";
import { updateOne } from "../api/clients/sheets/updateOne";
import { checkOne } from "../api/clients/sheets/checkOne";
const clientsRoutes = Router();
clientsRoutes.get("/clients", getAll);
clientsRoutes.get("/clients/:document", getOne);
clientsRoutes.post("/clients/:document/check", checkOne);
clientsRoutes.post("/clients/:document/password", createPassword);
clientsRoutes.post("/clients/:document", updateOne);

export default clientsRoutes;
