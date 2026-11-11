// The site's identity and the two apps' addresses, from apps/website/src/config/site.ts.

/** Convert Persian/Arabic-Indic digits to Latin (for tel: links). */
export function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
}

/** An Iran-format tel: href from a Persian/Latin phone string. */
export function toTelHref(phone: string): string {
  const latin = toLatinDigits(phone).replace(/[^\d]/g, "")
  return `tel:+98${latin.replace(/^0/, "")}`
}

export const siteConfig = {
  name: "زخم‌بان",
  url: "https://zakhmban.ir",
  description:
    "زخم‌بان بیماران و همراهانشان را برای مراقبت از زخم در منزل به درمانگران و پرستاران زخمِ تأییدشده می‌رساند؛ همراه با فروشگاه محصولات مراقبت از زخم و مقالات آموزشی.",
  address: "کرج، مهرشهر",
  landline: "۰۲۶-۳۳۲۱۲۶۵۶",
} as const

const PATIENT_APP_BASE = "https://app.zakhmban.ir"
const THERAPIST_APP_URL = "https://therapist.zakhmban.ir"

export const APP_LINKS = {
  patient: {
    home: `${PATIENT_APP_BASE}/`,
    login: `${PATIENT_APP_BASE}/auth/login`,
    newRequest: `${PATIENT_APP_BASE}/requests/new`,
    shop: `${PATIENT_APP_BASE}/shop`,
    cart: `${PATIENT_APP_BASE}/cart`,
    orders: `${PATIENT_APP_BASE}/orders`,
  },
  therapist: {
    home: `${THERAPIST_APP_URL}/`,
    register: `${THERAPIST_APP_URL}/login`,
    login: `${THERAPIST_APP_URL}/login`,
  },
} as const
