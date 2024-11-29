package service;

import dao.ProdutoDAO;
import model.Produto;
import spark.Request;
import spark.Response;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import AI.Chat;
import AI.ImageAnalysis;

public class ProdutoService {

    private ProdutoDAO produtoDAO;
    private Gson gson;

    public ProdutoService() {
        this.produtoDAO = new ProdutoDAO();
        this.gson = new Gson(); // Para conversão de JSON para objetos e vice-versa
    }

    // Adicionar um produto
    public String adicionarProduto(Request req, Response res) throws Exception {
        Produto produto = gson.fromJson(req.body(), Produto.class);
        String cnpj = req.session().attribute("usuarioBar");
        
        produto.setIdBar(cnpj);
        
        String strtags = ImageAnalysis.incluirImg(produto.getImagem());
        JsonNode jsonResult = Chat.tags(strtags);
        produto.addTags(jsonResult.toPrettyString());
        produtoDAO.salvar(produto);
        System.out.println("Inserido com sucesso - Produto");
        res.status(201); // HTTP Status Created
        return gson.toJson(produto); // Retorna o produto criado em formato JSON
    }

    // Listar todos os produtos
    public String listarProdutos(Request req, Response res) {
    	String jsonBody = req.body();
        if (jsonBody == null || jsonBody.isEmpty()) {
            res.status(400); // Bad Request
            return "O corpo da requisição não pode estar vazio.";
        }

        // Parse o JSON para obter o CNPJ
        JsonObject jsonObject = JsonParser.parseString(jsonBody).getAsJsonObject();
        String cnpjBar = jsonObject.get("cnpj_bar").getAsString();
        return gson.toJson(produtoDAO.listarTodos(cnpjBar));
    }
    
    
    
    // Buscar um produto pelo ID
    public String buscarProduto(Request req, Response res) {
        int id = Integer.parseInt(req.params("id"));
        Produto produto = produtoDAO.buscarPorId(id);
        if (produto != null) {
            return gson.toJson(produto);
        } else {
            res.status(404); // HTTP Status Not Found
            return "Produto não encontrado.";
        }
    }

    // Deletar um produto pelo ID
    public String deletarProduto(Request req, Response res) {
        int id = Integer.parseInt(req.params("id"));
        boolean deletado = produtoDAO.deletar(id);
        if (deletado) {
            res.status(200); // HTTP Status OK
            return "Produto deletado com sucesso.";
        } else {
            res.status(404); // HTTP Status Not Found
            return "Produto não encontrado.";
        }
    }
}
