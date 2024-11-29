package service;

import dao.ComentarioDAO;
import model.Comentario;
import model.Produto;
import spark.Request;
import spark.Response;

import java.time.LocalDate;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class ComentarioService {
    private ComentarioDAO comentarioDAO;
    private Gson gson;
    
    public ComentarioService() {
        comentarioDAO = new ComentarioDAO();
        this.gson = new Gson();
    }

    // Salva um comentário
    public boolean salvarComentario(Request req, Response res) {
    	Gson gson = new GsonBuilder().create();
        String jsonBody = req.body();
    	Comentario comentario = new Comentario();
    	
    	JsonObject jsonObject = JsonParser.parseString(jsonBody).getAsJsonObject();
        
        // Ajustando para usar o JSON para todos os campos
        comentario.setComentario(jsonObject.get("texto").getAsString()); 
    	
        String cnpj = req.session().attribute("usuarioBar");
        int userId = req.session().attribute("usuario");
        
        comentario.setCnpjBar(cnpj);
        comentario.setIdUsuario(userId);
        comentario.setDate(LocalDate.now());
 
        comentarioDAO.salvar(comentario);
        return true;
    }

    // Carrega todos os comentários
    public List<Comentario> listarComentarios(String cnpjBar) throws Exception {
        if (cnpjBar == null || cnpjBar.isEmpty()) {
            throw new IllegalArgumentException("CNPJ do bar não pode ser nulo ou vazio.");
        }
        return comentarioDAO.listarComentarios(cnpjBar);
    }

}
