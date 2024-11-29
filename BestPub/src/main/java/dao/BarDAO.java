package dao;

import model.Bar;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import AI.Chat;
import AI.ImageAnalysis;

public class BarDAO extends DAO {	
	public BarDAO() {
		super();
		conectar();
	}
	
	public void finalize() {
		close();
	}
	
	// Método para inserir um novo bar
	public static boolean insert(Bar bar) {
	    boolean status = false;
	    try {
	        String sql = "INSERT INTO Bar (cnpj, telefone, descricao, imagem, nome, endereconumero, enderecocidade, enderecocep, enderecologradouro, enderecobairro, enderecoestado) "
	                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";  // Agora com 11 colunas e 11 valores
	        //System.out.println("sql: " + sql);
	        PreparedStatement st = conexao.prepareStatement(sql);
	        st.setString(1, bar.getCnpj());
	        st.setString(2, bar.getTelefone());
	        st.setString(3, bar.getDescricao());
	        st.setString(4, bar.getImagem());
	        st.setString(5, bar.getNome());
	        st.setString(6, bar.getEnderecoNumero());
	        st.setString(7, bar.getEnderecoCidade());
	        st.setString(8, bar.getEnderecoCep());
	        st.setString(9, bar.getEnderecoLogradouro());
	        st.setString(10, bar.getEnderecoBairro());
	        st.setString(11, bar.getEnderecoEstado());  // Corrigido para o índice 11
	        st.executeUpdate();
	        st.close();
	        status = true;
	    } catch (SQLException u) {
	        throw new RuntimeException(u);
	    }
	    return status;
	}


	// Método para obter um bar específico pelo CNPJ
	public Bar getByCNPJ(String cnpj) {
		Bar bar = null;
		try {
			String sql = "SELECT * FROM Bar WHERE cnpj = ?";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.setString(1, cnpj);
			ResultSet rs = st.executeQuery();	
	        if(rs.next()){            
	        	bar = new Bar(rs.getString("cnpj"), 
	        				  rs.getString("telefone"), 
	        				  rs.getString("descricao"), 
	        				  rs.getString("imagem"), 
	        				  rs.getString("nome"),
	        				  rs.getString("endereconumero"),
	        				  rs.getString("enderecocidade"),
	        				  rs.getString("enderecocep"),
	        				  rs.getString("enderecologradouro"),
	        				  rs.getString("enderecobairro"),
	        				  rs.getString("enderecoestado"));
	        }
	        rs.close();
	        st.close();
		} catch (SQLException e) {
			System.err.println(e.getMessage());
		}
		return bar;
	}

	// Método para obter uma lista de todos os bares
	public List<Bar> getAll() {
		return getAll("");
	}

	// Método para obter uma lista de bares ordenados por CNPJ
	public List<Bar> getOrderByCNPJ() {
		return getAll("cnpj");		
	}

	// Método para obter uma lista de bares ordenados por Nome
	public List<Bar> getOrderByNome() {
		return getAll("nome");		
	}
	
	// Método auxiliar para obter bares com ordenação
	public List<Bar> getAll(String orderBy) {
		List<Bar> bares = new ArrayList<Bar>();
		try {
			String sql = "SELECT * FROM Bar" + ((orderBy.trim().isEmpty()) ? "" : (" ORDER BY " + orderBy));
			System.out.println(sql);
			Statement st = conexao.createStatement();
			ResultSet rs = st.executeQuery(sql);	           
	        while(rs.next()) {	            	
	        	Bar b = new Bar(rs.getString("cnpj"), 
	        					rs.getString("telefone"), 
	        					rs.getString("descricao"),
	        					rs.getString("imagem"), 
	        					rs.getString("nome"), 
	        					rs.getString("endereconumero"), 
	        					rs.getString("enderecocidade"), 
	        					rs.getString("enderecocep"), 
	        					rs.getString("enderecologradouro"), 
	        					rs.getString("enderecobairro"),
	        					rs.getString("enderecoestado"));
	            bares.add(b);
	            
	        }
	        rs.close();
	        st.close();
		} catch (SQLException e) {
			System.out.println("Deu ruim aqui");
			System.err.println(e.getMessage());
		}
		return bares;
	}
	
	public List<Bar> getBarsWithProducts() throws Exception {
	    List<Bar> results = new ArrayList<Bar>();
	    Map<String, Double> cnpjMap = new TreeMap<>();
	    
	    
	    try {
	        String sql = """
	            SELECT 
	                b.cnpj AS cnpj_bar,
	                b.nome AS bar_nome,
	                p.id AS produto_id,
	                p.nome AS produto_nome,
	                p.tags AS tags,
	                p.image as imagem
	            FROM 
	                bar b
	            JOIN 
	                produto p ON p.cnpj_bar = b.cnpj
	            ORDER BY 
	                b.cnpj, 
	                p.nome
	            """;
	        
	        Statement st = conexao.createStatement();
	        ResultSet rs = st.executeQuery(sql);
	        
	        String sql2 = """ 
	        	SELECT 
	                b.cnpj AS cnpj_bar,
	                b.nome AS bar_nome,
	                p.id AS produto_id,
	                p.nome AS produto_nome,
	                p.tags AS tags
	            FROM 
	                bar b
	            JOIN 
	                bebida p ON p.cnpj_bar = b.cnpj
	            ORDER BY 
	                b.cnpj, 
	                p.nome
	        		
	        		""";
	        
	        Statement st2 = conexao.createStatement();
	        //ResultSet rs2 = st.executeQuery(sql2);
	        
	        addOrUpdateCnpj(cnpjMap, "12345678000199",0.8);
	        addOrUpdateCnpj(cnpjMap, "53504880000108",0.6);
	        addOrUpdateCnpj(cnpjMap, "98765432000188",0.5);
	        addOrUpdateCnpj(cnpjMap, "98765432000188",0.5);
	        while (rs.next()) {
	        	System.out.println(rs.getString("imagem"));
	        	ObjectMapper mapper = new ObjectMapper();
	            //JsonNode json1 = mapper.readTree(returnTags("https://rioday.com.br/site/wp-content/uploads/2023/12/como-fazer-batata-frita-seca-e-crocante-980x551.jpg"));
	            //JsonNode json2 = mapper.readTree(returnTags(rs.getString("imagem")));
	            //double similaridade = Chat.calcularSimilaridade(json1, json2);
	            
	            //addOrUpdateCnpj(cnpjMap, rs.getString("cnpj_bar"),similaridade);
	            //System.out.println("Similaridade Final: " + similaridade);
	        	System.out.println();
        
	        }
	        
	     // Ordenar pelos valores (singularidades) em ordem decrescente
	        List<Map.Entry<String, Double>> sortedList = new ArrayList<>(cnpjMap.entrySet());
	        sortedList.sort((e1, e2) -> Double.compare(e2.getValue(), e1.getValue()));
	        System.out.println("CNPJs ordenados por singularidade (decrescente):");
	        for (Map.Entry<String, Double> entry : sortedList) {
	            System.out.println("CNPJ: " + entry.getKey() + " | Singularidade: " + entry.getValue());
	            results.add(getByCNPJ(entry.getKey()));
	        }

	        rs.close();
	        //rs2.close();
	        st.close();
	        st2.close();
	    } catch (SQLException e) {
	        System.out.println("Erro ao executar consulta.");
	        System.err.println(e.getMessage());
	    }
	    return results;
	}
	
	private static void addOrUpdateCnpj(Map<String, Double> map, String cnpj, double singularidade) {
        // Atualiza somente se o novo valor for maior que o existente
        map.put(cnpj, Math.max(map.getOrDefault(cnpj, Double.MIN_VALUE), singularidade));
    }
	
	public static String returnTags(String url) throws Exception {
		String strtags = ImageAnalysis.incluirImg(url);
		return Chat.tags(strtags).toPrettyString();
	}

	// Método para atualizar um bar
	public boolean update(Bar bar) {
		boolean status = false;
		try {  
			String sql = "UPDATE Bar SET telefone = ?, descricao = ?, imagem = ?, nome = ?, endereco_numero = ?, endereco_cidade = ?, endereco_cep = ?, endereco_logradouro = ?, endereco_bairro = ? WHERE cnpj = ?";
			PreparedStatement st = conexao.prepareStatement(sql);
		    st.setString(1, bar.getTelefone());
			st.setString(2, bar.getDescricao());
			st.setString(3, bar.getImagem());
			st.setString(4, bar.getNome());
			st.setString(5, bar.getEnderecoNumero());
			st.setString(6, bar.getEnderecoCidade());
			st.setString(7, bar.getEnderecoCep());
			st.setString(8, bar.getEnderecoLogradouro());
			st.setString(9, bar.getEnderecoBairro());
			st.setString(10, bar.getCnpj());
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}

	// Método para deletar um bar
	public boolean delete(String cnpj) {
		boolean status = false;
		try {  
			String sql = "DELETE FROM Bar WHERE cnpj = ?";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.setString(1, cnpj);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
}
