import { getTranslations } from 'next-intl/server'
import { getUser, getUserById } from '@/lib/useraction'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import MyShopContent from '@/components/myShop/myshopContent'
import { auth } from '@/auth'
import { MyShopProps } from '@/lib/types'

const MyShop = async () => {
  let location
  let adress
  let id
  const t = await getTranslations('MyShop')
  const users = await getUser()
  const user = users?.[0]
  if (user) {
    id = user.id
    location = user.location
    adress = user.adress
  }
  const myShopProps: MyShopProps = {
    userId: id!,
    location: location!,
  }

  return (
    <div className="inset-x-1/2 top-24 flex flex-col items-center">
      <div className="w-full max-w-max rounded-lg border-2 border-gray-300 px-20 py-10 shadow-lg">
        <h1 className="mb-4 text-left text-3xl font-bold">Meine Bitz</h1>
        <div className="">
          <MyShopContent {...myShopProps} />
        </div>
        <div className="fixed bottom-0 right-0 mt-8 flex justify-end space-x-4 px-10 py-5">
          <Button>
            <Link href="myshop/add">{t('addProducts')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyShop
