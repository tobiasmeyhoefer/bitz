/**
 * The main component for the MyShop page.
 *
 * This component renders the MyShop page, which includes a banner, the MyShopContent component, and a floating button that opens a dialog to add a new product.
 *
 * The component uses the `getTranslations` function from `next-intl/server` to fetch translations for the page content.
 *
 * The `getBanner` function from `@/lib/user-actions` is used to fetch the banner data to be displayed.
 *
 * The `ProductForm` component is rendered inside the dialog, which allows the user to add a new product.
 */
import { Button } from '@/components/ui/button'
import MyShopContent from '@/components/my-shop/my-shop-content'
import Banner from '@/components/my-shop/banner'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ProductForm } from '@/components/my-shop/product-form'
import { getBanner } from '@/lib/user-actions'
import { getTranslations } from 'next-intl/server'

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
  const banner = await getBanner()
  return (
    <div className="inset-x-1/2 flex flex-col items-center">
      <Banner title={t('title')} myBanner={banner} />
      <div className="mt-40">
        <MyShopContent />
      </div>
      <div className="">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-6 left-[calc(100vw-160px)] flex h-[60px] w-[60px] space-x-4 rounded-full text-3xl">
              +
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[600px] w-full max-w-[800px] overflow-y-auto rounded-xl p-0 md:h-[65vh] md:max-h-[800px]">
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
