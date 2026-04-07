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
 */

AOS.init({
  duration: 700,          // chaque animation dure 700ms
  once: true,             // ne se rejoue pas si l'utilisateur remonte
  offset: 80,             // se déclenche quand l'élément est à 80px du bord bas de l'écran
  easing: 'ease-out-cubic' // démarrage rapide, ralentissement progressif
});
