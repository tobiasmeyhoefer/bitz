import { getTranslations } from 'next-intl/server';
import { getUserById } from '@/lib/useraction';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import MyShopContent from '@/components/myShop/myshopContent';
import { auth } from '@/auth';
import { MyShopProps } from '@/lib/types';
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
      <div className="w-full max-w-max p-2 border-2 border-gray-300 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold text-left mb-4">Meine Bitz</h1>

        <div className="flex justify-left space-x-4 mt-8">
         <Button>
          <Link href="myshop/add">{t('addProducts')}</Link>
         </Button>
        </div>
        <div className="m-5">
          <MyShopContent {...myShopProps} />  
        </div>
        
        
      </div>
    </div>
  );
} 

export default MyShop;
