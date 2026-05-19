window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const themeToggle = document.querySelector(".theme-toggle");
  const yearEl = document.getElementById("year");
  const sections = document.querySelectorAll("main section[id]");
  const revealEls = document.querySelectorAll(".reveal");
  const scrollTopBtn = document.querySelector(".scroll-top");

  yearEl.textContent = new Date().getFullYear();

  // Restore theme preference.
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") body.classList.add("light");

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const icon = themeToggle.querySelector("i");
    icon.className = body.classList.contains("light") ? "fa-solid fa-sun" : "fa-solid fa-moon";
    localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
  });

  // Mobile nav menu.
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Section reveal animation.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.18 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Active nav highlighting and scroll-to-top button.
  const onScroll = () => {
    const fromTop = window.scrollY + 120;

    sections.forEach((section) => {
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;
      if (fromTop >= section.offsetTop && fromTop < section.offsetTop + section.offsetHeight) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    scrollTopBtn.classList.toggle("show", window.scrollY > 500);
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
