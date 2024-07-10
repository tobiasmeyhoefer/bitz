import Messages from '@/components/conversations/messages'
import WriteMessageField from '@/components/conversations/write-message-field'
import { Button } from '@/components/ui/button'
import { getConversationById } from '@/lib/conversations-actions'
import { getExisitingMessages } from '@/lib/message-actions'
import { getProductById } from '@/lib/product-actions'
import { getUser, getUserById } from '@/lib/user-actions'
import { Link } from '@/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const convId = params.id
  const existingMessages = await getExisitingMessages(convId)
  const user = await getUser()
  const conv = await getConversationById(params.id)
  const product = await getProductById(conv.productId)
  const sellerProm = getUserById(conv.sellerId)
  const buyerProm = getUserById(conv.buyerId)

  const [seller, buyer] = await Promise.all([sellerProm, buyerProm])

  const serializedMessages = existingMessages.map((message) => ({
    content: message.content,
    id: message.id,
    isSender: message.senderId === user.id,
    timeStamp: message.timestamp,
    isSystemMessage: message.isSystemMessage,
  }))

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-hidden">
      <div className="lg:mx-10 h-[80px] mx-4 flex items-center gap-10">
        <Link href={`/conversations`}>
          <Button>back</Button>
        </Link>
        <h2 className="text-sm font-bold md:text-2xl">
          Chat with {user.id === seller.id ? buyer.name : seller.name} about {product.title}
        </h2>
      </div>
      <div
        className={
          'z-10 flex h-[calc(100vh-160px)] w-full flex-col justify-between rounded-lg p-2'
        }
      >
        <Messages convId={convId} initialMessages={serializedMessages} userId={user.id} />
        <WriteMessageField conv={conv} user={user} />
      </div>
    </div>
  )
}
