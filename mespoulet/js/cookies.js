/**
 * cookies.js – Bandeau de consentement aux cookies (RGPD)
 *
 * Fonctionnement :
 *   1. Au chargement de la page, on vérifie si l'utilisateur a déjà fait
 *      un choix via localStorage (clé "cookieConsent").
 *   2. Si aucun choix n'a été enregistré, le bandeau s'affiche en bas
 *      de l'écran avec deux boutons : Accepter et Refuser.
 *   3. Au clic sur l'un des boutons :
 *      – Le choix est sauvegardé dans localStorage pour ne plus afficher
 *        le bandeau lors des prochaines visites.
 *      – Le bandeau se masque avec une animation de fondu.
 *
 * Note : ce site n'utilise pas de cookies de tracking, donc les deux
 * boutons ont le même effet visuel. Le bandeau répond à l'obligation
 * légale d'information des utilisateurs (art. 82 loi Informatique et Libertés).
 */

document.addEventListener('DOMContentLoaded', () => {

  // Si l'utilisateur a déjà répondu, on ne fait rien
  if (localStorage.getItem('cookieConsent')) return;

  // ── Création du bandeau ──────────────────────────────────────────────
  const banner = document.createElement('div');

  // Positionnement en bas de l'écran, sur toute la largeur
  // z-[9999] : passe au-dessus de tout, y compris le bouton scroll-top (z-50)
  // transition-transform translate-y-full : commence hors écran, glisse vers le haut
  banner.id = 'cookie-banner';
  banner.className = [
    'fixed bottom-0 left-0 right-0 z-[9999]',
    'bg-gray-900 text-gray-300',
    'px-6 py-5',
    'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
    'shadow-2xl',
    'translate-y-full transition-transform duration-500 ease-out', // hors écran par défaut
  ].join(' ');

  // ── Contenu HTML du bandeau ──────────────────────────────────────────
  banner.innerHTML = `
    <!-- Texte d'information -->
    <p class="text-sm leading-relaxed max-w-2xl">
      Ce site utilise des cookies techniques nécessaires à son bon fonctionnement.
      La carte Google Maps intégrée peut déposer des cookies tiers.
      <a href="mentions-legales.html#cookies"
         class="text-secondary underline hover:text-yellow-400 transition-colors">
        En savoir plus
      </a>
    </p>

    <!-- Boutons d'action -->
    <!-- flex-shrink-0 : les boutons ne rétrécissent pas sur petits écrans -->
    <div class="flex gap-3 flex-shrink-0">

      <!-- Bouton Refuser : style discret (contour blanc) -->
      <button id="cookie-refuse"
              class="text-sm px-5 py-2 rounded-full border border-gray-500
                     hover:border-white text-gray-400 hover:text-white
                     transition-colors">
        Refuser
      </button>

      <!-- Bouton Accepter : style mis en avant (fond jaune) -->
      <button id="cookie-accept"
              class="text-sm px-5 py-2 rounded-full bg-secondary
                     hover:bg-yellow-600 text-white font-semibold
                     transition-colors">
        Accepter
      </button>

    </div>
  `;

  // Injection dans le document avant la fermeture de <body>
  document.body.appendChild(banner);

  // ── Apparition du bandeau avec un léger délai ────────────────────────
  // requestAnimationFrame assure que le DOM est prêt avant de retirer la classe
  // Le délai de 300ms évite que le bandeau saute à l'écran immédiatement
  setTimeout(() => {
    requestAnimationFrame(() => {
      banner.classList.remove('translate-y-full');
    });
  }, 300);


  // ── Fonction de fermeture partagée ───────────────────────────────────
  /**
   * hideBanner(choice) – Enregistre le choix et masque le bandeau
   * @param {string} choice – "accepted" ou "refused"
   */
  function hideBanner(choice) {
    // Sauvegarde le choix → le bandeau ne se réaffichera pas
    localStorage.setItem('cookieConsent', choice);

    // Glisse le bandeau hors de l'écran vers le bas
    banner.classList.add('translate-y-full');

    // Supprime le nœud du DOM après la fin de l'animation (500ms)
    setTimeout(() => banner.remove(), 500);
  }

  // ── Écouteurs de clics ────────────────────────────────────────────────
  document.getElementById('cookie-accept').addEventListener('click', () => {
    hideBanner('accepted');
  });

  document.getElementById('cookie-refuse').addEventListener('click', () => {
    hideBanner('refused');
  });

});
