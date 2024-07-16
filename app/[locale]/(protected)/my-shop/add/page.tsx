/**
 * Renders the AddProductPage component, which displays a form for adding a new product.
 * The component uses the ProductForm component to render the form, and fetches translations
 * for the page content using the getTranslations function from next-intl/server.
 */
import { ProductForm } from '@/components/my-shop/product-form'
import { getTranslations } from 'next-intl/server'

const AddProductPage = async () => {
  const t = await getTranslations('addProductPage')
  const translations = {
    title: t('title'),
    description: t('description'),
    price: t('price'),
    category: t('category'),
    categoryPlaceholder: t('categoryPlaceholder'),
    images: t('images'),
    toastTitle: t('toastTitle'),
    toastDescription: t('toastDescription'),
    submitTitle: t('submitTitle'),
    isDirectlyBuyable: t('isDirectlyBuyable'),
    deletePicture: t('deletePicture')
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
