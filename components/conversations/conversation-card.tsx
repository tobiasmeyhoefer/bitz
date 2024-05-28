import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProductById } from '@/lib/productaction'
import { getUser, getUserById } from '@/lib/useraction'
import { Button } from '../ui/button'
import { acceptOffer, declineOffer } from '@/lib/conversations-actions'
import { ConversationType } from '@/schema'

export const ConversationCard = async ({ conv }: { conv: ConversationType }) => {
  const currentUser = await getUser()
  const user = await getUserById(conv.buyerId)
  const product = await getProductById(conv.productId)

  const cardType: 'sellerCard' | 'buyerCard' =
    currentUser![0].id === product[0].sellerId ? 'buyerCard' : 'sellerCard'

  if (cardType === 'sellerCard') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Du bist an dem Bit {product[0].title} interessiert</CardTitle>
          <CardDescription>
            {conv.status === 'accepted' ? (
              <span>Der Käufer hat dein Angebot  akzeptiert </span>
            ) : (
              <span>Aktuell wird auf eine Antwort gewartet </span>
            )}
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
                <Button>Annehmen</Button>
                <Button variant={"destructive"}>Ablehnen</Button>
              </CardContent> */}
        <CardFooter>
          <p>{conv.createdAt.toDateString()}</p>
          <p>Status: {conv.status}</p>
        </CardFooter>
      </Card>
    )
  } else if (cardType === 'buyerCard') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Der User {user[0].name} ist an dem Bit {product[0].title} interessiert
          </CardTitle>
          <CardDescription>
            Du kannst dieses Angebot nun ablehnen oder annehmen, wenn du es annimst wird dein in den
            Einstellungen festgelegt abholort übermittelt und du wirst aufgefordert ein Zeitfenster
            anzugeben
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <form
            action={async () => {
              'use server'
              await acceptOffer(conv.id)
            }}
          >
            <Button>Annehmen</Button>
          </form>
          <form
            action={async () => {
              'use server'
              await declineOffer(conv.id)
            }}
          >
            <Button variant={'destructive'}>Ablehnen</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>{conv.createdAt.toLocaleDateString()}</p>
          <p>Status: {conv.status}</p>
        </CardFooter>
      </Card>
    )
  }
}

export default ConversationCard
