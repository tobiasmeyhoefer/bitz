import { ProductForm } from '@/components/myShop/product-form'
import { getUser } from '@/lib/useraction'
import { getTranslations } from 'next-intl/server'

const AddProductPage = async () => {
  const t = await getTranslations('addProductPage')
  const users = await getUser()
  const user = users?.[0]
  const translations = {
    title: t('title'),
    description: t('description'),
    price: t('price'),
    quantity: t('quantity'),
    category: t('category'),
    categoryPlaceholder: t('categoryPlaceholder'),
    images: t('images'),
    toastTitle: t('toastTitle'),
    toastDescription: t('toastDescription'),
    submitTitle: t('submitTitle'),
  }
  return (
    <>
      <div className="absolute inset-x-1/2 top-24 flex flex-col items-center">
        <ProductForm
          submitText={t('submitTitle')}
          whichFunction="add"
          translations={translations}
        />
      </div>
    </>
  )
}

export default AddProductPage
