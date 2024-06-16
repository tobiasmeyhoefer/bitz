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
import { getUser, saveUserAdress, saveUserLocation } from '@/lib/user-actions'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
// import '@geoapify/geocoder-autocomplete/styles/round-borders.css'
import './address.css'
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from '@geoapify/react-geocoder-autocomplete'
import { AddressResult } from '@/lib/types'

// const formSchema = z.object({
//   adress: z
//     .string()
//     .regex(/^[a-zA-Z0-9äöüÄÖÜß\s]+$/, { message: 'No special characters allowed' })
//     .min(4)
//     .max(60),
// })

export default function AdressChanger() {
  const [adress, setAdress] = useState<string>('')
  const [value, setValue] = useState('')
  const [result, setResult] = useState<AddressResult | null>(null)
  const { toast } = useToast()
  useEffect(() => {
    const getProduct = async () => {
      const user = await getUser()
      setAdress(user.adress ?? '')
    }
    getProduct()
  }, [])

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  // })
  const form = useForm()

  async function onSubmit() {
    if (result) {
      if (!result.properties.housenumber) {
        toast({
          title: 'please add your housenumber ❌',
        })
      } else {
        await saveUserAdress(result.properties.address_line1)
        await saveUserLocation(result.properties.postcode, result.properties.city)
        toast({
          title: 'Address changed successfully ✅',
        })
      }
    } else {
      toast({
        title: 'please select an Address ❌',
      })
    }
  }
  function sendPlaceDetailsRequest(feature: any, geocoder: any) {
    setResult(feature)
    console.log(feature)
    return geocoder.sendPlaceDetailsRequest(feature)
  }

  function sendGeocoderRequest(value: any, geocoder: any) {
    setValue(value)
    return geocoder.sendGeocoderRequest(value)
  }
  return (
    <div className="mb-6">
      <Form {...form}>
        <FormLabel>change Adress</FormLabel>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={'adress'}
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_ADDRESS_KEY}>
                    <GeoapifyGeocoderAutocomplete
                      value={adress}
                      filterByCountryCode={['de']}
                      sendGeocoderRequestFunc={sendGeocoderRequest}
                      addDetails={true}
                      sendPlaceDetailsRequestFunc={sendPlaceDetailsRequest}
                      allowNonVerifiedStreet={false}
                      debounceDelay={10}
                      // type={'street'}
                    />
                  </GeoapifyContext>
                  {/* <Input {...field} defaultValue={adress} /> */}
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="mt-4" type="submit" variant={'secondary'}>
            change
          </Button>
        </form>
      </Form>
    </div>
  )
}
