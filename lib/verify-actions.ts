"use server"

import { users, verificationNumberSessions } from '@/schema'
import { getUser } from './useraction'
import { db } from '@/db'
import { generateRandomSixDigitNumber } from './utils'
import { eq } from 'drizzle-orm'
import twilio from "twilio";

async function saveVerifactionNumber(number: string) {
  const user = await getUser()
  await db.insert(verificationNumberSessions).values({
    verificationNumber: number,
    userId: user![0].id,
  })
}

//deletes the temporary db entry
export async function deleteVerifactionNumber() {
  const user = await getUser()
  await db
    .delete(verificationNumberSessions)
    .where(eq(verificationNumberSessions.userId, user![0].id))
}

//gets the verifiactionNumber
export async function getVerificationNumber(): Promise<string> {
  const user = await getUser()
  const response = await db
    .select()
    .from(verificationNumberSessions)
    .where(eq(verificationNumberSessions.userId, user![0].id))
  return response[0].verificationNumber
}

//sends the sms
export async function sendSmsToUser(number: string) {
  const verificationNumber = generateRandomSixDigitNumber()
  console.log(process.env.TWILIO_ACCOUNT_SID!)

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!,
  )
  client.messages.create({
    body: verificationNumber,
    from: '+14179323791',
    to: number,
  }).catch(() => {
    return "error"
  })
  await saveVerifactionNumber(verificationNumber)
}

//checks if the user is verified
export async function checkIfUserIsPhoneVerified(): Promise<boolean> {
    const user = await getUser()
    return user![0].phoneVerified!
  }

//sets the verified state for the user
export async function setVerifiedState() {
  const user = await getUser()
  await db.update(users).set({ phoneVerified: true }).where(eq(users.id, user![0].id))
}
