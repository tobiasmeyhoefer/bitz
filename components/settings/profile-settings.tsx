/**
 * The `ProfileSettings` component renders the user's profile settings, including their profile image, name, and address.
 * It uses various child components to handle the different settings, such as `NameChanger`, `LocationChooser`, `AddressChanger`, and `PictureChanger`.
 * The component fetches the user's data using the `getUser` function from `@/lib/user-actions` and the translations using `getTranslations` from `next-intl/server`.
 * The `changeUserImage` function from `@/lib/user-actions` is used to update the user's profile image.
 */
import { getUser } from '@/lib/user-actions'
import Image from 'next/image'
import { FaUserCircle } from 'react-icons/fa'
import NameChanger from './name-changer'
import LocationChooser from './location-chooser'
import AddressChanger from './address-changer'
import PictureChanger from './picture-changer'
import { getTranslations } from 'next-intl/server'
import { changeUserImage } from '@/lib/user-actions'

const ProfileSettings = async () => {
  const user = await getUser()
  const t = await getTranslations('Settings')
  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold">{t('profilesettings')}</h3>
      <div className="mb-8 flex justify-center gap-8">
        {user.image ? (
          <Image
            className="h-40 w-40 rounded-full"
            width={200}
            height={200}
            src={user!.image!}
            alt="user image"
          />
        ) : (
          <FaUserCircle className="h-40 w-40 rounded-full" />
        )}
        <PictureChanger
          title={t('imageChangeTitle')}
          submitTitle={t('submitTitle')}
          action={changeUserImage}
        />
      </div>
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
          }}
        />
      </div>
    </div>
  )
}

export default ProfileSettings
