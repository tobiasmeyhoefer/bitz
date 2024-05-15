import { ProductForm } from '@/components/myShop/product-form'
import { getTranslations } from 'next-intl/server'
import { updateProduct } from '@/lib/productaction'
import { ProductType } from '@/lib/types'

const UpdateProductPage = async () => {
  async function updateProductWrapper(values: ProductType) {
    'use server'
    const productId = '3f4cb90e-6819-4c65-925b-9e563fdf9aae'
    return updateProduct(productId, values)
  }
  const t = await getTranslations('addProductPage')
  return (
    <div className="absolute inset-x-1/2 top-24 flex flex-col items-center">
      <h2>Todo Update... geht gerade nicht...</h2>
      {/* <ProductForm submitText={t('submitTitle')} action={updateProductWrapper} userLocation="" whichFunction='update'/> */}
    </div>
  )
}

export default UpdateProductPage
