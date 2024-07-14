"use server"

import { db } from "@/db"
import { messages } from "@/schema"
import { and, asc, desc, eq, ne } from "drizzle-orm"
import { getUser } from "./user-actions"

export async function createMessage(content: string, senderId: string, conversationId: string, isSystemMessage: boolean = false, productId: string) {
    return await db.insert(messages).values({content: content, senderId: senderId, conversationId: conversationId, isSystemMessage: isSystemMessage, productId: productId}).returning()
}

export async function getExisitingMessages(convId: string) {
    return await db.select().from(messages).where(eq(messages.conversationId, convId)).orderBy(asc(messages.timestamp))
}

export async function deleteMessageById(messageId: string) {
    await db.delete(messages).where(eq(messages.id, messageId))
}

export async function setMessagesToRead() {
    const user = await getUser()
    await db.update(messages).set({wasRead: true}).where(ne(messages.senderId, user.id))
}

export async function getUnreadMessages(convId: string) {
    const user = await getUser()
    const result = await db.select().from(messages).where(and(eq(messages.conversationId, convId), eq(messages.wasRead, false), ne(messages.senderId, user.id)))
    return result.length
}
