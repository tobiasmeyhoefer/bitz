import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProductById } from '@/lib/productaction'
import { getAddressByUserId, getUser, getUserById } from '@/lib/useraction'
import { ConversationType } from '@/schema'
import { formatDate } from '@/lib/utils'
import { ConversationForm } from './conversation-form1'
import { ConversationForm2 } from './conversation-form2'
import ConversationCardDropwdown from './conversation-card-dropdown'
import { getTranslations } from 'next-intl/server'

export const ConversationCard = async ({ conv }: { conv: ConversationType }) => {
  const currentUser = await getUser()
  const user = await getUserById(conv.buyerId)
  const product = await getProductById(conv.productId)
  const t = await getTranslations('Conversations')
  const translations = await getTranslations('Conversations')
  //let a = translations.title;

  const cardType: 'sellerCard' | 'buyerCard' =
    currentUser!.id === product.sellerId ? 'buyerCard' : 'sellerCard'

  if (cardType === 'sellerCard') {
    return (
      <Card className="relative">
        <ConversationCardDropwdown conv={conv} showDelay={true} showSold={false} />
        <CardHeader>
          <CardTitle>
            {t('wannabuy00')} {product.title} {t('wannabuy01')}
          </CardTitle>
          <CardDescription>
            {conv.status === 'accepted' ? (
              <span>
                {t('sellerAccepted')}
                {await getAddressByUserId(conv.sellerId)}
              </span>
            ) : (
              <span>{t('waiting')} </span>
            )}
          </CardDescription>
          {conv.status === 'accepted' ? (
            <CardContent className="p-0">
              <p>{conv.message1}</p>
              <ConversationForm2 convId={conv.id} />
            </CardContent>
          ) : conv.status === 'deal' ? (
            <p>{t('deal')} ✅</p>
          ) : (
            <span></span>
          )}
        </CardHeader>
        <CardFooter className="flex flex-col items-start text-neutral-400">
          <p className="font-ligh text-neutral-400">{formatDate(conv.createdAt)}</p>
          {conv.delay !== null ? (
            <p className="text-red-600">
              {t('delay00')} {conv.delay} {t('delay01')}
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
                {user.name} {t('newbuyer00')} {product.title} {t('newbuyer01')}
              </CardTitle>
              {conv.status === 'offen' ? <CardDescription>{t('gotOffer')}</CardDescription> : null}
            </CardHeader>
            {conv.status === 'accepted' ? (
              <CardContent>{t('accepted')} ✅</CardContent>
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
                  {user.name} {t('delay11')} {conv.delay} {t('delay01')}
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
