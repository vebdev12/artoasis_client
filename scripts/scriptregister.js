// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const currentYearElement = document.getElementById("current-year");
const message = document.getElementById("message");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

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

  // Initialize admin user if not exists
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (!users.some((user) => user.username === "admin")) {
    users.push({
      username: "admin",
      email: "admin@artoasis.com",
      password: "admin",
    });
    localStorage.setItem("users", JSON.stringify(users));
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

// Register User
function registerUser() {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !email || !password) {
    message.textContent = "Пожалуйста, заполните все поля.";
    message.style.color = "red";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.some((user) => user.username === username)) {
    message.textContent = "Это имя пользователя уже занято.";
    message.style.color = "red";
    return;
  }

  if (users.some((user) => user.email === email)) {
    message.textContent = "Этот email уже зарегистрирован.";
    message.style.color = "red";
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Регистрация успешна! Теперь вы можете войти.";
  message.style.color = "green";
  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

// Attach register function to form submission
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  registerUser();
});
