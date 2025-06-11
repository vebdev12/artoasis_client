window.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const header = document.getElementById("main-header");
  const searchInput = document.getElementById("search-input");
  const artworkGrid = document.getElementById("artwork-grid");
  const noResults = document.getElementById("no-results");
  const tabButtons = document.querySelectorAll(".tab-button");
  const currentYearElement = document.getElementById("current-year");

  const triggers = document.querySelectorAll(".about__item-header");

  // Initialize

  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Theme Toggle
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
  });

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      this.parentNode.classList.toggle("active");
    });
  });
});
