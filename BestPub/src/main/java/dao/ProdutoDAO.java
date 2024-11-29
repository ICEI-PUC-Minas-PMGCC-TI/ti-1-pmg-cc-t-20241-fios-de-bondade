package dao;

import model.Produto;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProdutoDAO extends DAO {
    public ProdutoDAO() {
        super();
        conectar();
    }

    // Adiciona um novo produto no banco de dados
    public void salvar(Produto produto) {
    	String sql = "INSERT INTO produto (cnpj_bar, preco, nome, descricao, image, tags) VALUES (?, ?, ?, ?, ?, ?::jsonb)";
    	try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
    	    stmt.setString(1, produto.getIdBar());
    	    stmt.setDouble(2, produto.getPreco());
    	    stmt.setString(3, produto.getNome());
    	    stmt.setString(4, produto.getDescricao());
    	    stmt.setString(5, produto.getImagem());
    	    stmt.setObject(6, produto.getTags()); // Enviar JSON diretamente
    	    stmt.executeUpdate();
    	}
    	catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Retorna todos os produtos do banco de dados
    public List<Produto> listarTodos(String cnpj) {
        List<Produto> produtos = new ArrayList<>();
        String sql = "SELECT * FROM produto WHERE cnpj_bar = ?";

        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, cnpj); // Define o valor do parâmetro na query
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                Produto produto = new Produto();
                produto.setId(rs.getInt("id"));
                produto.setIdBar(rs.getString("cnpj_bar"));
                produto.setPreco(rs.getDouble("preco"));
                produto.setNome(rs.getString("nome"));
                produto.setDescricao(rs.getString("descricao"));
                produto.setImagem(rs.getString("image"));

                produtos.add(produto);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return produtos;
    }


    // Busca um produto pelo ID
    public Produto buscarPorId(int id) {
        String sql = "SELECT * FROM produtos WHERE id = ?";
        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Produto produto = new Produto();
                produto.setId(rs.getInt("id"));
                produto.setIdBar(rs.getString("cnpj_bar"));
                produto.setPreco(rs.getDouble("preco"));
                produto.setNome(rs.getString("nome"));
                produto.setDescricao(rs.getString("descricao"));
                produto.setImagem(rs.getString("image"));
                return produto;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null; // Caso não encontre
    }

    // Deleta um produto pelo ID
    public boolean deletar(int id) {
        String sql = "DELETE FROM produtos WHERE id = ?";
        try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setInt(1, id);
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
