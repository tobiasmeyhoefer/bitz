/**
 * The `BuyButtons` component renders buttons for buying a product, either through a conversation or a direct checkout session.
 *
 * The component checks if the user has an existing conversation for the product, and if so, disables the "Buy" button. It also checks if the user has a valid address set, and if not, displays an error message.
 *
 * When the "Buy" button is clicked, the component creates a new conversation for the product and redirects the user to the conversations page. When the "Direct Buy" button is clicked, the component checks if the user has a valid address and if a checkout session has already been opened for the product. If not, it creates a new checkout session and redirects the user to the payment link.
 *
 * The component uses various helper functions from the `@/lib/conversations-actions`, `@/lib/stripe-actions`, `@/lib/user-actions`, and `@/lib/verify-actions` modules to perform these actions.
 *
 * @param props - An object containing the `product` prop, which is of type `ProductType`.
 * @returns A React component that renders the buy buttons for the product.
 */
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

  type translations = {
    interest: string
    directBuy: string
    error: string
    verifyPhoneNumber: string
    goToSettings: string
    addressError: string
}
  
export function BuyButtons(props: { product: ProductType; translations: any }) {
  const [addressError, setAddressError] = useState(false)
  const [addressErrorMessage, setAddressErrorMesage] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const routerNext = useRouterNext()
  const product = props.product
  const translations = props.translations

  useEffect(() => {
    const fetchUser = async () => {
      const conversationAlreadyExists = await checkIfConversationAlreadyExist(product.id!)
      if (conversationAlreadyExists) {
        setDisabled(true)
      }
      const user = await getUser()
      if (!user.adress) {
        setAddressError(true)
        setAddressErrorMesage(translations.addressError)
      }
    }
    fetchUser()
  }, [product.id, translations])

  async function handleBuyClick() {
    setDisabled(true)
    const isPhoneVerified = await checkIfUserIsPhoneVerified()
    if (!isPhoneVerified) {
      toast({
        title: translations.errorTitle,
        description: translations.verifyPhoneError,
        action: (
          <Link href="/settings">
            <Button>{translations.goToSettings}</Button>
          </Link>
        ),
      })
      return
    }
    const seller = await getUserById(product.sellerId)
    await createConversation(product.id!)
    setDisabled(false)
    router.push('/conversations')
    await axios.post('/api/mail/productInterest', {
      to: seller.email,
      productName: product.title,
    })
  }

  async function handleDirectBuyClick() {
    const isPhoneVerified = await checkIfUserIsPhoneVerified()
    if (!isPhoneVerified) {
      toast({
        title: translations.errorTitle,
        description: translations.verifyPhoneError,
        duration: 2000,
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
        title: translations.errorTitle,
        action: (
          <Link href="/settings">
            <Button className="w-28">{translations.goToSettings}</Button>
          </Link>
        ),
        description: addressErrorMessage,
        duration: 2200,
      })
    }
  }

  return (
    <div className="mt-6 flex w-full justify-end">
      {disabled ? (
        <Button disabled onClick={handleBuyClick} type="submit">
          {translations.interest}
        </Button>
      ) : (
        <Button onClick={handleBuyClick} type="submit">
          {translations.interest}
        </Button>
      )}
      {product?.isDirectlyBuyable ? (
        <Button onClick={handleDirectBuyClick} className="ml-2" type="submit">
          {translations.directBuy}
        </Button>
      ) : null}
    </div>
  )
}
