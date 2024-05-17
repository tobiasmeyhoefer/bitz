import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getUserById } from '@/lib/useraction';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import MyShopContent from '@/components/myShop/myshopContent';
import NavBar from '@/components/navigation/NavBar';
import { useSession } from 'next-auth/react';
import { auth } from '@/auth';
import { MyShopProps } from '@/lib/types';
import { PopAlert } from '@/components/myShop/popalert';

const MyShop = async () => {
  let location;
  const t = await getTranslations('MyShop');
  const session = await auth();
  const user = await getUserById(session?.user?.id!);
  const userId = session?.user?.id!;
  try {
    if (user[0].location) {
      location = user[0].location;
    }
  } catch (err) {}

  const myShopProps: MyShopProps = {
    userId: userId,
    location: location
  };

  return (
    <div className="pt-24 inset-x-1/2 top-24 flex flex-col items-center"> 
      <div className="w-full max-w-7xl p-5 border-2 border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Meine Bitz</h1>

        <div className="flex justify-center space-x-4 mt-8">
  <Button>
    <Link href="myshop/add">{t('addProducts')}</Link>
  </Button>
  
    <PopAlert />
  
  <Button>
    <Link href="myshop/update">{t('updateProducts')}</Link>
  </Button>
        </div>

        <MyShopContent userId={userId} location={location} />
      </div>
    </div>
  );
}

export default MyShop;
