// Wait for DOM to load before attaching behavior
window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");
  const yearEl = document.getElementById("year");

  // Set footer year dynamically
  yearEl.textContent = new Date().getFullYear();

  // Toggle mobile navigation visibility
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  // Close mobile menu after selecting a link
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Respect user system theme preference on load
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    body.classList.add("light");
  }
});
