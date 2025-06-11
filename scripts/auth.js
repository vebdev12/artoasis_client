const getFileds = (container) => {
  const fields = container.querySelectorAll("input");

  const fields_data = {};

  fields.forEach((field) => {
    fields_data[field.name] = field.value;
  });

  return fields_data;
};

// register

const register_form = document?.querySelector("#register-form");

if (register_form) {
  register_form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { name, login, password } = getFileds(register_form);

    register_request({
      name: name || "",
      login: login || "",
      password: password || "",
    })
      .then((res) => {
        localStorage.setItem("ArtOasis-user", JSON.stringify(res));
        localStorage.setItem("ArtOasis-token", res.token);
        window.location.href = `profile.html?id=${res.id}`;
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// login

const login_container = document?.querySelector(".login-container");
const login_btn = document?.querySelector("#login_btn");

if (login_container && login_btn) {
  login_btn.addEventListener("click", () => {
    const { email, password } = getFileds(login_container);

    login_request({ login: email, password })
      .then((res) => {
        localStorage.setItem("ArtOasis-user", JSON.stringify(res));
        localStorage.setItem("ArtOasis-token", res.token);
        window.location.href = `profile.html?id=${res.id}`;
      })
      .catch((e) => console.log(e));
  });
}

