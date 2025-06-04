import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'
import { createPrompt, extractJsonFromMarkdown } from './utils.js'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // 환경 변수에 API 키 설정
})

export async function summarizeArticles(articles) {
  const prompt = createPrompt(articles)
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{ text: prompt }],
  })
  const summary = extractJsonFromMarkdown(response.text)

  if (!summary || !Array.isArray(summary)) {
    throw new Error('Invalid response format from Gemini AI')
  }

  return summary
}
