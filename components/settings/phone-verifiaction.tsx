/**
 * The `PhoneVerification` component is responsible for handling the phone verification process for a user.
 * It allows the user to enter their phone number, receive a verification code via SMS, and then enter the code to verify their phone number.
 * The component also checks if the user is already verified and displays the appropriate message.
 *
 * @param translations - An object containing localized strings for various UI elements.
 * @returns A React component that renders the phone verification UI.
 */
'use client'

import {
  checkIfUserIsPhoneVerified,
  deleteVerifactionNumber,
  getVerificationNumber,
  sendSmsToUser,
  setVerifiedState,
} from '@/lib/verify-actions'
import { Button } from '../ui/button'
import { SetStateAction, useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { formatPhoneNumber } from '@/lib/utils'
import axios from 'axios'
import { getUser } from '@/lib/user-actions'

interface VerificationProps {
  translations: {
    notVerified: string
    verified: string
    wrongNumber: string
    verificationAborted: string
    verifyNow: string
    typeInNumber: string
    numberNotice: string
    continue: string
    enterCode: string
    cancel: string
    submit: string
  }
}

const PhoneVerification = ({ translations }: VerificationProps) => {
  const [isVerified, setIsVerified] = useState<boolean>(false)
  //wird genutzt als eine session
  const [inVerifactionProcess, setInVerifactionProcess] = useState<boolean>(false)
  const [isTypeInNumberState, setIsTypeInNumberState] = useState<boolean>(true)
  const [userTypedCode, setUserTypedCode] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      const isVerified = await checkIfUserIsPhoneVerified()
      if (!isVerified) {
        await deleteVerifactionNumber()
      }
      setIsVerified(isVerified)
    }
    fetchData()
  }, [])

  const sendNumberToUser = async () => {
    setIsTypeInNumberState(false)
    const formattedNumber = formatPhoneNumber(userNumber)
    await sendSmsToUser(formattedNumber)
    toast({
      title: 'SMS sent to: ' + formattedNumber,
      duration: 2000,
    })
  }

  const checkCode = async () => {
    const number = await getVerificationNumber()
    if (number === userTypedCode) {
      setIsVerified(true)
      await setVerifiedState()
      await deleteVerifactionNumber()
      const currentUser = await getUser()
      await axios.post('https://bitztech.de/api/mail/accountVerified', {
        to: currentUser.email,
      })
      toast({
        title: translations.verified,
        duration: 2000,
      })
    } else {
      setIsVerified(false)
      toast({
        title: '{translations.wrongNumber} ❌',
        duration: 2000,
      })
    }
  }

  const handleCancel = async () => {
    await deleteVerifactionNumber()
    toast({
      title: translations.verificationAborted,
      duration: 2000,
    })
  }

  const handleInputChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNumber(e.target.value)
  }

  const handleInputChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserTypedCode(e.target.value)
  }

  if (isVerified) {
    return <p>{translations.verified} ✅</p>
  }

  return (
    <div>
      <p className="mb-4">{translations.notVerified}</p>
      <AlertDialog>
        <AlertDialogTrigger
          asChild
          onClick={() => {
            setInVerifactionProcess(true)
          }}
        >
          <Button className="mb-6 w-full">{translations.verifyNow}</Button>
        </AlertDialogTrigger>
        {isTypeInNumberState ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{translations.typeInNumber}</AlertDialogTitle>
              <AlertDialogDescription>
                <p>{translations.numberNotice}</p>
                <Input
                  onChange={handleInputChangeNumber}
                  className="my-4 h-12"
                  type="tel"
                  placeholder="+49 ..."
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>{translations.cancel}</AlertDialogCancel>
              <Button onClick={sendNumberToUser}>
                {translations.continue}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{translations.enterCode}</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  onChange={handleInputChangeCode}
                  className="my-4 h-12"
                  type="number"
                  placeholder="your verifaction code"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
              <Button onClick={checkCode}>{translations.submit}</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  )
}

export default PhoneVerification

/*
LOGIK:

Klick auf verifizieren, 
*/
