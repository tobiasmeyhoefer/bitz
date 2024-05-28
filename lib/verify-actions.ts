'use server'

import { users, verificationNumberSessions } from '@/schema'
import { getUser } from './useraction'
import { db } from '@/db'
import { generateRandomSixDigitNumber } from './utils'
import { desc, eq } from 'drizzle-orm'
import twilio from 'twilio'

async function saveVerifactionNumber(number: string) {
  try {
    const user = await getUser()
    await db.insert(verificationNumberSessions).values({
      verificationNumber: number,
      userId: user![0].id,
    })
  } catch (error) {
    console.log(error)
  }
}

//deletes the temporary db entry
export async function deleteVerifactionNumber() {
  try {
    const user = await getUser()
    await db
      .delete(verificationNumberSessions)
      .where(eq(verificationNumberSessions.userId, user![0].id))
  } catch (error) {
    return { error: "Something wen't wrong on the server" }
  }
}

//gets the verifiactionNumber
export async function getVerificationNumber() {
  try {
    const user = await getUser()
    const response = await db
      .select()
      .from(verificationNumberSessions)
      .where(eq(verificationNumberSessions.userId, user![0].id))
      .orderBy(desc(verificationNumberSessions.createdAt)) 
    return response[0].verificationNumber
  } catch (error) {
    return { error: "Something wen't wrong on the server" }
  }
}

//sends the sms
export async function sendSmsToUser(number: string) {
  const verificationNumber = generateRandomSixDigitNumber()

  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
    client.messages
      .create({
        body: verificationNumber + " is your verification code for bitztech.de",
        from: '+14179323791',
        to: number,
      })
      .catch((error) => {
        console.log(error)
      })
    await saveVerifactionNumber(verificationNumber)
  } catch (error) {
    return { error: "Something wen't wrong on the server" }
  }
}

//checks if the user is verified
export async function checkIfUserIsPhoneVerified() {
  const user = await getUser()
  return user![0].phoneVerified!
}

//sets the verified state for the user
export async function setVerifiedState() {
  try {
    const user = await getUser()
    await db.update(users).set({ phoneVerified: true }).where(eq(users.id, user![0].id))
  } catch (error) {
    return { error: "Something wen't wrong on the server" }
  }
}
