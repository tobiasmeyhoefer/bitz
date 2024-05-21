import { ProductForm } from '@/components/myShop/product-form'
import { getTranslations } from 'next-intl/server'
import { getUserById } from '@/lib/useraction'

const AddProductPage = async () => {
  let location
  const user = await getUserById()
  try {
    if (user![0]!.location) {
      location = user![0].location
    }
  } catch (err) {}
  const t = await getTranslations('addProductPage')
  return (
    <>
      <h1>Bit hinzufügen</h1>
      <div className="absolute inset-x-1/2 top-24 flex flex-col items-center">
        <ProductForm submitText={t('submitTitle')} userLocation={location!} whichFunction="add" />
      </div>
    </>
  )
}

export default AddProductPage
