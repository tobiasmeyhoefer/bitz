import { getAllConversations } from '@/lib/conversations-actions'

const Conversations = async () => {
  const conversations = await getAllConversations()
  return (
    <>
      <h1>Conversations</h1>
      {conversations.map((conv) => (
        <div key={conv.buyerId}>{conv.status}</div>
      ))}
    </>
  )
}

export default Conversations
