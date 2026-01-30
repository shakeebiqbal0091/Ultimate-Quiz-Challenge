import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const parseGeminiResponse = (responseText: string): Question[] => {
  try {
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
};

export const generateQuizQuestions = async (topic: string, difficulty: string): Promise<Question[]> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API Key is missing.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Generate 5 multiple choice quiz questions about "${topic}" at a "${difficulty}" difficulty level.
    Return the response strictly as a JSON array of objects.
    Each object must have:
    - id: a unique number
    - question: string
    - options: an array of 4 distinct string choices
    - correctAnswer: the string value of the correct option (must be one of the options)
    
    Do not include any markdown formatting or extra text. Just the JSON array.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const questions = parseGeminiResponse(text);
    return questions;

  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};
