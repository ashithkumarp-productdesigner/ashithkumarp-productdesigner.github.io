// Small interactions shared by every page. Each block checks that its element exists.
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMAIL = 'ashithkumarp@gmail.com';

  // Light / dark toggle (remembers the choice in this browser)
  try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
  const toggle = document.getElementById('theme');
  if (toggle) toggle.addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // Nav border after scrolling
  const nav = document.getElementById('nav');
  if (nav) { const f = () => nav.classList.toggle('scrolled', scrollY > 8); addEventListener('scroll', f, {passive:true}); f(); }

  // Highlight the current section in the nav (home page)
  const links = [...document.querySelectorAll('.links a[href^="#"]')];
  if (links.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    }), {rootMargin:'-45% 0px -50% 0px'});
    links.forEach(a => { const el = document.querySelector(a.getAttribute('href')); if (el) io.observe(el); });
  }

  // Reveal blocks as they scroll into view
  const rev = document.querySelectorAll('.reveal');
  if (rev.length && 'IntersectionObserver' in window && !reduce) {
    const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }), {rootMargin:'0px 0px -8% 0px'});
    rev.forEach(el => ro.observe(el));
  } else rev.forEach(el => el.classList.add('in'));

  // Count a percentage up alongside the hero bar (any element with data-count)
  document.querySelectorAll('[data-count]').forEach(el => {
    const to = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce) return;
    const t0 = performance.now() + 500, dur = 1800, ease = t => 1 - Math.pow(1 - t, 3);
    const step = now => { const t = Math.min(1, Math.max(0, (now - t0) / dur)); el.textContent = pre + Math.round(to * ease(t)) + suf; if (t < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });

  // Copy email
  const copy = document.getElementById('copy');
  if (copy) copy.addEventListener('click', () => {
    const label = copy.textContent;
    const done = msg => { copy.textContent = msg; setTimeout(() => copy.textContent = label, 1800); };
    try { navigator.clipboard.writeText(EMAIL).then(() => done('Copied'), () => done(EMAIL)); } catch (e) { done(EMAIL); }
  });

  // Local time in India
  const clock = document.getElementById('clock');
  if (clock) { const f = () => { try { clock.textContent = new Intl.DateTimeFormat('en-GB', {hour:'2-digit', minute:'2-digit', timeZone:'Asia/Kolkata'}).format(new Date()) + ' IST'; } catch (e) {} }; f(); setInterval(f, 30000); }

  // Contact glow follows the pointer
  const contact = document.getElementById('contact'), glow = document.getElementById('glow');
  if (contact && glow && !reduce) contact.addEventListener('pointermove', e => {
    const r = contact.getBoundingClientRect();
    glow.style.transform = `translate(${(e.clientX - r.right) * .5}px, ${(e.clientY - r.top) * .5}px)`;
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
