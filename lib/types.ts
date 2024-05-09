type CardWithImageProps = {
  title: string
  desc: string
  content?: string
  imgUrl: string | string[] | undefined
  previewType: string /* shop || article */
  className?: React.HTMLAttributes<HTMLDivElement> | string
  icon?: any
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
  imgUrl?: string | undefined
}

type Shop = {
  title: string
  description: string
  imgUrl?: string[] | undefined
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
  RevealOnScroll,
}
