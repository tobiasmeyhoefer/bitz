import { AddProductForm } from '@/components/myShop/add-product-form'
import { useTranslations } from 'next-intl'
import { addProduct } from '@/lib/action'

const AddProductPage = () => {
  const t = useTranslations('addProductPage')
  return (
    <div className="absolute inset-x-1/2 top-24 flex flex-col items-center">
      <AddProductForm submitText={t('submitTitle')} action={addProduct} />
    </div>
  )
}

export default AddProductPage
