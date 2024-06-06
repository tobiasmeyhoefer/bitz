import { getAllConversations } from '@/lib/conversations-actions'
import ConversationCard from '@/components/conversations/conversation-card'

const Conversations = async () => {
  const conversations = await getAllConversations()
  return (
    <section className="flex flex-col items-center pt-40">
      <h1 className='text-4xl font-montserrat font-bold mb-6'>CONVERSATIONS</h1>
      {conversations.length > 0 ? <div className="w-[600px] flex flex-col gap-6">
        {conversations.map((conv) => (
          <ConversationCard
            conv={conv}
            key={conv.buyerId + conv.productId}
          />
        ))}
      </div> : <p>There are no opened conversations</p>}
    </section>
  )
}

export default Conversations
