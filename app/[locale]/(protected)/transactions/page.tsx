/**
 * Renders a page component that displays the user's transactions.
 * 
 * This component fetches the user's transactions from the Stripe API and renders them in a grid layout using the `TransactionCard` component.
 * 
 * @returns {JSX.Element} The transactions page component.
 */
import { ConversationLoadingSkeleton } from '@/components/fallbacks/conversations-fallback'
import TransactionCard from '@/components/transactions/transaction-card'
import { getUserTransactions } from '@/lib/stripe-actions'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

const Transactions = async () => {
  const t = await getTranslations('Transactions')
  const transactions = await getUserTransactions()
  return (
    <div className="flex flex-col items-center px-5 py-10 md:px-10">
      <div className="w-full">
        <h1 className="mb-12 text-center font-montserrat text-xl font-bold md:text-3xl">
          {t('title')}
        </h1>
        <Suspense fallback={<ConversationLoadingSkeleton />}>
          <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
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
