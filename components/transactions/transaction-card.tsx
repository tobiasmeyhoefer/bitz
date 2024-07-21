/**
 * Renders a transaction card component that displays information about a transaction.
 *
 * The component checks if the current user is the buyer or seller of the transaction and renders the card accordingly.
 *
 * @param {Object} props - The component props.
 * @param {TransactionType} props.transaction - The transaction object.
 * @returns {JSX.Element} - The transaction card component.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProductById } from '@/lib/product-actions'
import { getUser, getUserById } from '@/lib/user-actions'
import { TransactionType } from '@/schema'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

export const TransactionCard = async ({ transaction }: { transaction: TransactionType }) => {
  const t = await getTranslations('Transactions')
  const user = await getUser()
  const buyerProm = getUserById(transaction.buyerId)
  const productProm = getProductById(transaction.productId)

  const [buyer, product] = await Promise.all([buyerProm, productProm])

  //user is buyer
  if (transaction.buyerId === user.id) {
    return (
      <Card className="relative flex flex-row gap-4 bg-transparent sm:h-[170px]">
        <Image
          src={product.imageUrl1!}
          alt="image of product"
          width={150}
          height={150}
          className="h-full rounded-l-lg object-cover"
        />
        <div>
          <CardHeader>
            <CardTitle>
              {t('b1')} {product.title} {t('b2')}
            </CardTitle>
            <CardDescription>
              {t('b3')} {transaction.price}€
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-base">{t('otw')}</p>
            <CardDescription>{transaction.createdAt.toLocaleDateString()}</CardDescription>
          </CardContent>
        </div>
      </Card>
    )
  }

  //user is seller
  if (transaction.sellerId === user.id) {
    return (
      <Card className="relative flex flex-row gap-4 bg-transparent sm:h-[170px]">
        <Image
          src={product.imageUrl1!}
          alt="image of product"
          width={150}
          height={150}
          className="h-full rounded-l-lg object-cover"
        />
        <div>
          <CardHeader>
            <CardTitle>Dein Bit {product.title} wurde gekauft</CardTitle>
            <CardDescription>verkauft für {transaction.price}€</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-base">
              Bitte schicke diesen Artikel nun an {buyer.name ?? 'den Verkäufer'}
            </p>
            <p className="mb-2 text-xs sm:text-sm">Adresse: {buyer.adress}</p>

            <CardDescription>{transaction.createdAt.toLocaleDateString()}</CardDescription>
          </CardContent>
        </div>
      </Card>
    )
  }
}

export default TransactionCard
