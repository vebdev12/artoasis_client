// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const currentYearElement = document.getElementById("current-year");
const message = document.getElementById("login-message");
const usernameInput = document.getElementById("login-username");
const passwordInput = document.getElementById("login-password");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  currentYearElement.textContent = new Date().getFullYear();

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
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerHTML = isDark
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
});

// Login User
function loginUser() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    message.textContent = "Пожалуйста, заполните все поля.";
    message.style.color = "red";
    return;
  }

  // Check admin credentials
  if (username === "admin" && password === "admin") {
    localStorage.setItem("loggedInUser", username);
    message.textContent = "Вход успешен! Перенаправление...";
    message.style.color = "green";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
    return;
  }

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", username);
    message.textContent = "Вход успешен! Перенаправление...";
    message.style.color = "green";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    message.textContent = "Неверное имя пользователя или пароль.";
    message.style.color = "red";
  }
}

// Attach login function to form submission
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser();
});
