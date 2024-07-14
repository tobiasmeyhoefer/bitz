import Messages from '@/components/conversations/messages'
import WriteMessageField from '@/components/conversations/write-message-field'
import { Button } from '@/components/ui/button'
import { getConversationById } from '@/lib/conversations-actions'
import { getExisitingMessages } from '@/lib/message-actions'
import { getProductById } from '@/lib/product-actions'
import { getUser, getUserById } from '@/lib/user-actions'
import { Link } from '@/navigation'
import { revalidatePath } from 'next/cache'
import { redirect } from '@/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const convId = params.id
  const conv = await getConversationById(convId)

  const existingMessagesProm = getExisitingMessages(convId)
  const userProm = getUser()
  const productProm = getProductById(conv.productId)
  const sellerProm = getUserById(conv.sellerId)
  const buyerProm = getUserById(conv.buyerId)

  const [seller, buyer, product, user, existingMessages] = await Promise.all([
    sellerProm,
    buyerProm,
    productProm,
    userProm,
    existingMessagesProm,
  ])

  const serializedMessages = existingMessages.map((message) => ({
    content: message.content,
    id: message.id,
    isSender: message.senderId === user.id,
    timeStamp: message.timestamp,
    isSystemMessage: message.isSystemMessage,
  }))

  const navigateBack = async () => {
    'use server'
    revalidatePath('/conversations')
    redirect('/conversations')
  }

  return (
    <div className="h-full">
      <div className="mx-4 flex h-[80px] items-center gap-10 lg:mx-10">
        {/* <Link href={`/conversations`}> */}
        <form action={navigateBack}>
          <Button type="submit">back</Button>
        </form>
        {/* </Link> */}
        <h2 className="text-sm font-bold md:text-2xl">
          Chat with {user.id === seller.id ? buyer.name : seller.name} about {product.title}
        </h2>
      </div>
      <div
        className={
          'z-10 flex h-[calc(100dvh-160px)] w-full flex-col justify-between rounded-lg p-2'
        }
      >
        <Messages convId={convId} initialMessages={serializedMessages} userId={user.id} />
        <WriteMessageField conv={conv} user={user} />
      </div>
    </div>
  )
}
