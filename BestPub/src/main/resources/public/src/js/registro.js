const usuario = {
  name: "",
  email: " ",
  password: " ",
};


// Cadastrando usuário
document.getElementById("registerBtn").addEventListener("click", function (e) {
  e.preventDefault();

  usuario.name = document.querySelector("#name").value;
  usuario.email = document.querySelector("#email").value;
  usuario.password = document.querySelector("#password").value;
  const checkPassword = document.querySelector("#checkPassword").value;

  const validify = new Validify();
  const usuarioJson = JSON.stringify(usuario);

  // Verifica se valores cumprem os critérios
  if (validify.verificaEmail(usuario.email) == false) {
    validify.containerError[0].innerHTML = validify.enviarErro("email");
  }

  if (validify.verificaNome(usuario.name) == false) {
    validify.containerError[1].innerHTML = validify.enviarErro("nome");
  }

  if (validify.verificaSenha(usuario.password) == false) {
    validify.containerError[2].innerHTML = validify.enviarErro("senha");
  }

  if (validify.confirmaSenha(usuario.password, checkPassword) == false) {
    validify.containerError[3].innerHTML = validify.enviarErro("confirmaSenha");
  }


  // Envia os dados de cadastro
  if (
    validify.verificaEmail(usuario.email) == true &&
    validify.verificaNome(usuario.name) == true &&
    validify.verificaSenha(usuario.password) == true &&
    validify.confirmaSenha(usuario.password, checkPassword) == true
  ) {
    fetch("/inserir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: usuarioJson,
    }).then((response) => {
      validify.containerError.forEach(v => {
        v.innerHTML = "";
        window.location.href = "../views/atividades.html";
      });
    });
  }
});
