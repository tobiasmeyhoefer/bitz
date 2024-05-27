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

const PhoneVerification = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false)
  //wird genutzt als eine session
  const [inVerifactionProcess, setInVerifactionProcess] = useState<boolean>(false)
  const [isTypeInNumberState, setIsTypeInNumberState] = useState<boolean>(true)
  const [userTypedCode, setUserTypedCode] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      const response = await checkIfUserIsPhoneVerified()
      setIsVerified(response)
    }
    fetchData()
  }, [])


  // useEffect(() => {
  //   const logic = async () => {
  //     if(inVerifactionProcess) {
  //       setTimeout(handleCancel, 60000)
  //     } else {
  //       if(!isVerified) {
  //         await handleCancel()
  //       }
  //     }
  //   }
  //   logic()
  // }, [inVerifactionProcess])

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
        title: 'you are now verified!',
      })
    } else {
      setIsVerified(false)
      toast({
        title: 'wrong number ❌',
      })
    }
  }

  const handleCancel = async () => {
    console.log("delete called")
    await deleteVerifactionNumber()
    console.log("deletedNumber")
    toast({
      title: 'verification cancelled',
    })
  }

  const handleInputChangeNumber = (e: any) => {
    setUserNumber(e.target.value)
  }

  const handleInputChangeCode = (e: any) => {
    setUserTypedCode(e.target.value)
  }

  if (isVerified) {
    return <p>Dein Konto ist Verifizert ✅</p>
  }

  return (
    <div>
      <p className="mb-4">Dein Konto ist noch nicht verifiziert ❌</p>
      <AlertDialog>
        <AlertDialogTrigger onClick={() => {setInVerifactionProcess(true)}}>Jetzt Verifizieren</AlertDialogTrigger>
        {isTypeInNumberState ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Type in your number</AlertDialogTitle>
              <AlertDialogDescription>
                <p>use the + infront of your number</p>
                <Input
                  onChange={handleInputChangeNumber}
                  className="my-4 h-12"
                  type="tel"
                  placeholder="+49 ..."
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
              <Button onClick={sendNumberToUser}>
                {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Type in the code sent to your number</AlertDialogTitle>
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
              <Button onClick={checkCode}>Submit</Button>
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