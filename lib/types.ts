type CardWithImageProps = {
  title: string
  desc: string
  content?: string
  imgUrl: string | string[] | undefined
  previewType: string /* shop || article */
  className?: React.HTMLAttributes<HTMLDivElement> | string
  icon?: any
  productId?: string
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

type BrowseContentProps = {
  searchTranslations: SearchTranslations
}

type Product = {
  title: string
  description: string
  price: number
  currency: string
  quantity: number
  location: string
  status: string
  image?: string
}

type FullProductType = {
  id: string
  title: string
  description: string
  price: number
  currency: string
  quantity: number
  location: string
  status: string
  sellerId: string
  createdAt: Date
  imageUrl1: string | null
  imageUrl2: string | null
  imageUrl3: string | null
  imageUrl4: string | null
  imageUrl5: string | null
};

type FullProductNullType = {
  id: string
  title: string
  description: string | null
  price: number 
  currency: string 
  quantity: number 
  location: string | null
  status: string
  sellerId: string
  createdAt: Date
  imageUrl1: string | null
  imageUrl2: string | null
  imageUrl3: string | null
  imageUrl4: string | null
  imageUrl5: string | null
};

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
  CardWithImageProps,
  SearchBarProps,
  SearchTranslations,
  BrowseContentProps,
  Product,
  Shop,
  RevealOnScrollProps,
  FullProductType,
  FullProductNullType
}
