import { getUser } from '@/lib/user-actions'
import Image from 'next/image'
import { FaUserCircle } from 'react-icons/fa'
import NameChanger from './name-changer'
import LocationChooser from './LocationChooser'
import AddressChanger from './address-changer'
import PictureChanger from './picture-changer'
import { getTranslations } from 'next-intl/server'
import { changeUserImage } from '@/lib/user-actions'

const ProfileSettings = async () => {
  const user = await getUser()
  const t = await getTranslations('Settings')
  return (
    <div>
      <div className="mb-8 flex justify-center gap-4">
        {user.image ? (
          <Image
            className="w-40 rounded-full"
            width={200}
            height={200}
            src={user!.image!}
            alt="user image"
          />
        ) : (
          <FaUserCircle className="w-40 rounded-full" />
        )}
        <PictureChanger
          title={t('imageChangeTitle')}
          submitTitle={t('submitTitle')}
          action={changeUserImage}
        />
      </div>
      <h3 className="mb-4 text-2xl font-bold">{t('username')}</h3>
      <div className="flex flex-col">
        <NameChanger
          translations={{
            username: t('username'),
            changeName: t('changeName'),
            changeNow: t('changeNow'),
          }}
        />
        <AddressChanger
          translations={{
            address: t('address'),
            changeAddress: t('changeAddress'),
            changeNow: t('changeNow'),
          }}/>
      </div>
    </div>
  )
}

export default ProfileSettings
