const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id], header[id]')];
const scrollTopBtn = document.getElementById('scrollTopBtn');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('[data-reveal], .glass-card').forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

function setActiveLink() {
  const y = window.scrollY + 120;
  let current = 'home';
  sections.forEach((section) => {
    if (section.offsetTop <= y) current = section.id;
  });
  navAnchors.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', () => {
  setActiveLink();
  scrollTopBtn.style.display = window.scrollY > 400 ? 'grid' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

setActiveLink();
