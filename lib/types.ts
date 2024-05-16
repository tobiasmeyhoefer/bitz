type CardWithImageProps = {
  title: string
  desc: string
  content?: string
  imgUrl1?: string | null | string[]
  previewType: string /* shop || article */
  className?: React.HTMLAttributes<HTMLDivElement> | string
  icon?: any
  shopID?: number
  productID?: number
  product?: any
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

// type Product = {
//   title: string
//   description: string
//   price: number
//   currency: string
//   quantity: number
//   location: string
//   status: string
//   image?: string
// }

type ProductType = {
  title: string
  description: string
  price: number
  quantity: number
  createdAt?: Date
  sellerId?: string
  imageUrl1?: string | null
  imageUrl2?: string | null
  imageUrl3?: string | null
  imageUrl4?: string | null
  imageUrl5?: string | null

  // title: string;
  // description: string;
  // price: number;
  // currency: string;
  // quantity: number;
  // location: string;
  // status: string;
  // sellerId: string;
  // createdAt: Date;
  // image: string;
}

type Shop = {
  title: string
  description: string
  image?: string[]
}

type RevealOnScrollProps = {
  children: React.ReactNode
}

export type {
  CardWithImageProps,
  SearchBarProps,
  SearchTranslations,
  BrowseContentProps,
  Shop,
  RevealOnScrollProps,
  ProductType,
}
