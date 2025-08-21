export function trimestreDoAno(dateStr: string | null): string | null {
 if (!dateStr) return null;
 // Espera "DD/MM/YYYY"
 const m = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
 if (!m) return null;

 const month = Number(m[2]);
 const q = Math.floor((month - 1) / 3) + 1; // 1..4
 return `${q} trimestre`;
}
