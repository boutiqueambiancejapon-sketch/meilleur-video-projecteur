/**
 * products.ts — helper to read individual product YAML files by slug.
 * Used by ProductCarousel, the projector comparator, product pages, etc.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ProductLink = {
  store: string
  url: string
}

export type ProductSpecs = {
  type?: string
  tech?: string
  resolution?: string
  lumensIso?: number
  lumensAnsi?: number
  lumensMeasured?: number
  contrast?: string
  inputLag?: string
  refresh?: string
  noise?: string
  throwRatio?: string
  throwDistance?: string
  lensShift?: string
  gimbal?: string
  rotation?: string
  battery?: string
  weight?: string
  zoom?: string
  os?: string
  hdr?: string
  colorGamut?: string
  connectivity?: string
  speakers?: string
  laserLife?: string
  lampLife?: string
}

export type Product = {
  slug?: string
  asin?: string
  brand?: string
  name: string
  categorie: string
  secondaryCategorie?: string
  prix: string
  prixFull?: string
  rating?: number
  ratingCount?: number
  badge?: string
  hook?: string
  image?: string
  accentColor?: string
  specs?: ProductSpecs
  pros?: string[]
  cons?: string[]
  verdict?: string
  active: boolean
  stickyCta?: string
  links?: ProductLink[]
}

const PRODUITS_DIR = path.join(process.cwd(), 'content/produits')

/**
 * Read a single product YAML file by slug.
 * Returns typed Product data or null if the file does not exist.
 */
export function getProduct(slug: string): Product | null {
  const filePath = path.join(PRODUITS_DIR, `${slug}.yaml`)
  if (!fs.existsSync(filePath)) return null

  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(`---\n${raw}\n---`)
    const product = data as Product
    if (product.active === false) return null
    if (!product.slug) product.slug = slug
    return product
  } catch {
    return null
  }
}

/**
 * Read ALL active products from content/produits/*.yaml.
 * Sorted by rating desc by default — the "Notre choix" bubbles up.
 */
export function getAllProducts(): Product[] {
  if (!fs.existsSync(PRODUITS_DIR)) return []
  const files = fs.readdirSync(PRODUITS_DIR).filter((f) => f.endsWith('.yaml') && !f.startsWith('_'))
  const products: Product[] = []
  for (const file of files) {
    const slug = file.replace(/\.yaml$/, '')
    const p = getProduct(slug)
    if (p) products.push(p)
  }
  return products.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
}

/** Filter products by category slug (matches primary or secondary categorie). */
export function getProductsByCategory(slug: string): Product[] {
  return getAllProducts().filter(
    (p) => p.categorie === slug || p.secondaryCategorie === slug,
  )
}

/** All product slugs — used by generateStaticParams() in the dynamic route. */
export function getAllProductSlugs(): string[] {
  if (!fs.existsSync(PRODUITS_DIR)) return []
  return fs
    .readdirSync(PRODUITS_DIR)
    .filter((f) => f.endsWith('.yaml') && !f.startsWith('_'))
    .map((f) => f.replace(/\.yaml$/, ''))
}

/**
 * Resolve the primary affiliate URL for a product.
 * Prefers the stickyCta store, falls back to first link, then to Amazon URL from ASIN.
 */
export function getPrimaryLink(product: Product): string {
  if (product.links && product.links.length > 0) {
    if (product.stickyCta) {
      const priority = product.links.find(
        (l) => l.store.toLowerCase() === product.stickyCta!.toLowerCase()
      )
      if (priority) return priority.url
    }
    return product.links[0].url
  }
  if (product.asin) return `https://www.amazon.fr/dp/${product.asin}`
  return ''
}
