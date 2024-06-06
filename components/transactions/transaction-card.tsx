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
  if (transaction.buyerId === user![0].id) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Du hast {product[0].title} gekauft</CardTitle>
          <CardDescription>gekauft für {transaction.price}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Dein Paket wird jetzt verpackt und an den festgelegten Ort in deinen Einstellungen versendet</p>
        </CardContent>
        <CardFooter>
          <p>{transaction.createdAt.toLocaleDateString()}</p>
        </CardFooter>
      </Card>
    )
  }

  //user is seller
  if (transaction.sellerId === user![0].id) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dein Bit {product[0].title} wurde gekauft</CardTitle>
          <CardDescription>verkauft für {transaction.price}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Bitte schicke diesen Artikel nun an {buyer[0].name ?? "den Verkäufer"}</p>
          <p>Adresse: {buyer[0].adress}</p>
        </CardContent>
        <CardFooter>
          <p>{transaction.createdAt.toLocaleDateString()}</p>
        </CardFooter>
      </Card>
    )
  }
}

export default TransactionCard
