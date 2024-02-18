// A post request to with body containing a conversation between system and user
// Store the conversation in database
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { conversation } = body;

    if (conversation.trim().length === 0)
      return Response.json({ error: "Empty Conversation" }, { status: 400 });
    const { userId } = auth();
    if (!userId)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    // Both conversation & user are present
    const conversationMessage = await prisma.conversationMessage.create({
      data: { content: conversation, userId: userId },
    });

    return Response.json({ conversationMessage }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
