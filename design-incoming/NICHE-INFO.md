# NICHE-INFO — Meilleur Vidéo-Projecteur

Contexte transmis par l'utilisateur pour le skill `integrate-claude-design` :
ces valeurs alimentent `niche.config.ts` et `content/`.

## Identité

- **Nom du site** : Meilleur Vidéo-Projecteur
- **Domaine** : meilleur-videoprojecteur.fr
- **Tagline (proposition)** : Trouvez le bon faisceau en 10 minutes — comparateur indépendant de vidéoprojecteurs
- **Langue** : fr (FR uniquement, pas de [locale])
- **DA livrée par Claude Design** : nom de code interne "FAISCEAU" (métaphore cinéma/projection). Le `logo` peut rester "Meilleur Vidéo-Projecteur" ou se contracter en "MVP·Faisceau" / "FAISCEAU" — à trancher.

## Affiliation

- **Plateforme** : Amazon Partenaires (Amazon.fr)
- **Store ID / tag affilié** : `ambiancejap0a-21`
- **Liens** : tout lien Amazon dans MDX ou JSX doit passer par `addAffiliateTag()` ou `<AffiliateLink>` (cf. CLAUDE.md).

## Auteur (à inventer, persona imposé par l'utilisateur)

- **Nom** : Mathias
- **Slug** : `mathias`
- **Pitch** : cinéphile, adore regarder des films et des séries, cherche « le meilleur » (= sélectionne pour la qualité d'image, le contraste, l'étalonnage, pas pour le gadget)
- **Titre (proposition)** : « Critique ciné-tech indépendant » ou « Testeur vidéoprojecteurs · cinéphile »
- **Bio (à écrire au skill ton-of-voice via interview 8 questions)** : inventée par Claude Code sur la base de la persona. Pas de photo (cf. filtre qualité CLAUDE.md : JSON-LD author sans photo).
- **Tone** : direct, cinéphile, sait reconnaître la différence entre les lumens marketing et les lumens ANSI, n'achète pas un projecteur pour les spécs gadget.
- **No-go (interdits dans le texte)** : « révolutionnaire », « incroyable », « game-changer », « vous allez adorer », jargon influenceur en général.
- **Formulations privilégiées (idées)** : « Honnêtement, » / « Le vrai test : » / « À ce prix, on attend que… » / « Sur grand écran, ça se voit. »

**Note importante** : Mathias est un persona éditorial **inventé** à la demande de l'utilisateur, pas une personne réelle. À mentionner avec transparence dans la page « À propos » si elle existe (équipe éditoriale, pseudonyme assumé).

## Catégories de la niche

Reprise du design Claude Design (4 catégories) :

1. **Salon** (home-cinéma salon lumineux) — accent violet `#9B6CFF`
2. **Cinéphile** (salle dédiée, noirs profonds) — accent orange `#ff7a4d`
3. **Gaming** (input lag, 240 Hz, VRR) — accent jaune `#ffd24a`
4. **Budget** (nomade, premier prix) — accent vert `#36d6a0`

## Produits

Voir [`products-amazon.json`](./products-amazon.json) : 6 modèles sélectionnés depuis `amazon.csv` (172 ASINs uniques après dédup) en fonction de la persona cinéphile de Mathias.

| # | Marque | Modèle | Tag | Prix | Note |
|---|---|---|---|---|---|
| 1 | XGIMI | Horizon 20 Pro | Notre choix | 1 657 € | 4.5 |
| 2 | XGIMI | Horizon Ultra | Polyvalent premium | 949 € | 4.3 |
| 3 | Hisense | M2 Pro | Mini 4K cinéphile | 752 € | 4.5 |
| 4 | LG | CineBeam S PU615U | UST sans recul | 896 € | 5.0 |
| 5 | JMGO | N1S Ultra | Best value tri-laser | 234 € | 4.4 |
| 6 | XGIMI | MoGo 4 | Nomade premium | 533 € | 4.6 |

Images produits déjà récupérées d'Amazon et commitées dans `design-incoming/images/products/{slug}.jpg`. Slugs disponibles :

- `xgimi-horizon-20-pro.jpg`
- `xgimi-horizon-ultra.jpg`
- `hisense-m2-pro.jpg`
- `lg-cinebeam-s-pu615u.jpg`
- `jmgo-n1s-ultra.jpg`
- `xgimi-mogo-4.jpg`

## Catégorie gaming — produit à trouver

Le CSV Amazon ne contenait pas de modèle gaming clairement orienté (input lag < 10 ms, 240 Hz natif). Deux options :
- soit retirer la catégorie « Gaming » du design (Mathias est cinéphile, pas gamer)
- soit chercher manuellement un BenQ TH685P / Optoma UHD38 à ajouter plus tard

À trancher avec l'utilisateur à l'étape d'intégration.

## Direction artistique (recap design Claude Design)

- **Mode** : `dark` (palette bi-ton dark/paper, dark dominant)
- **Effects** : `aurora` (canvas hero avec faisceau lumineux + poussière, grain de film, scanlines)
- **Cards** : `bordered` (border 1px + hover beam glow)
- **Hero** : `split` (texte + carte produit « now showing » à droite)
- **uiStyle** : Editorial Grid / Magazine
- **Palette** :
  - `--ink` `#0B0A0F` (fond)
  - `--ink-2` `#131019`
  - `--paper` `#F4F1EA` (sections claires « papier »)
  - `--beam` `#9B6CFF` violet (accent par défaut, modulable via tweaks)
  - `--amber` `#FFD24A` (badge « notre choix »)
- **Fonts** :
  - Display : `Archivo Expanded` (titres bold/black)
  - Body : `Archivo`
  - Mono : `Space Mono` (kicker, prix, spécs)

  Note : ces fonts sont **à mapper sur les variables Next.js** (`--next-font-display`, `--next-font-primary`, `--next-font-mono`) et chargées via `next/font` — pas de `fonts.googleapis.com` en dur (cf. filtre qualité).

- **Signature / anti-IA** :
  - `anchor` : faisceau lumineux animatif (canvas hero) + grain de film + scanlines = « fait dans le noir, à la lumière d'un projecteur »
  - `oneRule` : jamais de bouton sans aller à droite (`.btn .arr` toujours présente)
  - `inspiration` : Sight & Sound, Aperture magazine, A24 (typographie expanded, contraste fort)
  - `forbidden` : gradients clichés d'IA (violet vers cyan), illustrations cartoon, emblèmes brillants
  - `components` : pullQuote, tabularStat (le `.specsheet` du design), editorialFootnote pour la disclosure affiliée

## Sources & exports

- `amazon.csv` (210 lignes, recherche « videoprojecteur » Amazon.fr exporté par l'utilisateur)
- Toutes les images produit pointent vers `https://m.media-amazon.com/images/I/{image_id}._AC_SL1500_.jpg` (URLs stables d'Amazon, droits d'usage commercial à vérifier dans le cadre du programme Partenaires)

## TODO restants après intégration

- Catégorie gaming (cf. plus haut)
- Fiches techniques enrichies (lumens ANSI, contraste, input lag mesuré) — le CSV Amazon ne contient que des valeurs marketing approximatives
- Déclencher le skill `ton-of-voice` pour figer la voix de Mathias (interview 8 questions)
- Compléter `niche.config.ts` (champs encore vides : `quiz`, `comparator`, `simulator` proposés par le template)
- Mentions légales / page « À propos » / disclosure affilié RGPD
