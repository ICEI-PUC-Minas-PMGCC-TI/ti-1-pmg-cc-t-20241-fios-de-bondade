$(document).ready(function() {
    $('#btnAdicionar').click(function() {
        $('#sidenavCollapse').collapse('toggle');
    });

    $('#hamburger-menu').click(() => {
        $('.big-wrapper').toggleClass('active');
    });
});


const urlDoacoes = "/Doacoes";

/* Cadastro de Usuários */

// URL para a API dos Doadores
const urlDoadores = "/Doadores";
let Doadores = [];

// Fetch para obter os dados dos Doadores da API
fetch(urlDoadores).then(function(response) {
    return response.json();
}).then(function(dados) {
    Doadores = dados;
    console.log(Doadores);
});

// URL para a API dos Receptores
const urlReceptores = "/Receptores";
let Receptores = [];

// Fetch para obter os dados dos Receptores da API
fetch(urlReceptores).then(function(response) {
    return response.json();
}).then(function(dados) {
    Receptores = dados;
    console.log(Receptores);
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
            cidade: document.getElementById("inputCidade").value,
            numero: document.getElementById("inputNumero").value
        },
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputSenha").value,
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
          alert("Cadastrado com sucesso! Faça login");
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
            cidade: document.getElementById("inputCidade").value,
            numero: document.getElementById("inputNumero").value
        },
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputSenha").value,
        telefone: document.getElementById("inputTele").value,
        instituicao: document.getElementById("inputInst").value,
        site: document.getElementById("inputSite").value
    };

    console.log(JSON.stringify(novoReceptor));

    // Adiciona o novo receptor à lista de receptores
    objDados.Receptores.push(novoReceptor);

    // Salva os dados no localStorage
    salvaDados(objDados);

    // Faz uma requisição POST para o json-server para salvar o novo receptor
    fetch(urlReceptores, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoReceptor)
    }).then(response => response.json())
      .then(data => {
          console.log("Receptor salvo no json-server:", data);
          alert("Cadastrado com sucesso! Faça login");
      })
      .catch(error => console.error("Erro ao salvar receptor no json-server:", error));

    // Limpa os campos do formulário após o envio
    document.getElementById("form").reset();
}

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

    fetch(urlReceptores).then(function(response) {
        return response.json();
    }).then(function(dados) {
        let objDados = leDados();
        objDados.Receptores = dados;
        salvaDados(objDados);
        console.log("Dados dos receptores carregados no local storage");
    });

}

// Carrega os dados iniciais ao carregar a página
window.onload = carregaDadosIniciais;

/* Perfil Usuário Receptor */

// URLs para busca de dados
const urlSolicitacoes = '/solicitacoes';
const urlFaixaEtaria = '/f_etaria';

//armazena os dados buscados
let db;

// Fetch para obter os dados das solicitacoes da API
async function fetchDados() {
    const [solicitacoesResponse, faixaEtariaResponse] = await Promise.all([
        fetch(urlSolicitacoes),
        fetch(urlFaixaEtaria),
    ]);

    const [solicitacoes, f_etaria] = await Promise.all([
        solicitacoesResponse.json(),
        faixaEtariaResponse.json()
    ]);

    db = { 
        solicitacoes: solicitacoes,
        f_etaria: f_etaria,
    };
    return db;
}

//Função para salvar uma nova solicitação
async function salvarNovaSolicitacao(solicitacao) {
    try {
        const userId = localStorage.getItem('userId');
        solicitacao.usuario_id = userId; 

        const response = await fetch(urlSolicitacoes, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitacao)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Erro ao salvar nova solicitação:", error);
        throw error; 
    }
}

//Função para editar a solicitação
async function atualizarSolicitacao(id, solicitacao) {
  try {
    const userId = localStorage.getItem('userId');
    solicitacao.usuario_id = userId;

    const response = await fetch(`${urlSolicitacoes}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(solicitacao)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Erro ao atualizar solicitação:", error);
    throw error; 
  }
}

//Função para excluir a solicitação
function excluirSolicitacao(id) {
  return fetch(`${urlSolicitacoes}/${id}`, {
    method: 'DELETE'
  });
}

//DOM de eventos
document.addEventListener('DOMContentLoaded', function() {
    fetchDados().then(() => {

        // Event listener para abrir o modal ao clicar em "Adicionar"
        document.getElementById('btnAdicionar').addEventListener('click', function() {
            document.getElementById('modal').style.display = 'block'; // Exibe o modal
            limparCampos(); // Limpa os campos do formulário
        });

        // Event listener para fechar o modal ao clicar em "Cancelar"
        document.getElementById('btnCancelar').addEventListener('click', function() {
            document.getElementById('modal').style.display = 'none';
        });

         // Event listener para salvar uma nova solicitação ao clicar em "Salvar"
        document.getElementById('btnSalvar').addEventListener('click', function(event) {
            event.preventDefault(); 
            let solicitacaoId = document.getElementById('solicitacaoId').value;
            if (solicitacaoId) {
                saveEditedSolicitacao(solicitacaoId); // Se houver um ID, salva a edição
            } else {
                saveNewSolicitacao(); // Caso contrário, salva uma nova solicitação
            }
        });

        // Função para salvar a nova solicitação
        function saveNewSolicitacao() {
            let tipo = document.getElementById('campoTipo').value;
            let tamanho = document.getElementById('campoTamanho').value;
            let categoria = document.getElementById('campoCategoria').value;
            let faixa_etaria = document.getElementById('campoFEtaria').value;

            let faixa_etariaObj = db.f_etaria.find(fetaria => fetaria.descricao === faixa_etaria);
            let f_etaria_id = faixa_etariaObj ? faixa_etariaObj.id : null;

            let novaSolicitacao = {
                tipo: tipo,
                tamanho: tamanho,
                categoria: categoria,
                f_etaria_id: f_etaria_id
            };

            salvarNovaSolicitacao(novaSolicitacao).then(solicitacaoSalva => {
                db.solicitacoes.push(solicitacaoSalva); // Adiciona a nova solicitação 
                imprimeDados(); // Atualiza a exibição das solicitações na tela
                limparCampos(); // Limpa os campos do formulário
                document.getElementById('modal').style.display = 'none'; // Fecha o modal após salvar
            });
        }

        // Função para editar a solicitação
        function saveEditedSolicitacao(id) {
            let tipo = document.getElementById('campoTipo').value;
            let tamanho = document.getElementById('campoTamanho').value;
            let categoria = document.getElementById('campoCategoria').value;
            let faixa_etaria = document.getElementById('campoFEtaria').value;

            let faixa_etariaObj = db.f_etaria.find(fetaria => fetaria.descricao === faixa_etaria);
            let f_etaria_id = faixa_etariaObj ? faixa_etariaObj.id : null;

            let solicitacaoAtualizada = {
                tipo: tipo,
                tamanho: tamanho,
                categoria: categoria,
                f_etaria_id: f_etaria_id
            };

            atualizarSolicitacao(id, solicitacaoAtualizada).then(() => {
                db.solicitacoes = db.solicitacoes.map(sol => (sol.id === id ? { ...solicitacaoAtualizada, id: id } : sol));
                alert("Sua solicitação foi atualizada.");
                imprimeDados();
                document.getElementById('modal').style.display = 'none';
            });
        }

        function imprimeDados() {
            let tela = document.getElementById('tela');
            let strHtml = '';

            const userId = localStorage.getItem('userId');
            const solicitacoesUsuario = db.solicitacoes.filter(sol => sol.usuario_id === userId);

            for (let solicitacao of solicitacoesUsuario) {
                let faixa_etariaObj = db.f_etaria.find(fetaria => fetaria.id === solicitacao.f_etaria_id);

                let faixa_etaria = faixa_etariaObj ? faixa_etariaObj.descricao : 'Faixa etária não encontrada';

                strHtml += `
                    <div class="solicitacao" data-id="${solicitacao.id}">
                        <p class="solicitacao-tipo">Tipo: ${solicitacao.tipo}</p>
                        <p class="solicitacao-tamanho">Tamanho: ${solicitacao.tamanho}</p>
                        <p class="solicitacao-categoria">Categoria: ${solicitacao.categoria}</p>
                        <p class="solicitacao-faixa-etaria">Faixa Etária: ${faixa_etaria}</p>
                        <div class="button-group">
                            <button class="btnEditar" onclick="editarSolicitacao(${solicitacao.id})"><i class="fa-regular fa-pen-to-square"></i></button>
                            <button class="btnExcluir" onclick="excluirSolicitacao(${solicitacao.id})"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                        <hr>
                    </div>`;
            }

            tela.innerHTML = strHtml;
        }

        document.getElementById('btnCarregaDados').addEventListener('click', imprimeDados);

        window.editarSolicitacao = function(id) {
            const solicitacao = db.solicitacoes.find(sol => sol.id === id);
            if (solicitacao) {
                document.getElementById('tela').style.display = 'none';
                document.getElementById('modal').style.display = 'block';

                document.getElementById('campoTipo').value = solicitacao.tipo;
                document.getElementById('campoTamanho').value = solicitacao.tamanho;
                document.getElementById('campoCategoria').value = solicitacao.categoria;
                document.getElementById('campoFEtaria').value = db.f_etaria.find(fetaria => fetaria.id === solicitacao.f_etaria_id).descricao;

                // Preencha o campo oculto com o ID da solicitação
                document.getElementById('solicitacaoId').value = id;

            }
        };

        window.excluirSolicitacao = async function(id) {
            await fetch(`${urlSolicitacoes}/${id}`, {
                method: 'DELETE'
            });
            db = await fetchDados();
            imprimeDados();
        };
    });
});

function limparCampos() {
    $('#campoTipo, #campoTamanho, #campoCategoria, #campoFEtaria').val('');
}

////// Editar Perfil  - Receptores  /////

// Função para carregar os dados dos Receptores da API e preencher o formulário
function carregarDadosReceptor() {

    // Pega o ID do usuário logado do localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error("Nenhum usuário está logado.");
        return;
    }
    console.log("userId:", userId);
    // Fetch para obter os dados dos Receptores da API
    fetch(`${urlReceptores}/${userId}`)
    .then(response => response.json())
    .then(receptor => {
            if(receptor){
                // Preencher os campos do formulário com os dados do receptor
                $("#inputNome").val(receptor.nome);
                $("#inputTele").val(receptor.telefone);
                $("#inputInst").val(receptor.instituicao);
                $("#inputEmail").val(receptor.email);
                $("#inputSenha").val(receptor.password);
                $("#inputCEP").val(receptor.endereco.cep);
                $("#inputEstado").val(receptor.endereco.estado);
                $("#inputEnder").val(receptor.endereco.rua);
                $("#inputCidade").val(receptor.endereco.cidade);
                $("#inputNumero").val(receptor.endereco.numero);
                $("#inputBairro").val(receptor.endereco.bairro);
                $("#inputSite").val(receptor.site);

                // Exibir os dados carregados no console para verificação
                console.log("Dados do receptor carregados:", receptor);
            } else {
                console.log("Receptor com o ID logado não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados dos receptores:", error);
        });
}

function carregarDadosDoador() {
    // Pega o ID do usuário logado do localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error("Nenhum usuário está logado.");
        return;
    }
    console.log("userId:", userId);
    // Fetch para obter os dados dos Receptores da API
    fetch(`${urlDoadores}/${userId}`)
    .then(response => response.json())
    .then(data =>{
            document.getElementById('nome').innerHTML = data.nome
            document.getElementById('numero').innerHTML = data.telefone
            document.getElementById('email').innerHTML = data.email
            document.getElementById('endereco').innerHTML = `${data.endereco.rua}, ${data.endereco.numero} - ${data.endereco.bairro}`
            console.log("PERFIL IDENTIFICADO")
        })
}

// Chamar a função para carregar os dados do receptor 
$(document).ready(function() {
    if ($('#profileUpdateForm').length > 0) {
        carregarDadosReceptor();
    }

    $("#saveProfileButton").click(function(event) {
        event.preventDefault();
        const userId = localStorage.getItem('userId');

        let novosDados = {
            id: userId,
            nome: $("#inputNome").val(),
            endereco: {
                cep:    $("#inputCEP").val(),
                estado: $("#inputEstado").val(),
                bairro: $("#inputBairro").val(),
                rua:    $("#inputEnder").val(),
                cidade: $("#inputCidade").val(),
                numero: $("#inputNumero").val()
            },
            email: $("#inputEmail").val(),
            password: $("#inputSenha").val(),
            telefone: $("#inputTele").val(),
            instituicao: $("#inputInst").val(),
            site: $("#inputSite").val()
        };

        $.ajax({
            url: `${urlReceptores}/${userId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(novosDados),
            success: function(data) {
                console.log("Dados do perfil do receptor atualizados com sucesso:", data);
                alert("Perfil Atualizado com Sucesso");
            },
            error: function(errorThrown) {
                console.error("Erro ao atualizar dados do perfil do receptor:", errorThrown);
            }
        });
    });
});

// Desativar Conta
$(document).ready(function() {
    // Evento de clique no botão "Desativar Conta"
    $("#deactivateProfileButton").click(function() {
        // Confirmar se o usuário deseja desativar a conta
        if (confirm("Tem certeza de que deseja desativar sua conta?")) {
            // Obter o userId do localStorage
            const userId = localStorage.getItem('userId');

            // Enviar uma solicitação para excluir o usuário
            fetch(`${urlReceptores}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => {
                // O usuário foi excluído com sucesso
                alert("Sua conta foi excluída com sucesso.");
                // Remover userId do localStorage
                localStorage.removeItem('userId');
                // Redirecionar para a página inicial
                window.location.href = '../index.html';
            })
            .catch(error => {
                console.error("Erro ao excluir conta:", error);
                alert("Ocorreu um erro ao excluir sua conta. Por favor, tente novamente mais tarde.");
            });
        }
    });
});

// Histórico de Doações //
const urlDoacoesRecebidas = "/Doacoes";

document.addEventListener('DOMContentLoaded', function () {
    const btnMostrarDoacoes = document.getElementById('btnMostrarDoacoes');
    const doacoesRecebidasLista = document.getElementById('doacoesRecebidasLista');

    btnMostrarDoacoes.addEventListener('click', function () {
        console.log('Fetching data from:', urlDoacoes);

        const userId = localStorage.getItem('userId');
        var contador = 1;

        fetch(urlDoacoesRecebidas)
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(doacoes => {
                console.log('Fetched Doacoes:', doacoes);

                // Limpa a lista antes de preencher
                doacoesRecebidasLista.innerHTML = '';

                // Para cada doação, encontre o doador correspondente
                doacoes.forEach(doacao => {
                    const doador = doacao.Doador;
                const agendamento = doacao.Agendamento && doacao.Agendamento.length > 0 ? doacao.Agendamento[0] : null;

                    if (agendamento) {
                        const doacaoItem = `
                            <div class="doacao-item${contador}">
                                <p><strong>Doação n° ${contador}</strong></p>
                                <p><strong>Tipo:</strong> ${doacao.Tipo}</p>
                                <p><strong>Tamanho:</strong> ${doacao.Tamanho}</p>
                                <p><strong>Gênero:</strong> ${doacao.Genero}</p>
                                <p><strong>Quantidade:</strong> ${doacao.Quantidade}</p>
                                <p><strong>Qualidade:</strong> ${doacao.Qualidade}</p>
                                <p><strong>Data:</strong> ${agendamento.Data}</p>
                                <p><strong>Hora:</strong> ${agendamento.Hora}</p>
                            </div>
                        `;
                        doacoesRecebidasLista.innerHTML += doacaoItem;
                        contador++;
                    } else {
                        console.warn(`Agendamento não encontrado para doação id ${doacao.id}`);
                    }
                });

                // Mostra a lista na tela
                doacoesRecebidasLista.style.display = 'block';
            })
            .catch(error => {
                console.error('Erro ao buscar Doacoes:', error.message);
            });
    });
});

/* Pontos de Coleta */
let map;
let geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -19.913646, lng: -43.931608},
        zoom: 12
    });

    geocoder = new google.maps.Geocoder();

    const urlReceptores = "/Receptores";

    fetch(urlReceptores)
            .then(response => response.json())
            .then(dados => {
                console.log(dados);
                const ceps = dados.map(receptor => {
                    let endereco = receptor.endereco;
                    if (!Array.isArray(endereco)) {
                        endereco = [endereco];
                    }
                    return endereco.map(end => ({
                        cep: end.cep,
                        title: receptor.nome
                    }));
                }).flat();

                ceps.forEach(point => {
                    geocodeCEP(point);
                });
            })
            .catch(error => console.error('Erro ao buscar dados dos receptores:', error));
    }

function geocodeCEP(point) {
    geocoder.geocode({'address': point.cep}, function(results, status) {
        if (status === 'OK') {
            console.log('CEP: ' + point.cep + ', Latitude: ' + results[0].geometry.location.lat() + ', Longitude: ' + results[0].geometry.location.lng());

            const infowindow = new google.maps.InfoWindow({
                content: '<h3>' + point.title + '</h3>'
            });

            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        } else {
            console.error('Geocodificação falhou para o seguinte CEP: ' + point.cep + ', motivo: ' + status);
        }
    });
}

document.getElementById('searchButton').addEventListener('click', function() {
    const cepInput = document.getElementById('cepInput').value;
    if (cepInput) {
        searchCEP(cepInput);
    } else {
        alert('Por favor, digite um CEP válido.');
    }
});

function searchCEP(cep) {
    geocoder.geocode({'address': cep}, function(results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            map.setCenter(location);
            map.setZoom(15); 
        } else {
            alert('Geocodificação falhou devido a: ' + status);
        }
    });
}

window.onload = initMap;

/* Cadastro de Doações */

let doacoes = [];
var contador = 1;

fetch(urlDoacoes).then(function(response) {
    return response.json();
}).then(function(dados) {
    doacoes = dados;
    console.log(doacoes);
});

function novaDoacaoTeste(novaDoacao){
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
function leDadosDoacoes () {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { Doacoes:[]  }
    }
    return objDados;
}

function salvaDadosDoacoes(dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}

function incluirDoacao (){
    // Ler os dados do localStorage
    let objDados = leDadosDoacoes();

    // Incluir uma nova doacao
    let novaDoacao = {
        id: contador,
        Doador: localStorage.getItem('userId'),
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



    // Salvar os dados no localStorage novamente
    salvaDadosDoacoes (objDados);

        // Faz uma requisição POST para o json-server para salvar a nova doação
    novaDoacaoTeste(novaDoacao)

}

function identifyDoacao(){
    document.getElementById("tipo").innerHTML = document.getElementById('inputTipo').value;
    document.getElementById("tamanho").innerHTML = document.getElementById('inputTamanho').value;
    document.getElementById("quantidade").innerHTML = document.getElementById('inputQuantidade').value;
    document.getElementById("qualidade").innerHTML = document.getElementById('inputQualidade').value;
    document.getElementById("genero").innerHTML = document.getElementById('inputGenero').value;

    let infantil = document.getElementById('infantilCheck').checked;
    if(infantil == "on"){
        document.getElementById("infantil").innerHTML = "Sim";
    }
    else{
        document.getElementById("infantil").innerHTML = "Não";
    }
    
    document.getElementById("instituicao").innerHTML = document.getElementById('inputInstituicao').value;
            
    let entrega = document.getElementById('entregaCheck').checked;
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

function identifyUser(){
    const userId = localStorage.getItem('userId');
    console.log("identificando")
    if (!userId) {
        console.error("Nenhum usuário está logado.");
        return;
    }
    console.log("userId:", userId);
    // Fetch para obter os dados dos Receptores da API
    fetch(`${urlDoadores}/${userId}`)
    .then(response => response.json())
    .then(doador => {
            if(doador){
                document.getElementById("alterarNome").setAttribute('value', `${doador.nome}`)
                document.getElementById("alterarTelefone").setAttribute('value', `${doador.telefone}`)
                document.getElementById("alterarEmail").setAttribute('value', `${doador.email}`)
                document.getElementById("alterarCEP").setAttribute('value', `${doador.endereco.cep}`)
                document.getElementById("alterarEstado").setAttribute('value', `${doador.endereco.estado}`)
                document.getElementById("alterarBairro").setAttribute('value', `${doador.endereco.bairro}`)
                document.getElementById("alterarRua").setAttribute('value', `${doador.endereco.rua}`)
                document.getElementById("alterarCidade").setAttribute('value', `${doador.endereco.cidade}`)
                document.getElementById("alterarNumero").setAttribute('value', `${doador.endereco.numero}`)

            console.log("usuario identificado")
                // Exibir os dados carregados no console para verificação
                console.log("novos dados carregados:", doador);
            } else {
                console.log("doador com o ID logado não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados dos doadores:", error);
        });
};

function submitAlteracao(jsonData) {
const userId = localStorage.getItem('userId');
  console.log("patching")
  fetch(`${urlDoadores}/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Patch successful!');
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function atualizarPerfil(){
    const userId = localStorage.getItem('userId');
  console.log("atualizando")
  let novoPerfil = {
    nome: `${document.getElementById('alterarNome').value}`,
    endereco: {
        cep: `${document.getElementById('alterarCEP').value}`,
        estado: `${document.getElementById('alterarEstado').value}`,    
        bairro: `${document.getElementById('alterarBairro').value}`,
        rua: `${document.getElementById('alterarRua').value}`,
        cidade: `${document.getElementById('alterarCidade').value}`,
        numero: `${document.getElementById('alterarNumero').value}`
    },
    email: `${document.getElementById('alterarEmail').value}`,
    telefone: `${document.getElementById('alterarTelefone').value}`
    }
  jsonData = JSON.stringify(novoPerfil);
  submitAlteracao(jsonData)
}

// Função para carregar os dados iniciais do json-server para o localStorage
function carregaDadosIniciaisDoacoes() {
    fetch(urlDoacoes).then(function(response) {
        return response.json();
    }).then(function(dados) {
        let objDados = leDadosDoacoes();
        objDados.Doacoes = dados;
        salvaDados(objDados);
        console.log("Dados das doacoes carregados no local storage");
    });
}

function atualizarInstituicoes(){
    fetch(urlReceptores)
    .then(response => response.json())
    .then(itens => {
      const itensContainer = document.getElementById('inputInstituicao');

      itens.forEach(item => {
        const itemDiv = document.createElement('option');

        itemDiv.innerHTML = `${item.nome}`;
        itensContainer.appendChild(itemDiv);

      });
    });
}

window.onload = carregaDadosIniciaisDoacoes;

function getFaixaEtaria(n){
    fetch(urlFaixaEtaria)
    .then(response => response.json())
    .then(itens => {

      itens.forEach(item => {
        if(item.id === n){
            return item.descricao
        }
      });
    });
}

function historicoDoacoes(){
    fetch(urlDoacoesRecebidas)
    .then(response => response.json())
    .then(itens => {
      const itensContainer = document.getElementById('accordionExample');
      var contador = 1
      itens.forEach(item => {
        if(localStorage.getItem('userId') == item.usuario_id){
        const itemDiv = document.createElement('div');

        itemDiv.classList.add('accordion-item');
        itemDiv.innerHTML = `
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${contador}" aria-expanded="false" aria-controls="collapse${contador}">
            Doação n° ${contador}
          </button>
        </h2>
        <div id="collapse${contador}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <ul>
                <li>Tipo: ${item.tipo}</li>
                <li>Tamanho: ${item.tamanho}</li>
                <li>Categoria: ${item.categoria_id}</li>
                <li>Faixa Etária: ${getFaixaEtaria(item.f_etaria_id)}</li>
                <li>Quantidade: ${item.quantidade}</li>
                <li>Situação: ${item.situacao}</li>
                </ul>
          </div>
        </div>
        `;
        itensContainer.appendChild(itemDiv);
        contador++
        }
      });
    });
}

function solicitacoesDoacao(){
    fetch(urlSolicitacoes)
    .then(response => response.json())
    .then(itens => {
      const itensContainer = document.getElementById('blocoSolicitacoes');
      itens.forEach(item => {
        const itemDiv = document.createElement('div');

        itemDiv.classList.add('col-sm-2');
        itemDiv.innerHTML = `
        <div class="card" style="background-color: #38b6ff !important;">
          <div class="card-body" style="background-color: #38b6ff !important;">
            <h5 class="card-title" style="background-color: #38b6ff !important;">Camiseta</h5>
            <ul style="background-color: #38b6ff !important;">
                <li style="background-color: #38b6ff !important;">Tipo: ${item.tipo}</li>
                <li style="background-color: #38b6ff !important;">Tamanho: ${item.tamanho}</li>
                <li style="background-color: #38b6ff !important;">Categoria: ${item.categoria}</li>
                <li style="background-color: #38b6ff !important;">Faixa Etária: ${getFaixaEtaria(item.f_etaria_id)}</li>
            </ul>
          </div>
        </div>
        `;
        itensContainer.appendChild(itemDiv);
        contador++
      });
    });
}

function PerfilUsuario(){
    carregarDadosDoador()
    historicoDoacoes()
}


function logout() {
    sessionStorage.removeItem('userId'); // Limpa o ID do usuário da sessionStorage
    localStorage.removeItem('userId'); // Limpa o ID do usuário do localStorage
    window.location.href = '../../pages/Login.html'; // Redireciona para a página de login
}
