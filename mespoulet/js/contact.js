/**
 * contact.js – Gestion de l'envoi du formulaire de contact via Formspree
 *
 * Fonctionnement :
 * 1. On intercepte la soumission du formulaire (preventDefault = pas de rechargement)
 * 2. On collecte les données des champs
 * 3. On envoie une requête fetch() en POST vers l'API Formspree
 * 4. On affiche un message de succès ou d'erreur selon la réponse
 *
 * ⚠️  AVANT UTILISATION :
 *    - Crée un compte gratuit sur https://formspree.io
 *    - Crée un nouveau formulaire et copie ton ID (ex: "abcdefgh")
 *    - Remplace "VOTRE_ID_FORMSPREE" ci-dessous par cet ID
 */

// ─── Configuration ───────────────────────────────────────────────────────────

// URL Formspree : remplace VOTRE_ID_FORMSPREE par l'ID obtenu sur formspree.io
const FORMSPREE_URL = "https://formspree.io/f/VOTRE_ID_FORMSPREE";

// ─── Initialisation ──────────────────────────────────────────────────────────

// On attend que tout le HTML soit chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {

  // Récupération des éléments du DOM
  const form          = document.getElementById('contact-form');   // le formulaire
  const submitBtn     = document.getElementById('submit-btn');     // le bouton d'envoi
  const successMsg    = document.getElementById('form-success');   // message de succès
  const errorMsg      = document.getElementById('form-error');     // message d'erreur

  // Sécurité : si le formulaire n'existe pas sur la page, on arrête
  if (!form) return;

  // ─── Écouteur de soumission ────────────────────────────────────────────────

  // 'submit' : événement déclenché quand l'utilisateur clique sur "Envoyer"
  form.addEventListener('submit', async (e) => {

    // preventDefault() : empêche le comportement par défaut du navigateur
    // (sans ça, la page se rechargerait et les données partiraient en GET dans l'URL)
    e.preventDefault();

    // ── État "chargement" du bouton ──────────────────────────────────────────

    // On désactive le bouton pendant l'envoi pour éviter les doubles soumissions
    submitBtn.disabled = true;

    // On change le texte et l'icône du bouton pour indiquer que l'envoi est en cours
    submitBtn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Envoi en cours...
    `;

    // On cache les messages précédents au cas où l'utilisateur renvoie le formulaire
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    // ── Collecte des données du formulaire ───────────────────────────────────

    // FormData() collecte automatiquement tous les champs du formulaire
    // grâce aux attributs "name" définis sur chaque input
    const formData = new FormData(form);

    // ── Envoi vers Formspree ─────────────────────────────────────────────────

    try {
      // fetch() : envoie une requête HTTP asynchrone (async/await = on attend la réponse)
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',           // méthode POST : envoie des données
        body: formData,           // corps de la requête : les données du formulaire
        headers: {
          'Accept': 'application/json'  // on demande une réponse en JSON
        }
      });

      // ── Traitement de la réponse ─────────────────────────────────────────

      if (response.ok) {
        // ✅ Succès : Formspree a bien reçu et va envoyer l'email

        // On affiche le message de succès
        successMsg.classList.remove('hidden');

        // On vide le formulaire
        form.reset();

      } else {
        // ❌ Erreur côté serveur (ex: ID Formspree invalide)
        errorMsg.classList.remove('hidden');
      }

    } catch (error) {
      // ❌ Erreur réseau (ex: pas de connexion internet)
      // catch() intercepte toutes les erreurs levées dans le bloc try
      errorMsg.classList.remove('hidden');
      console.error('Erreur lors de l\'envoi du formulaire :', error);
    }

    // ── Réinitialisation du bouton ───────────────────────────────────────────

    // Qu'il y ait succès ou erreur, on réactive le bouton pour permettre un nouvel essai
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <i class="fa-solid fa-paper-plane"></i>
      Envoyer le message
    `;

  });

});
