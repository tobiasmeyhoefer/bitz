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
  price?: number
  timestamp?: Date
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
// type User = {
//   userId: string
// }

// type UserId = {
//   id: string
// }

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
}

type BrowseContentProps = {
  searchTranslations: SearchTranslations
  sortTranslations: SortProductsProps
}

type ProductType = {
  id?: string
  title: string
  description: string | null
  location?: string | null
  price: number
  category?: string
  createdAt?: Date
  sellerId?: string
  imageUrl1?: string | null
  imageUrl2?: string | null
  imageUrl3?: string | null
  imageUrl4?: string | null
  imageUrl5?: string | null
  isDirectlyBuyable?: boolean
  isSold?: boolean
  stripeId?: string
  paymentLink?: string
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
  SortProductsProps,
  SearchTranslations,
  BrowseContentProps,
  RevealOnScrollProps,
  ProductType,
  ProductImageCarouselProps,
  FormTranslations,
  // User,
  // UserId,
  MyShopProps,
  ProdDelAlert,
  Shop,
}
