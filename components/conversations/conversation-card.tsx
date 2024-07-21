/**
 * Renders a conversation card component that displays information about a conversation, including the product, buyer/seller details, and unread message count.
 *
 * @param {Object} props - The component props.
 * @param {ConversationType} props.conv - The conversation object.
 * @returns {JSX.Element} - The rendered conversation card component.
 */
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getProductById } from '@/lib/product-actions'
import { getUser, getUserById } from '@/lib/user-actions'
import { ConversationType } from '@/schema'
import { formatDate } from '@/lib/utils'
import ConversationCardDropwdown from './conversation-card-dropdown'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'
import Image from 'next/image'
import { getUnreadMessages } from '@/lib/message-actions'

export const ConversationCard = async ({ conv }: { conv: ConversationType }) => {
  const currentUserProm = getUser()
  const userProm = getUserById(conv.buyerId)
  const productProm = getProductById(conv.productId)
  const t = await getTranslations('Conversations')
  const unreadMessagesProm = getUnreadMessages(conv.id)

  const [currentUser, user, product, unreadMessages] = await Promise.all([
    currentUserProm,
    userProm,
    productProm,
    unreadMessagesProm,
  ])

  const cardType: 'sellerCard' | 'buyerCard' =
    currentUser.id === product.sellerId ? 'buyerCard' : 'sellerCard'

  if (cardType === 'sellerCard') {
    return (
      <Link className="transition-all hover:bg-secondary" href={`/conversations/${conv.id}`}>
        <Card className="relative flex h-[140px] flex-row gap-4 bg-transparent">
          <Image
            src={product.imageUrl1!}
            alt="image of product"
            width={138.4}
            height={138.4}
            className="h-full rounded-l-lg object-cover"
          />
          <div>
            <ConversationCardDropwdown conv={conv} showSold={false} />
            <CardHeader>
              <CardTitle>
                {t('wannabuy00')} {product.title} {t('wannabuy01')}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col items-start text-neutral-400">
              <p className="text-sm text-neutral-400 md:text-lg">{formatDate(conv.createdAt)}</p>
              {unreadMessages !== 0 ? (
                <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                  {unreadMessages}
                </div>
              ) : null}
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
            <Card className="relative flex h-[140px] flex-row gap-4 bg-transparent">
              <Image
                src={product.imageUrl1!}
                alt="image of product"
                width={138.4}
                height={138.4}
                className="h-full rounded-l-lg object-cover"
              />
              <div>
                <ConversationCardDropwdown conv={conv} showSold={true} />
                <CardHeader>
                  <CardTitle>
                    {user.name} {t('newbuyer00')} {product.title} {t('newbuyer01')}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex flex-col items-start text-neutral-400">
                  <p className="text-sm md:text-lg">{formatDate(conv.createdAt)}</p>
                  {unreadMessages !== 0 ? (
                    <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                      {unreadMessages}
                    </div>
                  ) : null}
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
