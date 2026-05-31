/**
 * niche.config.ts — Configuration centrale du site.
 * C'est le SEUL fichier à remplir pour chaque nouveau site issu du template.
 *
 * Workflow :
 * - Soit rempli par Claude Code lors de l'intégration des outputs Claude Design
 *   (voir design-incoming/READ-FIRST.md).
 * - Soit rempli à la main quand il n'y a pas de livrable Claude Design.
 *
 * Tous les composants, configs et pages dépendent de ce fichier. Ne pas hardcoder
 * de couleur, de font, de nom de site, de tagline dans le JSX — passer par ici.
 */

export type NicheConfig = {
  // Identité
  siteName: string
  domain: string
  tagline: string

  // Vocabulaire de la niche
  entity: string          // "produit", "destination", "carte"
  entities: string        // pluriel
  entityVerb: string      // "acheter", "explorer", "souscrire"
  dealWord: string        // "deals", "bons plans", "offres"

  // Hero
  heroPrefix: string      // "Choisir votre"
  heroSuffix: string      // "en 10 minutes"
  rotatingWords: string[] // ["iPhone", "Mac"] → ["vol", "hôtel"]
  subtitle: string
  ctaPrimary: { text: string; url: string }
  ctaSecondary: { text: string; url: string }

  // Catégories (1 couleur accent par catégorie)
  categories: {
    slug: string
    label: string
    accent: string // hex color
    description?: string
  }[]

  // Outils
  quiz: {
    enabled: boolean
    question: string        // "Quel iPhone pour vous ?"
    criteria: string[]      // ["budget", "usage", "taille"]
  }
  comparator: {
    enabled: boolean
    criteria: string[]      // ["prix", "performance", "photo"]
  }
  simulator: {
    enabled: boolean
    title: string           // "Calculer votre budget Apple"
    description: string
  }

  // Style & DA
  style: {
    mode: 'dark' | 'light'             // dark-first ou light-first
    hero: 'split' | 'centered' | 'minimal' // layout du hero
    effects: 'aurora' | 'subtle' | 'none'  // intensité des effets visuels
    cards: 'bordered' | 'filled' | 'minimal' // style des cartes article
    uiStyle: string                    // style UI depuis da-presets (ex: "Glassmorphism", "Brutalism", "Editorial Grid / Magazine")
  }
  palette: {
    accent1: string
    accent2: string
    accent3: string
    accent4: string
    accent5: string
    bgPrimary: string
    bgSurface: string
    bgSurface2: string
    textPrimary: string
    textSecondary: string
    textMuted: string
  }
  fonts: {
    display: string   // Google Fonts family name
    body: string      // Google Fonts family name
  }

  // Auteur
  author: {
    name: string
    slug: string
    title: string
    bio: string
    tone: string[]          // ["direct", "honnête", "expert"]
    noGo: string[]          // ["révolutionnaire", "incroyable"]
    formulations: string[]  // ["Honnêtement,", "Le vrai tip :"]
  }

  // Identité visuelle
  logo: string                // Texte du logo libre (ex: "10min·voyage", "MonSite", "ASPIRO")
  homeSections: string[]      // Ordre des sections home. Options: 'ticker', 'deals', 'articles', 'categories', 'tools', 'author'

  // Affiliation
  affiliateTag: string     // "monsite-21"
  defaultStore: string     // "Amazon"

  // Signature DA anti-IA — personnalité visuelle unique
  signature: {
    anchor: string           // élément visuel distinctif (ex: "lettrine éditoriale façon Monocle")
    oneRule: string          // 1 règle qui casse le look IA (ex: "jamais de gradient sur les boutons")
    inspiration: string[]    // 2-3 vrais magazines/sites pour le ton visuel
    forbidden: string[]      // patterns visuels interdits (ceux qui crient "IA")
    components: string[]     // composants signature activés: 'lettrine' | 'pullQuote' | 'editorialFootnote' | 'tabularStat'
  }

  // Langue & i18n
  defaultLocale: string    // "fr"
  locales: string[]        // ["fr"] — ajouter "en" quand la traduction est prête

  // Technique
  vercelRegion: string     // "fra1"
  repo: string             // "org/repo"
  branch: string           // branche principale — PAS toujours "main" ! Le CMS l'utilise pour lire/écrire le contenu.
}

// ─── Valeurs par défaut (placeholder) ────────────────────────────────────
// Ces valeurs permettent au site de build avec un template vierge. Elles sont
// remplacées soit par Claude Code lors de l'intégration des outputs Claude Design,
// soit à la main lors d'un setup manuel.

export const niche: NicheConfig = {
  siteName: 'Meilleur Vidéo-Projecteur',
  domain: 'meilleur-videoprojecteur.fr',
  tagline: 'Le comparateur cinéphile pour trouver le bon faisceau',

  entity: 'projecteur',
  entities: 'projecteurs',
  entityVerb: 'choisir',
  dealWord: 'offres',

  heroPrefix: 'Le bon faisceau',
  heroSuffix: 'tout le film.',
  rotatingWords: ['change', 'révèle', 'transforme'],
  subtitle: 'Je teste, je mesure, je classe les vidéoprojecteurs — du salon baigné de lumière à la salle noire du cinéphile, jusqu\'au gaming à 16 ms.',
  ctaPrimary: { text: 'Trouver mon projecteur', url: '/comparatif' },
  ctaSecondary: { text: 'Le guide d\'achat', url: '/guide' },

  categories: [
    { slug: 'salon', label: 'Home-cinéma', accent: '#9B6CFF', description: 'De la grande image même rideaux ouverts.' },
    { slug: 'cinephile', label: 'Cinéphile', accent: '#ff7a4d', description: 'Noirs profonds, contraste, étalonnage juste.' },
    { slug: 'gaming', label: 'Gaming', accent: '#ffd24a', description: 'Input lag minuscule, haute fréquence, VRR.' },
    { slug: 'budget', label: 'Malin & nomade', accent: '#36d6a0', description: 'Le cinéma partout, sans se ruiner.' },
  ],

  quiz: {
    enabled: true,
    question: 'Quel vidéoprojecteur pour vous ?',
    criteria: ['budget', 'pièce', 'usage', 'recul', 'écran'],
  },
  comparator: {
    enabled: true,
    criteria: ['résolution', 'lumens ANSI', 'input lag', 'contraste', 'prix'],
  },
  simulator: {
    enabled: false,
    title: '',
    description: '',
  },

  style: {
    mode: 'dark',
    hero: 'split',
    effects: 'aurora',
    cards: 'bordered',
    uiStyle: 'Editorial Grid / Magazine',
  },
  palette: {
    accent1: '#9B6CFF',  // beam (violet) — accent principal cinéma
    accent2: '#FFD24A',  // amber — badge "notre choix"
    accent3: '#36d6a0',  // green — catégorie budget/nomade
    accent4: '#FF7A4D',  // orange — catégorie cinéphile/salle dédiée
    accent5: '#5FB0FF',  // bleu — catégorie polyvalent
    bgPrimary: '#0B0A0F',
    bgSurface: '#131019',
    bgSurface2: '#1C1824',
    textPrimary: '#EDEAF2',
    textSecondary: '#9B96A8',
    textMuted: '#5B5667',
  },
  fonts: { display: 'Archivo Expanded', body: 'Archivo' },

  author: {
    name: 'Mathias',
    slug: 'mathias',
    title: 'Critique vidéo-projecteur indépendant',
    bio: 'Cinéphile depuis toujours. J\'ai installé mon premier vidéoprojecteur en 2012 — un Optoma 720p qui m\'a fait découvrir Blade Runner comme jamais. Depuis, j\'en ai vu passer une cinquantaine, et je n\'ai pas l\'intention de m\'arrêter. Ici je teste, je mesure, je classe — toujours avec mes propres yeux, jamais avec la fiche constructeur.',
    tone: ['passionné', 'chaleureux', 'accessible'],
    noGo: ['révolutionnaire', 'incroyable', 'game-changer', 'vous allez adorer', 'à ne pas manquer'],
    formulations: [
      'Honnêtement, ce que j\'ai vu,',
      'Sur grand écran, ça se voit.',
      'À ce prix-là, on attend que',
    ],
  },

  logo: 'Meilleur Vidéo-Projecteur',
  homeSections: ['categories', 'articles', 'author'],

  signature: {
    anchor: 'Faisceau lumineux animé (canvas hero) + grain de film + scanlines en overlay',
    oneRule: 'Aucun bouton sans flèche → à droite. La typographie display est en Archivo Expanded, jamais en italique.',
    inspiration: ['Première magazine', 'Mad Movies', 'Projector Reviews', 'Les Numériques (tests vidéoprojecteurs)'],
    forbidden: [
      'gradients pastel violet→cyan typiques des sites IA',
      'illustrations cartoon/3D',
      'badges brillants à dégradés',
      'photos de produits sur fond pastel saturé',
    ],
    components: ['pullQuote', 'tabularStat', 'editorialFootnote', 'lettrine'],
  },

  affiliateTag: 'ambiancejap0a-21',
  defaultStore: 'Amazon',

  defaultLocale: 'fr',
  locales: ['fr'],

  vercelRegion: 'fra1',
  repo: 'boutiqueambiancejapon-sketch/meilleur-video-projecteur',
  branch: 'main',
}

// ─── Helpers ────────────────────────────────────────────────────

/** Accent CSS variable for a given category index. */
const ACCENT_VARS = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-4)', 'var(--accent-5)']

export function categoryAccent(index: number): string {
  return ACCENT_VARS[index % ACCENT_VARS.length]
}

/** Map category slug → label */
export function categoryLabels(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const cat of niche.categories) map[cat.slug] = cat.label
  return map
}

/** Map category slug → CSS accent variable */
export function categoryAccents(): Record<string, string> {
  const map: Record<string, string> = {}
  niche.categories.forEach((cat, i) => {
    map[cat.slug] = categoryAccent(i)
  })
  return map
}
