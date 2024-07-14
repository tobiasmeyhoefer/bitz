import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import MyShopContent from '@/components/myShop/myshopContent'
import { getTranslations } from 'next-intl/server'
import Banner from '@/components/myShop/banner'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProductForm } from '@/components/myShop/product-form'

const MyShop = async () => {
  const t = await getTranslations('MyShop')
  const t2 = await getTranslations('addProductPage')
  const translations = {
    title: t2('title'),
    description: t2('description'),
    price: t2('price'),
    category: t2('category'),
    categoryPlaceholder: t2('categoryPlaceholder'),
    images: t2('images'),
    toastTitle: t2('toastTitle'),
    toastDescription: t2('toastDescription'),
    submitTitle: t2('submitTitle'),
    isDirectlyBuyable: t2('isDirectlyBuyable'),
    deletePicture: t2('deletePicture'),
  }

  return (
    <div className="inset-x-1/2 flex flex-col items-center">
      <Banner title={t('title')} />
      <div>
        <MyShopContent />
      </div>
      <div className="">
        {/* <div className='w-20 h-20 bg-green-300'></div> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-6 left-[calc(100vw-160px)] flex h-[60px] w-[60px] space-x-4 rounded-full text-3xl">
              +
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[600px] w-full max-w-[800px] overflow-y-auto rounded-xl p-0 md:h-[800px]">
            <ProductForm
              submitText={t2('submitTitle')}
              whichFunction="add"
              translations={translations}
            />
            <DialogClose className="hidden" id="closeDialog"></DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default MyShop
