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
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@400;500;600&display=swap',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
].forEach(href => {
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = href;
  document.head.appendChild(l);
});

// Composants communs à toutes les pages (boutons, sur-titres, liens soulignés)
const baseStyle = document.createElement('style');
baseStyle.textContent = `
  @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
  body { overflow-x: clip; -webkit-font-smoothing: antialiased; }
  ::selection { background: #C42B25; color: #fff; }

  /* Contour visible pour la navigation au clavier uniquement */
  :focus-visible { outline: 2px solid #C42B25; outline-offset: 3px; border-radius: 6px; }
  .bg-ink :focus-visible, .bg-brand :focus-visible { outline-color: #FAF7F2; }

  .skip-link { position: absolute; left: 1rem; top: -4rem; z-index: 100000; background: #161412; color: #FAF7F2;
               padding: .75rem 1.25rem; border-radius: 999px; font-weight: 600; transition: top .2s; }
  .skip-link:focus { top: 1rem; }
  main:focus { outline: none; } /* cible du lien d'évitement, pas un contrôle */

  .eyebrow { display: inline-flex; align-items: center; gap: .75rem; font-size: .72rem; font-weight: 600;
             letter-spacing: .18em; text-transform: uppercase; color: #C42B25; }
  .eyebrow::before { content: ''; width: 2rem; height: 1px; background: currentColor; }
  .eyebrow-light { color: #E5554E; }

  .btn { display: inline-flex; align-items: center; justify-content: center; gap: .6rem; padding: .95rem 1.7rem;
         border-radius: 999px; font-weight: 600; font-size: .95rem; line-height: 1;
         transition: background-color .2s, color .2s, border-color .2s, transform .2s; }
  .btn:hover { transform: translateY(-1px); }
  .btn-sm { padding: .7rem 1.2rem; font-size: .85rem; min-height: 44px; }
  .btn-brand { background: #C42B25; color: #fff; }
  .btn-brand:hover { background: #A11F1A; }
  .btn-ink { background: #161412; color: #FAF7F2; }
  .btn-ink:hover { background: #3A3531; }
  .btn-ghost { border: 1px solid #161412; color: #161412; }
  .btn-ghost:hover { background: #161412; color: #FAF7F2; }
  .btn-ghost-light { border: 1px solid rgba(250,247,242,.35); color: #FAF7F2; }
  .btn-ghost-light:hover { background: #FAF7F2; color: #161412; border-color: #FAF7F2; }

  .link-u { background-image: linear-gradient(currentColor, currentColor); background-size: 0 1px;
            background-repeat: no-repeat; background-position: 0 100%; transition: background-size .3s, color .2s; }
  .link-u:hover, .link-u.is-active { background-size: 100% 1px; }
`;
document.head.appendChild(baseStyle);

// ── Injection header/footer (s'exécute après le parsing du DOM) ───────────────
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  // Lien d'évitement : permet aux utilisateurs clavier de sauter la navigation
  const main = document.querySelector('main');
  if (main) {
    main.id = main.id || 'contenu';
    main.tabIndex = -1;
    document.body.insertAdjacentHTML('afterbegin',
      `<a href="#${main.id}" class="skip-link">Aller au contenu</a>`);
  }

  const NAV_LINKS = [
    { href: 'index.html',    label: 'Accueil' },
    { href: 'about.html',    label: "L'entreprise" },
    { href: 'produits.html', label: 'Nos produits' },
    { href: 'contact.html',  label: 'Contact' },
  ];

  function navItem(link) {
    const active = page === link.href;
    return active
      ? `<a href="${link.href}" class="link-u is-active text-ink font-medium" aria-current="page">${link.label}</a>`
      : `<a href="${link.href}" class="link-u text-muted hover:text-ink font-medium">${link.label}</a>`;
  }

  function mobileItem(link) {
    const active = page === link.href;
    return `<a href="${link.href}" class="font-display text-3xl py-2 ${active ? 'text-brand' : 'text-ink'}">${link.label}</a>`;
  }

  document.getElementById('site-header').innerHTML = `
<header class="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-line">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between gap-6">
    <a href="index.html" class="flex items-center gap-3 shrink-0" aria-label="Mespoulet Distribution – accueil">
      <img src="Images/logo-mespoulet-seul.png" alt="" class="h-12 w-auto mix-blend-multiply" />
      <span class="leading-none">
        <span class="block font-display text-2xl font-semibold text-ink tracking-tight">Mespoulet</span>
        <span class="block text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-muted mt-1">Distribution · Limoges</span>
      </span>
    </a>
    <nav class="hidden md:flex items-center gap-9 text-[0.95rem]">
      ${NAV_LINKS.filter(l => l.href !== 'contact.html').map(navItem).join('\n      ')}
    </nav>
    <a href="contact.html" class="hidden md:inline-flex btn btn-brand btn-sm">Demander un devis</a>
    <button id="menu-toggle" class="md:hidden w-11 h-11 rounded-full border border-line flex items-center justify-center text-ink"
            aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu">
      <i class="fa-solid fa-bars" id="menu-icon"></i>
    </button>
  </div>
  <div id="mobile-menu" class="hidden md:hidden border-t border-line bg-paper">
    <nav class="flex flex-col px-5 py-6">
      ${NAV_LINKS.map(mobileItem).join('\n      ')}
      <a href="tel:+33555345130" class="mt-6 text-muted"><i class="fa-solid fa-phone mr-2 text-brand"></i>05 55 34 51 30</a>
    </nav>
  </div>
</header>`;

  document.getElementById('site-footer').innerHTML = `
<footer class="bg-ink text-paper/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
    <div class="grid lg:grid-cols-12 gap-14 pb-16 border-b border-white/10">
      <div class="lg:col-span-5">
        <p class="font-display text-4xl sm:text-5xl text-paper leading-[1.05] tracking-tight">
          Les boissons de la Haute-Vienne, <em class="italic font-normal text-brand-soft">depuis 1932.</em>
        </p>
        <a href="contact.html" class="btn btn-brand mt-8">Devenir client <i class="fa-solid fa-arrow-right text-sm"></i></a>
      </div>
      <div class="lg:col-span-7 grid sm:grid-cols-3 gap-10 text-sm">
        <div>
          <h4 class="text-paper font-semibold mb-4">Mespoulet Distribution</h4>
          <p class="leading-relaxed">
            Grossiste en boissons à Limoges depuis 1999.<br />
            Adhérent du réseau national C10.
          </p>
        </div>
        <div>
          <h4 class="text-paper font-semibold mb-4">Navigation</h4>
          <ul class="flex flex-col gap-2.5">
            ${NAV_LINKS.map(l => `<li><a href="${l.href}" class="link-u hover:text-paper">${l.label}</a></li>`).join('\n            ')}
            <li><a href="mentions-legales.html" class="link-u hover:text-paper">Mentions légales</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-paper font-semibold mb-4">Coordonnées</h4>
          <address class="not-italic flex flex-col gap-2.5">
            <span>38 rue Maurice Utrillo<br />87000 Limoges</span>
            <a href="tel:+33555345130" class="link-u hover:text-paper self-start">05 55 34 51 30</a>
          </address>
          <h4 class="text-paper font-semibold mt-8 mb-3">Le Comptoir des Vignes</h4>
          <p class="leading-relaxed">32 rue François Arago, Limoges<br />Rue de la Tour, Le Vigen</p>
        </div>
      </div>
    </div>
    <div class="pt-8 pb-14 sm:pb-0 sm:pr-20 flex flex-col sm:flex-row justify-between gap-3 text-xs text-paper/60">
      <p>© 2026 Mespoulet Distribution · SAS · RCS Limoges 424 360 113</p>
      <p>L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</p>
    </div>
  </div>
</footer>
<button id="scroll-top-btn"
        aria-label="Retour en haut de page"
        class="fixed bottom-6 right-6 z-50 opacity-0 pointer-events-none transition-opacity duration-300 bg-ink hover:bg-brand text-paper w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
  <i class="fa-solid fa-arrow-up"></i>
</button>`;

  // Icônes Font Awesome décoratives : masquées aux lecteurs d'écran
  document.querySelectorAll('i.fa-solid, i.fa-regular').forEach(i => i.setAttribute('aria-hidden', 'true'));

  // Menu hamburger
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon   = document.getElementById('menu-icon');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('hidden') === false;
      menuToggle.setAttribute('aria-expanded', open);
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
