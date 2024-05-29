import { Router } from "express";
import { getAll } from "../api/clients/sheets/getAll";
import { getOne } from "../api/clients/sheets/getOne";
const clientsRoutes = Router();
clientsRoutes.get("/clients", getAll);
clientsRoutes.get("/clients/:document", getOne);

export default clientsRoutes;
