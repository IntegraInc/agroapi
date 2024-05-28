import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";

export async function getAll(req: Request, res: Response) {
 try {
  const data = await SheetsApi();

  const finalObject = data.map((item: any) => {
   return {
    id: item.Cliente_Codigo_Base,
    document: item.Documento_Cliente,
    name: item.Cliente_Nome_Base,
    mail: item.Email_Cliente,
    phone: item.Telefone1_Cliente,
   };
  });

  res.status(200).json(finalObject);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
