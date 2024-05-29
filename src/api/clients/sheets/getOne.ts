import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";

export async function getOne(req: Request, res: Response) {
 const { document } = req.params;
 try {
  const data = await SheetsApi();

  const filteredData = data.filter((doc: any) => {
   return doc.Documento_Cliente == document;
  });
  if (filteredData.length === 0) {
   res.status(404).json("Cliente não encontrado na base.");
  }
  const finalObject = filteredData.map((item: any) => {
   return {
    id: item.Cliente_Codigo_Base,
    document: item.Documento_Cliente,
    name: item.Cliente_Nome_Base,
    mail: item.Email_Cliente,
    phone: item.Telefone1_Cliente,
   };
  });

  res.status(200).json(finalObject[0]);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
