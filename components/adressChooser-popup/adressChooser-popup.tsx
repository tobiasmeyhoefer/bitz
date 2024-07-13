'use client'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { getUser, saveUserAddress, saveUserLocation, saveUserName } from '@/lib/user-actions'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import '@/components/settings/address.css'
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from '@geoapify/react-geocoder-autocomplete'
import { AddressResult, addressChooserTranslations } from '@/lib/types'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BorderBeam } from '../magicui/border-beam'
import { Button } from '../ui/button'
import OnboardingBrowseCard from '../onboarding/onboarding-browse-card'
import { Input } from '../ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export default function AddressChooserPopup(params: { translations: addressChooserTranslations }) {
  const [address, setAddress] = useState<string>('')
  const [value, setValue] = useState('')
  const [result, setResult] = useState<AddressResult | null>(null)
  const [proccessFinished, setProccessFinished] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()
  useEffect(() => {
    const getProduct = async () => {
      const user = await getUser()
      setAddress(user.adress ?? '')
    }
    getProduct()
  }, [])

  const formSchema = z.object({
    name: z
      .string()
      .min(3, { message: 'not enough Characters' })
      .max(50, { message: 'too much Characters' })
      .refine((value) => /^[a-zA-Z0-9\s]+$/.test(value)),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  async function onSubmit(data: any) {
    if (result) {
      if (!result.properties.housenumber) {
        setError(params.translations.housenumberError)
      } else {
        await saveUserAddress(result.properties.address_line1)
        await saveUserLocation(result.properties.postcode, result.properties.city)
        await saveUserName(data.name)
        toast({
          title: params.translations.SuccessToast,
        })
        setError('')
        setError('')
        setProccessFinished(true)
      }
    } else {
      setError(params.translations.addressError)
    }
  }

  function sendPlaceDetailsRequest(feature: any, geocoder: any) {
    setResult(feature)
    return geocoder.sendPlaceDetailsRequest(feature)
  }

  function sendGeocoderRequest(value: any, geocoder: any) {
    setValue(value)
    return geocoder.sendGeocoderRequest(value)
  }

  if (proccessFinished) {
    return <OnboardingBrowseCard />
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Card className=" relative z-20 flex min-h-[200px] w-[500px] flex-col justify-evenly shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle>{params.translations.popupTitle}</CardTitle>
          {error ? <p className="mb-[-10px] text-red-600">{error}</p> : <></>}
        </CardHeader>
        <CardFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name={'name'}
                  render={({ field }) => (
                    <FormItem className="w-[21.5rem]">
                      <FormControl>
                        <Input placeholder="Enter your name here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={'address'}
                  render={({ field }) => (
                    <FormItem className="w-96">
                      <FormMessage />
                      <FormControl>
                        <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_ADDRESS_KEY}>
                          <GeoapifyGeocoderAutocomplete
                            value={address}
                            filterByCountryCode={['de']}
                            sendGeocoderRequestFunc={sendGeocoderRequest}
                            addDetails={true}
                            sendPlaceDetailsRequestFunc={sendPlaceDetailsRequest}
                            allowNonVerifiedStreet={false}
                            debounceDelay={10}
                          />
                        </GeoapifyContext>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button className="mt-4" type="submit">
                {params.translations.submit}
              </Button>
            </form>
          </Form>
        </CardFooter>
        <BorderBeam borderWidth={4} className="-z-10 -m-1" duration={10} />
      </Card>
      <div className="fixed inset-0 z-10 bg-black/70"></div>
    </div>
  )
}
