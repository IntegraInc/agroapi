import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";
import { ClientTypes } from "../../../types/clientTypes";

export async function getAll(req: Request, res: Response) {
 try {
  const data = await SheetsApi();
  console.log(data);

  const finalObject = data.map((item: ClientTypes) => {
   return {
    id: item.Cliente_Codigo_Base,
    document: item.Documento_Cliente,
    name: item.Cliente_Nome_Base,
    mail: item.Email_Cliente,
    phone: item.Telefone1_Cliente,
    phone2: item.Telefone2_Cliente,
    isPrime: item.Prime_Hoje,
    RpAt23: item.RP_AT_23,
    representativeSales: item.Representante_Nome,
   };
  });

  res.status(200).json(finalObject);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
