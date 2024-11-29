package dao;

import model.Comentario;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ComentarioDAO extends DAO {
    private Connection connection;

    public ComentarioDAO() {
        super();
        conectar();
    }

    // Adiciona um novo comentário no banco de dados
    public void salvar(Comentario comentario) {
        String sql = "INSERT INTO Comentario (id_usuario, cnpj_bar, texto, data) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, comentario.getIdUsuario());
            stmt.setString(2, comentario.getCnpjBar());
            stmt.setString(3, comentario.getComentario());
            stmt.setDate(4, Date.valueOf(comentario.getDate()));

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Lista os comentários de um bar específico
    public List<Comentario> listarComentarios(String cnpj) throws Exception {
        List<Comentario> comentarios = new ArrayList<>();
        String sql = "SELECT id_usuario, comentario, data FROM Comentario WHERE cnpj_bar = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, cnpj);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                int idUsuario = rs.getInt("id_usuario");
                String comentarioTexto = rs.getString("comentario");
                Date dataSql = rs.getDate("data");
                LocalDate data = dataSql != null ? dataSql.toLocalDate() : null;

                // Cria um novo objeto Comentario e adiciona à lista
                Comentario comentario = new Comentario(idUsuario, cnpj, comentarioTexto, data);
                comentarios.add(comentario);
            }
        } catch (SQLException e) {
            // Lança uma exceção personalizada ou a original para indicar o erro
            throw new Exception("Erro ao buscar os comentários no banco de dados: " + e.getMessage(), e);
        }

        return comentarios;
    }

}
