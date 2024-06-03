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
import { ConversationType } from '@/schema'
import { formatDate } from '@/lib/utils'
import { ConversationForm } from './conversation-form1'
import { ConversationForm2 } from './conversation-form2'
import ConversationCardDropwdown from './conversation-card-dropdown'

export const ConversationCard = async ({ conv }: { conv: ConversationType }) => {
  const currentUser = await getUser()
  const user = await getUserById(conv.buyerId)
  const product = await getProductById(conv.productId)

  const cardType: 'sellerCard' | 'buyerCard' =
    currentUser![0].id === product[0].sellerId ? 'buyerCard' : 'sellerCard'

  if (cardType === 'sellerCard') {
    return (
      <Card className="relative">
        <ConversationCardDropwdown conv={conv} showDelay={true} showSold={false}/>
        <CardHeader>
          <CardTitle>Du bist an dem Bit {product[0].title} interessiert</CardTitle>
          <CardDescription>
            {conv.status === 'accepted' ? (
              <span>Der Käufer hat dein Angebot akzeptiert </span>
            ) : (
              <span>Aktuell wird auf eine Antwort gewartet </span>
            )}
          </CardDescription>
          {conv.status === 'accepted' ? (
            <CardContent className="p-0">
              <p>{conv.message1}</p>
              <ConversationForm2 convId={conv.id} />
            </CardContent>
          ) : conv.status === 'deal' ? (
            <p>Ihr habt jetzt einen Deal ✅</p>
          ) : (
            <span></span>
          )}
        </CardHeader>
        <CardFooter className="flex flex-col items-start text-neutral-400">
          <p className="font-ligh text-neutral-400">{formatDate(conv.createdAt)}</p>
          {conv.delay !== null ? (
            <p className="text-red-600">
              Du verspätest sich um {conv.delay} Minuten
            </p>
          ) : (
            <span></span>
          )}
        </CardFooter>
      </Card>
    )
  } else if (cardType === 'buyerCard') {
    return (
      <>
        {conv.status === 'declined' ? (
          <span></span>
        ) : (
          <Card className="relative">
            <ConversationCardDropwdown conv={conv} showDelay={false} showSold={true} />
            <CardHeader>
              <CardTitle>
                Der User {user[0].name} ist an deinem Bit {product[0].title} interessiert
              </CardTitle>
              <CardDescription>
                Du kannst dieses Angebot nun ablehnen oder annehmen. Wenn du es annimmst, wird dein
                in den Einstellungen festgelegter Abholort übermittelt bitte trage im vorgesehenen Feld ein wann du Zeit hast
              </CardDescription>
            </CardHeader>
            {conv.status === 'accepted' ? (
              <CardContent>Du hast das Angebot akzeptiert ✅</CardContent>
            ) : conv.status === 'deal' ? (
              <CardContent>{conv.message2}</CardContent>
            ) : (
              <CardContent>
                <ConversationForm convId={conv.id} />
              </CardContent>
            )}
            <CardFooter className="flex flex-col items-start text-neutral-400">
              <p>{formatDate(conv.createdAt)}</p>
              {conv.delay !== null ? (
                <p className="text-red-600">
                  {user[0].name} verspätet sich um {conv.delay} Minuten
                </p>
              ) : (
                <span></span>
              )}
            </CardFooter>
          </Card>
        )}
      </>
    )
  }
}

export default ConversationCard
