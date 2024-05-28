import PublicGoogleSheetsParser from "public-google-sheets-parser";
import dotenv from "dotenv";
dotenv.config();

export async function SheetsApi() {
 const spreadsheetId = process.env.SHEETS_ID;
 const parser = new PublicGoogleSheetsParser(spreadsheetId);
 return await parser.parse().then();
}
