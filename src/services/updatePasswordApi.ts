import { Request, Response } from "express";
const { JWT } = require("google-auth-library");
require("dotenv").config();
// const keys = require("./passaporteapp-0a311df09053.json");

type optionsType = {
 document: string;
 password: string;
 birthday: string;
};

//Esse método recebe um CPF e uma senha e altera a senha de acordo com
//o CPF na planilha. È necessário ter os dados do arquivo JSON configurados.

export async function updatePasswordApi({
 options,
}: {
 options: optionsType;
}) {
 const client = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
 });

 //Busca do ENV.
 const spreadsheetId = process.env.SHEETS_ID; // Substitua pelo ID da sua planilha
 const range = "Senha_Cliente!D:L"; // Ajuste a range conforme necessário
 try {
  // Primeiro, obter os dados da planilha
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
  const getResponse = await client.request({ url: getUrl });

  const rows = getResponse.data.values;
  const cpfIndex = rows[0].indexOf("Documento_Cliente");

  const response = rows;

  let rowIndex = -1;

  // Procurar a linha que corresponde ao CPF informado
  for (let i = 1; i < rows.length; i++) {
   if (rows[i][cpfIndex] == options.document) {
    rowIndex = i + 1; // Planilhas são indexadas a partir de 1
    break;
   }
  }

  if (rowIndex === -1) {
   return "CPF não encontrado.";
  }

  // Atualizar a célula da senha
  const updateRange = `Senha_Cliente!L${rowIndex}:M${rowIndex}`; // Ajuste conforme necessário
  const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${updateRange}?valueInputOption=RAW`;

  const updateResponse = await client.request({
   url: updateUrl,
   method: "PUT",
   data: {
    range: updateRange,
    majorDimension: "ROWS",
    values: [[options.password, options.birthday]],
   },
  });

  if (updateResponse.status === 200) {
   return "Senha atualizada";
  }
 } catch (err) {
  console.error("Error updating password:", err);
  return err;
 }
}
