import { ProductForm } from '@/components/myShop/product-form'
import { getTranslations } from 'next-intl/server'

const AddProductPage = async () => {
  const t = await getTranslations('addProductPage')
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
      <h1>Bit hinzufügen</h1>
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
