package model;

import java.time.LocalDate;

public class Usuario {
    private int id;
    private String nome;
    private String email;
    private String senha;
    private LocalDate dataNascimento;
    private String cnpj_bar = null;

    public Usuario() {
        this.id = -1;
        this.nome = "";
        this.email = "";
        this.senha = "";
        this.dataNascimento = LocalDate.now(); // Inicializa com a data atual
    }

    public Usuario(int id, String nome, String email, String senha, LocalDate dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
    }
    
    public Usuario(int id, String nome, String email, String senha, LocalDate dataNascimento, String cnpj_bar) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.cnpj_bar = cnpj_bar;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }
    public void vincularBar(Bar bar) {
    	this.cnpj_bar = bar.getCnpj();
    }
    public String getCNPJBar() {
    	return this.cnpj_bar;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    @Override
    public String toString() {
        return "Usuario [id=" + id + ", nome=" + nome + ", email=" + email + ", senha=" + senha + ", dataNascimento=" + dataNascimento + "]";
    }
}
