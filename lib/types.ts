import { ProductType } from '@/schema'
import React from 'react'

type NavbarItemLinkProps = {
  linkTo: string
  text?: string
  icon?: React.ReactNode
  className?: string
}

type NavbarItemDropdownProps = {
  userImgSrc?: string | null
  signOut?: JSX.Element
  signOutLinkText?: string
  settingsLinkText?: string
  favoritesLinkText?: string
  transactionsLinkText?: string
}

type NavMenuDrawerProps = {
  menuItems: JSX.Element[]
  signOut: JSX.Element
}

type CardWithImageProps = {
  children?: React.ReactNode
  topRightSlot?: JSX.Element
  className?: React.HTMLAttributes<HTMLDivElement> | string
  favIcon?: boolean
  delIcon?: boolean
  shopID?: string
  product: ProductType
  editable: boolean
  viewTranslation: string
  myshopTranslations?: {
    sold: string
    menuDeleteOption: string
    title: string
    yousure: string
    cancel: string
    confirm: string
    
  }
}

type MyShopProps = {
  userId: string
  location: string
}

type SearchBarProps = {
  placeholder: string
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  suggestions: string[]
  suggestionsTitle: string
}

type SortProductsProps = {
  sortBy: string
  date: string
  price: string
}

type FilterProductsProps = {
  category: string
  location: string
  howtobuy: string
  price: string
  chooseCategory: string
  chooseLocation: string
  buyable: string
  delete: string
}

type addressChooserTranslations = {
  popupTitle: string
  addressError: string
  housenumberError: string
  SuccessToast: string
  submit: string
}

type SearchTranslations = {
  searchPlaceholder: string
  suggestions: string
}

type FormTranslations = {
  title: string
  description: string
  price: string
  category: string
  categoryPlaceholder: string
  images: string
  toastTitle: string
  toastDescription: string
  submitTitle: string
  isDirectlyBuyable: string
  deletePicture: string
}

type BrowseContentProps = {
  searchTranslations: SearchTranslations
  sortTranslations: SortProductsProps
  filterTranslations: FilterProductsProps
  addressChooserTranslations: addressChooserTranslations
  viewTranslations: string
}

type ProdDelAlert = {
  productId: string
}

type Shop = {
  id: string
  title: string
  description: string
  imageUrl1: string | null
  imageUrl2: string | null
  imageUrl3: string | null
  imageUrl4: string | null
  imageUrl5: string | null
}

type RevealOnScrollProps = {
  children: React.ReactNode
}

type AddressResult = {
  properties: {
    address_line1: string
    housenumber: string
    postcode: string
    city: string
  }
}

export type {
  NavbarItemLinkProps,
  NavbarItemDropdownProps,
  NavMenuDrawerProps,
  CardWithImageProps,
  SearchBarProps,
  SortProductsProps,
  FilterProductsProps,
  addressChooserTranslations,
  SearchTranslations,
  BrowseContentProps,
  RevealOnScrollProps,
  FormTranslations,
  MyShopProps,
  ProdDelAlert,
  Shop,
  AddressResult,
}
