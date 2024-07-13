'use client'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { getUser, saveUserAddress, saveUserLocation } from '@/lib/user-actions'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import './address.css'
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from '@geoapify/react-geocoder-autocomplete'
import { AddressResult } from '@/lib/types'

interface AddressChangerProps {
  translations: {
    address: string
    changeAddress: string
    changeNow: string
  }
}
export default function AddressChanger({ translations }: AddressChangerProps) {
  const [address, setAddress] = useState<string>('')
  const [value, setValue] = useState('')
  const [result, setResult] = useState<AddressResult | null>(null)
  const { toast } = useToast()
  useEffect(() => {
    const getProduct = async () => {
      const user = await getUser()
      setAddress(user.adress ?? '')
    }
    getProduct()
  }, [])

  const form = useForm()

  async function onSubmit() {
    if (result) {
      if (!result.properties.housenumber) {
        toast({
          title: 'please add your housenumber ❌',
          duration: 2000,
        })
      } else {
        await saveUserAddress(result.properties.address_line1)
        await saveUserLocation(result.properties.postcode, result.properties.city)
        toast({
          title: 'Address changed successfully ✅',
          duration: 2000,
        })
      }
    } else {
      toast({
        title: 'please select an Address ❌',
        duration: 2000,
      })
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
  return (
    <div className="mb-6">
      <Form {...form}>
        <FormLabel>{translations.address}</FormLabel>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={'address'}
            render={({ field }) => (
              <FormItem>
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
          <Button className="mt-4" type="submit">
            {translations.changeNow}
          </Button>
        </form>
      </Form>
    </div>
  )
}
