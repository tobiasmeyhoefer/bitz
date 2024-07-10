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
  const buyer = await getUserById(transaction.buyerId)
  const product = await getProductById(transaction.productId)

  //user is buyer
  if (transaction.buyerId === user.id) {
    return (
      <Card className="relative flex h-[180px] bg-transparent">
        <div>
          <Image
            src={product.imageUrl1!}
            alt="iamge of product"
            width={140}
            height={140}
            className="min-h-[180px] min-w-[180px]"
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
      <Card className="relative flex h-[180px] bg-transparent ">
        <div>
          <Image
            src={product.imageUrl1!}
            alt="iamge of product"
            width={140}
            height={140}
            className="min-h-[180px] min-w-[180px]"
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
          <CardFooter className=" h-8 ">
            <p>{transaction.createdAt.toLocaleDateString()}</p>
          </CardFooter>
        </div>
      </Card>
    )
  }
}

export default TransactionCard
