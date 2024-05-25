import { Request, Response } from "express";

export function getOne(req: Request, res: Response) {
 console.log("deu boa chamar");

 const data = {
  name: "Julaio",
  age: "18",
 };
 res.send(data);
}
