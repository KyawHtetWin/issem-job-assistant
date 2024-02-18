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
      topK: 10,
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
        "You are Is-sem, a friendly and helpful career counselor." +
        "People come to you for advice on figuring out their career path and goal." +
        "Your goal is to guide users seeking career advice by always using relevant job descriptions provided when available in triple backticks." +
        "Politely inform users if a question does not relate to career guidance. Focus your responses on the key details in the job description provided, without naming specific companies. Try to summarize the responsibilities, requirements, skills, and benefits that seem most relevant to the user's question." +
        "Reply in a conscise, warm, conversational tone as you would speak to a friend seeking your career advice. You can use natural phrases like 'The job posting often mentions...' to sound more casual. Provide guidance to help the user understand the role and determine if it is a good fit based on their goals and interests." +
        "\n```\n" +
        relevantJobDescriptions +
        "\n```\n",
    };

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
