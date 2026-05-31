/* FAISCEAU — données produits partagées (modèles plausibles, non réels) */
window.PROJECTORS = [
  {
    id: 'aurora-ls900',
    brand: 'Aurora', name: 'LaserScape LS900', slug: 'aurora-ls900',
    type: 'Laser UST', tech: 'Tri-laser DLP', res: '4K', resFull: '4K UHD (3840×2160)',
    lumens: 2700, contrast: '2 500 000:1', lag: 18, refresh: '4K/60 · FHD/240',
    noise: 26, throw: 'Ultra-courte focale', price: 2499, rating: 4.8,
    tag: 'Notre choix', cat: ['Salon', 'Cinéphile'], color: '#9B6CFF',
    pitch: "L'image de 100\" posée contre le mur, sans recul. La référence du salon haut de gamme.",
    pros: ['Couleurs laser éclatantes', 'Aucun recul nécessaire', 'Silencieux en mode éco'],
    cons: ['Tarif premium', 'Mur/écran très plat exigé']
  },
  {
    id: 'nova-cine4k',
    brand: 'Nova', name: 'CinePro 4K', slug: 'nova-cine4k',
    type: 'DLP 4K', tech: 'DLP 0.47" + roue RGBW', res: '4K', resFull: '4K UHD (pixel-shift)',
    lumens: 2200, contrast: '600 000:1', lag: 26, refresh: '4K/60 · FHD/120',
    noise: 28, throw: 'Focale standard', price: 1799, rating: 4.6,
    tag: 'Polyvalent', cat: ['Salon', 'Cinéphile'], color: '#5fb0ff',
    pitch: "Le couteau suisse du home-cinéma : net, lumineux, juste ce qu'il faut de réglages.",
    pros: ['Excellent rapport qualité-prix', 'HDR convaincant', 'Installation souple'],
    cons: ['Roue chromatique audible', 'Noirs perfectibles']
  },
  {
    id: 'halox-beam1080',
    brand: 'Halox', name: 'Beam 1080', slug: 'halox-beam1080',
    type: 'LCD FHD', tech: '3LCD', res: '1080p', resFull: 'Full HD (1920×1080)',
    lumens: 3000, contrast: '16 000:1', lag: 16, refresh: 'FHD/120',
    noise: 31, throw: 'Focale standard', price: 749, rating: 4.4,
    tag: 'Meilleur budget', cat: ['Budget', 'Gaming'], color: '#36d6a0',
    pitch: "La grande image lumineuse qui ne ruine personne. Idéal première installation.",
    pros: ['Très lumineux le jour', 'Prix plancher', 'Faible input lag'],
    cons: ['Pas de 4K', 'Plastique perfectible']
  },
  {
    id: 'cineo-halo',
    brand: 'Cineo', name: 'Halo Laser', slug: 'cineo-halo',
    type: 'Laser 4K', tech: 'Laser phosphore DLP', res: '4K', resFull: '4K UHD (3840×2160)',
    lumens: 3500, contrast: '1 200 000:1', lag: 21, refresh: '4K/60 · FHD/240',
    noise: 24, throw: 'Focale standard', price: 3290, rating: 4.5,
    tag: 'Salle dédiée', cat: ['Cinéphile', 'Salon'], color: '#ff7a4d',
    pitch: "Pour la pièce noire dédiée : éclat laser, contraste profond, étalonnage de cinéma.",
    pros: ['Lumière laser durable', 'Contraste remarquable', 'Quasi inaudible'],
    cons: ['Encombrant', 'Réservé aux pièces sombres']
  },
  {
    id: 'beamr-reactor',
    brand: 'Beamr', name: 'Reactor 240', slug: 'beamr-reactor',
    type: 'DLP Gaming', tech: 'DLP 0.65" haute fréquence', res: '1080p', resFull: 'Full HD (1920×1080)',
    lumens: 1200, contrast: '50 000:1', lag: 4, refresh: 'FHD/240 · 1080/120',
    noise: 29, throw: 'Focale standard', price: 1099, rating: 4.3,
    tag: 'Roi du gaming', cat: ['Gaming'], color: '#ffd24a',
    pitch: "4 ms d'input lag, 240 Hz : la projection enfin taillée pour le jeu compétitif.",
    pros: ['Input lag minuscule', '240 Hz natif', 'ALLM / VRR'],
    cons: ['Résolution 1080p', 'Lumière modeste']
  },
  {
    id: 'vantix-go',
    brand: 'Vantix', name: 'GO Portable', slug: 'vantix-go',
    type: 'LED Nomade', tech: 'LED 1080p compact', res: '1080p', resFull: 'Full HD (1920×1080)',
    lumens: 700, contrast: '12 000:1', lag: 33, refresh: 'FHD/60',
    noise: 27, throw: 'Focale courte', price: 549, rating: 4.1,
    tag: 'Nomade', cat: ['Budget'], color: '#c08bff',
    pitch: "Batterie, Android TV, format livre : le cinéma qui se glisse dans le sac.",
    pros: ['Autonome sur batterie', 'Très compact', 'Android TV intégré'],
    cons: ['Peu lumineux', 'Son interne limité']
  }
];

/* Render helpers shared across pages */
window.FX = window.FX || {};
window.FX.stars = function (r) {
  const full = Math.round(r);
  let s = '<span class="stars" aria-label="' + r + ' sur 5">';
  for (let i = 1; i <= 5; i++) {
    s += '<svg viewBox="0 0 24 24" fill="' + (i <= full ? 'currentColor' : 'none') +
      '" stroke="currentColor" stroke-width="1.5"><path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6 21.3l1.2-6.6L2.4 9.5l6.6-.9z"/></svg>';
  }
  return s + '</span>';
};
window.FX.euro = function (n) { return n.toLocaleString('fr-FR') + ' €'; };
