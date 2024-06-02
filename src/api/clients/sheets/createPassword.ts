import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";
import { googleAuth } from "../../../services/googleAuth";

export async function createPassword(req: Request, res: Response) {
 const { document } = req.params;
 const { password } = req.body;
 try {
  const options = { document, password };
  const data = await googleAuth({ options });

  res.status(200).json(data);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
