"use server"

import { db } from "@/db"
import { messages } from "@/schema"
import { eq } from "drizzle-orm"

export async function createMessage(content: string, senderId: string, conversationId: string) {
    return await db.insert(messages).values({content: content, senderId: senderId, conversationId: conversationId}).returning()
}

export async function getExisitingMessages(convId: string) {
    return await db.select().from(messages).where(eq(messages.conversationId, convId))
}