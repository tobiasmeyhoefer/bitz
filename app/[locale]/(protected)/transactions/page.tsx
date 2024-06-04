import TransactionCard from '@/components/transactions/transaction-card'
import { getUserTransactions } from '@/lib/stripe-actions'

const Transactions = async () => {
  const transactions = await getUserTransactions()
  return (
    <div className='flex flex-col items-center'>
      <div className="w-[400px] md:w-[600px]">
        <h1 className="my-10 text-3xl font-bold text-center">Transaktionen</h1>
        <div className='flex flex-col gap-4'>
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.productId} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions