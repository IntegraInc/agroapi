export function trimestreDoAno(dataValidade: any) {
 const trimestres = {
  1: [1, 3],
  2: [4, 6],
  3: [7, 9],
  4: [10, 12],
 };

 try {
  const [dia, mes, ano] = dataValidade.split("/");
  const data = new Date(`${ano}-${mes}-${dia}`);
  const mesNumero = data.getMonth() + 1; // Os meses em JavaScript são indexados de 0 a 11

  for (const [trimestre, [inicio, fim]] of Object.entries(trimestres)) {
   if (mesNumero >= inicio && mesNumero <= fim) {
    return `${trimestre != "1" ? `${trimestre}ª` : `${trimestre}º`} trimestre`;
   }
  }

  return "Data de validade inválida";
 } catch (error) {
  return "Formato de data inválido. Utilize o formato DD/MM/YYYY.";
 }
}
