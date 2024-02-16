import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw Error("OPEN AI API KEY NOT LOADED FROM ENVIRONMENT");

const openai = new OpenAI({ apiKey });

export default openai;

// Create Vector Embedding
export async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const embedding = response.data[0].embedding;
  if (!embedding) throw Error("Error Generating Embedding");
  return embedding;
}
