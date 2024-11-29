package model;

public class Produto {
    private int id;
    private String cnpj_bar;
    private double preco;
    private String descricao;
    private String nome;
    private String imagem;
    private String tags;

    public Produto() {
        this.id = -1;
        this.cnpj_bar = "";
        this.preco = 0.0;
        this.descricao = "";
        this.nome = "";
        this.imagem = "";
    }

    public Produto(int id, double preco, String idBar, String nome, String descricao, String imagem) {
        this.id = id;
        this.preco = preco;
        this.cnpj_bar = idBar;
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
    }
    
    public void addTags(String jsonTags) {
    	this.tags = jsonTags;
    }
    
    public String getTags() {
    	return this.tags;
    }
    
    public String getImagem() {
    	return this.imagem;
    }
    public void setImagem(String imagem) {
    	this.imagem = imagem;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIdBar() {
        return cnpj_bar;
    }

    public void setIdBar(String id_bar) {
        this.cnpj_bar = id_bar;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }


    @Override
    public String toString() {
        return "Comentário [id=" + id + ", nome=" + nome + ", idBar=" + cnpj_bar + ", descricao=" + descricao + ", preco="
                + preco + "]";
    }
}
