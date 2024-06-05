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
}

type NavMenuDrawerProps = {
  menuItems: JSX.Element[]
  signOut: JSX.Element
}

type CardWithImageProps = {
  title: string
  desc: string | undefined
  content?: string
  imgUrl1?: string | null | string[]
  className?: React.HTMLAttributes<HTMLDivElement> | string
  favIcon?: boolean
  delIcon?: boolean
  shopID?: string
  productID?: string
  product?: ProductType
  editable: boolean
}
type User = {
  userId: string
}

type UserId = {
  id: string
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

type SearchTranslations = {
  searchPlaceholder: string
  suggestions: string
}

type FormTranslations = {
  title: string
  description: string
  price: string
  quantity: string
  category: string
  categoryPlaceholder: string
  images: string
  toastTitle: string
  toastDescription: string
  submitTitle: string
}

type BrowseContentProps = {
  searchTranslations: SearchTranslations
}

type ProductType = {
  id?: string
  title: string
  description?: string
  price: number
  quantity: number
  category?: string
  createdAt?: string
  sellerId?: string
  imageUrl1?: string | null
  imageUrl2?: string | null
  imageUrl3?: string | null
  imageUrl4?: string | null
  imageUrl5?: string | null
  isDirectlyBuyable?: boolean
  isSold?: boolean
  stripeId?: string
  paymentUrl?: string
}

type ProductImageCarouselProps = {
  translations: {
    image: string
    of: string
  }
  images: string[]
  className: string
  sellerId: string
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

export type {
  NavbarItemLinkProps,
  NavbarItemDropdownProps,
  NavMenuDrawerProps,
  CardWithImageProps,
  SearchBarProps,
  SearchTranslations,
  BrowseContentProps,
  RevealOnScrollProps,
  ProductType,
  ProductImageCarouselProps,
  FormTranslations,
  User,
  UserId,
  MyShopProps,
  ProdDelAlert,
  Shop,
}
