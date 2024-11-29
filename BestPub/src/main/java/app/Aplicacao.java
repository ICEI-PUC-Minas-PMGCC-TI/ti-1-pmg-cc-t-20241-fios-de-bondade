package app;

import static spark.Spark.*;

import java.time.LocalDate;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import model.Comentario;
import service.ComentarioService;
import service.BarService;
import service.BebidaService;
import service.ProdutoService;
import service.UsuarioService;
import spark.Request;

public class Aplicacao {
    
    private static UsuarioService usuarioservice = new UsuarioService();
    private static BarService barservice = new BarService();
    private static ProdutoService produtoservice = new ProdutoService();
    private static BebidaService bebidaservice = new BebidaService();
    private static ComentarioService comentarioservice = new ComentarioService();
    public static void main(String[] args) {
        port(6789);
        staticFiles.externalLocation("src/main/resources/public");
        
        // Redireciona para a página de login
        get("/", (req, res) -> {
            res.redirect("/src/views/login.html");
            return null;
        });
        
        // Rota de exemplo que executa código e depois redireciona para a página home
        get("/home", (req, res) -> {
        	if(isUsuarioLogado(req)) {
        		 Integer usuarioId = req.session().attribute("usuario");
        		 res.redirect("/src/views/home.html");
                
        	}else {
        		res.redirect("/src/views/login.html");
        	}	
            return null;
        });

        post("/inserir", (req, res) -> {
            usuarioservice.insert(req, res);
            return null;
        });

        post("/login", (req, res) -> {
        	if(usuarioservice.login(req, res)) {
        		res.redirect("/src/views/home.html"); //Esta redirecionando no js, aqui deu ruim 
        		
        	}else {
                System.out.println("Login falhou.");
            }
            return res;
        });
        
        
        get("/usuario/nome", (req, res) -> {
            String nome = req.session().attribute("usuarioNome");
            if (nome != null) {
                return nome; // Retorna o nome do usuário logado
            } else {
                res.status(401); // Se não houver usuário logado, retorna um status 401
                System.out.println("Usuário não está logado");
                return "Usuário não está logado";
            }
        });

        get("/usuario/email", (req, res) -> {
            String email = req.session().attribute("usuarioEmail");
            if (email != null) {
                return email; // Retorna o email do usuário logado
            } else {
                res.status(401); // Se não houver usuário logado, retorna um status 401
                System.out.println("Usuário não está logado");
                return "Usuário não está logado";
            }
        });

        get("/usuario/senha", (req, res) -> {
            String senha = req.session().attribute("usuarioSenha");
            if (senha != null) {
                return senha; // Retorna o senha do usuário logado
            } else {
                res.status(401); // Se não houver usuário logado, retorna um status 401
                System.out.println("Usuário não está logado");
                return "Usuário não está logado";
            }
        });
        
        get("/usuario/bar", (req, res) -> {
            String cnpjBar = req.session().attribute("usuarioBar");
            if (cnpjBar != null) {
                return cnpjBar; // Retorna o CNPJ do bar associado ao usuário logado
            } else {
                res.status(401); // Retorna erro 401 se não houver usuário ou bar associado
                System.out.println("Usuário não está logado ou não possui um bar associado.");
                return "Usuário não está logado ou não possui um bar associado.";
            }
        });

        
        put("/usuario/atualizar", (req, res) -> {
            UsuarioService usuarioService = new UsuarioService();
            return usuarioService.update(req, res);
        });
        delete("/usuario/delete", (request, response) -> {
            boolean sucesso = usuarioservice.delete(request, response);
            if (sucesso) {
                return "Usuário excluído com sucesso!";
            } else {
                response.status(404);
                return "Usuário não encontrado.";
            }
        });
        
        //Bar requets
        
        post("/inserir/bar", (req, res) -> {
        	if(barservice.insert(req, res)) {
        		System.out.print("Bar inserido");
        		res.redirect("/src/views/cardapio.html");
        	}
            return null;
        });
        
        get("/bars", (request, response) -> {
            return barservice.getAllBars(request, response); 
        });
        
        get("/bars/imagem", (request, response) -> {
            return barservice.getImgBars(request, response); 
        });
        
        //produtos e bebidas
       
     // Inserir um novo produto
        post("/inserir/produtos", (req, res) -> {
            return produtoservice.adicionarProduto(req, res);
        });

        // Listar tsodos os produtos
        post("/listar/produtos", (req, res) -> {
        	System.out.println(produtoservice.listarProdutos(req, res));
            return produtoservice.listarProdutos(req, res);
        });
        
        /*
        // Atualizar um produto existente
        put("/atualizar/produto/:id", (req, res) -> {
            return produtoservice.atualizarProduto(req, res);
        });

        // Deletar um produto por ID
        delete("/deletar/produto/:id", (req, res) -> {
            return produtoservice.deletarProduto(req, res);
        });
        */
        
     // Inserir uma nova bebida
        post("/inserir/bebida", (req, res) -> {
            return bebidaservice.adicionarBebida(req, res);
        });
         
        
        
        // Listar todas as bebidas
       
        post("/listar/bebidas", (req, res) -> {
        	//.out.println("Chamou");
            return bebidaservice.listarBebidas(req, res);
        });
        
        get("/lista/bebidas-bar", (req, res) -> {
            return bebidaservice.listarBebidas(req, res);
        });
        /*
        // Buscar uma bebida por ID
        get("/bebida/:id", (req, res) -> {
            return bebidaservice.buscarBebidaPorId(req, res);
        });

        // Atualizar uma bebida existente
        put("/atualizar/bebida/:id", (req, res) -> {
            return bebidaservice.atualizarBebida(req, res);
        });

        // Deletar uma bebida por ID
        delete("/deletar/bebida/:id", (req, res) -> {
            return bebidaservice.deletarBebida(req, res);
        });
	*/
       
        post("/procurar-bares",(req, res) -> {
            return bebidaservice.adicionarBebida(req, res);
        });
        
        // Rota para enviar um comentário
        post("/inserir/comentario", (req, res) -> {
            return comentarioservice.salvarComentario(req,res);
        });


        post("/comentarios", (req, res) -> {
                // Lê o corpo da requisição como JSON
                String jsonBody = req.body();
                if (jsonBody == null || jsonBody.isEmpty()) {
                    res.status(400); // Bad Request
                    return "O corpo da requisição não pode estar vazio.";
                }

                // Parse o JSON para obter o CNPJ
                JsonObject jsonObject = JsonParser.parseString(jsonBody).getAsJsonObject();
                String cnpjBar = jsonObject.get("cnpj_bar").getAsString();

                // Validação do CNPJ
                if (cnpjBar == null || cnpjBar.isEmpty()) {
                    res.status(400); // Bad Request
                    return "O parâmetro 'cnpj_bar' é obrigatório.";
                }

                // Carrega os comentários do bar
                List<Comentario> comentarios = comentarioservice.listarComentarios(cnpjBar);

                // Verifica se foram encontrados comentários
                if (comentarios == null || comentarios.isEmpty()) {
                    res.status(404); // Not Found
                    return "Nenhum comentário encontrado para este bar.";
                }

                // Retorna os comentários em formato JSON
                res.type("application/json");
                Gson gson = new GsonBuilder()
                        .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
                        .create(); // Inicializa o Gson para converter objetos em JSON
                String jsonResponse = gson.toJson(comentarios); // Converte a lista de bares para JSON
                
                //System.out.println(jsonResponse);
                return jsonResponse;
        });

    }
    private static boolean isUsuarioLogado(Request request) {
        Integer usuarioId = request.session().attribute("usuario");  // Verifica se o ID do usuário está na sessão
        return usuarioId != null;  // Retorna true se o usuário estiver logado
    }
}

