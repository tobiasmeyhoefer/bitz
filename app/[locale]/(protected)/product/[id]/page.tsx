import { Button } from '@/components/ui/button'
import { createConversation } from '@/lib/conversations-actions'
import { ProductType } from '@/lib/types'
import { redirect } from '@/navigation'
import { revalidatePath } from 'next/cache'

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { p: string }
}) {
  const product: ProductType = JSON.parse(searchParams.p)
  return (
    <div>
      Some Product ID: {params.id}
      <div>Title: {product.title}</div>
      <form action={async () => {
        'use server'
        await createConversation(params.id)
        revalidatePath("/conversations")
        redirect("/conversations")
      }}>
        <Button type='submit' className='absolute bottom-6 right-6'>Kaufen</Button>
      </form>
    </div>
  )
}
