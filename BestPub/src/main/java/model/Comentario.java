package model;

import java.time.LocalDate;

public class Comentario {
    private int id;
    private int idUsuario;
    private String cnpjBar;
    private String comentario;
    private LocalDate data;
    
    public Comentario() {}
    // Construtores
    public Comentario(int idUsuario, String cnpjBar, String comentario, LocalDate data) {
        this.idUsuario = idUsuario;
        this.cnpjBar = cnpjBar;
        this.comentario = comentario;
        this.data = data;
    }

    // Getters e setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int string) {
        this.idUsuario = string;
    }

    public String getCnpjBar() {
        return cnpjBar;
    }

    public void setCnpjBar(String cnpjBar) {
        this.cnpjBar = cnpjBar;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public LocalDate getDate() {
        return data;
    }

    public void setDate(LocalDate data) {
        this.data = data;
    }
}