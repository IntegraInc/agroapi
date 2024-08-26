import { Request, Response } from "express";
import { updateOneApi } from "../../../services/updateOneApi";

export async function updateOne(req: Request, res: Response) {
 const { document } = req.params;
 const { birthday, name, phone, mail, password } = req.body;
 const documentReplaced = document
  .replace(".", "")
  .replace(".", "")
  .replace("-", "");

 try {
  const options = {
   birthday,
   name,
   phone,
   mail,
   documentReplaced,
   password,
  };

  const data = await updateOneApi({ options });
  res.status(200).json(data);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
