export function normalizeDoc(value: any): string | null {
 if (!value) return null;
 return String(value).replace(/\D/g, ""); // remove tudo que não é número
}
