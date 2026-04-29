document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('[data-category]');
  if (!cards.length) return;

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[99998] flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300';
  modal.innerHTML = `
    <div class="absolute inset-0 bg-black/70" id="lb-overlay"></div>
    <div id="lb-card" class="relative bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl z-10 translate-y-4 transition-transform duration-300">
      <button id="lb-close" aria-label="Fermer"
              class="absolute top-3 right-3 z-20 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition-colors">
        <i class="fa-solid fa-xmark text-gray-700"></i>
      </button>
      <div class="h-64 overflow-hidden">
        <img id="lb-img" src="" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="p-6">
        <h3 id="lb-title" class="font-bold text-primary text-2xl mb-3"></h3>
        <p  id="lb-desc"  class="text-gray-600 leading-relaxed text-sm mb-4"></p>
        <div id="lb-tags" class="flex flex-wrap gap-2"></div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const lbCard = modal.querySelector('#lb-card');

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
      .map(t => `<span style="background:#F4F6FA;color:#1B3F8B;font-size:0.75rem;padding:0.25rem 0.75rem;border-radius:9999px">${t}</span>`)
      .join('');

    modal.classList.remove('opacity-0', 'pointer-events-none');
    requestAnimationFrame(() => lbCard.classList.remove('translate-y-4'));
    document.body.classList.add('overflow-hidden');
  }

  function close() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    lbCard.classList.add('translate-y-4');
    document.body.classList.remove('overflow-hidden');
  }

  modal.querySelector('#lb-overlay').addEventListener('click', close);
  modal.querySelector('#lb-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  cards.forEach(card => {
    card.classList.add('cursor-pointer');
    card.addEventListener('click', () => open(card));
  });
});
