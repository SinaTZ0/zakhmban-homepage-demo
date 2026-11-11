"use client"

// Option 9 · Composed: option 8 with the white space taken out. The hero is a little shorter, so the page below
// peeks over the fold; under it, one pale tray rises over the photo's bottom edge like a sheet, and every section is
// a white panel on it, a few pixels apart, with the same inner padding. The sparse sections are merged into
// bentos: trust as one large privacy panel beside two small ones; the journal and the questions side by side; the
// closing call with the support line. The hero, the lanes and the dressing guide are option 8's own.
import Link from "next/link"
import { useRef, useState } from "react"
import { Check, ChevronLeft, ChevronRight, CreditCard, Eye, LockKeyhole, ShieldCheck, Siren } from "lucide-react"

import { cn } from "cn"

import { EASE, TYPE, type Who, wrap } from "./option-5"
import { FADE, ORDER, Switch } from "./option-7"
import { Hero } from "./option-8"
import { Arcs, DressingGuide, Swash } from "./option-8-dressings"
import { LaneStudies } from "./option-9-lanes"
import { Accent, HAIRLINE, HERO_CURVE, Medallion, Meta } from "./option-8-sections"
import { APP_LINKS, EMERGENCY, Footer, Header, type HomeData, PATIENT_FAQS, PATIENT_TRUST, ProductCard, THERAPIST_FAQS, VISIBILITY, siteConfig, toTelHref } from "./parts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Button } from "./ui/button"

/** Every panel on the tray: white, one radius, a hairline ring. */
export const PANEL = "rounded-[28px] bg-card ring-1 ring-foreground/[0.04] sm:rounded-[32px]"
/** One inner padding for every panel. */
export const PAD = "px-5 py-8 sm:p-10 xl:p-12"

/* ------------------------------------------------------------------------------------------------------------ */

/**
 * Trust as a bento: the main promise (what a therapist sees before and after the pick) as the large pale panel
 * with its sketch over the arcs; verification and payment as two small panels beside it, filling its height.
 */
/** `compact` (option 10): the two small panels put the medallion beside the title, so the column is no taller than
 *  the privacy panel's own content, and the house sketch is larger. */
export function TrustBento({ compact = false }: { compact?: boolean }) {
  const [verified, privacy, payment] = PATIENT_TRUST
  // Verification is the one solid green tile on the page; payment stays white with a blue badge.
  const small = [
    { ...verified, sketch: "/design-study/trust-verified.webp", icon: ShieldCheck, green: true },
    { ...payment, sketch: "/design-study/trust-payment.webp", icon: CreditCard, green: false },
  ]
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:gap-5 lg:grid-cols-12">
      <section className={cn(PANEL, PAD, "relative isolate flex flex-col overflow-hidden bg-secondary ring-primary/10 lg:col-span-7 lg:row-span-2")}>
        <Arcs className="pointer-events-none absolute -top-24 end-[-6rem] -z-10 size-[30rem] text-primary/10" />
        <div className="grid items-start gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h2 className={TYPE.heading}>
              با خیال <Accent>راحت</Accent> انتخاب کنید
            </h2>
            <p className={`mt-4 max-w-md ${TYPE.body}`}>زخم‌بان برای امنیت بیمار و حریم خصوصی او ساخته شده است.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/design-study/trust-privacy.webp" alt="" className={cn("w-32 max-sm:hidden", compact ? "lg:w-52" : "lg:w-44")} />
        </div>

        {/* The card sits at the panel's foot when the two small panels make it taller; at least 32px below the words. */}
        <div aria-hidden className="min-h-8 flex-1" />
        <div className="rounded-[24px] bg-card p-5 shadow-[0_18px_40px_-30px_rgb(15_23_42/0.5)] ring-1 ring-primary/10 sm:p-6">
          <div className="flex items-start gap-4">
            <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_22px_-12px_var(--primary)]">
              <LockKeyhole className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-8">{privacy.title}</h3>
              <p className="mt-1 text-[0.9375rem] leading-7 text-muted-foreground">{privacy.desc}</p>
            </div>
          </div>
          <div className="relative mt-5 grid gap-5 pt-5 sm:grid-cols-2 sm:gap-8">
            <span aria-hidden className={HAIRLINE} />
            {/* Between the two sides: a vertical hairline fading at both ends. */}
            <span aria-hidden className="pointer-events-none absolute inset-y-5 start-1/2 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent max-sm:hidden" />
            <div>
              <p className="flex items-center gap-2 text-sm font-bold">
                <Eye className="size-4 text-primary" />
                پیش از انتخاب می‌بینند
              </p>
              <ul className="mt-2 space-y-1.5">
                {VISIBILITY.before.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                    <Check className="mt-1 size-4 shrink-0 text-success" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm font-bold">
                <LockKeyhole className="size-4 text-primary" />
                فقط پس از انتخاب شما
              </p>
              <ul className="mt-2 space-y-1.5">
                {VISIBILITY.after.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                    <LockKeyhole aria-hidden className="mt-1 size-4 shrink-0 text-primary/45" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {small.map((promise) => (
        <div
          key={promise.title}
          className={cn(
            PANEL,
            PAD,
            "relative isolate flex flex-col gap-6 overflow-hidden lg:col-span-5",
            compact && "gap-5 sm:p-10",
            promise.green && "bg-success text-primary-foreground ring-0 shadow-[0_24px_48px_-30px_var(--success)]",
          )}
        >
          {/* The arcs again, centred on the medallion. */}
          <Arcs
            className={cn(
              "pointer-events-none absolute -top-36 -start-36 -z-10 size-[26rem] sm:-start-28 xl:-start-24",
              promise.green ? "text-primary-foreground/15" : "text-primary/[0.07]",
            )}
          />
          <div className={cn(compact && "flex items-center gap-5")}>
          <span className="relative inline-block shrink-0 self-start">
            <Medallion src={promise.sketch} className={compact ? "size-20" : "size-20 sm:size-24"} />
            <span
              aria-hidden
              className={cn(
                "absolute -end-1 -top-1 inline-flex size-8 items-center justify-center rounded-full ring-4",
                promise.green ? "bg-primary-foreground text-success ring-success" : "bg-primary text-primary-foreground ring-card",
              )}
            >
              <promise.icon className="size-4" />
            </span>
          </span>
            {compact && <h3 className={TYPE.title}>{promise.title}</h3>}
          </div>
          <div className={cn(!compact && "mt-auto")}>
            {!compact && <h3 className={TYPE.title}>{promise.title}</h3>}
            <p className={cn(!compact && "mt-2", "text-[0.9375rem] leading-7", promise.green ? "text-primary-foreground/85" : "text-muted-foreground")}>{promise.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */

/** The shop's carousel as a panel; the row of products runs to the panel's edges. */
export function Shop({ products }: Pick<HomeData, "products">) {
  const scroller = useRef<HTMLDivElement>(null)
  // RTL: "next" moves toward the left edge.
  const move = (dir: 1 | -1) => scroller.current?.scrollBy({ left: -dir * 480, behavior: "smooth" })
  if (products.length === 0) return null
  return (
    <section className={cn(PANEL, PAD, "overflow-hidden")}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className={TYPE.heading}>
            فروشگاه <Accent>زخم‌بان</Accent>
          </h2>
          <p className={`mt-4 ${TYPE.body}`}>پانسمان‌ها، محلول‌ها و تجهیزات مراقبت از زخم؛ خرید در برنامه بیمار.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="icon" aria-label="محصولات قبلی" onClick={() => move(-1)}>
            <ChevronRight />
          </Button>
          <Button variant="outline" size="icon" aria-label="محصولات بعدی" onClick={() => move(1)}>
            <ChevronLeft />
          </Button>
          <Button render={<Link href="/shop" />}>ورود به فروشگاه</Button>
        </div>
      </div>
      <div
        ref={scroller}
        className="scrollbar-hide -mx-5 mt-8 flex snap-x gap-4 overflow-x-auto scroll-smooth px-5 py-2 sm:-mx-10 sm:scroll-px-10 sm:px-10 xl:-mx-12 xl:scroll-px-12 xl:px-12"
      >
        {products.slice(0, 10).map((product) => (
          <div key={product.id} className="w-56 shrink-0 snap-start sm:w-60">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */

type Post = HomeData["posts"][number]

/** The journal, narrow: the lead post with its photo, then three more as a list with small photos. */
/** `more`: how many posts follow the lead in the list. */
export function Journal({ posts, more = 3 }: { posts: Post[]; more?: number }) {
  const [lead, ...rest] = posts
  return (
    <section className={cn(PANEL, PAD, "flex flex-col lg:col-span-5")}>
      <div className="flex items-center justify-between gap-4">
        <h2 className={TYPE.heading}>
          مجله <Accent>آموزشی</Accent>
        </h2>
        <Button variant="ghost" className="text-link" render={<Link href="/blog" />}>
          همه مقالات
          <ChevronLeft data-icon="inline-end" />
        </Button>
      </div>

      <Link href={`/blog/${lead.slug}`} className="group mt-8 block rounded-[24px] outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        <div className="aspect-[16/9] overflow-hidden rounded-[24px] bg-muted">
          {lead.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={lead.image} alt="" className={`size-full object-cover transition-transform duration-700 ${EASE} group-hover:scale-[1.03]`} />
          )}
        </div>
        <div className="mt-4">
          <Meta post={lead} />
          <p className={`mt-1 ${TYPE.title} transition-colors duration-300 group-hover:text-primary`}>{lead.title}</p>
        </div>
      </Link>

      <ul className="mt-6">
        {rest.slice(0, more).map((post) => (
          <li key={post.slug} className="relative py-4 last:pb-0">
            <span aria-hidden className={HAIRLINE} />
            <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              <span className="size-16 shrink-0 overflow-hidden rounded-2xl bg-muted">
                {post.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.image} alt="" className={`size-full object-cover transition-transform duration-700 ${EASE} group-hover:scale-[1.05]`} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <Meta post={post} />
                <span className="mt-0.5 line-clamp-2 block font-bold leading-7 transition-colors duration-300 group-hover:text-primary">{post.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

const FAQS: Record<Who, typeof PATIENT_FAQS> = { patient: PATIENT_FAQS.slice(0, 6), therapist: THERAPIST_FAQS.slice(0, 6) }

/** The questions, wide: the two pills pick a side; both lists share one cell; the emergency note closes the panel. */
export function Questions({ wide }: { wide: boolean }) {
  const [who, setWho] = useState<Who>("patient")
  return (
    <section className={cn(PANEL, PAD, "flex flex-col", wide ? "lg:col-span-12" : "lg:col-span-7")}>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className={TYPE.heading}>
            پرسش‌های <Accent>پرتکرار</Accent>
          </h2>
          <div className="mt-6">
            <Switch who={who} onPick={setWho} look="pills" id="faq" label="پرسش‌های کدام گروه؟" tone="primary" />
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/design-study/faq.webp" alt="" className="w-24 shrink-0 max-sm:hidden lg:w-28" />
      </div>

      <div className="mt-4 grid">
        {ORDER.map((key) => {
          const shown = who === key
          return (
            <div
              key={key}
              role="tabpanel"
              id={`faq-panel-${key}`}
              aria-labelledby={`faq-tab-${key}`}
              inert={!shown}
              className={cn("[grid-area:1/1]", FADE, shown ? "visible opacity-100" : "invisible opacity-0")}
            >
              <Accordion>
                {FAQS[key].map((faq) => (
                  <AccordionItem key={faq.q} value={faq.q}>
                    <AccordionTrigger className="aria-expanded:text-primary **:data-[slot=accordion-trigger-icon]:text-primary">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-[0.9375rem] leading-8 text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
        })}
      </div>

      {/* Pushes the note to the panel's bottom when the journal beside it is taller; at least 24px otherwise. */}
      <div aria-hidden className="min-h-6 flex-1" />
      <div role="note" className="flex gap-3 rounded-[22px] bg-destructive/[0.04] p-4 text-sm leading-7 ring-1 ring-destructive/15">
        <Siren className="mt-1 size-5 shrink-0 text-destructive" />
        {EMERGENCY}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */

/** The closing call as the page's one solid blue panel: the therapist's photo behind the hero's curve, white words. */
export function Closing() {
  return (
    <section className="relative isolate overflow-hidden rounded-[28px] bg-primary text-primary-foreground shadow-[0_30px_60px_-36px_var(--primary)] sm:rounded-[32px] lg:grid lg:min-h-[26rem] lg:grid-cols-[1.2fr_1fr]">
      <Arcs className="pointer-events-none absolute -bottom-56 -start-40 -z-10 size-[36rem] text-primary-foreground/10" />
      <div className="relative h-56 sm:h-72 lg:order-last lg:h-auto">
        <div aria-hidden className={cn("absolute inset-0 bg-primary-foreground/25", HERO_CURVE)} />
        <div aria-hidden className={cn("absolute inset-0 overflow-hidden max-lg:bottom-3 lg:start-3.5", HERO_CURVE)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/design-study/hero-therapist.webp" alt="" className="size-full object-cover object-[40%_25%]" />
        </div>
      </div>

      <div className="flex flex-col justify-center px-5 py-8 sm:p-10 lg:p-14">
        <h2 className={TYPE.heading}>
          از همین حالا{" "}
          <span className="relative inline-block">
            شروع کنید
            <Swash className="absolute -bottom-2 start-[6%] h-3 w-[88%] text-primary-foreground/60" />
          </span>
        </h2>
        <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.85] text-primary-foreground/80">
          بیماران و همراهان درخواست خود را در برنامه بیمار ثبت می‌کنند؛ درمانگران زخم در همین سایت پیش‌ثبت‌نام می‌کنند یا در برنامه درمانگر ثبت‌نام می‌کنند.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="bg-primary-foreground text-primary shadow-[0_12px_28px_-14px_rgb(15_23_42/0.6)] hover:bg-primary-foreground/90" render={<a href={APP_LINKS.patient.newRequest} />}>
            ثبت درخواست مراقبت
            <ChevronLeft data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            render={<Link href="/therapists/join" />}
          >
            ثبت‌نام درمانگر
          </Button>
        </div>
        <div className="relative mt-10 flex items-center gap-4 pt-6">
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary-foreground/30 to-transparent" />
          <Medallion src="/design-study/support.webp" className="size-14 ring-primary-foreground/30" />
          <p className="text-sm font-medium leading-6 text-primary-foreground/80">
            پرسشی دارید؟ پشتیبانی زخم‌بان:{" "}
            <a href={toTelHref(siteConfig.landline)} className="font-semibold text-primary-foreground underline-offset-4 hover:underline" dir="ltr">
              {siteConfig.landline}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */

export function Option9(data: HomeData) {
  const { categories, products, posts } = data
  return (
    <>
      <Header categories={categories} floating />
      <main>
        {/* A little shorter than option 8's, so the tray's top edge shows above the fold. */}
        <Hero vivid className="lg:min-h-[max(720px,calc(100svh-3rem))]" />

        {/* The tray: rises 40px over the hero's bottom edge, so its rounded corners sit on the photo. */}
        <div className="relative z-10 -mt-10 rounded-t-[32px] bg-muted py-4 sm:rounded-t-[40px] sm:py-5">
          <div className={cn(wrap, "grid grid-cols-[minmax(0,1fr)] gap-4 sm:gap-5")}>
            <LaneStudies />
            <TrustBento />
            <section className={cn(PANEL, PAD)}>
              <DressingGuide />
            </section>
            <Shop products={products} />
            <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:gap-5 lg:grid-cols-12">
              {posts.length > 0 && <Journal posts={posts} />}
              <Questions wide={posts.length === 0} />
            </div>
            <Closing />
          </div>
        </div>
      </main>
      <Footer categories={categories} wide />
    </>
  )
}
