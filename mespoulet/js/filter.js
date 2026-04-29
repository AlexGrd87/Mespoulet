document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards   = document.querySelectorAll('[data-category]');
  if (!buttons.length) return;

  function setActive(btn) {
    buttons.forEach(b => {
      b.classList.remove('bg-primary', 'text-white');
      b.classList.add('bg-white', 'text-gray-600');
    });
    btn.classList.remove('bg-white', 'text-gray-600');
    btn.classList.add('bg-primary', 'text-white');
  }

  function filterCards(filter) {
    cards.forEach(card => {
      card.style.transition = 'opacity 150ms';
      card.style.opacity = '0';
    });
    setTimeout(() => {
      cards.forEach(card => {
        const show = filter === 'tous' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
      requestAnimationFrame(() => {
        cards.forEach(card => {
          if (card.style.display !== 'none') {
            card.style.transition = 'opacity 300ms';
            card.style.opacity = '1';
          }
        });
      });
    }, 150);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setActive(btn);
      filterCards(btn.dataset.filter);
    });
  });
});
