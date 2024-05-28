import { getAllConversations } from '@/lib/conversations-actions'
import ConversationCard from '@/components/conversations/conversation-card'

const Conversations = async () => {
  const conversations = await getAllConversations()
  return (
    <section className="flex flex-col items-center pt-40">
      <h1 className='text-4xl font-montserrat font-bold mb-6'>CONVERSATIONS</h1>
      <div className="w-[600px]">
        {conversations.map((conv) => (
          <ConversationCard
            conv={conv}
            key={conv.buyerId + conv.productId}
          />
        ))}
      </div>
    </section>
  )
}

export default Conversations
