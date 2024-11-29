package model;

public class Bar {
    private String cnpj;
    private String telefone;
    private String descricao;
    private String imagem;
    private String nome;
    private String enderecoNumero;
    private String enderecoCidade;
    private String enderecoCep;
    private String enderecoLogradouro;
    private String enderecoBairro;
    private String enderecoEstado;

    // Construtor padrão
    public Bar() {
        this.cnpj = "";
        this.telefone = "";
        this.descricao = "";
        this.imagem = "";
        this.nome = "";
        this.enderecoNumero = "";
        this.enderecoCidade = "";
        this.enderecoCep = "";
        this.enderecoLogradouro = "";
        this.enderecoBairro = "";
        this.enderecoEstado = "";
    }

    // Construtor com parâmetros
    public Bar(String cnpj, String telefone, String descricao, String imagem, String nome, String enderecoNumero, String enderecoCidade, String enderecoCep, String enderecoLogradouro, String enderecoBairro, String enderecoEstado) {
        this.cnpj = cnpj;
        this.telefone = telefone;
        this.descricao = descricao;
        this.imagem = imagem;
        this.nome = nome;
        this.enderecoNumero = enderecoNumero;
        this.enderecoCidade = enderecoCidade;
        this.enderecoCep = enderecoCep;
        this.enderecoLogradouro = enderecoLogradouro;
        this.enderecoBairro = enderecoBairro;
        this.enderecoEstado = enderecoEstado;
    }

    // Getters e Setters
    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEnderecoNumero() {
        return enderecoNumero;
    }

    public void setEnderecoNumero(String enderecoNumero) {
        this.enderecoNumero = enderecoNumero;
    }

    public String getEnderecoCidade() {
        return enderecoCidade;
    }

    public void setEnderecoCidade(String enderecoCidade) {
        this.enderecoCidade = enderecoCidade;
    }

    public String getEnderecoCep() {
        return enderecoCep;
    }

    public void setEnderecoCep(String enderecoCep) {
        this.enderecoCep = enderecoCep;
    }

    public String getEnderecoLogradouro() {
        return enderecoLogradouro;
    }

    public void setEnderecoLogradouro(String enderecoLogradouro) {
        this.enderecoLogradouro = enderecoLogradouro;
    }

    public String getEnderecoBairro() {
        return enderecoBairro;
    }

    public void setEnderecoBairro(String enderecoBairro) {
        this.enderecoBairro = enderecoBairro;
    }

    public String getEnderecoEstado() {
        return enderecoEstado;
    }

    public void setEnderecoEstado(String enderecoEstado) {
        this.enderecoEstado = enderecoEstado;
    }

    // Método toString
    @Override
    public String toString() {
        return "Bar [cnpj=" + cnpj + ", telefone=" + telefone + ", descricao=" + descricao + ", imagem=" + imagem + ", nome=" + nome
                + ", enderecoNumero=" + enderecoNumero + ", enderecoCidade=" + enderecoCidade + ", enderecoCep=" + enderecoCep
                + ", enderecoLogradouro=" + enderecoLogradouro + ", enderecoBairro=" + enderecoBairro + ", enderecoEstado=" + enderecoEstado + "]";
    }
}