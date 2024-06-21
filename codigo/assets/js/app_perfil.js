const urlSolicitacoes = '/solicitacoes';
const urlCategorias = '/categorias';
const urlFaixaEtaria = '/f_etaria';

let db;

function fetchDados() {
    return Promise.all([
        fetch(urlSolicitacoes),
        fetch(urlCategorias),
        fetch(urlFaixaEtaria)
    ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
        db = { 
            solicitacoes: data[0],
            categorias: data[1],
            f_etaria: data[2]
        };
        return db;
    });
}

function salvarNovaSolicitacao(solicitacao) {
    return fetch(urlSolicitacoes, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solicitacao)
    })
    .then(response => response.json());
}

function atualizarSolicitacao(id, solicitacao) {
    return fetch(`${urlSolicitacoes}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solicitacao)
    })
    .then(response => response.json());
}

function excluirSolicitacao(id) {
  return fetch(`${urlSolicitacoes}/${id}`, {
      method: 'DELETE'
  });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchDados().then(() => {
        document.getElementById('btnAdicionar').addEventListener('click', function() {
            document.getElementById('tela').style.display = 'none';
            document.getElementById('modal').style.display = 'block';

            // Limpar os campos ao adicionar uma nova solicitação
            limparCampos();

            // Remover event listeners existentes e adicionar o de salvar nova solicitação
            let btnSalvar = document.getElementById('btnSalvar');
            btnSalvar.removeEventListener('click', saveEditedSolicitacao);
            btnSalvar.addEventListener('click', saveNewSolicitacao);
        });

        document.getElementById('btnCancelar').addEventListener('click', function() {
            document.getElementById('modal').style.display = 'none';
        });

        function saveNewSolicitacao() {
            let tipo = document.getElementById('campoTipo').value;
            let tamanho = document.getElementById('campoTamanho').value;
            let categoria = document.getElementById('campoCategoria').value;
            let faixa_etaria = document.getElementById('campoFEtaria').value;

            let categoriaObj = db.categorias.find(cat => cat.descricao === categoria);
            let categoria_id = categoriaObj ? categoriaObj.id : null;

            let faixa_etariaObj = db.f_etaria.find(fetaria => fetaria.descricao === faixa_etaria);
            let f_etaria_id = faixa_etariaObj ? faixa_etariaObj.id : null;

            let novaSolicitacao = {
                tipo: tipo,
                tamanho: tamanho,
                categoria_id: categoria_id,
                f_etaria_id: f_etaria_id
            };

            salvarNovaSolicitacao(novaSolicitacao).then(() => {
                db.solicitacoes.push(novaSolicitacao);
                imprimeDados();
                limparCampos();
                document.getElementById('modal').style.display = 'none';
            });
        }

        function saveEditedSolicitacao(id) {
            let tipo = document.getElementById('campoTipo').value;
            let tamanho = document.getElementById('campoTamanho').value;
            let categoria = document.getElementById('campoCategoria').value;
            let faixa_etaria = document.getElementById('campoFEtaria').value;

            let categoriaObj = db.categorias.find(cat => cat.descricao === categoria);
            let categoria_id = categoriaObj ? categoriaObj.id : null;

            let faixa_etariaObj = db.f_etaria.find(fetaria => fetaria.descricao === faixa_etaria);
            let f_etaria_id = faixa_etariaObj ? faixa_etariaObj.id : null;

            let solicitacaoAtualizada = {
                tipo: tipo,
                tamanho: tamanho,
                categoria_id: categoria_id,
                f_etaria_id: f_etaria_id
            };

            atualizarSolicitacao(id, solicitacaoAtualizada).then(() => {
                db.solicitacoes = db.solicitacoes.map(sol => (sol.id === id ? { ...solicitacaoAtualizada, id: id } : sol));
                imprimeDados();
                document.getElementById('modal').style.display = 'none';
            });
        }

        function imprimeDados() {
            let tela = document.getElementById('tela');
            let strHtml = '';

            for (let solicitacao of db.solicitacoes) {
                let categoriaObj = db.categorias.find(cat => cat.id === solicitacao.categoria_id);
                let faixa_etariaObj = db.f_etaria.find(fetaria => fetaria.id === solicitacao.f_etaria_id);

                let categoria = categoriaObj ? categoriaObj.descricao : 'Categoria não encontrada';
                let faixa_etaria = faixa_etariaObj ? faixa_etariaObj.descricao : 'Faixa etária não encontrada';

                strHtml += `
                    <div class="solicitacao" data-id="${solicitacao.id}">
                        <p class="solicitacao-tipo">Tipo: ${solicitacao.tipo}</p>
                        <p class="solicitacao-tamanho">Tamanho: ${solicitacao.tamanho}</p>
                        <p class="solicitacao-categoria">Categoria: ${categoria}</p>
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
                document.getElementById('campoCategoria').value = db.categorias.find(cat => cat.id === solicitacao.categoria_id).descricao;
                document.getElementById('campoFEtaria').value = db.f_etaria.find(fetaria => fetaria.id === solicitacao.f_etaria_id).descricao;

                // Remover event listeners existentes e adicionar o de salvar edição
                let btnSalvar = document.getElementById('btnSalvar');
                btnSalvar.removeEventListener('click', saveNewSolicitacao);
                btnSalvar.onclick = function() { saveEditedSolicitacao(id); };
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

$(document).ready(function() {
    $('#btnAdicionar').click(function() {
        $('#sidenavCollapse').collapse('toggle');
    });
});

function limparCampos() {
    document.getElementById('campoTipo').value = '';
    document.getElementById('campoTamanho').value = '';
    document.getElementById('campoCategoria').value = '';
    document.getElementById('campoFEtaria').value = '';
}

////// Editar Perfil  - Receptores  /////

// URL para a API dos Receptores
const urlRecptores = "/Receptores";

// Função para carregar os dados dos Receptores da API e preencher o formulário
function carregarDadosReceptor() {
    // Fetch para obter os dados dos Receptores da API
    fetch(urlRecptores).then(function(response) {
        return response.json();
    }).then(function(dados) {

        if (dados.length > 0) {
            let receptor = dados[0]; //pegar primeiro receptor

            // Preencher os campos do formulário com os dados do receptor
            $("#inputNome").val(receptor.nome);
            $("#inputTele").val(receptor.Telefone);
            $("#inputInst").val(receptor.Instituicao);
            $("#inputSenha").val(receptor.novaSenha);
            $("#inputEstado").val(receptor.endereco[0].estado);
            $("#inputCEP").val(receptor.endereco[0].cep);
            $("#inputEnder").val(receptor.endereco[0].rua);
            $("#inputCidade").val(receptor.endereco[0].cidade);
            $("#inputNumero").val(receptor.endereco[0].numero);
            $("#inputBairro").val(receptor.endereco[0].bairro);
            $("#inputDesc").val(receptor.Descricao);

            // Exibir os dados carregados no console para verificação
            console.log("Dados do receptor carregados:", receptor);
        } else {
            console.log("Nenhum receptor encontrado.");
        }
    }).catch(function(error) {
        console.error("Erro ao carregar os dados dos receptores:", error);
    });
}

// Chamar a função para carregar os dados do receptor quando o documento estiver pronto
$(document).ready(function() {
    carregarDadosReceptor();
});

$(document).ready(function() {
    // Evento de clique no botão "Salvar"
    $("#saveProfileButton").click(function(event) {
        
        event.preventDefault();

        // Coletar o CNPJ atual do perfil do receptor
        let cnpjAtual = "000-000-000-00"; 

        // Coletar os novos dados do perfil do receptor dos campos de entrada
        let novoNome = $("#inputNome").val();
        let novoTelefone = $("#inputTele").val();
        let novoTipoInstituicao = $("#inputInst").val();
        let novaSenha = $("#inputSenha").val();
        let novoEstado = $("#inputEstado").val();
        let novoCEP = $("#inputCEP").val();
        let novaCidade = $("#inputCidade").val();
        let novoEndereco = $("#inputEnder").val();
        let novoNumero = $("#inputNumero").val();
        let novoBairro = $("#inputBairro").val();
        let novaDesc = $("#inputDesc").val();

        // Montar os novos dados em um objeto
        let novosDados = {
            id: cnpjAtual,
            nome: novoNome,
            endereco: [{
                cep: novoCEP,
                estado: novoEstado,
                bairro: novoBairro,
                rua: novoEndereco,
                cidade: novaCidade,
                numero: novoNumero
            }],
            novaSenha: novaSenha,
            Telefone: novoTelefone,
            Instituicao: novoTipoInstituicao,
            Descricao: novaDesc
        };

        // Fazer a solicitação PUT para atualizar os dados do perfil do receptor
        $.ajax({
            url: '/Receptores/' + cnpjAtual,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(novosDados),
            success: function(data) {
                // A atualização foi bem-sucedida
                console.log("Dados do perfil do receptor atualizados com sucesso:", data);
                alert("Perfil Atualizado com Sucesso");
            },
            error: function(errorThrown) {
                console.error("Erro ao atualizar dados do perfil do receptor:", errorThrown);
            }
        });
    });
});

// Desativar Conta //
$(document).ready(function() {
    // Evento de clique no botão "Desativar Conta"
    $("#deactivateProfileButton").click(function() {
        // Confirmar se o usuário deseja desativar a conta
        if (confirm("Tem certeza de que deseja desativar sua conta?")) {
            // Enviar uma solicitação para desativar a conta
            $.ajax({
                url: '/desativar_conta', 
                type: 'POST',
                contentType: 'application/json',
                success: function(response) {
                    // A conta foi desativada com sucesso
                    alert("Sua conta foi desativada com sucesso.");
                    // Redirecionar para a página inicial
                    window.location.href = '/home';
                },
                error: function(error) {
                    console.error("Erro ao desativar conta:", error);
                    alert("Ocorreu um erro ao desativar sua conta. Por favor, tente novamente mais tarde.");
                }
            });
        }
    });
});

// Histórico de Doações //
const urlDoacoesRecebidas = "/doacoes_recebidas";

document.addEventListener('DOMContentLoaded', function () {
    const btnMostrarDoacoes = document.getElementById('btnMostrarDoacoes');
    const doacoesRecebidasLista = document.getElementById('doacoesRecebidasLista');

    btnMostrarDoacoes.addEventListener('click', function () {
        console.log('Fetching data from:', urlDoacoesRecebidas); 

        fetch(urlDoacoesRecebidas)
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); 

                const doacoes = data;

                doacoesRecebidasLista.innerHTML = '';
                doacoes.forEach(doacao => {
                    const categoria = (doacao.categoria_id === 2) ? "Masculino" : "Feminino";
                    const faixaEtaria = (() => {
                        switch (doacao.f_etaria_id) {
                            case 1: return "Recém Nascido";
                            case 2: return "Bebês";
                            case 3: return "Crianças";
                            case 4: return "Adolescente";
                            case 5: return "Adulto";
                            case 6: return "Idoso";
                            default: return "Desconhecida";
                        }
                    })();
                    const doacaoItem = `
                        <div class="doacao-item">
                            <p><strong>Tipo:</strong> ${doacao.tipo}</p>
                            <p><strong>Tamanho:</strong> ${doacao.tamanho}</p>
                            <p><strong>Categoria:</strong> ${categoria}</p>
                            <p><strong>Faixa Etária:</strong> ${faixaEtaria}</p>
                            <p><strong>Quantidade:</strong> ${doacao.quantidade}</p>
                            <p><strong>Situação:</strong> ${doacao.situacao}</p>
                        </div>
                    `;
                    doacoesRecebidasLista.innerHTML += doacaoItem;
                });

                // ver lista
                doacoesRecebidasLista.style.display = 'block';
            })
            .catch(error => {
                console.error('Erro ao acessar as doações:', error.message); 
            });
    });
});


