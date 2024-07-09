import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";

export async function checkOne(req: Request, res: Response) {
 const { document } = req.params;
 const { password } = req.body;
 const documentReplaced = document
  .replace(".", "")
  .replace(".", "")
  .replace("-", "");

 try {
  const data = await SheetsApi();

  const filteredData = data.filter((doc: any) => {
   return doc.Documento_Cliente == documentReplaced && doc.Senha == password;
  });
  if (filteredData.length === 0) {
   return res.status(404).json("CPF informado ou senha não correspondem.");
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
   };
  });

  res.status(200).json(finalObject[0]);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
