/**
 * scroll-top.js – Gestion du bouton "retour en haut de page"
 *
 * Fonctionnement :
 * 1. On écoute le scroll de la page
 * 2. Si l'utilisateur a scrollé de plus de 300px → on affiche le bouton
 * 3. Si moins de 300px → on le cache
 * 4. Au clic sur le bouton → on remonte en douceur en haut de la page
 */

document.addEventListener('DOMContentLoaded', () => {

  const btn = document.getElementById('scroll-top-btn');

  // Sécurité : si le bouton n'existe pas, on arrête
  if (!btn) return;

  // ── Affichage / masquage au scroll ───────────────────────────────────────

  // 'scroll' : événement déclenché à chaque pixel de défilement
  window.addEventListener('scroll', () => {

    // window.scrollY : nombre de pixels scrollés depuis le haut de la page
    if (window.scrollY > 300) {
      // On retire 'opacity-0' et 'pointer-events-none' pour rendre le bouton visible et cliquable
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      // On remet le bouton invisible et non cliquable
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }

  });

  // ── Scroll vers le haut au clic ──────────────────────────────────────────

  btn.addEventListener('click', () => {
    // scrollTo avec behavior: 'smooth' : animation de défilement fluide
    // top: 0 : on remonte tout en haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
