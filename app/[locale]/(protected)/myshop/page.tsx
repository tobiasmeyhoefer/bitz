import {useTranslations} from 'next-intl';
import { Button, buttonVariants } from "@/components/ui/button"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MyShop = () => {
  const t = useTranslations('MyShop');
  const url = useTranslations('AddURL');
  return(
    <>
      <h1>{t("title")}</h1>
      <Button asChild className='absolute bottom-5 left-1/2'>
        <Link href={url("url")}>add</Link>
      </Button>
    </>
  )
}

export default MyShop
