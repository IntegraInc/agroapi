import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";
import { formatDateString } from "../../../utils/formatDateString";
import { trimestreDoAno } from "../../../utils/formatQuarter";

export async function getOne(req: Request, res: Response) {
 const { document } = req.params;

 const documentReplaced = document
  .replace(".", "")
  .replace(".", "")
  .replace("-", "");

 try {
  const data = await SheetsApi();

  const filteredData = data.filter((doc: any) => {
   return doc.Documento_Cliente == documentReplaced;
  });
  if (filteredData.length === 0) {
   return res.status(404).json("Cliente não encontrado na base.");
  }

  //crie uma função que busque a data validade e mostre em qual trimestre do ano esta, nessa forma: 1 trimestre, 2 trimestre, 3 trimestre, 4 trimestre
  const finalObject = filteredData.map((item: any) => {
   return {
    id: item.cod_cliente ? item.cod_cliente : null,
    document: item.Documento_Cliente ? item.Documento_Cliente : null,
    name: item.Cliente_Nome_Base ? item.Cliente_Nome_Base : null,
    mail: item.Mail ? item.Mail : null,
    phone: item.Telefone1_Cliente ? item.Telefone1_Cliente : null,
    birthday: item.Data_Nascimento ? item.Data_Nascimento : null,
    password: item.Senha ? true : false,
    completed:
     item.Cliente_Nome_Base &&
     item.Mail &&
     item.Telefone1_Cliente &&
     item.Data_Nascimento &&
     item.Senha
      ? true
      : false,
    status:
     item.Prime_Renovado_Trimestre_Atual_vs_Anterior == "SIM" ? true : false,
    // dueDate: !item.Data_Validade_Prime
    //  ? null
    //  : formatDateString(item.Data_Validade_Prime),
    // quarter: !item.Data_Validade_Prime
    //  ? null
    //  : trimestreDoAno(formatDateString(item.Data_Validade_Prime)),
   };
  });

  res.status(200).json(finalObject[0]);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
