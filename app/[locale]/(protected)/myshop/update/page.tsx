import { AddProductForm } from '@/components/myShop/add-product-form'
import { getTranslations } from 'next-intl/server'
import { updateProduct } from '@/lib/action'
import { auth } from '@/auth'
import { ProductType} from '@/models/product-model'

const UpdateProductPage = async () => {
  async function updateProductWrapper(values: ProductType) {
    "use server"
    const productId = "c712fb22-42ac-4dfa-a557-4b709df293ba"; 
    return updateProduct(productId, values);
  }
  const t = await getTranslations('addProductPage')
  return (
    <div className="absolute inset-x-1/2 top-24 flex flex-col items-center">
      <AddProductForm submitText={t('submitTitle')} action={updateProductWrapper} locationSet={false} whichFunction='update'/>
    </div>
  )}

export default UpdateProductPage