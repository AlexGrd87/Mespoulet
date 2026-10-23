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

  // Carte flottante en bas à droite (pleine largeur sur mobile), moins intrusive qu'une bande
  // z-[9999] : passe au-dessus de tout, y compris le bouton scroll-top (z-50)
  // translate-y-[150%] : commence hors écran, glisse vers le haut
  banner.id = 'cookie-banner';
  banner.className = [
    'fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[9999]',
    'bg-ink text-paper/75 rounded-[1.5rem]',
    'p-6',
    'flex flex-col gap-5',
    'shadow-2xl',
    'translate-y-[150%] transition-transform duration-500 ease-out', // hors écran par défaut
  ].join(' ');

  // ── Contenu HTML du bandeau ──────────────────────────────────────────
  banner.innerHTML = `
    <!-- Texte d'information -->
    <p class="text-sm leading-relaxed">
      Ce site utilise des cookies techniques nécessaires à son bon fonctionnement.
      La carte Google Maps intégrée peut déposer des cookies tiers.
      <a href="mentions-legales.html#cookies"
         class="text-paper underline underline-offset-2 hover:text-brand-soft transition-colors">
        En savoir plus
      </a>
    </p>

    <!-- Boutons d'action -->
    <div class="flex gap-3">

      <!-- Bouton Refuser : style discret (contour clair) -->
      <button id="cookie-refuse" class="btn btn-sm btn-ghost-light flex-1">
        Refuser
      </button>

      <!-- Bouton Accepter : style mis en avant (rouge Mespoulet) -->
      <button id="cookie-accept" class="btn btn-sm btn-brand flex-1">
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
      banner.classList.remove('translate-y-[150%]');
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
    banner.classList.add('translate-y-[150%]');

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
