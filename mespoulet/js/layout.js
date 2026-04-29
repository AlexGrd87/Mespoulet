// ── Injection CSS partagée (s'exécute dès que le script est parsé dans <head>) ─
[['preconnect', 'https://fonts.googleapis.com', false],
 ['preconnect', 'https://fonts.gstatic.com',    true]
].forEach(([rel, href, co]) => {
  const l = document.createElement('link');
  l.rel = rel; l.href = href;
  if (co) l.crossOrigin = '';
  document.head.appendChild(l);
});

[
  'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
].forEach(href => {
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = href;
  document.head.appendChild(l);
});

// ── Injection header/footer (s'exécute après le parsing du DOM) ───────────────
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  const NAV_LINKS = [
    { href: 'index.html',    label: 'Accueil' },
    { href: 'about.html',    label: "L'entreprise" },
    { href: 'produits.html', label: 'Nos produits' },
    { href: 'contact.html',  label: 'Contact' },
  ];

  function navItem(link, mobile = false) {
    const active = page === link.href;
    const extra  = mobile ? ' py-1' : '';
    return active
      ? `<a href="${link.href}" class="text-secondary font-medium${extra}">${link.label}</a>`
      : `<a href="${link.href}" class="text-white hover:text-secondary transition-colors font-medium${extra}">${link.label}</a>`;
  }

  document.getElementById('site-header').innerHTML = `
<header class="sticky top-0 z-50 bg-primary shadow-md">
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="index.html" class="flex items-center gap-3">
      <img src="Images/logo-mespoulet.png" alt="Logo Mespoulet Distribution" class="h-16 w-auto" />
      <span class="font-serif text-2xl font-bold text-white tracking-wide">
        Mespoulet <span class="text-secondary">Distribution</span>
      </span>
    </a>
    <nav class="hidden md:flex gap-8">
      ${NAV_LINKS.map(l => navItem(l)).join('\n      ')}
    </nav>
    <button id="menu-toggle" class="md:hidden text-white text-2xl focus:outline-none" aria-label="Ouvrir le menu">
      <i class="fa-solid fa-bars" id="menu-icon"></i>
    </button>
  </div>
  <div id="mobile-menu" class="hidden md:hidden border-t border-white/20">
    <nav class="flex flex-col px-6 py-4 gap-4">
      ${NAV_LINKS.map(l => navItem(l, true)).join('\n      ')}
    </nav>
  </div>
</header>`;

  document.getElementById('site-footer').innerHTML = `
<footer class="bg-gray-900 text-gray-400 py-12">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h4 class="text-white font-serif text-xl font-bold mb-4">
          Mespoulet <span class="text-secondary">Distribution</span>
        </h4>
        <p class="leading-relaxed">
          Grossiste en boissons à Limoges depuis 1999.<br />
          Membre du réseau national C10.
        </p>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-4 uppercase tracking-wide text-sm">Navigation</h4>
        <ul class="flex flex-col gap-2">
          <li><a href="index.html"            class="hover:text-white transition-colors">Accueil</a></li>
          <li><a href="about.html"            class="hover:text-white transition-colors">L'entreprise</a></li>
          <li><a href="produits.html"         class="hover:text-white transition-colors">Nos produits</a></li>
          <li><a href="contact.html"          class="hover:text-white transition-colors">Contact</a></li>
          <li><a href="mentions-legales.html" class="hover:text-white transition-colors">Mentions légales</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-4 uppercase tracking-wide text-sm">Coordonnées</h4>
        <address class="not-italic flex flex-col gap-2">
          <span>38 Rue Maurice Utrillo</span>
          <span>87000 Limoges</span>
          <a href="tel:+33555345130" class="hover:text-white transition-colors">05 55 34 51 30</a>
        </address>
      </div>
    </div>
    <div class="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
      <p>© 2026 Mespoulet Distribution – Tous droits réservés</p>
    </div>
  </div>
</footer>
<button id="scroll-top-btn"
        aria-label="Retour en haut de page"
        class="fixed bottom-6 right-6 z-50 opacity-0 pointer-events-none transition-opacity duration-300 bg-primary hover:bg-blue-900 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
  <i class="fa-solid fa-chevron-up"></i>
</button>`;

  // Menu hamburger
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon   = document.getElementById('menu-icon');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.toggle('fa-xmark');
    });
  }

  // Bouton scroll-top
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollBtn.classList.add('opacity-100');
      } else {
        scrollBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollBtn.classList.remove('opacity-100');
      }
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
