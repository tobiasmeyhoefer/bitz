import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export default function Template({ children }: { children: React.ReactNode }) {
    const lang = cookies().get("NEXT_LOCALE")?.value
    revalidatePath(`/${lang}/conversations`)
    return <div>{children}</div>
  }