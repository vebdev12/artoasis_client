const reser_input = document.querySelector("#reset-login-input");
const reset_btn = document.querySelector("#reset-login-btn");

reset_btn.addEventListener("click", () => {
  const value = reser_input.value;

  if (!value) return;

  sendPassword_request(value)
    .then((res) => {
      alert("Пароль успешно отправлен");
      window.location.href = "login.html";
    })
    .catch((e) => {
      alert("Не удалось отправить пароль");
    });
});
