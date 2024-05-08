import { AddProductForm } from '@/components/myShop/add-product-form'
import { getTranslations } from 'next-intl/server'
import { addProduct, getUserById } from '@/lib/action'
import { auth } from '@/auth'

const AddProductPage = async () => {
  let locationSet = false
  const session = await auth();
  const user = await getUserById(session?.user?.id!);
  if(user[0].location) {
    locationSet = true; 
  }
  const t = await getTranslations('addProductPage')
  return (
    <div className="absolute inset-x-1/2 top-24 flex flex-col items-center">
      <AddProductForm submitText={t('submitTitle')} action={addProduct} locationSet={locationSet} />
    </div>
  )}

export default AddProductPage
