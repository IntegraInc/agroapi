// utils/formatDateString.ts
function pad2(n: number) {
 return String(n).padStart(2, "0");
}

function fromSerialDays(serial: number): Date {
 // Google Sheets/Excel: dias desde 1899-12-30
 const base = Date.UTC(1899, 11, 30);
 const ms = Math.round(serial * 24 * 60 * 60 * 1000);
 return new Date(base + ms);
}

function fromDMY(d: number, m: number, y: number): Date {
 // Usa UTC para evitar offset de timezone
 return new Date(Date.UTC(y, m - 1, d));
}

export function formatDateString(input: any): string | null {
 if (input === null || input === undefined || input === "") return null;

 let date: Date | null = null;

 if (typeof input === "number" && !Number.isNaN(input)) {
  // serial (pode vir com decimal)
  date = fromSerialDays(input);
 } else if (input instanceof Date && !Number.isNaN(input.getTime())) {
  date = input;
 } else if (typeof input === "string") {
  const s = input.trim();

  // Date(YYYY/M/D) ou Date(YYYY-MM-DD)
  let m = s.match(/^Date\(\s*(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})\s*\)$/i);
  if (m) {
   const [, Y, M, D] = m.map(Number);
   date = fromDMY(Number(D), Number(M), Number(Y));
  }

  // Serial em string (ex: "45532")
  if (!date && /^\d+(\.\d+)?$/.test(s)) {
   date = fromSerialDays(parseFloat(s));
  }

  // ISO YYYY-MM-DD (ignora horário se vier)
  if (!date) {
   m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
   if (m) {
    const [, Y, M, D] = m.map(Number);
    date = fromDMY(D, M, Y);
   }
  }

  // DD/MM/YYYY ou D/M/YY
  if (!date) {
   m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
   if (m) {
    let [, D, M, Y] = m;
    let year = Number(Y);
    // Se vier 2 dígitos, assume 1900–1999 para >= 50 e 2000–2099 para < 50 (ajuste se quiser)
    if (Y.length === 2) year = year >= 50 ? 1900 + year : 2000 + year;
    date = fromDMY(Number(D), Number(M), year);
   }
  }
 }

 if (!date || Number.isNaN(date.getTime())) return null;

 // Formata DD/MM/YYYY em UTC (evita variação de fuso)
 const d = date.getUTCDate();
 const m = date.getUTCMonth() + 1;
 const y = date.getUTCFullYear();

 return `${pad2(d)}/${pad2(m)}/${y}`;
}
