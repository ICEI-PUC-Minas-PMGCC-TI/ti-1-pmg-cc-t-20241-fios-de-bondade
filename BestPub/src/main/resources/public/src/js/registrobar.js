// Função para manipular o registro de um bar
function registrobar() {
    const openAccountPage = document.getElementById("div-user");

    openAccountPage.addEventListener("click", () => {
        window.location.href = "./account.html";
    });
}
// Objeto para armazenar os dados do bar
const bar = {
    cnpj: "",
    name: "",
    telefone: "",
    logradouro: "",
    cep: "",
    numero: "",
    bairro: "",
    estado: "",
    cidade: "",
    descricao: "",
    imagemUrl: "" // Armazena a URL da imagem
};

let file; // Variável para armazenar o arquivo de imagem

// Função para cadastrar um novo bar
document.getElementById('registerBtn').addEventListener('click', async function (e) {
    e.preventDefault();

    // Captura os valores dos inputs
    bar.name = document.querySelector("#nomeBar").value;
    bar.cnpj = document.querySelector("#cnpj").value;
    bar.telefone = document.querySelector("#telefone").value;
    bar.logradouro = document.querySelector("#logradouro").value;
    bar.cep = document.querySelector("#cep").value;
    bar.numero = document.querySelector("#numero").value;
    bar.bairro = document.querySelector("#bairro").value;
    bar.estado = document.querySelector("#estado").value;
    bar.cidade = document.querySelector("#cidade").value;
    bar.descricao = document.querySelector("#descricaoBar").value;

    // Envia a imagem e obtém a URL antes de prosseguir
    if (file) {
        try {
            const imageUrl = await uploadImagemImgbb(file);
            bar.imagemUrl = imageUrl;
        } catch (error) {
            console.error("Erro ao enviar imagem:", error);
            alert("Erro ao enviar a imagem, tente novamente.");
            return; // Interrompe o cadastro em caso de erro no upload da imagem
        }
    } else {
        alert("Por favor, selecione uma imagem.");
        return;
    }

    // Enviar os dados do bar para o backend
    const barJson = JSON.stringify(bar);
    try {
        const response = await fetch("/inserir/bar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: barJson
        });
        
        if (response.ok) {
            console.log("Bar cadastrado com sucesso");
            alert("Bar cadastrado com sucesso!");
            window.location.href="./cardapio.html";
            document.querySelector("#registroForm").reset(); // Limpa o formulário após cadastro
        } else {
            console.log("Erro ao cadastrar o bar");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});

// Função para enviar imagem para a API Imgbb
async function uploadImagemImgbb(file) {
    const apiKey = "11aad652673d4d6bd125b34677924c9b"; // Substitua pela sua chave da API Imgbb

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const base64Image = e.target.result.split(',')[1]; // Remove o prefixo da base64

            const formData = new FormData();
            formData.append('image', base64Image);

            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: "POST",
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    resolve(data.data.url); // Retorna a URL da imagem se sucesso
                } else {
                    reject("Erro ao enviar imagem: " + data.error.message);
                }
            } catch (error) {
                reject("Erro na requisição de upload: " + error);
            }
        };
        reader.readAsDataURL(file);
    });
}

// Manipula a seleção da imagem e exibe a pré-visualização
document.getElementById("file").addEventListener("change", function (event) {
    file = event.target.files[0];
    if (file) {
        // Exibe a pré-visualização da imagem
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById("preview");
            preview.src = e.target.result;
            preview.style.display = "block"; // Exibe a imagem
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener('DOMContentLoaded', carregarNomeUsuario);
registrobar();