package service;

import model.Bar;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import dao.BarDAO;
import dao.UsuarioDAO;
import spark.Request;
import spark.Response;

public class BarService {

    private BarDAO barDAO = new BarDAO();
    private String form;
    private final int FORM_INSERT = 1;
    private final int FORM_DETAIL = 2;
    private final int FORM_UPDATE = 3;
    private final int FORM_ORDERBY_CNPJ = 1;
    private final int FORM_ORDERBY_NOME = 2;

    public BarService() {
    }

    public boolean insert(Request request, Response response) {
        Bar bar = new Bar();
        Gson gson = new GsonBuilder().create();
        String jsonBody = request.body();
        
        List<Bar> bares = new ArrayList<Bar>();
        bares = barDAO.getOrderByCNPJ();
        System.out.println(jsonBody);
        
        
        
        JsonObject jsonObject = JsonParser.parseString(jsonBody).getAsJsonObject();
        
        // Ajustando para usar o JSON para todos os campos
        bar.setCnpj(jsonObject.get("cnpj").getAsString());  // Correção para buscar "cnpj"
        bar.setTelefone(jsonObject.get("telefone").getAsString());
        bar.setDescricao(jsonObject.get("descricao").getAsString());
        bar.setNome(jsonObject.get("name").getAsString());
        bar.setEnderecoNumero(jsonObject.get("numero").getAsString());
        bar.setEnderecoCidade(jsonObject.get("cidade").getAsString());
        bar.setEnderecoCep(jsonObject.get("cep").getAsString());
        bar.setEnderecoLogradouro(jsonObject.get("logradouro").getAsString());  // Corrigido de enderecoRua para enderecoLogradouro
        bar.setEnderecoBairro(jsonObject.get("bairro").getAsString());
        bar.setEnderecoEstado(jsonObject.get("estado").getAsString());
        bar.setImagem(jsonObject.get("imagemUrl").getAsString());
        
        
        barDAO.insert(bar);
        UsuarioDAO userUpdateBar = new UsuarioDAO();
        
        userUpdateBar.updateUsuarioComBar(request.session().attribute("usuario"), bar.getCnpj());
        request.session().attribute("usuarioBar", bar.getCnpj());
        
        return true;
    }

    public Object get(Request request, Response response) {
        String cnpj = request.params(":cnpj");
        Bar bar = barDAO.getByCNPJ(cnpj);

        if (bar != null) {
            response.status(200);
            return bar.toString();  // Retorna a string do Bar em vez de "form"
        } else {
            response.status(404);
            return "Bar (CNPJ " + cnpj + ") não encontrado!";
        }
    }
    
    public String getAllBars(Request request, Response response) {
        List<Bar> bars = barDAO.getAll(); // Busca todos os bares do banco
        Gson gson = new GsonBuilder().create(); // Inicializa o Gson para converter objetos em JSON
        String jsonResponse = gson.toJson(bars); // Converte a lista de bares para JSON
        
        response.type("application/json"); // Define o tipo de resposta como JSON
        return jsonResponse; // Retorna a lista de bares como uma string JSON
    }
    
    public String getImgBars(Request request, Response response) throws Exception {
        List<Bar> bars = barDAO.getBarsWithProducts(); // Busca todos os bares do banco
        Gson gson = new GsonBuilder().create(); // Inicializa o Gson para converter objetos em JSON
        String jsonResponse = gson.toJson(bars); // Converte a lista de bares para JSON
        
        response.type("application/json"); // Define o tipo de resposta como JSON
        return jsonResponse; // Retorna a lista de bares como uma string JSON
    }
    
    
    //public String pesquisarBar(Request request, Response response) {
    	
    	
    //}

    public Object update(Request request, Response response) {
        String cnpj = request.params(":cnpj");
        Bar bar = barDAO.getByCNPJ(cnpj);

        String resp;
        if (bar != null) {
            bar.setNome(request.queryParams("nome"));
            bar.setTelefone(request.queryParams("telefone"));
            bar.setDescricao(request.queryParams("descricao"));
            bar.setImagem(request.queryParams("imagem"));
            bar.setEnderecoNumero(request.queryParams("enderecoNumero"));
            bar.setEnderecoCidade(request.queryParams("enderecoCidade"));
            bar.setEnderecoCep(request.queryParams("enderecoCep"));
            bar.setEnderecoLogradouro(request.queryParams("enderecoLogradouro"));  // Corrigido de enderecoRua para enderecoLogradouro
            bar.setEnderecoBairro(request.queryParams("enderecoBairro"));
            bar.setEnderecoEstado(request.queryParams("enderecoEstado"));

            barDAO.update(bar);
            response.status(200);
            resp = "Bar (CNPJ " + cnpj + ") atualizado!";
        } else {
            response.status(404);
            resp = "Bar (CNPJ " + cnpj + ") não encontrado!";
        }
        return form.replaceFirst("<input type=\"hidden\" id=\"msg\" name=\"msg\" value=\"\">", 
            "<input type=\"hidden\" id=\"msg\" name=\"msg\" value=\"" + resp + "\">");
    }

    public Object delete(Request request, Response response) {
        String cnpj = request.params(":cnpj");

        String resp;
        if (barDAO.delete(cnpj)) {
            response.status(200);
            resp = "Bar (CNPJ " + cnpj + ") excluído!";
        } else {
            response.status(404);
            resp = "Bar (CNPJ " + cnpj + ") não encontrado!";
        }
        return form.replaceFirst("<input type=\"hidden\" id=\"msg\" name=\"msg\" value=\"\">", 
            "<input type=\"hidden\" id=\"msg\" name=\"msg\" value=\"" + resp + "\">");
    }
}
