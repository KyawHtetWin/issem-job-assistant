import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw Error("OPEN AI API KEY NOT LOADED FROM ENVIRONMENT");

const openai = new OpenAI({ apiKey });

export default openai;
