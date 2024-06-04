import { getAllConversations } from '@/lib/conversations-actions'
import ConversationCard from '@/components/conversations/conversation-card'
import { getTranslations } from 'next-intl/server'

const Conversations = async () => {
  const t = await getTranslations('Conversations')
  const conversations = await getAllConversations()
  return (
    <section className="flex flex-col items-center pt-40">
      <h1 className='text-4xl font-montserrat font-bold mb-6'>{t('title')}</h1>
      {conversations.length > 0 ? <div className="w-[600px] flex flex-col gap-6">
        {conversations.map((conv) => (
          <ConversationCard
            conv={conv}
            key={conv.buyerId + conv.productId}
          />
        ))}
      </div> : <p>{t('empty')}</p>}
    </section>
  )
}

export default Conversations
