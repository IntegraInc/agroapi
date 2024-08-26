import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";
import { ClientTypes } from "../../../types/clientTypes";

export async function getAll(req: Request, res: Response) {
 try {
  const data = await SheetsApi();

  const finalObject = data.map((item: ClientTypes) => {
   return {
    id: item.Cliente_Codigo_Base ? item.Cliente_Codigo_Base : null,
    document: item.Documento_Cliente ? item.Documento_Cliente : null,
    name: item.Cliente_Nome_Base ? item.Cliente_Nome_Base : null,
    mail: item.Email_Cliente ? item.Email_Cliente : null,
    phone: item.Telefone1_Cliente ? item.Telefone1_Cliente : null,
    birthday: item.Data_Nascimento ? item.Data_Nascimento : null,
    password: item.Senha ? true : false,
    completed:
     item.Cliente_Nome_Base &&
     item.Email_Cliente &&
     item.Telefone1_Cliente &&
     item.Data_Nascimento &&
     item.Senha
      ? true
      : false,
    status: item.Status_Prime,
    dueDate: item.Data_Validade,
   };
  });

  res.status(200).json(finalObject);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
