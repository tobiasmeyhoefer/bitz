import { pusherServer } from '@/lib/pusher'

export async function POST(req: Request) {
  const { content, convId, senderId, timeStamp, isSystemMessage } = await req.json()

  await pusherServer.trigger(convId, 'incoming-message', { content, senderId, timeStamp, isSystemMessage })

  return new Response(JSON.stringify({ success: true }))
}
