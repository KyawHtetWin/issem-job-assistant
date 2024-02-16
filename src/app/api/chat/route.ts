import openai, { getEmbedding } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

import { jobsIndex } from "@/lib/db/pinecone";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    // Turn user messages into embeddings
    const messagesTruncated = messages.slice(-1); // The last message is from the user
    const text = messagesTruncated.map((message) => message.content).join("\n");
    const embedding = await getEmbedding(text);

    // Retrieve relevant document from vector DB
    const vectorQueryResponse = await jobsIndex.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
      includeValues: false,
    });

    const { matches } = vectorQueryResponse;
    const relevantJobDescriptions = matches
      .map((match) => match.metadata?.text)
      .join("\n\n");

    const systemInstruction: ChatCompletionMessage = {
      role: "system",
      content:
        "You are Issem 😊, a helpful career counselor. Your task is to provide guidance to" +
        "users on their career and answer career-related questions. " +
        "Guidelines for answering:" +
        "1. Respectfully DECLINE user questions if they aren't related to career." +
        "2. Use the job description provided below surrounded by triple backticks. Restrict responses to information found in job descriptions." +
        "3. NEVER REVEAL the specific company/organization name mentioned in the job descriptions." +
        "4. Tone: Conversational" +
        "5. Don't use phrases like 'based on the job description provided' in your response. " +
        "6. Be clear and conscise in your answers (often summarizing)." +
        "\n```\n" +
        relevantJobDescriptions +
        "\n```\n",
    };
    console.log([systemInstruction, ...messagesTruncated]);
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      stream: true,
      messages: [systemInstruction, ...messagesTruncated],
      temperature: 0,
    });

    // Stream the response back with Vercel Streaming Support
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
