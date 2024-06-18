function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { doacao: [ 
            {
                Tipo: "Outro...",
                Tamanho: "único",
                Quantidade: "1", 
                Qualidade: "Novo",
                Genero: "Unissex",
                Infantil: "Não",
                Instituicao: "ONG 1",
                Vailevar: "Não",
                Agendamento: [{
                    Data: "03/01/2014",
                    Hora: "13:30",
                    Observações: "."
                }]
            
            }
                    ]}
    }

    return objDados;
}

function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}

function incluirDoacao (){
    // Ler os dados do localStorage
    let objDados = leDados();

    // Incluir um novo contato
    let strtipo = document.getElementById('inputTipo').value;
    let strtamanho = document.getElementById('inputTamanho').value;
    let strquantidade = document.getElementById('inputQuantidade').value;
    let strqualidade = document.getElementById('inputQualidade').value;
    let strgenero = document.getElementById('inputGenero').value;
    let strinfantil = document.getElementById('infantilCheck').value;
    let strinstituicao = document.getElementById('inputInstituicao').value;
    let strvailevar = document.getElementById('entregaCheck').value;
    let strdata = document.getElementById('inputData').value;
    let strhora = document.getElementById('inputHora').value;
    let strobservacoes = document.getElementById('inputObs').value;    

    let novaDoacao = {
        Tipo: strtipo,
        Tamanho: strtamanho,
        Quantidade: strquantidade,
        Qualidade: strqualidade,
        Genero: strgenero,
        Infantil: strinfantil,
        Instituicao: strinstituicao,
        Vailevar: strvailevar,
        Data: strdata,
        Hora: strhora,
        Observações: strobservacoes,


    };
    objDados.doacao.push (novaDoacao);

    // Salvar os dados no localStorage novamente
    salvaDados (objDados);
}
var popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
    trigger: 'focus'
  })
  

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
// Configura os botões
document.getElementById ('concluir').addEventListener ('click', incluirDoacao);
