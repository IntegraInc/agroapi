import { Request, Response } from "express";
const { JWT } = require("google-auth-library");
const keys = require("./passaporteapp-0a311df09053.json");

export async function authGoogle(req: Request, res: Response) {
 const client = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
 });
 const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${keys.projectId}/datasets`;
 //  const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${keys.projectId}}/queries`;

 const response = await client.request({ url });
 res.send(response.data);
}
