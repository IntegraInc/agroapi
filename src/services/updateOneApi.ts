import { Request, Response } from "express";
const { JWT } = require("google-auth-library");
require("dotenv").config();

type optionsType = {
 document: string;
 birthday: string;
 name: string;
 phone: string;
 mail: string;
 password?: string;
};

export async function updateOneApi({ options }: { options: any }) {
 const client = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
 });

 const spreadsheetId = process.env.SHEETS_ID; // Substitua pelo ID da sua planilha
 //const range = "Senha_Cliente!A:N"; // Ajuste a range conforme necessário
 const range = "Cliente!A:N"; // Ajuste a range conforme necessário

 try {
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
  const getResponse = await client.request({ url: getUrl });
  const rows = getResponse.data.values;
  const cpfIndex = rows[0].indexOf("Documento_Cliente");

  let rowIndex = -1;

  for (let i = 1; i < rows.length; i++) {
   if (rows[i][cpfIndex] == options.documentReplaced) {
    rowIndex = i + 1; // Ajuste para zero-indexed
    break;
   }
  }

  if (rowIndex === -1) {
   return "Documento não encontrado.";
  }

  const values = [
   options.name, //O
   options.password ? options.password : null, //P
   options.birthday, //Q
   options.phone, //R
   options.mail, //S
   new Date().toLocaleDateString("pt-BR"), //T
  ];
  console.log(options.password);
  //const updateRange = `Senha_Cliente!A${rowIndex}:Q${rowIndex}`; // Ajuste conforme necessário para incluir múltiplas colunas
  const updateRange = `Cliente!O${rowIndex}:T${rowIndex}`; // Ajuste conforme necessário para incluir múltiplas colunas
  const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${updateRange}?valueInputOption=RAW`;

  const updateResponse = await client.request({
   url: updateUrl,
   method: "PUT",
   majorDimenson: "ROWS",
   data: {
    range: updateRange,
    values: [values],
   },
  });

  if (updateResponse.status === 200) {
   return "Informações atualizadas com sucesso.";
  }
 } catch (err) {
  console.error("Erro ao atualizar informações:", err);
  return err;
 }
}
