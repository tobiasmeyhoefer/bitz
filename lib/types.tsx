type CardWithImageProps = {
  title: string
  desc: string
  content?: string
  imgUrl: string | string[]
  previewType: string /* shop || article */
  className?: React.HTMLAttributes<HTMLDivElement>
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
export type {
  CardWithImageProps,
  SearchBarProps,
  SearchTranslations,
  BrowseContentProps,
}
