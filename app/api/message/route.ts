import { pusherServer } from '@/lib/pusher'

export async function POST(req: Request) {
  const { content, convId, senderId, timestamp } = await req.json()

  await pusherServer.trigger(convId, 'incoming-message', { content, senderId, timestamp })

  return new Response(JSON.stringify({ success: true }))
}
