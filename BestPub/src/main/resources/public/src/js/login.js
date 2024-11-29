const user = {
  email: "",
  password: "",
};

document.getElementById("loginBtn").addEventListener("click", function (e) {
  e.preventDefault();

  user.email = document.querySelector("#email").value;
  user.password = document.querySelector("#password").value;

  const validify = new Validify();
  const userJson = JSON.stringify(user);

  console.log(userJson);

  if (validify.verificaEmail(user.email) == false) {
    validify.containerError[0].innerHTML = validify.enviarErro("email");
  }

  if (validify.verificaSenha(user.password) == false) {
    validify.containerError[1].innerHTML = validify.enviarErro("senha");
  }

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userJson,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Login bem-sucedido");
        // Redireciona para a página home após login bem-sucedido
        window.location.href = "/home"; // Altere para a rota que você configurou
      } else {
        console.log("Erro no login");
        validify.containerError[1].innerHTML = validify.enviarErro("login");
      }
    })
    .catch((error) => {
      console.log("Erro de rede:", error);
    });
});
