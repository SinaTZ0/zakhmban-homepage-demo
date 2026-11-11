export interface ProductListItem {
  id: string
  name: string
  slug: string
  brand?: { name: string; slug: string } | null
  primaryImage?: string | null
  /** Lowest effective price across variants (Toman); null when price-on-request. */
  priceFrom: number | null
  compareAtPriceFrom?: number | null
  priceOnRequest: boolean
  requiresVerification: boolean
}
