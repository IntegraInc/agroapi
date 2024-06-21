export function formatDateString(dateString: string) {
 // Verifica se a entrada é uma string válida

 // Remove os caracteres 'Date(' e ')' e divide por vírgula
 const parts = dateString
  .slice(5, -1)
  .split(",")
  .map((part) => part.trim());

 // Checa se todas as partes necessárias estão presentes
 if (parts.length !== 3) {
  throw new Error(
   "A entrada não contém todos os componentes de data necessários"
  );
 }

 const [year, month, day] = parts.map(Number);

 // Checa se algum dos componentes não é um número válido
 if (isNaN(year) || isNaN(month) || isNaN(day)) {
  throw new Error("Ano, mês ou dia inválidos");
 }

 // Cria um objeto de data com os valores ajustados para o mês correto (base-0)
 const date = new Date(year, month - 1, day);

 // Converte a data para o formato "DD/MM/YYYY"
 return date.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
 });
}
