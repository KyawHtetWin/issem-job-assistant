import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;
if (!apiKey) throw Error("PINECONE API KEY NOT FOUND");

const pinecone = new Pinecone({ apiKey: apiKey });

export const jobsIndex = pinecone.Index("issem-study-assistance");
