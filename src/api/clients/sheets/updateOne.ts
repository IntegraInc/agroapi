import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";
import { updateOneApi } from "../../../services/updateOneApi";

export async function updateOne(req: Request, res: Response) {
 const { document } = req.params;
 const { birthday, name, phone, mail } = req.body;
 try {
  const options = {
   birthday,
   name,
   phone,
   mail,
   document,
  };

  const data = await updateOneApi({ options });
  res.send(data);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
