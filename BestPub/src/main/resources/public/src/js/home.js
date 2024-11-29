document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('fileInput');
        if (fileInput.files.length === 0) {
            alert('Por favor, selecione uma imagem.');
            return;
        }

        const file = fileInput.files[0];

        try {
            // Chamar a função de upload para Imgbb
            const imageUrl = await uploadImagemImgbb(file);

            // Exibir sucesso ao usuário e processar a URL retornada
            alert("Imagem enviada com sucesso! URL da imagem: " + imageUrl);

            // Exemplo: Fazer algo com a URL (ex.: enviar para o backend)
            console.log("URL da Imagem:", imageUrl);
            // Você pode enviar essa URL para o backend, se necessário:
            /*
            await fetch('/procurar-bares', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl })
            });
            */
        } catch (error) {
            alert(error);
        }
    });
});
function GenerateItems() {
    fetch('/bars', { // Supondo que a API está disponível na rota "/bars"
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.querySelector(".aviso-bares").style.display = "none"; // Oculta mensagem de aviso
                console.log(data);
                displayBars(data); // Exibe os bares na página
            } else {
                document.querySelector(".aviso-bares").style.display = "block"; // Mostra mensagem de aviso
            }
        })
        .catch(error => {
            console.error('Erro ao buscar bares:', error);
        });
}
function GenerateItemsImg() {
    fetch('/bars/imagem', { // Supondo que a API está disponível na rota "/bars"
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            document.querySelector(".aviso-bares").style.display = "none"; // Oculta mensagem de aviso
            console.log(data);
            displayBars(data); // Exibe os bares na página
        } else {
            document.querySelector(".aviso-bares").style.display = "block"; // Mostra mensagem de aviso
        }
    })
    .catch(error => {
        console.error('Erro ao buscar bares:', error);
    });
}
function displayBars(bars) {
    const barList = document.getElementById('bar-list');
    barList.innerHTML = ''; // Limpa o conteúdo anterior
    bars.forEach(bar => {
        const barCard = document.createElement('div');
        barCard.classList.add('col-md-4', 'mb-4'); // Cada card vai ocupar um terço da largura

        // Adicionando um evento de clique no card
        barCard.addEventListener('click', () => {
            localStorage.setItem('selectedBar', JSON.stringify(bar)); // Armazena o bar no localStorage
            window.location.href = 'details.html'; // Redireciona para a página de detalhes
        });

        barCard.innerHTML = `
<div class="card shadow-sm" style="border-radius: 15px; height: 100%; border: none;">
   <div class="card-img-top" style="background-image: url('${bar.imagem}'); background-size: cover; background-position: center; width: 100%; padding-top: 75%;"></div>
    <div class="card-body">
        <h5 class="card-title" style="font-weight: bold; font-size: 18px;">${bar.nome}</h5>
        <p class="card-text text-muted" style="font-size: 16px;">${bar.descricao}</p>
        <p class="card-text" style="font-size: 14px;">
            <i class="fas fa-map-marker-alt" style="color: #e74c3c;"></i> 
            ${bar.enderecoLogradouro}, ${bar.enderecoCidade} - ${bar.enderecoEstado}
        </p>
    </div>
</div>
`;

        barList.appendChild(barCard);
    });
}

// Função para fazer upload para Imgbb
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


function carregarNomeUsuario() {
    fetch("/usuario/nome")
        .then(response => {
            if (response.ok) {
                return response.text(); // Recebe o nome do usuário como texto
            } else {
                throw new Error("Usuário não está logado");
            }
        })
        .then(nome => {
            document.getElementById("user-name").innerText = nome; // Exibe o nome no elemento com id 'nomeUsuario'
        })
        .catch(error => {
            console.error("Erro ao carregar o nome do usuário:", error);
        });
}

// Chame essa função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarNomeUsuario);