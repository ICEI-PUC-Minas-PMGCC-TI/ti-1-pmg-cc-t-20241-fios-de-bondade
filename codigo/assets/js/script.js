function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = {
            Doadores: [{
                "id": "000-000-000-00",
                "nome": "Jose",
                "endereco": {
                    "cep": "00000000",
                    "bairro": "Coracao Eucaristico",
                    "rua": "Dom Jose Gaspar",
                    "numero": 530,
                    "estado": "Minas Gerais"
                },
                "Telefone": "0000000000"
            }],
            Receptores: [{
                "id": "000-000-000-00",
                "nome": "Fios de Bondade",
                "endereco": {
                    "cep": "00000000",
                    "estado": "Minas Gerais",
                    "bairro": "Coracao Eucaristico",
                    "rua": "Dom Jose Gaspar",
                    "numero": 530
                },
                "Telefone": "0000000000",
                "Instituicao": "ONG",
                "Descricao": ""
            }]
        };
    }

    return objDados;
}

function salvaDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

// Função para incluir dados dos doadores no local storage
function IncluirDoador() {
    let objDados = leDados();

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

    // Salva os dados no localStorage novamente
    salvaDados(objDados);
}

// Função para incluir dados dos receptores no local storage
function IncluirReceptor() {
    let objDados = leDados();

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

    // Salva os dados no localStorage novamente
    salvaDados(objDados);
}

function IncluirDados(event) {
    event.preventDefault(); // Previne o envio do formulário

    const selectedOption = document.querySelector('input[name="option"]:checked').value;

    if (selectedOption === "option1") {
        IncluirDoador();
    } else if (selectedOption === "option2") {
        IncluirReceptor();
    }
}

document.getElementById("form").addEventListener('submit', IncluirDados);
