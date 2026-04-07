/**
 * transitions.js – Transitions de page (fondu entrant/sortant)
 *
 * Fonctionnement :
 *   1. Un overlay plein écran (div#page-overlay) est injecté dans le DOM.
 *      Il démarre opaque (visible) et disparaît en fondu à l'arrivée sur la page
 *      → effet "fondu entrant" (fade-in).
 *
 *   2. Quand l'utilisateur clique sur un lien interne, l'overlay réapparaît
 *      en fondu avant que le navigateur charge la nouvelle page
 *      → effet "fondu sortant" (fade-out).
 *
 * Seuls les liens internes sont concernés (même origine, pas de _blank).
 * Les liens externes, mailto:, tel: sont ignorés.
 */

(function () {

  // ── Injection de l'overlay ───────────────────────────────────────────
  // On crée le div dès que le script est parsé (avant DOMContentLoaded)
  // pour qu'il soit présent le plus tôt possible et éviter le flash.
  const overlay = document.createElement('div');
  overlay.id = 'page-overlay';

  // Style inline minimal pour que l'overlay soit opaque AVANT que
  // Tailwind ne soit chargé (évite le flash de contenu).
  // fixed inset-0 : couvre tout l'écran | z-[99999] : au-dessus de tout
  // bg-light : fond crème identique au body → transition imperceptible
  // pointer-events-none : n'intercepte pas les clics une fois transparent
  overlay.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:99999',
    'background-color:#F4F6FA',   // même couleur que bg-light Tailwind
    'opacity:1',                  // opaque par défaut → page invisible au départ
    'transition:opacity 350ms ease',
    'pointer-events:none',
  ].join(';');

  // Injection en tout premier enfant du body
  document.documentElement.appendChild(overlay);


  // ── Fondu entrant à l'arrivée ────────────────────────────────────────
  // Dès que le DOM est prêt, on efface l'overlay progressivement.
  document.addEventListener('DOMContentLoaded', () => {
    // Petit délai pour que le navigateur ait le temps de peindre la page
    requestAnimationFrame(() => {
      overlay.style.opacity = '0';
    });
  });


  // ── Fondu sortant au clic sur un lien interne ────────────────────────
  document.addEventListener('click', (e) => {

    // Remonte l'arbre DOM pour trouver la balise <a> la plus proche du clic
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignore les liens qui ne sont pas des navigations de page :
    // – liens externes (autre domaine)
    // – ancres seules (#section)
    // – protocoles spéciaux (mailto:, tel:, javascript:)
    // – liens qui s'ouvrent dans un nouvel onglet
    const isSameOrigin = link.origin === window.location.origin;
    const isHashOnly   = href.startsWith('#');
    const isSpecial    = /^(mailto:|tel:|javascript:)/i.test(href);
    const isNewTab     = link.target === '_blank';

    if (!isSameOrigin || isHashOnly || isSpecial || isNewTab) return;

    // Empêche la navigation immédiate du navigateur
    e.preventDefault();

    // Rend l'overlay visible → l'écran se couvre progressivement
    overlay.style.pointerEvents = 'auto'; // bloque les double-clics pendant la transition
    overlay.style.opacity = '1';

    // Attend la fin de la transition CSS (350ms) puis navigue
    setTimeout(() => {
      window.location.href = href;
    }, 350);

  });

})();
