import { AddProductForm } from '@/components/myShop/add-product-form'
import { getTranslations } from 'next-intl/server'
import {getUserById } from '@/lib/useraction'
import { addProduct } from '@/lib/productaction'
import { auth } from '@/auth'

const AddProductPage = async () => {
  let locationSet = false
  const session = await auth();
  const user = await getUserById(session?.user?.id!);
  try{
    if(user[0].location) {
      locationSet = true; 
    }
  }
  catch(err) {
  }
  const t = await getTranslations('addProductPage')
  return (
    <div className="absolute inset-x-1/2 top-24 flex flex-col items-center">
      <AddProductForm submitText={t('submitTitle')} action={addProduct} locationSet={locationSet} whichFunction='add'/>
    </div>
  )}

export default AddProductPage
