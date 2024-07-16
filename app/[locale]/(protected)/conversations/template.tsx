/**
 * Renders a template component that revalidates the `/[lang]/conversations` path when the component is rendered.
 * The component retrieves the current locale from the cookies and passes the children as the content to be rendered.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the template.
 * @returns {React.ReactElement} - The rendered template component.
 */
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export default function Template({ children }: { children: React.ReactNode }) {
    const lang = cookies().get("NEXT_LOCALE")?.value
    revalidatePath(`/${lang}/conversations`)
    return <div>{children}</div>
  }