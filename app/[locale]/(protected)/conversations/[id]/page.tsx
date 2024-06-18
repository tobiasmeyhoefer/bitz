import Messages from '@/components/conversations/messages'
import WriteMessageField from '@/components/conversations/write-message-field'
import { getExisitingMessages } from '@/lib/message-actions'
import { getUser } from '@/lib/user-actions'

export default async function Page({ params }: { params: { id: string } }) {
  const convId = params.id
  const existingMessages = await getExisitingMessages(convId)
  const user = await getUser()

  const serializedMessages = existingMessages.map((message) => ({
    content: message.content,
    id: message.id,
    isSender: message.senderId === user.id,
  }))

  return (
    <>
      <h2 className="flex h-20 items-end text-center text-2xl font-bold">EXPERIMENTAL CHAT</h2>
      <div
        className={
          'z-10 flex h-[calc(100vh-160px)]  w-full flex-col justify-between rounded-lg p-2'
        }
      >
        <Messages convId={convId} initialMessages={serializedMessages} userId={user.id} />
        <WriteMessageField convId={convId} userId={user.id} />
      </div>
    </>
  )
}
