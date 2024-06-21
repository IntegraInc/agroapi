import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";
import { formatDateString } from "../../../utils/formatDateString";

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
    dueDate: !item.Data_Validade_Prime
     ? null
     : formatDateString(item.Data_Validade_Prime),
   };
  });

  res.status(200).json(finalObject[0]);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
