import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server';
import { getUserById } from '@/lib/useraction'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import MyShopContent from '@/components/myShop/myshopContent'
import NavBar from '@/components/navigation/NavBar'
import { useSession } from 'next-auth/react';
import { auth } from '@/auth'
import { MyShopProps } from '@/lib/types'


const MyShop = async () => {
  let location
  const t = await getTranslations('MyShop');
    const session = await auth()
    const user = await getUserById(session?.user?.id!)
    const userId = session?.user?.id!
    try {
        if (user[0].location) {
            location = user[0].location
        }
    } catch (err) { }
  
  const myShopProps: MyShopProps = {
    userId: userId,
    location: location
  }
  

 
  
    
    return (
      <div className='inset-x-1/2 top-24 flex flex-col items-center'>
        <h1>MyShop</h1>
        <p>Current User ID: {userId}</p>
        <MyShopContent userId={userId} location={location}/>
                  
        <div className='inset-x-1/2 top-24 flex flex-col items-center'>
          </div>
            <Button className="absolute bottom-20 left-1/4">
                <Link href="myshop/add">{t('addProducts')}</Link>
        </Button>
          <Button className="absolute bottom-20 left-2/4">
                <Link href="myshop/">{t('deleteProduct'
                  
                )}</Link>
            </Button>
            
            <Button className="absolute bottom-20 left-3/4">
                <Link href="myshop/update">{t('updateProducts')}</Link>
            </Button>
      </div>
    );

}

export default MyShop


