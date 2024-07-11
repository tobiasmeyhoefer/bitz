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

export const TransactionCard = async ({ transaction }: { transaction: TransactionType }) => {
  const user = await getUser()
  const buyerProm = getUserById(transaction.buyerId)
  const productProm = getProductById(transaction.productId)

  const [buyer, product] = await Promise.all([buyerProm, productProm])
  

  //user is buyer
  if (transaction.buyerId === user.id) {
    return (
      <Card className="relative flex bg-transparent">
        <div>
          <Image
            src={product.imageUrl1!}
            alt="image of product"
            width={138.4}
            height={138.4}
            className="rounded-l-lg h-full w-full object-cover"
          />
        </div>
        <div>
          <CardHeader>
            <CardTitle>Du hast {product.title} gekauft</CardTitle>
            <CardDescription>gekauft für {transaction.price}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Dein Paket wird jetzt verpackt und an den festgelegten Ort in deinen Einstellungen
              versendet
            </p>
          </CardContent>
          <CardFooter>
            <p>{transaction.createdAt.toLocaleDateString()}</p>
          </CardFooter>
        </div>
      </Card>
    )
  }

  //user is seller
  if (transaction.sellerId === user.id) {
    return (
      <Card className="relative flex h-[180px] bg-transparent">
        <div>
          <Image
            src={product.imageUrl1!}
            alt="image of product"
            width={138.4}
            height={138.4}
            className="rounded-l-lg"
          />
        </div>
        <div>
          <CardHeader>
            <CardTitle>Dein Bit {product.title} wurde gekauft</CardTitle>
            <CardDescription>verkauft für {transaction.price}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Bitte schicke diesen Artikel nun an {buyer.name ?? 'den Verkäufer'}</p>
            <p>Adresse: {buyer.adress}</p>
          </CardContent>
          <CardFooter>
            <p>{transaction.createdAt.toLocaleDateString()}</p>
          </CardFooter>
        </div>
      </Card>
    )
  }
}

export default TransactionCard
