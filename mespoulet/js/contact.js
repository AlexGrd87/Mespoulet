const FORMSPREE_URL = 'https://formspree.io/f/VOTRE_ID_FORMSPREE';

document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');

  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...`;
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    const data = Object.fromEntries(new FormData(form).entries());

    // ── Mode local : log dans la console au lieu d'envoyer à Formspree ──
    if (FORMSPREE_URL.includes('VOTRE_ID')) {
      console.log('[Contact] Données du formulaire :', data);
      await new Promise(r => setTimeout(r, 600)); // simule un délai réseau
      successMsg.classList.remove('hidden');
      form.reset();
    } else {
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        res.ok ? successMsg.classList.remove('hidden') : errorMsg.classList.remove('hidden');
        if (res.ok) form.reset();
      } catch {
        errorMsg.classList.remove('hidden');
      }
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Envoyer le message`;
  });
});
