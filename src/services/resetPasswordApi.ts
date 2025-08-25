const { JWT } = require("google-auth-library");
require("dotenv").config();

export async function resetPasswordApi({ options }: { options: any }) {
 const client = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
 });
 //Busca do ENV.
 const spreadsheetId = process.env.SHEETS_ID; // Substitua pelo ID da sua planilha
 const range = `${process.env.SHEETS_NAME}!D:P`; // Ajuste a range conforme necessário
 try {
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
  const getResponse = await client.request({ url: getUrl });
  const rows = getResponse.data.values;
  const cpfIndex = rows[0].indexOf("Documento_Cliente");
  let rowIndex = -1;

  for (let i = 1; i < rows.length; i++) {
   if (rows[i][cpfIndex] == options.documentReplaced) {
    rowIndex = i + 1; // Planilhas são indexadas a partir de 1
    break;
   }
  }
  if (rowIndex === -1) {
   return "CPF não encontrado.";
  }
  const updateRange = `${process.env.SHEETS_NAME}!P${rowIndex}:P${rowIndex}`; // Ajuste conforme necessário
  const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${updateRange}?valueInputOption=RAW`;
  const values = [""];

  const updateResponse = await client.request({
   url: updateUrl,
   method: "PUT",
   data: {
    range: updateRange,
    majorDimension: "ROWS",
    values: [values],
   },
  });

  if (updateResponse.status === 200) {
   return "Senha atualizada";
  }
 } catch (error) {
  console.error("Error updating password:", error);
  return error;
 }
}
