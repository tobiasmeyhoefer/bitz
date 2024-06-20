"use server"

import { db } from "@/db"
import { messages } from "@/schema"
import { eq } from "drizzle-orm"

export async function createMessage(content: string, senderId: string, conversationId: string, isSystemMessage: boolean = false) {
    return await db.insert(messages).values({content: content, senderId: senderId, conversationId: conversationId, isSystemMessage: isSystemMessage}).returning()
}

export async function getExisitingMessages(convId: string) {
    return await db.select().from(messages).where(eq(messages.conversationId, convId))
}

export async function deleteMessageById(messageId: string) {
    await db.delete(messages).where(eq(messages.id, messageId))
}