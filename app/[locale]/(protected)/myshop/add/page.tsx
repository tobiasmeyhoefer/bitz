import { AddProductForm } from "@/components/myShop/add-product-form";
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import { IoMdArrowRoundBack } from "react-icons/io";

const AddProductPage = () => {
  const url = useTranslations('MyShopUrl');
  return(
    <div className="flex flex-col items-center absolute top-24 inset-x-1/2">
      <AddProductForm/>
    </div>
  )
}

export default AddProductPage
