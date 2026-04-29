function runCounter(el) {
  const target   = parseInt(el.dataset.counter, 10);
  const from     = el.dataset.from ? parseInt(el.dataset.from, 10) : 0;
  const prefix   = el.dataset.prefix || '';
  const suffix   = el.dataset.suffix || '';
  const duration = 1500;
  const t0       = Date.now();

  function step() {
    const p     = Math.min((Date.now() - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(from + (target - from) * eased) + suffix;
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

document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
