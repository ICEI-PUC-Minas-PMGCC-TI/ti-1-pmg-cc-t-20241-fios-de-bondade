package service;

import dao.BebidaDAO;
import model.Bebida;
import spark.Request;
import spark.Response;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import AI.Chat;
import AI.ImageAnalysis;

public class BebidaService {

    private BebidaDAO bebidaDAO;
    private Gson gson;

    public BebidaService() {
        this.bebidaDAO = new BebidaDAO();
        this.gson = new Gson(); // Para conversão JSON
    }

    // Adicionar uma bebida
    public String adicionarBebida(Request req, Response res) throws Exception {
        // Converte o JSON recebido para o objeto Bebida
        Bebida bebida = gson.fromJson(req.body(), Bebida.class);
        String cnpj = req.session().attribute("usuarioBar");
        bebida.setcnpj_bar(cnpj);
        
        String strtags = ImageAnalysis.incluirImg(bebida.getImagem());
        JsonNode jsonResult = Chat.tags(strtags);
        bebida.addTags(jsonResult.toPrettyString());
        
        
        bebidaDAO.salvar(bebida);
        System.out.println("Inserido com sucesso - Bebida");
        res.status(201); // HTTP Status Created
        return gson.toJson(bebida); // Retorna a bebida criada em formato JSON
    }
    public String listarBebidas(Request req, Response res) {
    	String jsonBody = req.body();
        if (jsonBody == null || jsonBody.isEmpty()) {
            res.status(400); // Bad Request
            return "O corpo da requisição não pode estar vazio.";
        }

        // Parse o JSON para obter o CNPJ
        JsonObject jsonObject = JsonParser.parseString(jsonBody).getAsJsonObject();
        String cnpjBar = jsonObject.get("cnpj_bar").getAsString();
        return gson.toJson(bebidaDAO.listarTodos("cnpj_bar"));
    }
}
