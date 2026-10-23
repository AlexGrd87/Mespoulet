function runCounter(el) {
  const target   = parseFloat(el.dataset.counter);
  const from     = el.dataset.from ? parseFloat(el.dataset.from) : 0;
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
  const prefix   = el.dataset.prefix || '';
  const suffix   = el.dataset.suffix || '';
  const duration = 1500;
  const t0       = Date.now();

  // Format français : virgule décimale (10,7), espace des milliers seulement si data-group
  const format = n => n.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: el.dataset.group === 'true',
  });

  function step() {
    const p     = Math.min((Date.now() - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + format(from + (target - from) * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      runCounter(entry.target);
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

// Sous « réduire les animations », on garde la valeur finale déjà écrite dans le HTML
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
}
