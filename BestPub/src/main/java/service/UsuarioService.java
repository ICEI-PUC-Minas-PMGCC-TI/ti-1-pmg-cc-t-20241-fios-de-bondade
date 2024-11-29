package service;

import model.Usuario;

import com.google.gson.*;
import com.google.gson.GsonBuilder;

import java.time.LocalDate;
import dao.UsuarioDAO;
import spark.Request;
import spark.Response;
import org.mindrot.jbcrypt.BCrypt;

public class UsuarioService {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();
    private String form;

    public UsuarioService() {
    }

    public boolean insert(Request request, Response response) {
    	Gson gson = new GsonBuilder()
                .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
                .create();

        String jsonBody = request.body();
        System.out.println(jsonBody);
        JsonObject jsonObject = JsonParser.parseString(jsonBody).getAsJsonObject();
        
        Usuario usuario = new Usuario();
        
        usuario.setNome(jsonObject.get("name").getAsString());
        usuario.setEmail(jsonObject.get("email").getAsString());

        // Criptografa a senha
        String senhaCriptografada = BCrypt.hashpw(jsonObject.get("password").getAsString(), BCrypt.gensalt());
        usuario.setSenha(senhaCriptografada);
        
        UsuarioDAO.insert(usuario);
        
        return true;
    }
    public boolean login(Request request, Response response) {
        String jsonBody = request.body();
        JsonObject jsonObject = JsonParser.parseString(jsonBody).getAsJsonObject();
        
        String email = jsonObject.get("email").getAsString();
        String senha = jsonObject.get("password").getAsString();

        Usuario usuario = usuarioDAO.getByEmail(email);

        if (usuario != null && BCrypt.checkpw(senha, usuario.getSenha())) {
            request.session(true);
            request.session().attribute("usuario", usuario.getId());
            request.session().attribute("usuarioNome", usuario.getNome()); // Armazena o nome na sessão
            request.session().attribute("usuarioEmail", usuario.getEmail()); // Armazena o nome na sessão
            request.session().attribute("usuarioBar",usuario.getCNPJBar());
            System.out.println(usuario.getCNPJBar());
            response.status(200);
            return true;
        } else {
            System.out.println("Login ou senha incorretos!");
            response.status(401);
            return false;
        }
    }

    public boolean isUsuarioLogado(Request request) {
        // Verifica se há um usuário armazenado na sessão
        Integer usuarioId = request.session().attribute("usuario");

        if (usuarioId != null) {
            System.out.println("Usuário está logado com o ID: " + usuarioId);
            return true;  // Usuário está logado
        } else {
            System.out.println("Usuário não está logado.");
            return false;  // Usuário não está logado
        }
    }


    public Object get(Request request, Response response) {
        int id = Integer.parseInt(request.params(":id"));
        Usuario usuario = usuarioDAO.get(id);

        if (usuario != null) {
            response.status(200);
        } else {
            response.status(404);
        }
        return form;
    }

    public boolean update(Request request, Response response) {
    	String jsonBody = request.body();
        JsonObject jsonObject = JsonParser.parseString(jsonBody).getAsJsonObject();
        
        String nome = jsonObject.get("nome").getAsString();
        String email = jsonObject.get("email").getAsString();
        String senha = jsonObject.get("senha").getAsString();
        
        System.out.println(nome);
       
    	Integer id = request.session().attribute("usuario");
    	Usuario usuario = usuarioDAO.get(id);
    	
        // String resp;
        if (usuario != null) {
            usuario.setNome(nome);
            usuario.setEmail(email);
            usuario.setSenha(senha);
            usuarioDAO.update(usuario);
            response.status(200);
            System.out.println("Usuario (ID " + id + ") atualizado!");
            request.session().attribute("usuarioNome", usuario.getNome()); // Armazena o nome na sessão
            request.session().attribute("usuarioEmail", usuario.getEmail()); // Armazena o nome na sessão
            request.session().attribute("usuarioSenha", usuario.getSenha());
            return true;
        } else {
            response.status(404);
            System.out.println("ID " + id + ") não encontrado!");
            return false;
        }
       
    }

    public boolean delete(Request request, Response response) {
        // Verifica se o ID foi passado na URL
    	Integer id = request.session().attribute("usuario");
       

        // Chama o método para deletar o usuário
        if (usuarioDAO.delete(id)) {
            response.status(200);
            System.out.println("Usuário (ID " + id + ") excluído!");
            return true;
        } else {
            response.status(404); // Usuário não encontrado
            System.out.println("Usuário (ID " + id + ") não encontrado!");
            return false;
        }
    }

}