'use client'

import { CiMenuKebab } from 'react-icons/ci'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteConversation } from '@/lib/conversations-actions'
import { ConversationType } from '@/schema'
import { changeProductStateToSold, createTransaction } from '@/lib/stripe-actions'
import { getProductById } from '@/lib/product-actions'
import { useRouter } from '@/navigation'

export const ConversationCardDropwdown = ({
  conv,
  showSold,
}: {
  conv: ConversationType
  showSold: boolean
}) => {
  const router = useRouter()

  const changeProdStateToSold = async () => {
    await changeProductStateToSold(conv.productId)
    await deleteConversation(conv.productId, conv.buyerId)
    const product = await getProductById(conv.productId)
    await createTransaction(conv.buyerId, conv.productId, conv.sellerId, product.price)
    router.push('/transactions')
  }

  const notInterested = async () => {
    await deleteConversation(conv.productId, conv.buyerId)
    router.push('/conversations')
  }

  return (
    <div className="absolute right-4 top-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CiMenuKebab />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-20">
          {showSold === true ? (
            <DropdownMenuItem onClick={changeProdStateToSold} className="cursor-pointer">
              verkauft
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={notInterested} className="cursor-pointer">
              Nicht mehr interessiert
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ConversationCardDropwdown
