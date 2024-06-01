'use client'

import { CiMenuKebab } from 'react-icons/ci'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addConversationDelay, deleteConversation } from '@/lib/conversations-actions'
import { ConversationType } from '@/schema'
import { changeProductStateToSold, createTransaction } from '@/lib/stripe-actions'
import { getProductById } from '@/lib/productaction'
import { useRouter } from '@/navigation'

export const ConversationCardDropwdown = ({
  conv,
  showDelay,
  showSold,
}: {
  conv: ConversationType
  showDelay: boolean
  showSold: boolean
}) => {

  const router = useRouter()

  const changeProdStateToSold = async () => {
    await changeProductStateToSold(conv.productId)
    await deleteConversation(conv.productId, conv.buyerId)
    const product = await getProductById(conv.productId)
    await createTransaction(conv.buyerId, conv.productId, conv.sellerId, product[0].price)
    router.push("/transactions")
  }

  return (
    <div className="absolute right-4 top-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CiMenuKebab />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-20">
          {showDelay === true ? (
            <DropdownMenuItem className="cursor-pointer">
              <Select
                onValueChange={(value) => {
                  addConversationDelay(conv.id, value)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="zu spät?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="5">
                    5min
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="10">
                    10min
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="15">
                    15min
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="30">
                    30min
                  </SelectItem>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
          ) : null}
          {showSold === true ? (
            <DropdownMenuItem onClick={changeProdStateToSold} className="cursor-pointer">
              verkauft
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ConversationCardDropwdown
