import { ConversationLoadingSkeleton } from '@/components/fallbacks/conversations-fallback'
import TransactionCard from '@/components/transactions/transaction-card'
import { getUserTransactions } from '@/lib/stripe-actions'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

const Transactions = async () => {
  const t = await getTranslations('Transactions')
  const transactions = await getUserTransactions()
  return (
    <div className="flex flex-col items-center px-5 md:px-10 py-10">
      <div className="w-full">
        <h1 className="mb-12 text-center font-montserrat text-xl font-bold md:text-3xl">
          {t('title')}
        </h1>
        <Suspense fallback={<ConversationLoadingSkeleton />}>
          <div className="flex flex-col gap-4">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.productId} transaction={transaction} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default Transactions
