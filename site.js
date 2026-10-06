// site.js — shared behavior for every WCIT page: smart header, Services dropdown,
// mobile menu, scroll reveal. No dependencies. Loaded with `defer`.
(() => {
  const header = document.getElementById('site-header');
  const desktop = window.matchMedia('(min-width: 1280px)');

  // — Header: the brand bar always sticks; the link row tucks away on scroll down and
  //   returns on scroll up (or the moment anything inside it takes keyboard focus). —
  if (header) {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      if (!desktop.matches || y < 200) header.classList.remove('is-tucked');
      else if (y > lastY + 6) { header.classList.add('is-tucked'); closeDropdowns(); }
      else if (y < lastY - 6) header.classList.remove('is-tucked');
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // — Services dropdown: opens on click, hover and keyboard; Esc and outside-click close it. —
  const dropdownItems = [...document.querySelectorAll('[data-dropdown]')];
  function setOpen(item, open) {
    item.classList.toggle('is-open', open);
    item.querySelector('[aria-expanded]').setAttribute('aria-expanded', String(open));
  }
  function closeDropdowns() { dropdownItems.forEach((item) => setOpen(item, false)); }
  dropdownItems.forEach((item) => {
    const trigger = item.querySelector('[aria-expanded]');
    let hoverTimer;
    // A mouse has already opened it by hovering, so a mouse click keeps it open;
    // keyboard and touch toggle.
    trigger.addEventListener('click', (e) => {
      setOpen(item, e.pointerType === 'mouse' ? true : !item.classList.contains('is-open'));
    });
    item.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(hoverTimer); setOpen(item, true);
    });
    item.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      hoverTimer = setTimeout(() => setOpen(item, false), 160);
    });
    item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) setOpen(item, false); });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { setOpen(item, false); trigger.focus(); }
    });
  });
  document.addEventListener('click', (e) => {
    dropdownItems.forEach((item) => { if (!item.contains(e.target)) setOpen(item, false); });
  });

  // — Mobile / tablet menu panel —
  const menu = document.getElementById('site-menu');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  if (menu && openBtn && closeBtn) {
    const setMenu = (open) => {
      menu.hidden = !open;
      openBtn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
      (open ? closeBtn : openBtn).focus();
    };
    openBtn.addEventListener('click', () => setMenu(true));
    closeBtn.addEventListener('click', () => setMenu(false));
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { setMenu(false); return; }
      if (e.key !== 'Tab') return;                       // keep focus inside the open panel
      const focusable = menu.querySelectorAll('a[href], button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    desktop.addEventListener('change', (e) => { if (e.matches && !menu.hidden) setMenu(false); });
  }

  // — Scroll reveal (.fade-up → .visible). screenshot.mjs relies on this class name. —
  const revealEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }
})();
