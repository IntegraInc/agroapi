import { Request, Response } from "express";
const { JWT } = require("google-auth-library");
const keys = require("./passaporteapp-0a311df09053.json");

export async function postGoogle(req: Request, res: Response) {
 const client = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
 });

 const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${keys.project_id}/queries`;
 // Suponha que você esteja enviando dados para criar um novo dataset, por exemplo
 const data = {
  query: "SELECT * FROM `passaporteapp.teste.people` LIMIT 1000", // Substitua pela sua consulta SQL real
  useLegacySql: false, // True se estiver usando SQL legado do BigQuery
 };

 // As opções para a requisição, incluindo o método POST e o corpo com os dados
 const options = {
  url: url,
  method: "POST", // Mudando o método para POST
  data: data, // Incluindo os dados no corpo da requisição
  headers: {
   "Content-Type": "application/json", // Definindo o tipo de conteúdo como JSON
  },
 };

 try {
  const response = await client.request(options);

  const data = response.data.rows;

  const object = data.map((item: any) => {
   return {
    name: item.f[0],
   };
  });

  //  const object = response.data.rows.map((item) => {
  //      return {

  //     }
  //  })

  res.send(object[0]);
 } catch (error) {
  res.status(500).send(error);
 }
}
