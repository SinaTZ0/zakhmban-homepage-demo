/** Toman, as the API gives it, in Persian digits. e.g. formatToman(123000) → "۱۲۳٬۰۰۰ تومان" */
export function formatToman(amountInToman: number): string {
  return `${amountInToman.toLocaleString("fa-IR")} تومان`
}
