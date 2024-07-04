'use client'
import { Button } from '@/components/ui/button'
import { checkIfConversationAlreadyExist, createConversation } from '@/lib/conversations-actions'
import { Link, useRouter } from '@/navigation'
import { createCheckoutSession, productHasCheckoutSessionOpened } from '@/lib/stripe-actions'
import { getUser, getUserById } from '@/lib/user-actions'
import { useRouter as useRouterNext } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { ProductType } from '@/schema'
import axios from 'axios'
import { checkIfUserIsPhoneVerified } from '@/lib/verify-actions'

export function BuyButtons(props: { product: ProductType }) {
  const [addressError, setAddressError] = useState(false)
  const [addressErrorMessage, setAddressErrorMesage] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const routerNext = useRouterNext()
  const product = props.product

  useEffect(() => {
    const fetchUser = async () => {
      const conversationAlreadyExists = await checkIfConversationAlreadyExist(product.id!)
      if (conversationAlreadyExists) {
        setDisabled(true)
      }
      const user = await getUser()
      if (!user.adress) {
        setAddressError(true)
        setAddressErrorMesage('location & address gotta be set')
      }
    }
    fetchUser()
  }, [product.id])

  async function handleBuyClick() {
    const isPhoneVerified = await checkIfUserIsPhoneVerified()
    if (!isPhoneVerified) {
      toast({
        title: 'Error',
        description: 'Please verify your phone number first'
      })
      return
    }
    const seller = await getUserById(product.sellerId)
    await axios.post('/api/mail/productInterest', {
      to: seller.email,
      productName: product.title
    })
    await createConversation(product.id!)
    router.push('/conversations')
  }

  async function handleDirectBuyClick() {
    const isPhoneVerified = await checkIfUserIsPhoneVerified()
    if (!isPhoneVerified) {
      toast({
        title: 'Error',
        description: 'Please verify your phone number first'
      })
      return
    }
    if (!addressError) {
      const openedCheckoutSession = await productHasCheckoutSessionOpened(product.id!)
      if (!openedCheckoutSession) {
        const user = await getUser()
        await createCheckoutSession(user.id, product.id!)
        routerNext.push(product?.paymentLink!)
      }
    } else {
      toast({
        title: 'Error',
        action: (
          <Link href="/settings">
            <Button className="w-28">go to Settings</Button>
          </Link>
        ),
        description: addressErrorMessage,
        duration: 2200,
      })
    }
  }

  return (
    <>
      {disabled ? (
        <Button disabled onClick={handleBuyClick} type="submit" className="fixed bottom-8 right-28">
          Kaufen
        </Button>
      ) : (
        <Button onClick={handleBuyClick} type="submit" className="fixed bottom-8 right-28">
          Kaufen
        </Button>
      )}
      {product?.isDirectlyBuyable ? (
        <Button onClick={handleDirectBuyClick} className="fixed bottom-8 right-52" type="submit">
          Direkt Kaufen
        </Button>
      ) : null}
    </>
  )
}
