document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('[data-category]');
  if (!cards.length) return;

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[99998] flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300';
  modal.inert = true; // fermé : ni focusable ni lu par les lecteurs d'écran
  modal.innerHTML = `
    <div class="absolute inset-0 bg-ink/75 backdrop-blur-sm" id="lb-overlay"></div>
    <div id="lb-card" role="dialog" aria-modal="true" aria-labelledby="lb-title"
         class="relative bg-paper rounded-[1.75rem] overflow-hidden max-w-lg w-full shadow-2xl z-10 translate-y-4 transition-transform duration-300">
      <button id="lb-close" aria-label="Fermer"
              class="absolute top-4 right-4 z-20 w-11 h-11 bg-paper rounded-full flex items-center justify-center shadow hover:bg-ink hover:text-paper transition-colors">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
      <div class="h-64 overflow-hidden bg-sand">
        <img id="lb-img" src="" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="p-8">
        <h3 id="lb-title" class="font-display text-3xl text-ink mb-3"></h3>
        <p  id="lb-desc"  class="text-muted leading-relaxed mb-5"></p>
        <div id="lb-tags" class="flex flex-wrap gap-2"></div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const lbCard   = modal.querySelector('#lb-card');
  const closeBtn = modal.querySelector('#lb-close');
  let lastCard   = null; // pour rendre le focus à la carte d'origine

  function open(card) {
    const img   = card.querySelector('img');
    const title = card.querySelector('h3').textContent;
    const desc  = card.querySelector('p').textContent;
    const tags  = [...card.querySelectorAll('.product-tags span')].map(s => s.textContent);

    modal.querySelector('#lb-img').src = img.src;
    modal.querySelector('#lb-img').alt = img.alt;
    modal.querySelector('#lb-title').textContent = title;
    modal.querySelector('#lb-desc').textContent  = desc;
    modal.querySelector('#lb-tags').innerHTML = tags
      .map(t => `<span class="text-xs px-3 py-1 rounded-full bg-brand-tint text-brand-dark">${t}</span>`)
      .join('');

    lastCard = card;
    modal.inert = false;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    requestAnimationFrame(() => lbCard.classList.remove('translate-y-4'));
    document.body.classList.add('overflow-hidden');
    closeBtn.focus();
  }

  function close() {
    if (modal.inert) return;
    modal.inert = true;
    modal.classList.add('opacity-0', 'pointer-events-none');
    lbCard.classList.add('translate-y-4');
    document.body.classList.remove('overflow-hidden');
    if (lastCard) lastCard.focus();
  }

  modal.querySelector('#lb-overlay').addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (modal.inert) return;
    if (e.key === 'Escape') close();
    // Seul contrôle de la fenêtre : le focus reste sur le bouton Fermer
    if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
  });

  // Cartes ouvrables à la souris et au clavier (Entrée / Espace)
  cards.forEach(card => {
    card.classList.add('cursor-pointer');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Voir le détail : ${card.querySelector('h3').textContent}`);
    card.addEventListener('click', () => open(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
    });
  });
});
