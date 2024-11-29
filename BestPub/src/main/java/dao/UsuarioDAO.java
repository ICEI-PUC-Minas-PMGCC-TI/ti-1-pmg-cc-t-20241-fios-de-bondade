package dao;

import model.Usuario;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UsuarioDAO extends DAO {	
	public UsuarioDAO() {
		super();
		conectar();
	}
	
	public void finalize() {
		close();
	}
	
	public static boolean insert(Usuario usuario) {
		boolean status = false;
		try {
			String sql = "INSERT INTO Usuario (nome, email, senha, datanascimento) "
		               + "VALUES (?, ?, ?, ?);";
			PreparedStatement st = conexao.prepareStatement(sql);
		    st.setString(1, usuario.getNome());
			st.setString(2, usuario.getEmail());
			st.setString(3, usuario.getSenha());
			st.setDate(4, Date.valueOf(usuario.getDataNascimento()));
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
	public boolean updateUsuarioComBar(int usuarioId, String barCNPJ) {
	    boolean status = false;
	    try {
	        String sql = "UPDATE usuario SET cnpj_bar = ? WHERE id = ?";
	        PreparedStatement st = conexao.prepareStatement(sql);
	        st.setString(1, barCNPJ);
	        st.setInt(2, usuarioId);
	        st.executeUpdate();
	        st.close();
	        status = true;
	    } catch (SQLException e) {
	        throw new RuntimeException(e);
	    }
	    return status;
	}

	public Usuario getByEmail(String email) {
	    Usuario usuario = null;
	    try {
	        // Prepara a consulta SQL para buscar pelo email
	        String sql = "SELECT * FROM Usuario WHERE email = ?";
	        PreparedStatement st = conexao.prepareStatement(sql);
	        st.setString(1, email);
	        ResultSet rs = st.executeQuery();

	        // Se o resultado for encontrado, cria o objeto Usuario
	        if (rs.next()) {
	            usuario = new Usuario(
	                rs.getInt("id"),
	                rs.getString("nome"),
	                rs.getString("email"),
	                rs.getString("senha"),
	                rs.getDate("datanascimento").toLocalDate(),
	                rs.getString("cnpj_bar")
	            );
	        }
	        st.close();
	    } catch (SQLException e) {
	        System.err.println(e.getMessage());
	    }
	    return usuario;
	}

	public Usuario get(int id) {
		Usuario usuario = null;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM Usuario WHERE id=" + id;
			ResultSet rs = st.executeQuery(sql);	
	        if(rs.next()){            
	        	usuario = new Usuario(rs.getInt("id"), 
									   rs.getString("nome"), 
									   rs.getString("email"), 
									   rs.getString("senha"), 
	        			               rs.getDate("datanascimento").toLocalDate());
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuario;
	}

	public List<Usuario> get() {
		return get("");
	}

	public List<Usuario> getOrderByID() {
		return get("id");		
	}

	public List<Usuario> getOrderByNome() {
		return get("nome");		
	}
	
	public List<Usuario> get(String orderBy) {
		List<Usuario> usuarios = new ArrayList<Usuario>();
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM Usuario" + ((orderBy.trim().length() == 0) ? "" : (" ORDER BY " + orderBy));
			ResultSet rs = st.executeQuery(sql);	           
	        while(rs.next()) {	            	
	        	Usuario u = new Usuario(rs.getInt("id"), 
	        			                rs.getString("nome"), 
	        			                rs.getString("email"),
	        			                rs.getString("senha"), 
	        			                rs.getDate("datanascimento").toLocalDate());
	            usuarios.add(u);
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuarios;
	}

	public boolean update(Usuario usuario) {
		boolean status = false;
		try {  
			String sql = "UPDATE Usuario SET nome = ?, email = ?, senha = ?, datanascimento = ? WHERE id = ?";
			PreparedStatement st = conexao.prepareStatement(sql);
		    st.setString(1, usuario.getNome());
			st.setString(2, usuario.getEmail());
			st.setString(3, usuario.getSenha());
			st.setDate(4, Date.valueOf(usuario.getDataNascimento()));
			st.setInt(5, usuario.getId());
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}

	public boolean delete(int id) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM Usuario WHERE id = " + id);
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
}
