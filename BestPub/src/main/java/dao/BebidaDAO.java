package dao;

import model.Bebida;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BebidaDAO extends DAO {
    public BebidaDAO() {
        super();
        conectar();
    }

    // Adiciona uma nova bebida no banco de dados
    public void salvar(Bebida bebida) {
        String sql = "INSERT INTO bebida (cnpj_bar, alcolica, preco, nome, descricao, imagem, tags) VALUES (?, ?, ?, ?, ?, ?, ?::jsonb)";
        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, bebida.getcnpj_bar());
            stmt.setBoolean(2, bebida.isAlcolica());
            stmt.setDouble(3, bebida.getPreco());
            stmt.setString(4, bebida.getNome());
            stmt.setString(5, bebida.getDescricao());
            stmt.setString(6, bebida.getImagem());
            stmt.setObject(7, bebida.getTags());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Retorna todas as bebidas do banco de dados
    public List<Bebida> listarTodos(String cnpj) {
        List<Bebida> bebidas = new ArrayList<>();
        String sql = "SELECT * FROM bebida WHERE cnpj_bar = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, cnpj); 
            ResultSet rs = stmt.executeQuery(); // Sem passar o SQL novamente.

            while (rs.next()) {
                Bebida bebida = new Bebida();
                bebida.setId(rs.getInt("id"));
                bebida.setcnpj_bar(rs.getString("cnpj_bar"));
                bebida.setAlcolica(rs.getBoolean("alcolica"));
                bebida.setPreco(rs.getDouble("preco"));
                bebida.setNome(rs.getString("nome"));
                bebida.setDescricao(rs.getString("descricao"));
                bebida.setImagem(rs.getString("imagem"));

                bebidas.add(bebida);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return bebidas;
    }

}
