const inputName = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputPassword= document.getElementById("senha");

function account() {
    const btnBarStaff = document.getElementById("joinBar");

    btnBarStaff.addEventListener("click", e => {
        e.preventDefault();

        window.location.href = "./registrobar.html";
    })
}

function carregarDadosUsuario() {
    fetch("/usuario/nome")
        .then(response => {
            if (response.ok) {
                return response.text(); // Recebe o nome do usuário como texto
            } else {
                throw new Error("Usuário não está logado");
            }
        })
        .then(nome => {
            inputName.value = nome;
            document.getElementById("user-name").innerText = nome; // Exibe o nome no elemento com id 'nomeUsuario'
        })
        .catch(error => {
            console.error("Erro ao carregar o nome do usuário:", error);
        });

    fetch("/usuario/email")
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Usuário não está logado");
            }
        })
        .then(email => {
            inputEmail.value = email;
        })
        .catch(error => {
            console.error("Erro ao carregar o email do usuário:", error);
        });
}

function editarDados() {
    const updatedUser = {
        nome: inputName.value,
        email: inputEmail.value,
        senha: inputPassword.value
    };

    const userJson = JSON.stringify(updatedUser);
    fetch("/usuario/atualizar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: userJson

    })
        .then(response => {
            if (response.ok) {
                alert("Usuário atualizado com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao atualizar o usuário.");
            }
        })
        .catch(error => {
            console.error("Erro de rede:", error);
        });
}

document.getElementById('edit').addEventListener('click', function (e) {
    e.preventDefault();

    const validify = new Validify();

    inputName.removeAttribute("disabled");
    inputEmail.removeAttribute("disabled");
    inputPassword.removeAttribute("disabled");

    document.getElementById("edit").innerText = "Salvar";

    document.getElementById("edit").addEventListener("click", e => {
        e.preventDefault();

        if (validify.verificaNome(inputName.value) == false) {
            validify.containerError[0].innerHTML = validify.enviarErro("nome");
        }

        if (validify.verificaEmail(inputEmail.value) == false) {
            validify.containerError[1].innerHTML = validify.enviarErro("email");
        }

        if (inputPassword.value != "") {
            if (validify.verificaSenha(inputPassword.value) == false) {
                validify.containerError[2].innerHTML = validify.enviarErro("senha");
            }
        }

        if (
            validify.verificaNome(inputName.value) == true &&
            validify.verificaEmail(inputEmail.value) == true &&
            validify.verificaNome(inputName.value) == true 
        ) 
            {
                editarDados();
            }

    });

});

// Chame essa função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDadosUsuario);

document.getElementById("delete").addEventListener("click", e => {
    e.preventDefault();

    document.getElementById('confirmModal').style.display = 'flex';
})

// Função para fechar o modal
function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

// Função chamada ao clicar em "Excluir conta"
function excluirConta() {
    fetch(`/usuario/delete`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                alert("Conta excluída com sucesso!");
                // Redireciona para a página de login ou início
                window.location.href = "/index.html";
            } else {
                alert("Erro ao excluir a conta.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
        });

    closeModal();
}

account();