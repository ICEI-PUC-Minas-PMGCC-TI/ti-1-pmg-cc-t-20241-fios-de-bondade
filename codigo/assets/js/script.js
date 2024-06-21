// URL para a API dos Doadores
const urlDoadores = "https://f6091b24-b582-4fe5-b15c-6f6c66815d46-00-1t2n22j1sw3n4.janeway.replit.dev/Doadores";
let Doadores = [];

// Fetch para obter os dados dos Doadores da API
fetch(urlDoadores).then(function(response) {
    return response.json();
}).then(function(dados) {
    Doadores = dados;
    console.log(Doadores);
});

// URL para a API dos Receptores
const urlRecptores = "https://f6091b24-b582-4fe5-b15c-6f6c66815d46-00-1t2n22j1sw3n4.janeway.replit.dev/Receptores";
let Recptores = [];

// Fetch para obter os dados dos Receptores da API
fetch(urlRecptores).then(function(response) {
    return response.json();
}).then(function(dados) {
    Recptores = dados;
    console.log(Recptores);
});

// Função para ler dados do localStorage
function leDados() {
    // Obtém os dados do localStorage
    let strDados = localStorage.getItem('db');
    let objDados = {};

    // Se houver dados, parseia o JSON para objeto
    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        // Se não houver dados, inicializa com estruturas vazias
        objDados = {
            Doadores: [],
            Receptores: []
        };
    }

    return objDados;
}

// Função para salvar dados no localStorage
function salvaDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

// Função para incluir um novo doador no localStorage e no json-server
function IncluirDoador() {
    let objDados = leDados();

    // Cria um novo objeto de doador com os valores do formulário
    let novoDoador = {
        id: document.getElementById("inputCPF").value,
        nome: document.getElementById("inputNome").value,
        endereco: {
            cep: document.getElementById("inputCEP").value,
            estado: document.getElementById("inputEstado").value,
            bairro: document.getElementById("inputBairro").value,
            rua: document.getElementById("inputEnder").value,
            numero: document.getElementById("inputNumero").value
        },
        telefone: document.getElementById("inputTele").value
    };

    console.log(JSON.stringify(novoDoador));

    // Adiciona o novo doador à lista de doadores
    objDados.Doadores.push(novoDoador);

    // Salva os dados no localStorage
    salvaDados(objDados);

    // Faz uma requisição POST para o json-server para salvar o novo doador
    fetch(urlDoadores, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoDoador)
    }).then(response => response.json())
      .then(data => {
          console.log("Doador salvo no json-server:", data);
          alert("Doador cadastrado com sucesso!");
      })
      .catch(error => console.error("Erro ao salvar doador no json-server:", error));

    // Limpa os campos do formulário após o envio
    document.getElementById("form").reset();
}

// Função para incluir um novo receptor no localStorage e no json-server
function IncluirReceptor() {
    let objDados = leDados();

    // Cria um novo objeto de receptor com os valores do formulário
    let novoReceptor = {
        id: document.getElementById("inputCNPJ").value,
        nome: document.getElementById("inputNome").value,
        endereco: {
            cep: document.getElementById("inputCEP").value,
            estado: document.getElementById("inputEstado").value,
            bairro: document.getElementById("inputBairro").value,
            rua: document.getElementById("inputEnder").value,
            numero: document.getElementById("inputNumero").value
        },
        telefone: document.getElementById("inputTele").value,
        instituicao: document.getElementById("inputInst").value,
        descricao: document.getElementById("inputDesc").value
    };

    console.log(JSON.stringify(novoReceptor));

    // Adiciona o novo receptor à lista de receptores
    objDados.Receptores.push(novoReceptor);

    // Salva os dados no localStorage
    salvaDados(objDados);

    // Faz uma requisição POST para o json-server para salvar o novo receptor
    fetch(urlRecptores, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoReceptor)
    }).then(response => response.json())
      .then(data => {
          console.log("Receptor salvo no json-server:", data);
          alert("Receptor cadastrado com sucesso!");
      })
      .catch(error => console.error("Erro ao salvar receptor no json-server:", error));

    // Limpa os campos do formulário após o envio
    document.getElementById("form").reset();
}

// Função para incluir dados ao submeter o formulário
function IncluirDados(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Obtém a opção selecionada (doador ou receptor)
    const selectedOption = document.querySelector('input[name="option"]:checked').value;

    // Inclui o doador ou receptor conforme a opção selecionada
    if (selectedOption === "option1") {
        IncluirDoador();
    } else if (selectedOption === "option2") {
        IncluirReceptor();
    }
}

// Adiciona o evento de submit ao formulário para chamar a função IncluirDados
document.getElementById("form").addEventListener('submit', IncluirDados);

// Função para carregar os dados iniciais do json-server para o localStorage
function carregaDadosIniciais() {
    fetch(urlDoadores).then(function(response) {
        return response.json();
    }).then(function(dados) {
        let objDados = leDados();
        objDados.Doadores = dados;
        salvaDados(objDados);
        console.log("Dados dos doadores carregados no local storage");
    });

    fetch(urlRecptores).then(function(response) {
        return response.json();
    }).then(function(dados) {
        let objDados = leDados();
        objDados.Recptores = dados;
        salvaDados(objDados);
        console.log("Dados dos receptores carregados no local storage");
    });
}

// Carrega os dados iniciais ao carregar a página
window.onload = carregaDadosIniciais;
