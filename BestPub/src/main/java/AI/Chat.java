package AI;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.ChatChoice;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatMessage;
import com.azure.ai.openai.models.ChatRole;
import com.azure.core.credential.AzureKeyCredential;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Chat {
    public static JsonNode tags(String strtags) throws Exception {
        // Recuperar ponto de extremidade e chave da API de variáveis de ambiente
        String endpoint = System.getenv("AZURE_OPENAI_ENDPOINT");
        String apiKey = System.getenv("AZURE_OPENAI_API_KEY");
        String deploymentName = "gpt-4-32k";

        if (endpoint == null || apiKey == null) {
            throw new RuntimeException("Por favor, configure as variáveis de ambiente AZURE_OPENAI_ENDPOINT e AZURE_OPENAI_API_KEY.");
        }

        // Inicializar o cliente OpenAI com AzureKeyCredential
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(apiKey))
                .buildClient();

        // Criar a mensagem do prompt
        List<ChatMessage> prompts = new ArrayList<>();
        ChatMessage prompt = new ChatMessage(ChatRole.USER, """
                Transforme o texto abaixo em um JSON com o formato:
                {
                  "caption": <caption>,
                  "confidence": <confidence>,
                  "tags": [
                    { "nome": <tag>, "confianca": <confidence> }
                  ]
                }
                Mantendo somente as informações mais relevantes, ou seja somente as tags mais relvantes para a especificacao do produto, nao deixe o json muito longo
                """);
        prompts.add(prompt);
        
        prompt = new ChatMessage(ChatRole.USER,strtags);
        prompts.add(prompt);
        
        
        // Configurar as opções de completions
        ChatCompletionsOptions options = new ChatCompletionsOptions(prompts)
                .setMaxTokens(800)
                .setTemperature(0.7)
                .setTopP(0.95)
                .setPresencePenalty(0.0)
                .setStream(false);

        // Enviar o pedido para a API
        ChatCompletions chatCompletions = client.getChatCompletions(deploymentName, options);

        // Capturar a resposta
        String content = chatCompletions.getChoices()
                .stream()
                .findFirst()
                .map(choice -> choice.getMessage().getContent())
                .orElseThrow(() -> new RuntimeException("Nenhuma resposta recebida do modelo."));

        // Converter o JSON retornado em um JsonNode
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(content);
    }
    
    public static double calcularSimilaridade(JsonNode json1, JsonNode json2) {
        // Extrair as tags
        List<String> tags1 = new ArrayList<>();
        List<String> tags2 = new ArrayList<>();

        if (json1.has("tags")) {
            for (JsonNode tag : json1.get("tags")) {
                tags1.add(tag.get("nome").asText());
            }
        }

        if (json2.has("tags")) {
            for (JsonNode tag : json2.get("tags")) {
                tags2.add(tag.get("nome").asText());
            }
        }

        // Similaridade de Jaccard para as tags
        Set<String> set1 = new HashSet<>(tags1);
        Set<String> set2 = new HashSet<>(tags2);
        Set<String> intersecao = new HashSet<>(set1);
        intersecao.retainAll(set2);
        Set<String> uniao = new HashSet<>(set1);
        uniao.addAll(set2);

        double similaridadeTags = (double) intersecao.size() / uniao.size();

        // Similaridade média das confianças
        Map<String, Double> confMap1 = new HashMap<>();
        Map<String, Double> confMap2 = new HashMap<>();

        if (json1.has("tags")) {
            for (JsonNode tag : json1.get("tags")) {
                confMap1.put(tag.get("nome").asText(), tag.get("confianca").asDouble());
            }
        }

        if (json2.has("tags")) {
            for (JsonNode tag : json2.get("tags")) {
                confMap2.put(tag.get("nome").asText(), tag.get("confianca").asDouble());
            }
        }

        double somaSimilaridadeConfianca = 0;
        for (String tag : intersecao) {
            double conf1 = confMap1.getOrDefault(tag, 0.0);
            double conf2 = confMap2.getOrDefault(tag, 0.0);
            somaSimilaridadeConfianca += 1 - Math.abs(conf1 - conf2);
        }

        double similaridadeConfianca = intersecao.size() > 0
                ? somaSimilaridadeConfianca / intersecao.size()
                : 0;

        // Similaridade do caption usando distância de Levenshtein
        String caption1 = json1.has("caption") ? json1.get("caption").asText() : "";
        String caption2 = json2.has("caption") ? json2.get("caption").asText() : "";
        double similaridadeCaption = calcularSimilaridadeTexto(caption1, caption2);

        // Pesos para a combinação final
        double pesoTags = 0.4;
        double pesoConfianca = 0.4;
        double pesoCaption = 0.2;

        // Similaridade final combinada
        double similaridadeFinal = (similaridadeTags * pesoTags)
                + (similaridadeConfianca * pesoConfianca)
                + (similaridadeCaption * pesoCaption);

        // Garantir que o retorno esteja entre 0 e 1
        return Math.min(Math.max(similaridadeFinal, 0), 1);
    }

    public static double calcularSimilaridadeTexto(String str1, String str2) {
        int distancia = calcularDistanciaLevenshtein(str1.toLowerCase(), str2.toLowerCase());
        int comprimentoMax = Math.max(str1.length(), str2.length());
        return comprimentoMax == 0 ? 1.0 : 1.0 - (double) distancia / comprimentoMax;
    }

    public static int calcularDistanciaLevenshtein(String a, String b) {
        int[][] dp = new int[a.length() + 1][b.length() + 1];

        for (int i = 0; i <= a.length(); i++) {
            for (int j = 0; j <= b.length(); j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else {
                    int custo = a.charAt(i - 1) == b.charAt(j - 1) ? 0 : 1;
                    dp[i][j] = Math.min(dp[i - 1][j - 1] + custo,
                            Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1));
                }
            }
        }
        return dp[a.length()][b.length()];
    }

    public static void main(String[] args) throws Exception {
        String json1Str = """
            {
                "tags": [
                    {"nome": "beverage", "confianca": 0.9877},
                    {"nome": "food", "confianca": 0.9874},
                    {"nome": "alcohol", "confianca": 0.9866}
                ],
                "caption": "a bottle of wine with a white label",
                "confidence": 0.8269
            }
        """;

        String json2Str = """
            {
                "tags": [
                    {"nome": "beverage", "confianca": 0.9877},
                    {"nome": "food", "confianca": 0.9874},
                    {"nome": "alcohol", "confianca": 0.9866}
                ],
                "caption": "a bottle of wine with a white label",
                "confidence": 0.8269
            }
        """;

        ObjectMapper mapper = new ObjectMapper();
        JsonNode json1 = mapper.readTree(json1Str);
        JsonNode json2 = mapper.readTree(json2Str);

        double similaridade = calcularSimilaridade(json1, json2);
        System.out.println("Similaridade Final: " + similaridade);
        //System.out.println(ImageAnalysis.incluirImg("https://i.ibb.co/FHpkpb6/blodmary.jpg"));
    }
    
}
