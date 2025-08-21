import { Request, Response } from "express";
import { SheetsApi } from "../../../services/sheetsApi";
import { formatDateString } from "../../../utils/formatDateString";
import { trimestreDoAno } from "../../../utils/formatQuarter";

function normalizeDoc(value: any): string | null {
 if (!value) return null;
 return String(value).replace(/\D/g, "");
}

export async function getOne(req: Request, res: Response) {
 const { document } = req.params;
 const documentReplaced = document.replace(/\D/g, "");

 try {
  const data = await SheetsApi();

  const filteredData = data.filter((doc: any) => {
   return normalizeDoc(doc.Documento_Cliente) === documentReplaced;
  });

  if (filteredData.length === 0) {
   return res.status(404).json("Cliente não encontrado na base.");
  }

  const finalObject = filteredData.map((item: any) => {
   return {
    id: Number(item.cod_cliente) || null,
    document: item.Documento_Cliente || null,
    name: item.Cliente_Nome_Base || null,
    mail: item.Mail || null,
    phone: item.Telefone1_Cliente || item.Phone || null,
    birthday: item.Data_Nascimento
     ? formatDateString(item.Data_Nascimento)
     : null,
    password: !!item.Senha,
    completed:
     item.Cliente_Nome_Base &&
     item.Mail &&
     (item.Telefone1_Cliente || item.Phone) &&
     item.Data_Nascimento &&
     item.Senha
      ? true
      : false,
    status:
     item.Prime_Renovado_Trimestre_Atual_vs_Anterior === "SIM" ? true : false,
    dueDate: item.Data_Validade_Prime
     ? formatDateString(item.Data_Validade_Prime)
     : null,
    quarter: item.Data_Validade_Prime
     ? trimestreDoAno(formatDateString(item.Data_Validade_Prime))
     : null,
   };
  });

  res.status(200).json(finalObject[0]);
 } catch (error) {
  console.error(error);
  res.status(500).json("Erro interno no servidor");
 }
}
