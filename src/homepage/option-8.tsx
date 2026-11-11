"use client"

// Option 8 · Curved Door: Codex's «improve this design» variant 4 of option 7, as the user picked it. The photo ends
// in a curve with a pale band along it; «نزدیک خانه» is set in the primary with a swash; the switch is two full
// pills; the answer card carries a small illustration; the trust points sit in a 2×2 grid at the bottom, split by
// hairlines that fade at both ends. No chip above the headline. The sections after the hero are option 8's own
// (option-8-lanes, option-8-dressings, option-8-sections), around option 5's header, product carousel and footer.
import { useState } from "react"
import { CreditCard, LockKeyhole, type LucideIcon, MapPin, ShieldCheck } from "lucide-react"
import Link from "next/link"

import { cn } from "cn"

import { MEASURE, ModernPage, PHOTOS, TYPE, UNDER_HEADER, type Who } from "./option-5"
import { FADE, ORDER, SIDES, Switch } from "./option-7"
import { DressingGuide, Swash } from "./option-8-dressings"
import { MeetingLanes } from "./option-8-lanes"
import { Closing, Journal, PromiseTrust, SidedFaq } from "./option-8-sections"
import { type HomeData } from "./parts"

/** The photo's edge toward the words: half an ellipse on desktop, a shallow arc along the bottom on phones. */
const CURVE =
  "max-lg:rounded-b-[50%_2.5rem] lg:[border-start-start-radius:42%_62%] lg:[border-end-start-radius:18%_38%]"

/** The trust points, from PATIENT_TRUST plus the hero's own «nearby» promise; the second lines are shortened from their text. */
export type Point = { icon: LucideIcon; title: string; sub: string }
export const POINTS: Point[] = [
  { icon: MapPin, title: "درمانگران محدوده شما", sub: "نزدیک خانه شما" },
  { icon: ShieldCheck, title: "درمانگران تأییدشده", sub: "مدارک، دستی بررسی می‌شود" },
  { icon: LockKeyhole, title: "تماس فقط پس از انتخاب", sub: "تا آن زمان نشانی و شماره پنهان است" },
  { icon: CreditCard, title: "پرداخت امن", sub: "درگاه بانکی یا کیف پول برنامه" },
]

const ILLUSTRATION: Record<Who, string> = {
  patient: "/design-study/hero-icon-patient.webp",
  therapist: "/design-study/hero-icon-therapist.webp",
}

/** Four points in a 2×2 grid; a vertical and a horizontal hairline, each fading at both ends, cross at a small ring. */
function TrustGrid({ vivid = false, points = POINTS }: { vivid?: boolean; points?: Point[] }) {
  const line = "pointer-events-none absolute from-transparent via-foreground/15 to-transparent max-sm:hidden"
  return (
    <div className="relative mt-9 max-w-[38rem]">
      <span aria-hidden className={cn(line, "inset-y-0 start-1/2 w-px -translate-x-1/2 bg-gradient-to-b rtl:translate-x-1/2")} />
      <span aria-hidden className={cn(line, "inset-x-0 top-1/2 h-px bg-gradient-to-l")} />
      <span
        aria-hidden
        className="absolute start-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/20 bg-background max-sm:hidden rtl:translate-x-1/2"
      />
      <ul className="grid gap-y-4 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
        {points.map((point, i) => (
          <li key={point.title} className="relative flex items-center gap-3 max-sm:[&+&]:pt-4">
            {/* Phones: one column, with the same fading hairline between the points. */}
            {i > 0 && <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-foreground/15 to-transparent sm:hidden" />}
            <span
              className={cn(
                "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl",
                vivid ? "bg-primary text-primary-foreground shadow-[0_10px_22px_-12px_var(--primary)]" : "bg-secondary text-secondary-foreground ring-1 ring-primary/10",
              )}
            >
              <point.icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.9375rem] font-semibold leading-6">{point.title}</span>
              <span className="block text-[0.8125rem] leading-5 text-muted-foreground">{point.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** `className` lets option 9 shorten it (its min-height merges over this one); `vivid` fills the picked pill and the trust icons with the primary blue. */
export function Hero({ className, vivid = false, points }: { className?: string; vivid?: boolean; points?: Point[] }) {
  const [who, setWho] = useState<Who>("patient")
  return (
    <section className={cn(UNDER_HEADER, "relative isolate overflow-hidden lg:grid lg:min-h-[max(780px,100svh)] lg:grid-cols-[1.15fr_1fr]", className)}>
      {/* A faint cool wash behind the words, from the page's own secondary colour. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_85%_25%,var(--secondary),transparent)]" />

      <div className="relative h-80 sm:h-[26rem] lg:order-last lg:h-auto">
        {/* Ripples: copies of the curve's edge pulsing outward behind everything, one every 2.4s, under the words
            and the card (-z, above the background wash). Hidden under reduced motion (their resting state is transparent). */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            aria-hidden
            style={{ animationDelay: `${i * 2.4}s` }}
            className={cn(
              "pointer-events-none absolute inset-0 -z-[5] border-primary/30 opacity-0",
              "max-lg:origin-top max-lg:border-b-2 max-lg:animate-[study-ripple-y_7.2s_cubic-bezier(0.2,0,0,1)_infinite]",
              // The curve grows from the photo's far edge, so the arc travels toward the words in either direction.
              "lg:origin-right lg:border-s-2 lg:animate-[study-ripple-x_7.2s_cubic-bezier(0.2,0,0,1)_infinite] lg:rtl:origin-left",
              CURVE,
            )}
          />
        ))}
        {/* The pale band is the same curve, showing past the photo's edge. */}
        <div aria-hidden className={cn("absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/12 to-primary/5", CURVE)} />
        <div aria-hidden className={cn("absolute inset-0 overflow-hidden max-lg:bottom-3 lg:start-3.5", CURVE)}>
          {ORDER.map((key) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={key}
              src={PHOTOS[key].src}
              alt=""
              className={cn("absolute inset-0 size-full object-cover object-[40%_12%] lg:object-[40%_30%]", FADE, who === key ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center px-4 pb-14 pt-8 sm:px-6 lg:pb-16 lg:pe-12 lg:ps-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))] 2xl:ps-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] lg:pt-32">
        <h1 className={TYPE.display}>
          درمانگر زخم مطمئن،{" "}
          <span className="relative inline-block text-primary">
            نزدیک خانه
            <Swash className="absolute -bottom-2 start-[8%] h-3.5 w-[70%] text-primary/55" />
          </span>{" "}
          شما
        </h1>
        <p className={`mt-6 ${MEASURE} ${TYPE.body}`}>
          زخم‌بان بیماران و همراهانشان را به درمانگران و پرستاران زخمِ تأییدشده در محدوده خودشان می‌رساند.
        </p>

        <div className="mt-8">
          <Switch who={who} onPick={setWho} look="pills" tone={vivid ? "primary" : "ink"} />
        </div>

        {/* Both answers share one grid cell, so the card never changes size when the side changes. */}
        <div className="mt-4 grid max-w-[38rem] rounded-[28px] bg-card p-5 shadow-[0_24px_60px_-36px_rgb(15_23_42/0.45)] ring-1 ring-foreground/5 sm:p-6">
          {ORDER.map((key) => {
            const side = SIDES[key]
            const shown = who === key
            return (
              <div
                key={key}
                role="tabpanel"
                id={`hero-panel-${key}`}
                aria-labelledby={`hero-tab-${key}`}
                inert={!shown}
                className={cn("flex items-center gap-4 [grid-area:1/1]", FADE, shown ? "visible opacity-100" : "invisible opacity-0")}
              >
                <div className="min-w-0 flex-1">
                  <h2 className={TYPE.title}>{side.title}</h2>
                  <p className={`mt-2 ${TYPE.body}`}>{side.desc}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {side.action}
                    <Link href={side.more.href} className={`inline-flex min-h-11 items-center ${TYPE.meta} text-link underline-offset-4 hover:underline`}>
                      {side.more.label}
                    </Link>
                  </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ILLUSTRATION[key]} alt="" className="size-24 shrink-0 object-contain max-sm:hidden sm:size-32" />
              </div>
            )
          })}
        </div>

        <TrustGrid vivid={vivid} points={points} />
      </div>
    </section>
  )
}

export function Option8(data: HomeData) {
  return (
    <ModernPage
      {...data}
      hero={<Hero />}
      lanes={<MeetingLanes />}
      trust={<PromiseTrust />}
      dressings={<DressingGuide />}
      journal={<Journal posts={data.posts} />}
      faq={<SidedFaq />}
      closing={<Closing />}
    />
  )
}
