const urlDoacoes = "/Doacoes";
let doacoes = [];
var contador = 1;

fetch(urlDoacoes).then(function(response) {
    return response.json();
}).then(function(dados) {
    doacoes = dados;
    console.log(doacoes);
});


function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { doacao:[ ]
                    }
    }

    return objDados;
}

function salvaDados(dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}

function incluirDoacao (){
    // Ler os dados do localStorage
    let objDados = leDados();

    // Incluir uma nova doacao
    
    let novaDoacao = {
        id: contador,
        Tipo: document.getElementById('inputTipo').value,
        Tamanho: document.getElementById('inputTamanho').value,
        Quantidade: document.getElementById('inputQuantidade').value,
        Qualidade: document.getElementById('inputQualidade').value,
        Genero: document.getElementById('inputGenero').value,
        Infantil: document.getElementById('infantilCheck').value,
        Instituicao: document.getElementById('inputInstituicao').value,
        Vailevar: document.getElementById('entregaCheck').value,
        Data: document.getElementById('inputData').value,
        Hora: document.getElementById('inputHora').value,
        Observações: document.getElementById('inputObs').value,


    };
    contador += 1;
    console.log(JSON.stringify(novaDoacao));

    objDados.Doacoes.push (novaDoacao);

    // Salvar os dados no localStorage novamente
    salvaDados (objDados);



        // Faz uma requisição POST para o json-server para salvar o novo doador
        fetch(urlDoacoes, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaDoacao)
        }).then(response => response.json())
          .then(data => {
              console.log("Doacao salva no json-server:", data);
              alert("Doacao cadastrada com sucesso!");
          })
          .catch(error => console.error("Erro ao salvar doacao no json-server:", error));
    
    
}


function identify(){
    document.getElementById("tipo").innerHTML = document.getElementById('inputTipo').value;
    document.getElementById("tamanho").innerHTML = document.getElementById('inputTamanho').value;
    document.getElementById("quantidade").innerHTML = document.getElementById('inputQuantidade').value;
    document.getElementById("qualidade").innerHTML = document.getElementById('inputQualidade').value;
    document.getElementById("genero").innerHTML = document.getElementById('inputGenero').value;

    let infantil = document.getElementById('infantilCheck').value;
    if(infantil == "on"){
        document.getElementById("infantil").innerHTML = "Sim";
    }
    else{
        document.getElementById("infantil").innerHTML = "Não";
    }

    document.getElementById("instituicao").innerHTML = document.getElementById('inputInstituicao').value;

    let entrega = document.getElementById('entregaCheck').value;
    if(entrega == "on"){
        document.getElementById("vailevar").innerHTML = "Sim";
    }
    else{
        document.getElementById("vailevar").innerHTML = "Não";
    }
    document.getElementById("data").innerHTML = document.getElementById('inputData').value;
    document.getElementById("hora").innerHTML = document.getElementById('inputHora').value;
    document.getElementById("obs").innerHTML = document.getElementById('inputObs').value;    
}
/*
function imprimeDados () {
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados ();

    for (i=0; i< objDados.doacao.length; i++) {
        strHtml += `<p>${objDados.doacao[i].Tipo} <br> ${objDados.doacao[i].Infantil}</p>`
    }

    tela.innerHTML = strHtml;
}
*/

// Função para carregar os dados iniciais do json-server para o localStorage
function carregaDadosIniciais() {
    fetch(urlDoacoes).then(function(response) {
        return response.json();
    }).then(function(dados) {
        let objDados = leDados();
        objDados.Doacoes = dados;
        salvaDados(objDados);
        console.log("Dados das doacoes carregados no local storage");
    });
}

// Carrega os dados iniciais ao carregar a página
window.onload = carregaDadosIniciais;

// Configura os botões
document.getElementById('concluir').addEventListener ('click', identify);
document.getElementById('submit').addEventListener ('click', incluirDoacao);

