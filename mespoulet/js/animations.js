/**
 * animations.js – Initialisation des animations AOS (Animate On Scroll)
 *
 * AOS est une librairie qui anime les éléments HTML quand ils entrent
 * dans le champ de vision de l'utilisateur au scroll.
 *
 * Les animations sont définies directement dans le HTML via l'attribut :
 *   data-aos="nom-animation"
 *
 * Options disponibles dans AOS.init() :
 *   duration : durée de l'animation en millisecondes
 *   once     : true = l'animation ne se joue qu'une seule fois (recommandé)
 *   offset   : distance en px avant le bord de la fenêtre pour déclencher
 *   easing   : courbe d'accélération de l'animation
 *   disable  : désactive AOS (contenu affiché directement)
 */

AOS.init({
  duration: 600,          // assez court pour ne pas ralentir la lecture
  once: true,             // ne se rejoue pas si l'utilisateur remonte
  offset: 80,             // se déclenche quand l'élément est à 80px du bord bas de l'écran
  easing: 'ease-out-cubic', // démarrage rapide, ralentissement progressif
  // Respecte le réglage système « réduire les animations »
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
});
