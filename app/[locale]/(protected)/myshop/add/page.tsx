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
      <h1 className="text-center font-montserrat text-3xl font-bold mt-10">BIT HINZUFÜGEN</h1>
      <div className="flex justify-center mt-10">
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
