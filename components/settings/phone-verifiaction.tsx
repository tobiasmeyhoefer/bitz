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
    })
  }

  const checkCode = async () => {
    const number = await getVerificationNumber()
    if (number === userTypedCode) {
      setIsVerified(true)
      await setVerifiedState()
      await deleteVerifactionNumber()
      toast({
        title: translations.notVerified,
      })
    } else {
      setIsVerified(false)
      toast({
        title: '{translations.wrongNumber} ❌',
      })
    }
  }

  const handleCancel = async () => {
    await deleteVerifactionNumber()
    toast({
      title: translations.verificationAborted,
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
      <p className="mb-4">{translations.notVerified} ❌</p>
      <AlertDialog>
        <AlertDialogTrigger
          asChild
          onClick={() => {
            setInVerifactionProcess(true)
          }}
        >
          <Button>{translations.verifyNow}</Button>
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
                {/* <AlertDialogAction>Continue</AlertDialogAction> */}
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
              {/* <AlertDialogAction>Continue</AlertDialogAction> */}
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
