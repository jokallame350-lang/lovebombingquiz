import { GoogleGenAI } from "@google/genai";

// Vite config içindeki define ayarı sayesinde process.env burada çalışır
const apiKey = process.env.API_KEY || '';

export const createGeminiClient = () => {
  return new GoogleGenAI({ apiKey });
};

export const generateBonusQuestion = async (): Promise<string> => {
  try {
    const ai = createGeminiClient();
    // Model ismini güncel SDK standardına göre teyit edin, genellikle 'gemini-1.5-flash' kullanılır
    // Ancak 2.5-flash şu an deneysel/yeni ise kalabilir. Hata alırsanız 'gemini-1.5-flash' yapın.
    const modelId = 'gemini-2.0-flash-exp'; // Güncel model ID'si (veya gemini-1.5-flash)
    
    const model = ai.getGenerativeModel({ model: modelId });
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: "Bana sevgililerin birbirine sorabileceği, derin, eğlenceli ya da düşündürücü, daha önceki listelerde olmayan özgün Türkçe bir soru söyle. Sadece soruyu yaz." }] }],
      generationConfig: {
        temperature: 0.9,
      }
    });

    const responseText = result.response.text();
    return responseText?.trim() || "Birbiriniz hakkında en çok neyi merak ediyorsunuz?";
  } catch (error) {
    console.error("Error generating question:", error);
    return "Sence ilişkimizin süper gücü ne?";
  }
};
