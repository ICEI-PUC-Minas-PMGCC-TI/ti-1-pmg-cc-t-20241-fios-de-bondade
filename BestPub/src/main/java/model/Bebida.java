package model;

public class Bebida {
    private int id;
    private boolean alcolica;
    private double preco;
    private String nome;
    private String descricao;
    private String cnpj_bar;
    private String imagem; // Novo atributo
    private String tags;

    // Construtor sem parâmetros
    public Bebida() {}

    // Construtor com parâmetros
    public Bebida(int id, boolean alcolica, double preco, String nome, String descricao, String cnpj_bar, String imagem) {
        this.id = id;
        this.alcolica = alcolica;
        this.preco = preco;
        this.nome = nome;
        this.descricao = descricao;
        this.cnpj_bar = cnpj_bar;
        this.imagem = imagem;
    }
    
    public void addTags(String jsonTags) {
    	this.tags = jsonTags;
    }
    
    public String getTags() {
    	return this.tags;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isAlcolica() {
        return alcolica;
    }

    public void setAlcolica(boolean alcolica) {
        this.alcolica = alcolica;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getcnpj_bar() {
        return cnpj_bar;
    }

    public void setcnpj_bar(String cnpj_bar) {
        this.cnpj_bar = cnpj_bar;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}
