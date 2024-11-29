package AI;

import com.azure.ai.vision.imageanalysis.*;
import com.azure.ai.vision.imageanalysis.models.*;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.*;
import java.util.Arrays;
import java.util.List;

public class ImageAnalysis {

    public static String incluirImg(String url) {

        String endpoint = System.getenv("VISION_ENDPOINT");
        String key = System.getenv("VISION_KEY");

        if (endpoint == null || key == null) {
            System.out.println("Missing environment variable 'VISION_ENDPOINT' or 'VISION_KEY'.");
            System.out.println("Set them before running this sample.");
            System.exit(1);
        }

        // Create a synchronous Image Analysis client.
        ImageAnalysisClient client = new ImageAnalysisClientBuilder()
            .endpoint(endpoint)
            .credential(new AzureKeyCredential(key))
            .buildClient();

        
        // visualFeatures: Select one or more visual features to analyze.
        List<VisualFeatures> visualFeatures = Arrays.asList(
            VisualFeatures.SMART_CROPS,
            VisualFeatures.CAPTION,
            VisualFeatures.DENSE_CAPTIONS,
            VisualFeatures.OBJECTS,
            VisualFeatures.PEOPLE,
            VisualFeatures.READ,
            VisualFeatures.TAGS);

        ImageAnalysisOptions options = new ImageAnalysisOptions()
            .setLanguage("en")
            .setGenderNeutralCaption(true)
            .setSmartCropsAspectRatios(Arrays.asList(0.9, 1.33, 1.78));

        ImageAnalysisResult result = client.analyzeFromUrl(url, visualFeatures, options);

        String analysisResult = getAnalysisResults(result);
        return analysisResult;
    }

    // Function to get analysis results as a String
    public static String getAnalysisResults(ImageAnalysisResult result) {
        StringBuilder analysisResults = new StringBuilder("Image analysis results:\n");

        if (result.getCaption() != null) {
            analysisResults.append(" Caption:\n");
            analysisResults.append("   \"").append(result.getCaption().getText()).append("\", Confidence ")
                .append(String.format("%.4f", result.getCaption().getConfidence())).append("\n");
        }

        if (result.getTags() != null) {
            analysisResults.append(" Tags:\n");
            for (DetectedTag tag : result.getTags().getValues()) {
                analysisResults.append("   \"").append(tag.getName()).append("\", Confidence ")
                    .append(String.format("%.4f", tag.getConfidence())).append("\n");
            }
        }

        // Add any other analysis results you want to include in the string here

        return analysisResults.toString();
    }
}
