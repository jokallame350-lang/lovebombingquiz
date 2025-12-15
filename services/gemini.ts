import { GoogleGenerativeAI } from "@google/generative-ai";

// Vite config içindeki define ayarı sayesinde process.env burada çalışır
const apiKey = process.env.API_KEY || '';

export const createGeminiClient = () => {
  return new GoogleGenerativeAI(apiKey);
};

export const generateBonusQuestion = async (): Promise<string> => {
  try {
    const genAI = createGeminiClient();
    
    // Web SDK için doğru model çağırma yöntemi budur
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: "Bana sevgililerin birbirine sorabileceği, derin, eğlenceli ya da düşündürücü, daha önceki listelerde olmayan özgün Türkçe bir soru söyle. Sadece soruyu yaz." }] }],
      generationConfig: {
        temperature: 0.9,
      }
    });

    const response = await result.response;
    const text = response.text();
    return text?.trim() || "Birbiriniz hakkında en çok neyi merak ediyorsunuz?";
  } catch (error) {
    console.error("Error generating question:", error);
    return "Sence ilişkimizin süper gücü ne?";
  }
};
