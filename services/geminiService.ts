import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `You are Moya Sassa, a friendly and helpful AI assistant for South Africans regarding SASSA (South African Social Security Agency) grants. 
Your goal is to assist users with the SRD R350/R370 grant, Child Support Grant, Old Age Pension, and Disability Grant.
- Be concise and easy to understand (mobile-friendly).
- If asked, translate or speak in Zulu, Xhosa, or Afrikaans.
- Provide accurate general info about payment dates, application status processes, and appeals.
- Do NOT ask for real personal banking details (PINs). ID numbers are okay for 'checking status' simulation context only if the user offers it, but remind them this is an AI.
- Tone: Helpful, empathetic, community-focused.`;

export const sendMessageToGemini = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't understand that. Please try again.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Network error. Please check your connection and try again.";
  }
};

export const generateSpeech = async (text: string): Promise<ArrayBuffer | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore has a nice neutral tone
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;

    // Decode Base64 to ArrayBuffer
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};