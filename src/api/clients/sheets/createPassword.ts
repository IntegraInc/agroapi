import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";
import { updatePasswordApi } from "../../../services/updatePasswordApi";

export async function createPassword(req: Request, res: Response) {
 const { document } = req.params;

 const documentReplaced = document
  .replace(".", "")
  .replace(".", "")
  .replace("-", "");

 const { password, birthday } = req.body;
 try {
  const options = { documentReplaced, password, birthday };
  const data = await updatePasswordApi({ options });

  res.status(200).json(data);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
