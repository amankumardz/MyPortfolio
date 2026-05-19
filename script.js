window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");
  const revealEls = document.querySelectorAll(".reveal");
  const topButton = document.getElementById("scroll-top");
  const themeToggle = document.getElementById("theme-toggle");
  const yearEl = document.getElementById("year");
  const particles = document.getElementById("particles");

  yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu toggle.
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Section reveal animation on scroll.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Active nav link + scroll-to-top button behavior.
  const sections = [...document.querySelectorAll("main section[id]")];
  const onScroll = () => {
    const top = window.scrollY + 120;
    sections.forEach((section) => {
      const id = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!navLink) return;
      const active = top >= section.offsetTop && top < section.offsetTop + section.offsetHeight;
      navLink.classList.toggle("active", active);
    });

    topButton.classList.toggle("show", window.scrollY > 450);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Theme preference + toggle.
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || (!savedTheme && window.matchMedia("(prefers-color-scheme: light)").matches)) {
    body.classList.add("light");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const isLight = body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });

  // Lightweight animated particles.
  for (let i = 0; i < 26; i += 1) {
    const dot = document.createElement("span");
    dot.style.position = "absolute";
    dot.style.width = `${Math.random() * 4 + 2}px`;
    dot.style.height = dot.style.width;
    dot.style.borderRadius = "50%";
    dot.style.background = ["#42d4ff", "#8b5cf6", "#ff4fd8"][Math.floor(Math.random() * 3)];
    dot.style.opacity = String(Math.random() * 0.6 + 0.2);
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animation = `float ${Math.random() * 8 + 6}s ease-in-out infinite`;
    particles.appendChild(dot);
  }
});
