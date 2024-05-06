import { AddProductForm } from '@/components/myShop/add-product-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { IoMdArrowRoundBack } from 'react-icons/io'

const AddProductPage = () => {
  const url = useTranslations('MyShopUrl')
  return (
    <div className="absolute inset-x-1/2 top-24 flex flex-col items-center">
      <AddProductForm />
      <Button asChild>
        <Link href={url('url')}>
          {' '}
          <IoMdArrowRoundBack />{' '}
        </Link>
      </Button>
    </div>
  )
}

export default AddProductPage
