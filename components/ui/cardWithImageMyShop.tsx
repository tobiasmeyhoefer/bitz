// components/ui/cardWithImageMyShop.tsx

import * as React from 'react'
import { CardWithImage } from './cardWithImage'
import { CardWithImageProps } from '@/lib/types'
import { ProdDelAlert } from '../myShop/productDelAlert'
import { useTranslations } from 'next-intl'

const CardWithImageMyShop = React.forwardRef<HTMLDivElement, CardWithImageProps>(
  (props, ref) => {
    const t = useTranslations('ProdDelAlert');

    return (
      <CardWithImage
        ref={ref}
        {...props}
        
        /*
        topRightSlot={
          props.editable && props.favIcon ? (
            <ProdDelAlert
              menuDeleteOption={t('menuDeleteOption')}
              productId={props.product.id}
              title={t('title')}
              yousure={t('yousure')}
              cancel={t('cancel')}
              confirm={t('confirm')}
            />
          ) : undefined          
        }
        */
      />
    )
  }
);

CardWithImageMyShop.displayName = 'CardWithImageMyShop';

export { CardWithImageMyShop };
