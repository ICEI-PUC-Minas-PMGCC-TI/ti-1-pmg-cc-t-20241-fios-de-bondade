const dbMock = {
    solicitacoes: [
        {
            id: 1,
            tipo: "Calças",
            tamanho: "8",
            categoria_id: 1,
            f_etaria_id: 3
        },
        {
            id: 2,
            tipo: "Agasalhos",
            tamanho: "G",
            categoria_id: 2,
            f_etaria_id: 5
        },
        {
            id: 3,
            tipo: "Camisas",
            tamanho: "M",
            categoria_id: 2,
            f_etaria_id: 4
        }
    ],
    categorias: [
        { id: 1, descricao: 'Feminino' },
        { id: 2, descricao: 'Masculino' }
    ],
    f_etaria: [
        { id: 1, descricao: 'Recém Nascido' },
        { id: 2, descricao: 'Bebês' },
        { id: 3, descricao: 'Crianças' },
        { id: 4, descricao: 'Adolescente' },
        { id: 5, descricao: 'Adulto' },
        { id: 6, descricao: 'Idoso' }
    ]
};

let db = JSON.parse(localStorage.getItem('db'));
if (!db) {
    db = dbMock;
}

function salvarDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

document.getElementById('btnAdicionar').addEventListener('click', function() {
    document.getElementById('tela').style.display = 'none'; 
    document.getElementById('modal').style.display = 'block';
    limparFormulario();
    adicionarFormulario();
});

document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('btnSalvar').addEventListener('click', function() {
    const id = document.getElementById('solicitacaoId').value;
    if (id) {
        salvarSolicitacao(parseInt(id));
    } else {
        adicionarSolicitacao();
    }
});
    
function adicionarSolicitacao(){   
    let tipo = document.getElementById('campoTipo').value;
    let tamanho = document.getElementById('campoTamanho').value;
    let categoria = document.getElementById('campoCategoria').value;
    let faixa_etaria = document.getElementById('campoFEtaria').value;

    // Encontrar o objeto categoria correspondente ao que foi selecionado
    let categoriaObj = db.categorias.find(cat => cat.descricao === categoria);
    let categoria_id = categoriaObj ? categoriaObj.id : null;

    // Encontrar o objeto faixa etaria correspondente ao que foi selecionado
    let faixa_etariaObj = db.f_etaria.find(fetaria => fetaria.descricao === faixa_etaria);
    let f_etaria_id = faixa_etariaObj ? faixa_etariaObj.id : null;

    let novaSolicitacao = {
        id: db.solicitacoes.length ? db.solicitacoes[db.solicitacoes.length - 1].id + 1 : 1, 
        tipo: tipo,
        tamanho: tamanho,
        categoria_id: categoria_id,
        f_etaria_id: f_etaria_id
    };

    db.solicitacoes.push(novaSolicitacao);
    salvarDados(db);
    imprimeDados();

    limparFormulario();
    document.getElementById('modal').style.display = 'none';
}

function salvarSolicitacao(id) {
    let tipo = document.getElementById('campoTipo').value;
    let tamanho = document.getElementById('campoTamanho').value;
    let categoria = document.getElementById('campoCategoria').value;
    let faixa_etaria = document.getElementById('campoFEtaria').value;

    let categoriaObj = db.categorias.find(cat => cat.descricao === categoria);
    let categoria_id = categoriaObj ? categoriaObj.id : null;

    let faixa_etariaObj = db.f_etaria.find(fetaria => fetaria.descricao === faixa_etaria);
    let f_etaria_id = faixa_etariaObj ? faixa_etariaObj.id : null;

    let solicitacao = db.solicitacoes.find(sol => sol.id === id);
    solicitacao.tipo = tipo;
    solicitacao.tamanho = tamanho;
    solicitacao.categoria_id = categoria_id;
    solicitacao.f_etaria_id = f_etaria_id;

    salvarDados(db);
    imprimeDados();

    limparFormulario();
    document.getElementById('modal').style.display = 'none';
}

function limparFormulario() {
    document.getElementById('campoTipo').value = '';
    document.getElementById('campoTamanho').value = '';
    document.getElementById('campoCategoria').value = '';
    document.getElementById('campoFEtaria').value = '';
    document.getElementById('solicitacaoId').value = '';
}

function adicionarFormulario() {
    document.getElementById('btnSalvar').textContent = 'Adicionar';
}

function editarFormulario() {
    document.getElementById('btnSalvar').textContent = 'Salvar';
}

function imprimeDados() {
    let tela = document.getElementById('tela');
    let strHtml = '';

    for (let i = 0; i < db.solicitacoes.length; i++) {
        let solicitacao = db.solicitacoes[i];
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

function editarSolicitacao(id) {
    const solicitacao = db.solicitacoes.find(sol => sol.id === id);
    if (solicitacao) {
        document.getElementById('tela').style.display = 'none'; // Oculta a lista de solicitações
        document.getElementById('modal').style.display = 'block'; // Exibe o formulário de edição

        // Preenche o formulário com os dados da solicitação selecionada
        document.getElementById('campoTipo').value = solicitacao.tipo;
        document.getElementById('campoTamanho').value = solicitacao.tamanho;
        document.getElementById('campoCategoria').value = db.categorias.find(cat => cat.id === solicitacao.categoria_id).descricao;
        document.getElementById('campoFEtaria').value = db.f_etaria.find(fetaria => fetaria.id === solicitacao.f_etaria_id).descricao;
        document.getElementById('solicitacaoId').value = solicitacao.id;
        
        editarFormulario();
    }
}

function excluirSolicitacao(id) {
    db.solicitacoes = db.solicitacoes.filter(sol => sol.id !== id);
    salvarDados(db);
    imprimeDados();
}


////// Editar Perfil   /////

const saveProfileData = () => {
    const name = document.getElementById('name').value;
    const cnpj = document.getElementById('cnpj').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const bairro = document.getElementById('bairro').value;

    const profileData = {
      name,
      cnpj,
      email, 
      password,
      confirmPassword,
      endereco,
      numero,
      cidade,
      cep,
      bairro
    };
  
    localStorage.setItem('profileData', JSON.stringify(profileData));
  };
  
  document.getElementById('saveProfileButton').addEventListener('click', function() {
    saveProfileData();
    alert('Perfil salvo com sucesso!');
  });
  
const loadProfileData = () => {
    const profileDataString = localStorage.getItem('profileData');
        if (profileDataString) {
            const profileData = JSON.parse(profileDataString);
            document.getElementById('name').value = profileData.name;
            document.getElementById('cnpj').value = profileData.cnpj;
            document.getElementById('email').value = profileData.email;
            document.getElementById('password').value = profileData.password;
            document.getElementById('confirmPassword').value = profileData.confirmPassword;
            document.getElementById('numero').value = profileData.numero;
            document.getElementById('cidade').value = profileData.cidade;
            document.getElementById('cep').value = profileData.cep;
            document.getElementById('bairro').value = profileData.bairro;
    
    }
  };
  
  loadProfileData();


  