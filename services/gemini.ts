import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

export const createGeminiClient = () => {
  return new GoogleGenAI({ apiKey });
};

export const generateBonusQuestion = async (): Promise<string> => {
  try {
    const ai = createGeminiClient();
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: "Bana sevgililerin birbirine sorabileceği, derin, eğlenceli ya da düşündürücü, daha önceki listelerde olmayan özgün Türkçe bir soru söyle. Sadece soruyu yaz.",
      config: {
        temperature: 0.9,
      }
    });

    return response.text?.trim() || "Birbiriniz hakkında en çok neyi merak ediyorsunuz?";
  } catch (error) {
    console.error("Error generating question:", error);
    return "Sence ilişkimizin süper gücü ne?";
  }
};
