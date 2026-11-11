"use client"

// Option 8 · the sections after the dressing guide, and the trust section, in the hero's language: accented words
// with a swash, the curved edge with its pale band, sketch medallions, fading hairlines instead of boxes, and the
// hero's two pills where a visitor picks a side. Every word comes from the shared content (parts) or option 5.
import Link from "next/link"
import { useState } from "react"
import { Check, ChevronLeft, Eye, LockKeyhole, Siren } from "lucide-react"

import { cn } from "cn"

import { EASE, TYPE, type Who, wrap } from "./option-5"
import { FADE, ORDER, Switch } from "./option-7"
import { Arcs, SHOWCASE_CURVE, Swash } from "./option-8-dressings"
import { APP_LINKS, EMERGENCY, type HomeData, PATIENT_FAQS, PATIENT_TRUST, THERAPIST_FAQS, VISIBILITY, fa, siteConfig, toTelHref } from "./parts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Button } from "./ui/button"

/** A word or two set in the primary with the hero's swash under it. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block text-primary">
      {children}
      <Swash className="absolute -bottom-2 start-[6%] h-3 w-[88%] text-primary/55" />
    </span>
  )
}

/** A hairline that fades at both ends, laid across the top of a row. */
export const HAIRLINE = "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-foreground/15 to-transparent"

/** A sketch in a round frame, as in the lanes. */
export function Medallion({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-20 shrink-0 items-center justify-center rounded-full bg-card shadow-[0_12px_28px_-18px_rgb(15_23_42/0.5)] ring-1 ring-primary/15",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-[78%] object-contain" />
    </span>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */

/**
 * Trust: the three promises as a list with sketch medallions, split by fading hairlines, beside the dressing
 * guide's curved panel, which shows the main promise: what a therapist sees before and after the patient picks them.
 */
export function PromiseTrust() {
  const [verified, privacy, payment] = PATIENT_TRUST
  const promises = [
    { ...privacy, sketch: "/design-study/lane-step-5.webp" },
    { ...verified, sketch: "/design-study/trust-verified.webp" },
    { ...payment, sketch: "/design-study/trust-payment.webp" },
  ]
  return (
    <section className="py-20 sm:py-24">
      <div className={wrap}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 className={`max-w-xl ${TYPE.heading}`}>
            با خیال <Accent>راحت</Accent> انتخاب کنید
          </h2>
          <p className={`max-w-md ${TYPE.body}`}>زخم‌بان برای امنیت بیمار و حریم خصوصی او ساخته شده است.</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
          <ul>
            {promises.map((promise, i) => (
              <li key={promise.title} className="relative flex items-start gap-5 py-7 first:pt-0 last:pb-0">
                {i > 0 && <span aria-hidden className={HAIRLINE} />}
                <Medallion src={promise.sketch} className="size-16 sm:size-20" />
                <div className="min-w-0 pt-1">
                  <h3 className="text-lg font-bold leading-8">{promise.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-7 text-muted-foreground">{promise.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative">
            <div aria-hidden className={cn("absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-primary/5 max-lg:hidden", SHOWCASE_CURVE)} />
            {/* The dressing showcase's look: the sketch at full size over faint arcs, then the two sides of the line. */}
            <div className={cn("relative isolate flex flex-col items-center overflow-hidden bg-secondary px-6 py-8 ring-1 ring-primary/10 sm:px-10 sm:py-10 lg:ms-3.5 lg:ps-[16%]", SHOWCASE_CURVE)}>
              <Arcs className="pointer-events-none absolute start-1/2 top-[30%] -z-10 size-[28rem] -translate-x-1/2 -translate-y-1/2 text-primary/10 rtl:translate-x-1/2" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/design-study/trust-privacy.webp" alt="" className="w-44 sm:w-52" />

              <div className="relative mt-8 grid w-full max-w-lg gap-6 sm:grid-cols-2 sm:gap-10">
                {/* Between the two sides: a hairline fading at both ends, vertical beside, horizontal on phones. */}
                <span aria-hidden className="pointer-events-none absolute inset-y-0 start-1/2 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent max-sm:hidden" />
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-l from-transparent via-primary/25 to-transparent sm:hidden" />
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <Eye className="size-4 text-primary" />
                    پیش از انتخاب می‌بینند
                  </p>
                  <ul className="mt-3 space-y-2">
                    {VISIBILITY.before.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                        <Check className="mt-1 size-4 shrink-0 text-success" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="max-sm:pt-6">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <LockKeyhole className="size-4 text-primary" />
                    فقط پس از انتخاب شما
                  </p>
                  <ul className="mt-3 space-y-2">
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
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */

/** The featured photo's edge toward the list: the showcase curve, mirrored to the other side. */
export const POST_CURVE = "rounded-[28px] lg:rounded-e-none lg:[border-start-end-radius:18%_46%] lg:[border-end-end-radius:18%_54%]"

type Post = HomeData["posts"][number]

export function Meta({ post }: { post: Post }) {
  return (
    <span className="text-xs font-medium leading-5 text-link">
      {post.category} <span className="text-muted-foreground">، {fa(post.readingTime)} دقیقه مطالعه</span>
    </span>
  )
}

/** The journal: the lead post's photo with the curved edge and band; the next four as a list with small photos. */
export function Journal({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null
  const [lead, ...rest] = posts
  return (
    <section className="py-20 sm:py-24">
      <div className={wrap}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className={TYPE.heading}>
            مجله <Accent>آموزشی</Accent>
          </h2>
          <Button variant="outline" size="lg" className="self-start sm:self-auto" render={<Link href="/blog" />}>
            همه مقالات
            <ChevronLeft data-icon="inline-end" />
          </Button>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14">
          <Link href={`/blog/${lead.slug}`} className="group block rounded-[28px] outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <div className="relative">
              <div aria-hidden className={cn("absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-primary/5 max-lg:hidden", POST_CURVE)} />
              <div className={cn("relative aspect-[16/10] overflow-hidden bg-muted lg:me-3.5", POST_CURVE)}>
                {lead.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={lead.image} alt="" className={`size-full object-cover transition-transform duration-700 ${EASE} group-hover:scale-[1.03]`} />
                )}
              </div>
            </div>
            <div className="mt-5">
              <Meta post={lead} />
              <p className={`mt-1 ${TYPE.title} transition-colors duration-300 group-hover:text-primary`}>{lead.title}</p>
              <p className={`mt-2 line-clamp-2 ${TYPE.body}`}>{lead.excerpt}</p>
            </div>
          </Link>

          <ul>
            {rest.slice(0, 4).map((post, i) => (
              <li key={post.slug} className="relative py-5 first:pt-0 last:pb-0">
                {i > 0 && <span aria-hidden className={HAIRLINE} />}
                <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                  <span className="size-20 shrink-0 overflow-hidden rounded-2xl bg-muted sm:size-24">
                    {post.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.image} alt="" className={`size-full object-cover transition-transform duration-700 ${EASE} group-hover:scale-[1.05]`} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <Meta post={post} />
                    <span className="mt-1 line-clamp-2 block font-bold leading-7 transition-colors duration-300 group-hover:text-primary">{post.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */

const FAQS: Record<Who, typeof PATIENT_FAQS> = { patient: PATIENT_FAQS.slice(0, 5), therapist: THERAPIST_FAQS.slice(0, 5) }

/**
 * Questions: the hero's two pills pick whose questions show; both lists share one grid cell in the hero's answer
 * card, so switching fades in place. The emergency note sits under the pills.
 */
export function SidedFaq() {
  const [who, setWho] = useState<Who>("patient")
  return (
    <section className="bg-muted py-20 sm:py-24">
      <div className={cn(wrap, "grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16")}>
        <div>
          <h2 className={TYPE.heading}>
            پرسش‌های <Accent>پرتکرار</Accent>
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/design-study/faq.webp" alt="" className="mt-6 w-36 max-lg:hidden" />
          <div className="mt-8 lg:mt-6">
            <Switch who={who} onPick={setWho} look="pills" id="faq" label="پرسش‌های کدام گروه؟" />
          </div>
          <div role="note" className="mt-8 flex gap-3 rounded-[22px] bg-card p-4 text-sm leading-7 ring-1 ring-destructive/20 max-lg:hidden">
            <Siren className="mt-1 size-5 shrink-0 text-destructive" />
            {EMERGENCY}
          </div>
        </div>

        <div className="grid rounded-[28px] bg-card px-5 py-2 shadow-[0_24px_60px_-36px_rgb(15_23_42/0.45)] ring-1 ring-foreground/5 sm:px-7 sm:py-3">
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
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-[0.9375rem] leading-8 text-muted-foreground">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )
          })}
        </div>

        <div role="note" className="flex gap-3 rounded-[22px] bg-card p-4 text-sm leading-7 ring-1 ring-destructive/20 lg:hidden">
          <Siren className="mt-1 size-5 shrink-0 text-destructive" />
          {EMERGENCY}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */

/** The hero photo's curve (option 8's hero): half an ellipse toward the words on desktop, an arc along the bottom on phones. */
export const HERO_CURVE = "max-lg:rounded-b-[50%_2.5rem] lg:[border-start-start-radius:42%_62%] lg:[border-end-start-radius:18%_38%]"

/** The closing call: the hero again in small, the therapist's photo behind the curve, both actions and the support line. */
export function Closing({ framed = false }: { framed?: boolean }) {
  const panel = (
        <div className="relative isolate overflow-hidden rounded-[32px] bg-[radial-gradient(70%_90%_at_85%_20%,var(--secondary),var(--card))] ring-1 ring-primary/10 lg:grid lg:min-h-[26rem] lg:grid-cols-[1.2fr_1fr]">
          <div className="relative h-56 sm:h-72 lg:order-last lg:h-auto">
            <div aria-hidden className={cn("absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/12 to-primary/5", HERO_CURVE)} />
            <div aria-hidden className={cn("absolute inset-0 overflow-hidden max-lg:bottom-3 lg:start-3.5", HERO_CURVE)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/design-study/hero-therapist.webp" alt="" className="size-full object-cover object-[40%_25%]" />
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <h2 className={TYPE.heading}>
              از همین حالا <Accent>شروع کنید</Accent>
            </h2>
            <p className={`mt-5 max-w-xl ${TYPE.body}`}>
              بیماران و همراهان درخواست خود را در برنامه بیمار ثبت می‌کنند؛ درمانگران زخم در همین سایت پیش‌ثبت‌نام می‌کنند یا در برنامه درمانگر ثبت‌نام می‌کنند.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" render={<a href={APP_LINKS.patient.newRequest} />}>
                ثبت درخواست مراقبت
                <ChevronLeft data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="outline" className="bg-card" render={<Link href="/therapists/join" />}>
                ثبت‌نام درمانگر
              </Button>
            </div>
            <div className="relative mt-10 flex items-center gap-4 pt-6">
              <span aria-hidden className={HAIRLINE} />
              <Medallion src="/design-study/support.webp" className="size-14" />
              <p className={TYPE.meta}>
                پرسشی دارید؟ پشتیبانی زخم‌بان:{" "}
                <a href={toTelHref(siteConfig.landline)} className="font-semibold text-foreground underline-offset-4 hover:underline" dir="ltr">
                  {siteConfig.landline}
                </a>
              </p>
            </div>
          </div>
        </div>
  )
  // Option 9 sets it as a panel on its tray; option 8 gives it its own section.
  if (framed) return panel
  return (
    <section className="py-20">
      <div className={wrap}>{panel}</div>
    </section>
  )
}
