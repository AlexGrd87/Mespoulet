/**
 * menu.js – Gestion du menu hamburger mobile
 *
 * Fonctionnement :
 * - Sur mobile, le bouton #menu-toggle est visible
 * - Au clic, on affiche/cache le menu #mobile-menu via la classe CSS "hidden"
 * - L'icône alterne entre ☰ (fa-bars) et ✕ (fa-xmark)
 *
 * Ce script est chargé par toutes les pages via <script src="js/menu.js">
 */

// On attend que tout le HTML soit chargé avant d'exécuter le script
// Cela évite les erreurs si le script est chargé avant les éléments HTML
document.addEventListener('DOMContentLoaded', () => {

  // On récupère les trois éléments dont on a besoin
  const menuToggle = document.getElementById('menu-toggle'); // le bouton ☰
  const mobileMenu = document.getElementById('mobile-menu'); // le menu déroulant
  const menuIcon   = document.getElementById('menu-icon');   // l'icône dans le bouton

  // Sécurité : on vérifie que les éléments existent avant d'ajouter l'écouteur
  // (utile si une page n'a pas de menu hamburger)
  if (!menuToggle) return;

  // addEventListener('click') : on écoute le clic sur le bouton hamburger
  menuToggle.addEventListener('click', () => {

    // toggle('hidden') :
    //   - si la classe 'hidden' est présente → on l'enlève  (menu s'ouvre)
    //   - si la classe 'hidden' est absente  → on l'ajoute  (menu se ferme)
    mobileMenu.classList.toggle('hidden');

    // On alterne l'icône entre ☰ et ✕
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');

  });

});
