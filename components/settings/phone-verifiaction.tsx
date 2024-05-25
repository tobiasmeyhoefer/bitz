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

const PhoneVerification = () => {
  //check if user is already verifcated, if yes just show that
  // const isVerified = await checkIfUserIsPhoneVerified()

  const [isVerified, setIsVerified] = useState<boolean>(false)
  //   const [inVerifactionProcess, setInVerifactionProcess] = useState<boolean>(false)
  const [isTypeInNumberState, setIsTypeInNumberState] = useState<boolean>(true)
  const [userTypedCode, setUserTypedCode] = useState('')
  const [userNumber, setUserNumber] = useState('')
  //   const [isTypeInCodeState, setisTypeInCodeState] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await checkIfUserIsPhoneVerified()
      setIsVerified(response)
    }
    fetchData()
  }, [])

  const sendNumberToUser = async () => {
    setIsTypeInNumberState(false)
    await sendSmsToUser(userNumber)
  }

  const checkCode = async () => {
    const number = await getVerificationNumber()
    if (number === userTypedCode) {
      setIsVerified(true)
      await setVerifiedState()
      await deleteVerifactionNumber()
    } else {
      setIsVerified(false)
    }
  }

  const handleCancel = async () => {
    await deleteVerifactionNumber()
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
        <AlertDialogTrigger>Jetzt Verifizieren</AlertDialogTrigger>
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