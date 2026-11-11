"use client"

// Option 5 · Modern Doors: option 4's structure, made more modern. The hero is option 1's (words and two
// audience cards) with the photo filling its whole half; pointing at or focusing the therapist card swaps the
// photo. A floating glass header, a trust bento with a small piece of the product in each card, lane rails
// for where patient and therapist meet, a product carousel and 28px surfaces. Vazirmatn throughout.
import Link from "next/link"
import { cloneElement, useRef, useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  FolderOpen,
  Inbox,
  HeartHandshake,
  Landmark,
  LockKeyhole,
  LockKeyholeOpen,
  MapPin,
  Phone,
  Siren,
  Stethoscope,
  Timer,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { cn } from "cn"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Button } from "./ui/button"
import {
  APP_LINKS,
  BrandIcon,
  DRESSINGS,
  EMERGENCY,
  Footer,
  Header,
  type HomeData,
  PATIENT_FAQS,
  PATIENT_TRUST,
  PostCard,
  ProductCard,
  THERAPIST_FAQS,
  fa,
  siteConfig,
  toTelHref,
} from "./parts"

/** The page width: 1240px, widening to 1400px on large screens (1536px and up) so 1080p isn't mostly margin. */
export const wrap = "mx-auto max-w-[1240px] px-4 sm:px-6 2xl:max-w-[1400px]"

/**
 * The page's whole type scale: five roles, one grey, one measure. Weights 800 / 700 / 500 / 400; line-heights
 * loosen as size drops; every text block in the hero shares the 34rem measure.
 */
export const TYPE = {
  display: "text-balance text-[2.375rem] font-extrabold leading-[1.25] sm:text-[3.5rem] sm:leading-[1.2]",
  heading: "text-balance text-[1.75rem] font-extrabold leading-[1.35] sm:text-[2.25rem] sm:leading-[1.3]",
  title: "text-[1.25rem] font-bold leading-[1.5] sm:text-[1.375rem]",
  body: "text-[1.0625rem] leading-[1.85] text-muted-foreground",
  meta: "text-sm font-medium leading-6 text-muted-foreground",
} as const
export const MEASURE = "max-w-[34rem]"
/** The floating header's height plus its top gap; the hero slides under it. */
export const UNDER_HEADER = "-mt-[76px]"

export type Who = "patient" | "therapist"

export const PHOTOS: Record<Who, { src: string; label: string }> = {
  patient: { src: "/design-study/hero-patient.webp", label: "برای بیماران و همراهان" },
  therapist: { src: "/design-study/hero-therapist.webp", label: "برای درمانگران و پرستاران زخم" },
}

/** Where the two sides meet, in order (from PATIENT_STEPS and THERAPIST_STEPS). */
/**
 * What the other side sees or waits for at each step, shown in the lane's otherwise empty cell
 * (from PATIENT_STEPS, THERAPIST_STEPS, THERAPIST_POINTS and PATIENT_FAQS). Keyed by step index.
 */
export const MEANWHILE: Record<number, { icon: LucideIcon; text: string }> = {
  0: { icon: MapPin, text: "درخواست برای درمانگران همان محدوده و همان نوع زخم نمایش داده می‌شود" },
  1: { icon: Inbox, text: "پیشنهادها با هزینه هر جلسه در برنامه بیمار می‌رسد" },
  2: { icon: Timer, text: "درمانگر برای تأیید انتخاب مهلت مشخصی دارد" },
  3: { icon: LockKeyhole, text: "تا تأیید درمانگر، نشانی و شماره بیمار قفل می‌ماند" },
  5: { icon: FolderOpen, text: "جلسه‌ها و روند زخم در پرونده درمان ثبت می‌شود" },
}

export const LANES = [
  { lane: "patient", title: "ثبت درخواست", desc: "اطلاعات بیمار، زخم و خدمت موردنیاز را در برنامه بیمار وارد می‌کنید." },
  { lane: "therapist", title: "پیشنهاد درمانگر", desc: "درمانگران تأییدشده محدوده شما پیشنهاد و هزینه هر جلسه را می‌فرستند." },
  { lane: "patient", title: "مقایسه و انتخاب", desc: "پیشنهادها را مقایسه می‌کنید و یکی را انتخاب می‌کنید." },
  { lane: "therapist", title: "تأیید انتخاب", desc: "درمانگر انتخاب را تأیید می‌کند و هزینه دسترسی را می‌پردازد." },
  { lane: "both", title: "باز شدن تماس و شروع درمان", desc: "اطلاعات تماس برای هر دو طرف باز می‌شود و پرونده درمان شروع می‌شود." },
  { lane: "patient", title: "پیگیری و نظر", desc: "جلسه‌ها و روند درمان را دنبال می‌کنید و در پایان نظر می‌دهید." },
] as const

/** One easing and three speeds for every state change on the page: small moves, never a bounce. */
export const EASE = "ease-[cubic-bezier(0.2,0,0,1)]"
/** Hover and keyboard focus raise a surface by 2px with a soft shadow; a press settles it back. */
export const LIFT = `transition-[transform,box-shadow,border-color,background-color] duration-300 ${EASE} hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-20px_rgb(15_23_42/0.4)] focus-visible:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] active:duration-100`

/**
 * One answer to «شما کدام هستید؟». The whole row is the link (a stretched title link); the guide link sits above
 * it. The active answer's arrow widens into a pill that names its action, in step with the photo.
 */
function AnswerRow({
  active,
  onActive,
  title,
  desc,
  action,
  link,
  more,
}: {
  active: boolean
  onActive: () => void
  title: string
  desc: string
  action: string
  link: React.ReactElement<{ className?: string; children?: React.ReactNode }>
  more: { href: string; label: string }
}) {
  const titleLink = cloneElement(
    link,
    {
      className:
        `${TYPE.title} outline-none focus-visible:outline-none after:absolute after:inset-0 after:rounded-[24px] after:transition-shadow focus-visible:after:ring-3 focus-visible:after:ring-ring/50`,
    },
    title,
  )
  return (
    <li
      onPointerEnter={onActive}
      onFocus={onActive}
      className={cn(
        "group/answer relative -mx-4 rounded-[24px] px-4 transition-[background-color,box-shadow] duration-500 active:scale-[0.995] active:duration-100",
        EASE,
        active ? "bg-card/85 shadow-[0_18px_44px_-28px_rgb(15_23_42/0.45)]" : "hover:bg-card/45",
      )}
    >
      <div className="flex items-center gap-4 py-5 sm:gap-6">
        <div className="min-w-0 flex-1">
          {titleLink}
          <p className={`mt-1 ${MEASURE} ${TYPE.body}`}>{desc}</p>
          <Link
            href={more.href}
            className={`relative z-10 -my-1.5 inline-flex min-h-11 items-center ${TYPE.meta} text-primary underline-offset-4 hover:underline`}
          >
            {more.label}
          </Link>
        </div>
        <span
          aria-hidden
          className={cn(
            "flex h-12 shrink-0 items-center rounded-full transition-[background-color,color,padding,box-shadow,border-color] duration-500",
            EASE,
            active
              ? "border border-transparent bg-primary ps-5 pe-3.5 text-primary-foreground shadow-[0_10px_24px_-12px_var(--primary)]"
              : "border border-foreground/15 bg-card/60 px-3.5 text-foreground group-hover/answer:border-foreground/30",
          )}
        >
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap text-[0.9375rem] font-semibold transition-[max-width,opacity,margin] duration-500 max-sm:hidden",
              EASE,
              active ? "me-2 max-w-52 opacity-100" : "me-0 max-w-0 opacity-0",
            )}
          >
            {action}
          </span>
          <ChevronLeft className={`size-5 transition-transform duration-300 ${EASE} group-hover/answer:-translate-x-0.5`} />
        </span>
      </div>
    </li>
  )
}

/** The photo pair; the active one fades in over 1.1s while the other fades out. No blur on the switch. */
function HeroPhotos({ who }: { who: Who }) {
  return (Object.keys(PHOTOS) as Who[]).map((key) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={key}
      src={PHOTOS[key].src}
      alt=""
      className={cn(
        "absolute inset-0 size-full object-cover object-[50%_30%] transition-[opacity,transform] duration-[1100ms]",
        EASE,
        who === key ? "scale-100 opacity-100" : "scale-[1.02] opacity-0",
      )}
    />
  ))
}

function Hero() {
  const [who, setWho] = useState<Who>("patient")
  return (
    <section className={cn(UNDER_HEADER, "relative isolate overflow-hidden lg:grid lg:min-h-[max(700px,100svh)] lg:grid-cols-2")}>
      {/* The photo runs past the middle, under the words' panel. */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-20 h-[30rem] lg:inset-y-0 lg:end-0 lg:start-auto lg:h-auto lg:w-[64%]">
        <HeroPhotos who={who} />
        {/* Under the glass, so its edge feathers with the panel instead of stopping at the middle. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent max-lg:hidden" />
      </div>
      {/* The words' panel is frosted glass over the photo; its edge feathers into the sharp half. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 top-56 -z-10 bg-background/55 backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,transparent,black_7rem)] lg:inset-y-0 lg:start-0 lg:end-auto lg:top-0 lg:w-[calc(50%+7rem)] lg:bg-background/45 lg:[mask-image:linear-gradient(to_left,black_calc(100%-7rem),transparent)]"
      />

      {/* The sharp half: room for the photo and its label. */}
      <div className="relative h-64 sm:h-80 lg:order-last lg:h-auto">
        <p className="absolute bottom-6 end-6 hidden h-10 w-64 overflow-hidden rounded-full border border-white/30 bg-white/15 text-sm font-semibold text-white backdrop-blur-md lg:block">
          {(Object.keys(PHOTOS) as Who[]).map((key) => (
            <span
              key={key}
              aria-hidden={who !== key}
              className={cn(
                "absolute inset-0 flex items-center gap-2 px-4 transition-[opacity,transform] duration-700",
                EASE,
                who === key ? "translate-y-0 opacity-100" : key === "patient" ? "-translate-y-2 opacity-0" : "translate-y-2 opacity-0",
              )}
            >
              {key === "patient" ? <HeartHandshake className="size-4" /> : <Stethoscope className="size-4" />}
              {PHOTOS[key].label}
            </span>
          ))}
        </p>
      </div>

      <div
        onPointerLeave={() => setWho("patient")}
        className="flex flex-col justify-center px-4 pb-14 pt-2 sm:px-6 lg:pb-16 lg:pe-12 lg:ps-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))] 2xl:ps-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] lg:pt-32"
      >
        <h1 className={TYPE.display}>
          درمانگر زخم مطمئن، نزدیک خانه شما
        </h1>
        <p className={`mt-5 ${MEASURE} ${TYPE.body}`}>
          زخم‌بان بیماران و همراهانشان را به درمانگران و پرستاران زخمِ تأییدشده در محدوده خودشان می‌رساند.
        </p>

        <p id="hero-question" className={`mt-10 flex items-center gap-4 ${TYPE.meta}`}>
          شما کدام هستید؟
          <span aria-hidden className="h-px flex-1 bg-foreground/15" />
        </p>
        <ul aria-labelledby="hero-question" className="mt-3 space-y-1">
          <AnswerRow
            active={who === "patient"}
            onActive={() => setWho("patient")}
            title="بیمار یا همراه بیمار هستم"
            desc="درخواست مراقبت را ثبت کنید، از درمانگران تأییدشده پیشنهاد بگیرید و خودتان انتخاب کنید."
            action="ثبت درخواست مراقبت"
            link={<a href={APP_LINKS.patient.newRequest} />}
            more={{ href: "/patients", label: "راهنمای بیماران" }}
          />
          <AnswerRow
            active={who === "therapist"}
            onActive={() => setWho("therapist")}
            title="درمانگر یا پرستار زخم هستم"
            desc="پیش‌ثبت‌نام کنید؛ پس از تأیید مدارک، برای درخواست‌های بیماران محدوده خود پیشنهاد بفرستید."
            action="ثبت‌نام درمانگر"
            link={<Link href="/therapists/join" />}
            more={{ href: "/therapists", label: "شرایط و مراحل" }}
          />
        </ul>

        <ul className={`mt-8 flex flex-wrap gap-y-2 ${TYPE.meta} [&>li+li]:border-s [&>li+li]:border-foreground/15 [&>li+li]:ps-4 [&>li]:pe-4`}>
          {PATIENT_TRUST.map((point) => (
            <li key={point.title}>{point.title}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** The three promises in one compact row, each with a small piece of the product that shows it. */
function TrustBento() {
  const [verified, privacy, payment] = PATIENT_TRUST
  const tile = `group/tile flex flex-col gap-5 rounded-[28px] border bg-card p-5 transition-[border-color,box-shadow] duration-300 ${EASE} hover:border-primary/25 hover:shadow-[0_10px_30px_-22px_rgb(15_23_42/0.35)] sm:p-6`
  const inset = "mt-auto rounded-2xl bg-muted p-3"
  const heading = (icon: React.ReactNode, title: string, desc: string) => (
    <div>
      <div className="flex items-center gap-3">
        <span className={`inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors duration-300 ${EASE} group-hover/tile:bg-primary group-hover/tile:text-primary-foreground`}>
          {icon}
        </span>
        <h3 className="text-lg font-bold leading-[1.5]">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{desc}</p>
    </div>
  )
  return (
    <section className="py-16 sm:py-20">
      <div className={wrap}>
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className={TYPE.heading}>با خیال راحت انتخاب کنید</h2>
          <p className={TYPE.body}>زخم‌بان برای امنیت بیمار و حریم خصوصی او ساخته شده است.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <article className={tile}>
            {heading(<BadgeCheck className="size-5" />, verified.title, verified.desc)}
            <ul className={cn(inset, "space-y-1.5")}>
              {["مدارک هویتی", "مدارک حرفه‌ای", "بررسی دستی پیش از فعال‌شدن"].map((item, i) => (
                <li key={item} className="flex items-center gap-2.5 rounded-xl bg-card px-3 py-2 text-sm">
                  <span
                    style={{ transitionDelay: `${i * 60}ms` }}
                    className={`inline-flex size-5 items-center justify-center rounded-full bg-success text-white transition-transform duration-300 ${EASE} group-hover/tile:scale-110`}
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className={tile}>
            {heading(<LockKeyhole className="size-5" />, privacy.title, privacy.desc)}
            <div className={cn(inset, "space-y-1.5")}>
              {[
                { icon: MapPin, label: "نشانی دقیق" },
                { icon: Phone, label: "شماره تماس" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2.5 rounded-xl bg-card px-3 py-2">
                  <row.icon className="size-4 text-muted-foreground" />
                  <span className="w-20 text-sm text-muted-foreground">{row.label}</span>
                  <span className={`flex h-6 flex-1 items-center gap-1.5 rounded-md bg-foreground/80 px-2 text-[11px] font-medium text-background transition-colors duration-300 ${EASE} group-hover/tile:bg-foreground/90`}>
                    <LockKeyhole className="size-3" />
                    پنهان تا انتخاب
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className={tile}>
            {heading(<Wallet className="size-5" />, payment.title, payment.desc)}
            <div className={cn(inset, "flex flex-wrap items-center gap-1.5")}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-semibold">
                <Landmark className="size-4 text-primary" />
                درگاه بانکی
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-semibold">
                <Wallet className="size-4 text-primary" />
                کیف پول برنامه
              </span>
              <span className="inline-flex items-center gap-1.5 px-1.5 py-1.5 text-xs text-muted-foreground">
                <Eye className="size-3.5" />
                مبلغ پیش از پرداخت نمایش داده می‌شود
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Lanes() {
  return (
    <section className="bg-muted py-20 sm:py-28">
      <div className={wrap}>
        <h2 className={`max-w-2xl ${TYPE.heading}`}>بیمار و درمانگر کجا به هم می‌رسند</h2>
        <p className={`mt-4 max-w-2xl ${TYPE.body}`}>
          هر کدام در برنامه خودش کار می‌کند. اطلاعات تماس فقط در گام پنجم و فقط برای درمانگر انتخاب‌شده باز می‌شود.
        </p>

        {/* Desktop: two rails; each step sits on its side's rail, step 5 spans both. */}
        <div className="mt-14 hidden grid-cols-[6.5rem_repeat(6,minmax(0,1fr))] grid-rows-2 gap-x-2 gap-y-3 lg:grid">
          {(["patient", "therapist"] as const).map((lane, row) => (
            <div key={lane} style={{ gridColumn: "1 / -1", gridRow: row + 1 }} className="rounded-[28px] bg-card/70 ring-1 ring-border" />
          ))}
          {(["patient", "therapist"] as const).map((lane, row) => (
            <div key={`label-${lane}`} style={{ gridColumn: 1, gridRow: row + 1 }} className="z-10 flex flex-col items-center justify-center gap-2 text-sm font-bold">
              <span className={cn("inline-flex size-11 items-center justify-center rounded-full", lane === "patient" ? "bg-primary text-primary-foreground" : "bg-ink text-ink-foreground")}>
                {lane === "patient" ? <HeartHandshake className="size-5" /> : <Stethoscope className="size-5" />}
              </span>
              {lane === "patient" ? "بیمار" : "درمانگر"}
            </div>
          ))}
          {LANES.map((step, i) => (
            <div
              key={step.title}
              style={{ gridColumn: i + 2, gridRow: step.lane === "both" ? "1 / span 2" : step.lane === "patient" ? 1 : 2 }}
              className={cn(
                "z-10 m-2 flex min-h-44 flex-col rounded-[22px] p-4",
                step.lane === "both"
                  ? "justify-center bg-primary text-primary-foreground shadow-lg"
                  : "shadow-[0_6px_24px_-14px_rgb(15_23_42/0.35)] ring-1",
                step.lane === "patient" && "bg-lane-patient ring-lane-patient-line",
                step.lane === "therapist" && "bg-lane-therapist ring-lane-therapist-line",
              )}
            >
              <span className={cn("inline-flex size-8 items-center justify-center rounded-full text-sm font-bold", step.lane === "both" ? "bg-white/20" : "bg-card")}>
                {step.lane === "both" ? <LockKeyholeOpen className="size-4" /> : fa(i + 1)}
              </span>
              <p className="mt-3 font-bold leading-7">{step.title}</p>
              <p className={cn("mt-1.5 text-sm leading-6", step.lane === "both" ? "text-primary-foreground/85" : "text-muted-foreground")}>{step.desc}</p>
            </div>
          ))}
          {LANES.map((step, i) => {
            const meanwhile = MEANWHILE[i]
            if (!meanwhile || step.lane === "both") return null
            // The hand-off runs from the step's lane into the other one.
            const down = step.lane === "patient"
            const Arrow = down ? ArrowDown : ArrowUp
            return (
              <div
                key={`meanwhile-${step.title}`}
                style={{ gridColumn: i + 2, gridRow: down ? 2 : 1 }}
                className={cn(
                  "group/meanwhile relative z-10 m-2 flex flex-col justify-center gap-3 rounded-[22px] border border-dashed border-foreground/15 p-4",
                  "bg-[radial-gradient(circle,rgb(15_23_42/0.10)_1px,transparent_1.3px)] [background-size:14px_14px]",
                  "transition-colors duration-300 hover:border-foreground/30",
                  EASE,
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute start-1/2 inline-flex size-7 -translate-x-1/2 items-center justify-center rounded-full border bg-card text-muted-foreground rtl:translate-x-1/2",
                    down ? "-top-3.5" : "-bottom-3.5",
                  )}
                >
                  <Arrow className="size-3.5" />
                </span>
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-card text-primary shadow-sm">
                  <meanwhile.icon className="size-4.5" />
                </span>
                <p className="text-sm leading-6 text-foreground/70">{meanwhile.text}</p>
              </div>
            )
          })}
        </div>

        {/* Phones and tablets: one list, each step tagged with its side. */}
        <ol className="mt-10 space-y-3 lg:hidden">
          {LANES.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                "rounded-[22px] p-4",
                step.lane === "both" && "bg-primary text-primary-foreground",
                step.lane === "patient" && "bg-lane-patient ring-1 ring-lane-patient-line",
                step.lane === "therapist" && "ms-8 bg-lane-therapist ring-1 ring-lane-therapist-line",
              )}
            >
              <span className={cn("text-xs font-bold", step.lane === "both" ? "text-primary-foreground/85" : "text-muted-foreground")}>
                گام {fa(i + 1)}، {step.lane === "patient" ? "بیمار" : step.lane === "therapist" ? "درمانگر" : "هر دو"}
              </span>
              <p className="mt-1 font-bold">{step.title}</p>
              <p className={cn("mt-1 text-sm leading-7", step.lane === "both" ? "text-primary-foreground/85" : "text-muted-foreground")}>{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** `dressings`: option 8 replaces the dressing intro and tiles with its own guide; the product carousel stays. */
function Shelf({ products, dressings }: Pick<HomeData, "products"> & { dressings?: React.ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null)
  // RTL: "next" moves toward the left edge.
  const move = (dir: 1 | -1) => scroller.current?.scrollBy({ left: -dir * 480, behavior: "smooth" })
  return (
    <section className="py-20 sm:py-28">
      <div className={wrap}>
        {dressings ?? (
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className={TYPE.heading}>پانسمان مناسب زخم خود را بشناسید</h2>
            <p className={`mt-4 ${TYPE.body}`}>آشنایی کوتاه با انواع پانسمان‌های نوین. انتخاب نهایی را با نظر پزشک یا درمانگر انجام دهید.</p>
            <Button variant="outline" size="lg" className="mt-6" render={<Link href="/blog" />}>راهنمای انتخاب پانسمان</Button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {DRESSINGS.map((type) => (
              <li key={type.name}>
                <Link
                  href={`/shop?q=${encodeURIComponent(type.name)}`}
                  className={cn("group flex h-full flex-col rounded-[22px] bg-muted p-4 hover:bg-secondary", LIFT)}
                >
                  <span className={`inline-flex size-14 items-center justify-center rounded-2xl bg-card transition-transform duration-300 ${EASE} group-hover:scale-105`}>
                    <BrandIcon name={type.icon} size={36} />
                  </span>
                  <span className="mt-4 font-bold transition-colors duration-300 group-hover:text-secondary-foreground">{type.name}</span>
                  <span className="mt-0.5 text-sm leading-6 text-muted-foreground">{type.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        )}

        <div className="mt-20 flex items-end justify-between gap-4">
          <div>
            <h2 className={TYPE.heading}>فروشگاه زخم‌بان</h2>
            <p className="mt-2 text-muted-foreground">پانسمان‌ها، محلول‌ها و تجهیزات مراقبت از زخم؛ خرید در برنامه بیمار.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="icon" aria-label="محصولات قبلی" onClick={() => move(-1)}>
              <ChevronRight />
            </Button>
            <Button variant="outline" size="icon" aria-label="محصولات بعدی" onClick={() => move(1)}>
              <ChevronLeft />
            </Button>
            <Button className="hidden sm:inline-flex" render={<Link href="/shop" />}>ورود به فروشگاه</Button>
          </div>
        </div>
        <div ref={scroller} className="scrollbar-hide -mx-4 mt-6 flex snap-x gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:px-0">
          {products.slice(0, 10).map((product) => (
            <div key={product.id} className="w-56 shrink-0 snap-start py-2 sm:w-60">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Option5(data: HomeData) {
  return <ModernPage {...data} hero={<Hero />} />
}

/** Option 5's page around a given hero (and, for option 8, its own trust section). */
export function ModernPage({
  categories,
  products,
  posts,
  hero,
  trust,
  dressings,
  lanes,
  journal,
  faq,
  closing,
}: HomeData & {
  hero: React.ReactNode
  trust?: React.ReactNode
  dressings?: React.ReactNode
  lanes?: React.ReactNode
  journal?: React.ReactNode
  faq?: React.ReactNode
  closing?: React.ReactNode
}) {
  return (
    <>
      <Header categories={categories} floating />
      <main>
        {hero}
        {lanes ?? <Lanes />}
        {trust ?? <TrustBento />}
        <Shelf products={products} dressings={dressings} />

        {journal ??
          (posts.length > 0 && (
          <section className="border-t py-20 sm:py-28">
            <div className={wrap}>
              <div className="flex items-end justify-between gap-4">
                <h2 className={TYPE.heading}>مجله آموزشی</h2>
                <Button variant="ghost" className="text-link" render={<Link href="/blog" />}>
                  همه مقالات
                  <ChevronLeft data-icon="inline-end" />
                </Button>
              </div>
              <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
                <PostCard post={posts[0]} />
                <div className="divide-y">
                  {posts.slice(1, 5).map((post) => (
                    <div key={post.slug} className="py-5 first:pt-0">
                      <PostCard post={post} compact />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {faq ?? (
          <section className="bg-muted py-20 sm:py-28">
            <div className={wrap}>
              <h2 className={TYPE.heading}>پرسش‌های پرتکرار</h2>
              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                {[
                  { title: "بیماران و همراهان", icon: HeartHandshake, faqs: PATIENT_FAQS.slice(0, 5), chip: "bg-primary text-primary-foreground" },
                  { title: "درمانگران", icon: Stethoscope, faqs: THERAPIST_FAQS.slice(0, 5), chip: "bg-ink text-ink-foreground" },
                ].map((column) => (
                  <div key={column.title} className={`rounded-[28px] border border-transparent bg-card p-5 transition-colors duration-300 ${EASE} hover:border-border sm:p-7`}>
                    <p className="flex items-center gap-3 text-lg font-bold leading-[1.5]">
                      <span className={cn("inline-flex size-10 items-center justify-center rounded-full", column.chip)}>
                        <column.icon className="size-5" />
                      </span>
                      {column.title}
                    </p>
                    <Accordion className="mt-3">
                      {column.faqs.map((faq) => (
                        <AccordionItem key={faq.q} value={faq.q}>
                          <AccordionTrigger>{faq.q}</AccordionTrigger>
                          <AccordionContent className="text-[0.9375rem] leading-8 text-muted-foreground">{faq.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
              <div role="note" className="mt-4 flex gap-3 rounded-[28px] bg-card p-5 ring-1 ring-destructive/25 sm:p-6">
                <Siren className="mt-1 size-5 shrink-0 text-destructive" />
                <p className="text-sm leading-7">{EMERGENCY}</p>
              </div>
            </div>
          </section>
        )}

        {closing ?? (
          <section className="py-20">
            <div className={wrap}>
              <div className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-12 text-ink-foreground sm:px-12 sm:py-16">
                <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                  <div>
                    <h2 className={TYPE.heading}>از همین حالا شروع کنید</h2>
                    <p className="mt-4 max-w-xl text-base leading-8 text-ink-foreground/75">
                      بیماران و همراهان درخواست خود را در برنامه بیمار ثبت می‌کنند؛ درمانگران زخم در همین سایت پیش‌ثبت‌نام می‌کنند یا در برنامه درمانگر ثبت‌نام می‌کنند.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                    <Button size="lg" className="bg-white text-ink hover:bg-white/90" render={<a href={APP_LINKS.patient.newRequest} />}>ثبت درخواست مراقبت</Button>
                    <Button size="lg" variant="outline" className="border-white/25 bg-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground" render={<Link href="/therapists/join" />}>
                      ثبت‌نام درمانگر
                    </Button>
                  </div>
                </div>
                <p className="relative mt-10 border-t border-white/10 pt-6 text-sm text-ink-foreground/70">
                  پرسشی دارید؟ پشتیبانی زخم‌بان:{" "}
                  <a href={toTelHref(siteConfig.landline)} className="font-semibold text-ink-foreground underline-offset-4 hover:underline" dir="ltr">
                    {siteConfig.landline}
                  </a>
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer categories={categories} wide />
    </>
  )
}
