import { GoogleGenAI } from '@google/genai';

const apiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY ||
  process.env.GOOGLE_GENAI_API_KEY ||
  '';

let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn('Failed to initialize GoogleGenAI client:', e);
  }
}

/**
 * Dimension for Google text-embedding-004
 */
export const EMBEDDING_DIMENSION = 768;

/**
 * Deterministic pseudo-embedding generator used when no API key is set
 * or as a fallback for offline resilience. Produces a normalized 768-dim vector.
 */
function generateFallbackEmbedding(text: string, dimension = EMBEDDING_DIMENSION): number[] {
  const vector = new Array(dimension).fill(0);
  const clean = text.toLowerCase().trim();

  for (let i = 0; i < clean.length; i++) {
    const code = clean.charCodeAt(i);
    const index = (code * 31 + i * 17) % dimension;
    vector[index] += 1 / (1 + (i % 7));
  }

  // Normalize to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0)) || 1;
  return vector.map((val) => Number((val / magnitude).toFixed(6)));
}

/**
 * Generates a 768-dimensional vector embedding for a given text prompt.
 * Uses Google GenAI (text-embedding-004) or normalized fallback.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const cleanText = text.trim();
  if (!cleanText) {
    return new Array(EMBEDDING_DIMENSION).fill(0);
  }

  if (aiClient) {
    try {
      const response = await aiClient.models.embedContent({
        model: 'text-embedding-004',
        contents: cleanText,
      });

      if (response.embeddings && response.embeddings.length > 0 && response.embeddings[0].values) {
        return response.embeddings[0].values;
      }
    } catch (error) {
      console.warn('⚠️ Google GenAI embedContent call failed, using deterministic fallback vector:', error);
    }
  }

  return generateFallbackEmbedding(cleanText, EMBEDDING_DIMENSION);
}

export const generateProductEmbedding = generateEmbedding;

/**
 * Helper to convert an array of numbers into a PostgreSQL pgvector string format: [0.1,0.2,...]
 */
export function formatVectorForPg(vector: number[]): string {
  return `[${vector.join(',')}]`;
}
