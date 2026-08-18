(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.mobile-menu-button');
  const nav = document.querySelector('.nav');

  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
  });

  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = 'Menu';
  }));

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);

  function initCarousel(root) {
    const track = root.querySelector('.carousel-track');
    const slides = [...root.querySelectorAll('.carousel-slide')];
    const dotsWrap = root.parentElement.querySelector('.carousel-dots');
    const count = root.parentElement.querySelector('.carousel-count');
    if (!track || slides.length < 2) return;

    let index = 0;
    let timer;
    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => { go(i); restart(); });
      dotsWrap?.append(dot);
    });
    const dots = [...(dotsWrap?.children || [])];

    function render(animated = true) {
      track.style.transition = animated ? '' : 'none';
      track.style.transform = `translate3d(${-index * 100}%,0,0)`;
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      requestAnimationFrame(() => { if (!animated) track.style.transition = ''; });
    }

    function go(next) {
      index = (next + slides.length) % slides.length;
      render();
    }
    function next() { go(index + 1); }
    function start() { timer = window.setInterval(next, 4500); }
    function stop() { window.clearInterval(timer); }
    function restart() { stop(); start(); }

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', () => { if (!dragging) start(); });
    root.addEventListener('pointerdown', (e) => {
      dragging = true; startX = e.clientX; deltaX = 0; stop();
      root.classList.add('is-dragging');
      root.setPointerCapture?.(e.pointerId);
    });
    root.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      deltaX = e.clientX - startX;
    });
    root.addEventListener('pointerup', (e) => {
      if (!dragging) return;
      dragging = false;
      root.classList.remove('is-dragging');
      if (Math.abs(deltaX) > 50) go(index + (deltaX < 0 ? 1 : -1));
      root.releasePointerCapture?.(e.pointerId);
      start();
    });
    root.addEventListener('pointercancel', () => {
      dragging = false;
      root.classList.remove('is-dragging');
      start();
    });

    render(false);
    start();
  }
})();
