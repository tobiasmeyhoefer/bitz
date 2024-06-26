import { ConversationLoadingSkeleton } from '@/components/fallbacks/conversations-fallback'
import TransactionCard from '@/components/transactions/transaction-card'
import { getUserTransactions } from '@/lib/stripe-actions'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

const Transactions = async () => {
  const t = await getTranslations('Transactions')
  const transactions = await getUserTransactions()
  return (
    <div className='flex flex-col items-center px-5 md:px-10'>
      <div className="w-full">
        <h1 className="my-20 text-3xl font-bold text-center font-montserrat">{t('title')}</h1>
        <Suspense fallback={<ConversationLoadingSkeleton/>}><div className='flex flex-col gap-4'>
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.productId} transaction={transaction} />
          ))}
        </div></Suspense>
      </div>
    </div>
  )
}

export default Transactions
