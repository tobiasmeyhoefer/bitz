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
import { TransactionType } from '@/schema'

export const TransactionCard = async ({ transaction }: { transaction: TransactionType }) => {
  const user = await getUser()
  const buyer = await getUserById(transaction.buyerId)
  const product = await getProductById(transaction.productId)

  //user is buyer
  if (transaction.buyerId === user!.id) {
    return (
      <Card>
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
      </Card>
    )
  }

  //user is seller
  if (transaction.sellerId === user!.id) {
    return (
      <Card>
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
      </Card>
    )
  }
}

export default TransactionCard
