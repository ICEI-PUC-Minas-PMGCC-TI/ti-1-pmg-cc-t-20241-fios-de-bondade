
//EXEMPLO

usuario = {
    nome:"José Maria da Silva Santos",
    numero:"37 98467-4673",
    identificacao:"123-456-789-10",
    endereço:"Rua dos Bobos, N°0",
};

function identify(){
    document.getElementById("nome").innerHTML = usuario.nome;
    document.getElementById("numero").innerHTML = usuario.numero;
    document.getElementById("identificacao").innerHTML = usuario.identificacao;
    document.getElementById("endereco").innerHTML = usuario.endereço;
}