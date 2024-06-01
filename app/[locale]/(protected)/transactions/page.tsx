import { getUserTransactions } from '@/lib/stripe-actions'

const Transactions = async () => {
  const transactions = await getUserTransactions()
  return (
    <>
      <h1 className="text-3xl font-bold">Sales</h1>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.productId}>
            <p>Transaktion</p>
            {transaction.price}
          </div>
        ))}
      </div>
    </>
  )
}

export default Transactions
