/**
 * Renders the Conversations page, which displays a list of conversations.
 * 
 * The page fetches all conversations using the `getAllConversations` function from `@/lib/conversations-actions`,
 * and renders them using the `ConversationCard` component. If there are no conversations, it displays a message.
 * 
 * The page uses the `getTranslations` function from `next-intl/server` to fetch translations for the page content.
 * 
 * The page is wrapped in a `Suspense` component to display a loading skeleton while the data is being fetched.
 */

import { getAllConversations } from '@/lib/conversations-actions'
import ConversationCard from '@/components/conversations/conversation-card'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { ConversationLoadingSkeleton } from '@/components/fallbacks/conversations-fallback'

const Conversations = async () => {
  const t = await getTranslations('Conversations')
  const conversations = await getAllConversations()
  return (
    <section className="flex flex-col items-center space-y-10 px-5 py-12 md:px-10">
      <h1 className="mb-10 font-montserrat text-xl font-bold md:text-3xl">{t('title')}</h1>
      {conversations.length > 0 ? (
        <Suspense fallback={<ConversationLoadingSkeleton />}>
          <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
            {conversations.map((conv) => (
              <ConversationCard conv={conv} key={conv.buyerId + conv.productId} />
            ))}
          </div>
        </Suspense>
      ) : (
        <p className='font-bold'>{t('empty')}</p>
      )}
    </section>
  )
}

export default Conversations
