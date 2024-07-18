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
import { LoadingButton } from '@/components/ui/button'

export function BuyButtons(props: { product: ProductType }) {
  const [addressError, setAddressError] = useState(false)
  const [addressErrorMessage, setAddressErrorMesage] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

  const onClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisabled(true)
      setIsLoading(false)
    }, 12000)
  }

  async function handleBuyClick() {
    onClick()
    // const start1 = Date.now()
    const isPhoneVerified = await checkIfUserIsPhoneVerified()
    if (!isPhoneVerified) {
      toast({
        title: 'Error',
        description: 'Please verify your phone number first',
        action: (
          <Link href="/settings">
            <Button>go to Settings</Button>
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
        title: 'Error',
        description: 'Please verify your phone number first',
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
    <div className="mt-6 flex w-full justify-end">
      {disabled ? (
        <Button variant={"outline"} disabled onClick={handleBuyClick} type="submit">
          Interesse
        </Button>
      ) : isLoading ? (
        <LoadingButton variant={"outline"} loading={isLoading} onClick={onClick}>
          Interesse
        </LoadingButton>
      ) : (
        <Button variant={"outline"} onClick={handleBuyClick} type="submit">
          Interesse
        </Button>
      )}
      {product?.isDirectlyBuyable ? (
        <Button onClick={handleDirectBuyClick} className="ml-2" type="submit">
          Direkt Kaufen
        </Button>
      ) : null}
    </div>
  )
}
