'use client'
import { ProductType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { checkIfConversationAlreadyExist, createConversation } from '@/lib/conversations-actions'
import { Link, redirect, useRouter } from '@/navigation'
import { revalidatePath } from 'next/cache'
import { createCheckoutSession, productHasCheckoutSessionOpened } from '@/lib/stripe-actions'
import { getUser } from '@/lib/useraction'
import { redirect as red } from 'next/navigation'
import { useRouter as useRouterNext } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { getProductById } from '@/lib/productaction'

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
      const result = await getUser()
      const user = result[0]
      if (!user.adress) {
        setAddressError(true)
        setAddressErrorMesage('location & address gotta be set')
      }
    }
    fetchUser()
  }, [])

  async function handleBuyClick() {
    await createConversation(product.id!)
    router.push('/conversations')
  }

  async function handleDirectBuyClick() {
    if (!addressError) {
      const openedCheckoutSession = await productHasCheckoutSessionOpened(product.id!)
      if (!openedCheckoutSession) {
        const user = await getUser()
        await createCheckoutSession(user![0].id, product.id!)
        console.log(product?.paymentLink!)
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
        <Button disabled onClick={handleBuyClick} type="submit" className="fixed bottom-6 right-40">
          Kaufen
        </Button>
      ) : (
        <Button onClick={handleBuyClick} type="submit" className="fixed bottom-6 right-40">
          Kaufen
        </Button>
      )}
      {product?.isDirectlyBuyable ? (
        <Button onClick={handleDirectBuyClick} className="fixed bottom-6 right-6" type="submit">
          Direkt Kaufen
        </Button>
      ) : null}
    </>
  )
}
