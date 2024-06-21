import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProductById } from '@/lib/product-actions'
import { getAddressByUserId, getUser, getUserById } from '@/lib/user-actions'
import { ConversationType } from '@/schema'
import { formatDate } from '@/lib/utils'
import { ConversationForm } from './conversation-form1'
import { ConversationForm2 } from './conversation-form2'
import ConversationCardDropwdown from './conversation-card-dropdown'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'
import { Button } from '../ui/button'
import ExperimentalChatButton from './exp-chat-button'
import Image from 'next/image'

export const ConversationCard = async ({ conv }: { conv: ConversationType }) => {
  const currentUser = await getUser()
  const user = await getUserById(conv.buyerId)
  const product = await getProductById(conv.productId)
  const t = await getTranslations('Conversations')

  const cardType: 'sellerCard' | 'buyerCard' =
    currentUser.id === product.sellerId ? 'buyerCard' : 'sellerCard'

  if (cardType === 'sellerCard') {
    return (
      <Link className="transition-all hover:bg-secondary" href={`/conversations/${conv.id}`}>
        <Card className="relative flex h-[140px] bg-transparent">
          <div>
            <Image
              src={product.imageUrl1!}
              alt="iamge of product"
              width={140}
              height={140}
              className="min-h-[140px] min-w-[140px]"
            />
          </div>
          <div>
            {/* <ConversationCardDropwdown conv={conv} showDelay={true} showSold={false} /> */}
            <CardHeader>
              <CardTitle>
                {t('wannabuy00')} {product.title} {t('wannabuy01')}
              </CardTitle>
              {/* <CardDescription>
              {conv.status === 'accepted' ? (
                <span>
                  {t('sellerAccepted')}
                  {await getAddressByUserId(conv.sellerId)}
                </span>
              ) : (
                <span>{t('waiting')} </span>
              )}
            </CardDescription> */}
            </CardHeader>
            <CardFooter className="flex flex-col items-start text-neutral-400">
              <p className="font-light text-neutral-400">{formatDate(conv.createdAt)}</p>
              {/* {conv.delay !== null ? (
              <p className="text-red-600">
                {t('delay00')} {conv.delay} {t('delay01')}
              </p>
            ) : (
              <span></span>
            )} */}
              {/* <Link href={`/conversations/${conv.id}`}>
              <Button>Exp. Chat</Button>
            </Link> */}
              {/* <ExperimentalChatButton/> */}
            </CardFooter>
          </div>
        </Card>
      </Link>
    )
  } else if (cardType === 'buyerCard') {
    return (
      <>
        {conv.status === 'declined' ? (
          <span></span>
        ) : (
          <Link className="transition-all hover:bg-secondary" href={`/conversations/${conv.id}`}>
            <Card className="relative flex h-[140px] bg-transparent">
              <div>
                <Image
                  src={product.imageUrl1!}
                  alt="iamge of product"
                  width={140}
                  height={140}
                  className="min-h-[140px] min-w-[140px]"
                />
              </div>
              <div>
                <ConversationCardDropwdown conv={conv} showDelay={false} showSold={true} />
                <CardHeader>
                  <CardTitle>
                    {user.name} {t('newbuyer00')} {product.title} {t('newbuyer01')}
                  </CardTitle>
                  {/* {conv.status === 'offen' ? <CardDescription>{t('gotOffer')}</CardDescription> : null} */}
                </CardHeader>
                <CardFooter className="flex flex-col items-start text-neutral-400">
                  <p>{formatDate(conv.createdAt)}</p>
                  {/* {conv.delay !== null ? (
                <p className="text-red-600">
                  {user.name} {t('delay11')} {conv.delay} {t('delay01')}
                </p>
              ) : (
                <span></span>
              )} */}
                </CardFooter>
              </div>
            </Card>
          </Link>
        )}
      </>
    )
  }
}

export default ConversationCard

// {conv.status === 'accepted' ? (
//   <CardContent className="p-0">
//     <p>{conv.message1}</p>
//     {/* <ConversationForm2 convId={conv.id} /> */}
//   </CardContent>
// ) : conv.status === 'deal' ? (
//   <p>{t('deal')} ✅</p>
// ) : (
//   <span></span>
// )}

// {conv.status === 'accepted' ? (
//   <CardContent>{t('accepted')} ✅</CardContent>
// ) : conv.status === 'deal' ? (
//   <CardContent>{conv.message2}</CardContent>
// ) : (
//   <CardContent>{/* <ConversationForm convId={conv.id} /> */}</CardContent>
// )}
