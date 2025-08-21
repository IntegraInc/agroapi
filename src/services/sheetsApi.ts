// import PublicGoogleSheetsParser from "public-google-sheets-parser";

// import dotenv from "dotenv";
// dotenv.config();

// export async function SheetsApi() {
//  const spreadsheetId = process.env.SHEETS_ID;
//  const parser = new PublicGoogleSheetsParser(
//   spreadsheetId,
//   "Novo_Cliente"
//  );
//  return await parser.parse().then();
// }

import { google } from "googleapis";

function getAuth() {
 return new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
 });
}

export async function SheetsApi(): Promise<Record<string, any>[]> {
 const auth = getAuth();
 const sheets = google.sheets({ version: "v4", auth });

 const spreadsheetId = process.env.SHEETS_ID!;
 const range = "Novo_Cliente!A1:T"; // ajusta se precisar mais colunas

 const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });

 const [header, ...rows] = res.data.values ?? [];

 const data = rows.map((row) =>
  header.reduce((acc, col, i) => {
   acc[col] = row[i] || null;
   return acc;
  }, {} as Record<string, any>)
 );

 return data;
}
