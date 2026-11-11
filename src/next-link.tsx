// Stand-in for next/link. This demo is one page, so links into the rest of the site (/shop, /blog, …) do nothing
// when clicked; links to the apps (https://…) open normally.
import type { AnchorHTMLAttributes, Ref } from "react"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean; ref?: Ref<HTMLAnchorElement> }

export default function Link({ href, prefetch: _prefetch, onClick, ...rest }: Props) {
  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event)
        if (href.startsWith("/")) event.preventDefault()
      }}
      {...rest}
    />
  )
}
