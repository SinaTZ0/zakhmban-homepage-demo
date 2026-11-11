// What the options really share: the real content, the new header and footer, and the product and article cards.
import Link from "next/link"
import { Bell, CreditCard, FolderOpen, LockKeyhole, MapPin, Menu, ShieldCheck, Star, type LucideIcon } from "lucide-react"

import { formatToman } from "@/lib/utils"
import { APP_LINKS, siteConfig, toTelHref } from "@/config/site"
import type { ProductListItem } from "@/lib/api/types"

import { Button } from "./ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"

export {
  PATIENT_FAQS,
  PATIENT_STEPS,
  PATIENT_TRUST,
  THERAPIST_FAQS,
  THERAPIST_POINTS,
  THERAPIST_STEPS,
} from "@/components/audience/content"
export { APP_LINKS, siteConfig, toTelHref }

export type Category = { id: string; name: string; handle: string }
export type Post = { slug: string; title: string; excerpt: string; category: string; image: string | null; readingTime: number }
export type HomeData = { categories: Category[]; products: ProductListItem[]; posts: Post[] }

/** The audience content's point icons, as lucide icons. */
export const POINT_ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck, lock: LockKeyhole, card: CreditCard, map: MapPin, folder: FolderOpen, bell: Bell, star: Star,
}

export const fa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])

/** The dressing families, as in today's DressingGuide. */
export const DRESSINGS = [
  { name: "فوم", icon: "dressing-foam", note: "برای زخم‌های با ترشح متوسط تا زیاد" },
  { name: "آلژینات", icon: "dressing-alginate", note: "جذب بالا؛ مناسب زخم‌های عمیق و پرترشح" },
  { name: "هیدروکلوئید", icon: "dressing-hydrocolloid", note: "محیط مرطوب برای زخم‌های سطحی کم‌ترشح" },
  { name: "هیدروژل", icon: "dressing-hydrogel", note: "رطوبت‌رسانی به زخم‌های خشک" },
  { name: "نقره", icon: "dressing-silver", note: "ضدمیکروب برای زخم‌های مستعد عفونت" },
  { name: "کلاژن", icon: "dressing-collagen", note: "حمایت از ترمیم زخم‌های دیرترمیم" },
  { name: "فیلم شفاف", icon: "dressing-film", note: "پوشش شفاف و ضدآب برای زخم‌های سطحی" },
  { name: "سوپرجاذب", icon: "dressing-superabsorbent", note: "برای ترشح بسیار زیاد" },
]

export const EMERGENCY =
  "زخم‌بان برای مراقبت برنامه‌ریزی‌شده از زخم است. در شرایط اورژانسی، مانند خون‌ریزی شدید یا علائم عفونت همراه با تب بالا، با اورژانس ۱۱۵ تماس بگیرید یا به نزدیک‌ترین مرکز درمانی مراجعه کنید."

/** What a therapist sees of a request before and after the patient picks them (PATIENT_FAQS 2, PATIENT_TRUST 2). */
export const VISIBILITY = {
  before: ["شهر و محدوده درخواست", "نوع زخم و خدمت موردنیاز", "سوابق و تصاویری که در درخواست ثبت کرده‌اید"],
  after: ["نشانی دقیق", "شماره تماس", "پرونده درمان برای ثبت جلسه‌ها"],
}

export const NAV = [
  { label: "بیماران و همراهان", href: "/patients" },
  { label: "درمانگران", href: "/therapists" },
  { label: "مجله آموزشی", href: "/blog" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
]

export const LEGAL = [
  { label: "قوانین و مقررات", href: "/terms" },
  { label: "حریم خصوصی", href: "/privacy-policy" },
  { label: "شرایط بازگشت وجه", href: "/refund-policy" },
  { label: "شرایط عضویت درمانگران", href: "/therapist-terms" },
]

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex min-h-11 items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.svg" alt="" width={36} height={36} className="size-9" />
      <span className="text-xl font-extrabold tracking-tight">زخم‌بان</span>
    </Link>
  )
}

export function BrandIcon({ name, size = 48, className = "" }: { name: string; size?: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/icons/home/${name}.svg`} alt="" width={size} height={size} className={className} style={{ width: size, height: size }} />
}

/** `floating`: a glass pill that floats over the page (option 5); the default is a full-width bar. */
export function Header({ categories, floating = false }: { categories: Category[]; floating?: boolean }) {
  return (
    <header
      className={
        floating
          ? "sticky top-3 z-40 px-3 sm:px-4"
          : "sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75"
      }
    >
      <div
        className={
          floating
            ? "mx-auto flex h-16 max-w-[1240px] 2xl:max-w-[1400px] items-center gap-3 rounded-full border border-white/60 bg-background/75 ps-4 pe-2 shadow-[0_10px_40px_-16px_rgb(15_23_42/0.35)] backdrop-blur-xl"
            : "mx-auto flex h-18 max-w-[1240px] items-center gap-4 px-4 sm:px-6"
        }
      >
        <Logo />
        <NavigationMenu className="hidden lg:flex" align="start">
          <NavigationMenuList className="gap-0.5">
            {NAV.slice(0, 2).map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink render={<Link href={item.href} />} className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger>فروشگاه</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] grid-cols-2 gap-1 p-2">
                  {categories.slice(0, 8).map((category) => (
                    <li key={category.id}>
                      <NavigationMenuLink render={<Link href={`/shop?category=${category.handle}`} />}>{category.name}</NavigationMenuLink>
                    </li>
                  ))}
                  <li className="col-span-2">
                    <NavigationMenuLink render={<Link href="/shop" />} className="font-semibold text-primary">
                      همه محصولات فروشگاه
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {NAV.slice(2).map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink render={<Link href={item.href} />} className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ms-auto flex items-center gap-2">
          {/* Hidden from 1024 to 1280: next to the full menu it pushes the header past the screen; the menu has «درمانگران». */}
          <Button variant="ghost" className="hidden sm:inline-flex lg:max-xl:hidden" render={<Link href="/therapists/join" />}>
            ثبت‌نام درمانگر
          </Button>
          <Button render={<a href={APP_LINKS.patient.newRequest} />}>ثبت درخواست مراقبت</Button>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="منو" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-2 text-base">
                {[...NAV.slice(0, 2), { label: "فروشگاه", href: "/shop" }, ...NAV.slice(2)].map((item) => (
                  <Link key={item.href} href={item.href} className="flex min-h-12 items-center rounded-lg px-3 hover:bg-muted">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Separator />
              <div className="flex flex-col gap-2 p-4">
                <Button size="lg" render={<a href={APP_LINKS.patient.newRequest} />}>ثبت درخواست مراقبت</Button>
                <Button size="lg" variant="outline" render={<Link href="/therapists/join" />}>ثبت‌نام درمانگر</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

/** `wide`: the modern options (5–8) widen to 1400px on large screens, as their sections do. */
export function Footer({ categories, wide = false }: { categories: Category[]; wide?: boolean }) {
  const column = (title: string, links: { label: string; href: string }[]) => (
    <div>
      <h2 className="mb-3 text-sm font-bold text-ink-foreground">{title}</h2>
      <ul className="space-y-0.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-10 items-center text-sm text-ink-foreground/75 hover:text-ink-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className={`mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] ${wide ? "2xl:max-w-[1400px]" : ""}`}>
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.svg" alt="" className="size-10 rounded-xl bg-white p-1" />
            <span className="text-xl font-extrabold">زخم‌بان</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-ink-foreground/75">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-ink-foreground/75">{siteConfig.address}</p>
          <p className="mt-1 text-sm">
            <a href={toTelHref(siteConfig.landline)} className="inline-flex min-h-10 items-center" dir="ltr">
              {siteConfig.landline}
            </a>
          </p>
        </div>
        {column("زخم‌بان", NAV)}
        {column("فروشگاه", [...categories.slice(0, 5).map((c) => ({ label: c.name, href: `/shop?category=${c.handle}` })), { label: "همه محصولات", href: "/shop" }])}
        {column("قوانین", [...LEGAL, { label: "پیگیری وضعیت ثبت‌نام", href: "/therapists/status" }])}
      </div>
      <div className="border-t border-white/10">
        <p className={`mx-auto max-w-[1240px] px-4 py-5 text-xs text-ink-foreground/60 sm:px-6 ${wide ? "2xl:max-w-[1400px]" : ""}`}>
          همه حقوق برای زخم‌بان محفوظ است.
        </p>
      </div>
    </footer>
  )
}

export function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_14px_34px_-20px_rgb(15_23_42/0.4)] focus-visible:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        {product.primaryImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.primaryImage} alt="" className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.brand && <span className="text-xs text-muted-foreground">{product.brand.name}</span>}
        <span className="line-clamp-2 text-[0.9375rem] font-semibold leading-7">{product.name}</span>
        <span className="mt-auto pt-2 text-sm font-bold text-primary">
          {product.priceOnRequest || product.priceFrom === null ? "قیمت پس از استعلام" : `از ${formatToman(product.priceFrom)}`}
        </span>
      </div>
    </Link>
  )
}

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col gap-3">
      {!compact && (
        <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt="" className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]" />
          )}
        </div>
      )}
      <span className="text-xs font-medium text-link">
        {post.category} <span className="text-muted-foreground">، {fa(post.readingTime)} دقیقه مطالعه</span>
      </span>
      <span className="text-lg font-bold leading-8 transition-colors duration-300 group-hover:text-primary">{post.title}</span>
      <span className="line-clamp-2 text-sm leading-7 text-muted-foreground">{post.excerpt}</span>
    </Link>
  )
}
