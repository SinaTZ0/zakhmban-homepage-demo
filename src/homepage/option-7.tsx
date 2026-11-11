"use client"

// Option 7 · Chosen Door: option 5's photo under frosted glass, but it changes only when the visitor asks. A
// two-part switch («بیمار هستم» / «درمانگر هستم») picks the side; hovering does nothing. Both answers sit in one
// fixed slot as tab panels, so the switch fades text in place and nothing around it moves or wraps. Every
// section after the hero is option 5's.
import Link from "next/link"
import { useRef, useState } from "react"
import { ChevronLeft, HeartHandshake, Stethoscope } from "lucide-react"

import { cn } from "cn"

import { EASE, MEASURE, ModernPage, PHOTOS, TYPE, UNDER_HEADER, type Who } from "./option-5"
import { APP_LINKS, type HomeData, PATIENT_TRUST } from "./parts"
import { Button } from "./ui/button"

export const SIDES: Record<
  Who,
  { tab: string; short: string; icon: typeof HeartHandshake; title: string; desc: string; action: React.ReactElement; more: { href: string; label: string } }
> = {
  patient: {
    tab: "بیمار یا همراه هستم",
    short: "بیمار هستم",
    icon: HeartHandshake,
    title: "برای بیمار یا همراه بیمار",
    desc: "درخواست مراقبت را ثبت کنید، از درمانگران تأییدشده پیشنهاد بگیرید و خودتان انتخاب کنید.",
    action: (
      <Button size="lg" render={<a href={APP_LINKS.patient.newRequest} />}>
        ثبت درخواست مراقبت
        <ChevronLeft data-icon="inline-end" />
      </Button>
    ),
    more: { href: "/patients", label: "راهنمای بیماران" },
  },
  therapist: {
    tab: "درمانگر یا پرستار هستم",
    short: "درمانگر هستم",
    icon: Stethoscope,
    title: "برای درمانگر یا پرستار زخم",
    desc: "پیش‌ثبت‌نام کنید؛ پس از تأیید مدارک، برای درخواست‌های بیماران محدوده خود پیشنهاد بفرستید.",
    action: (
      <Button size="lg" render={<Link href="/therapists/join" />}>
        ثبت‌نام درمانگر
        <ChevronLeft data-icon="inline-end" />
      </Button>
    ),
    more: { href: "/therapists", label: "شرایط و مراحل" },
  },
}
export const ORDER: Who[] = ["patient", "therapist"]

/** A plain opacity fade, the same for the photo, its label and the answer: nothing slides, scales or blurs. */
export const FADE = `transition-[opacity,visibility] duration-500 ${EASE}`

/**
 * The two-part switch: a WAI-ARIA tab list. Arrow keys move between the two, as in any tab list. `segmented` is
 * one track with the chosen half filled (option 7); `pills` is two separate full-size pills (option 8).
 */
export function Switch({
  who,
  onPick,
  look = "segmented",
  id = "hero",
  label = "شما کدام هستید؟",
  tone = "ink",
}: {
  who: Who
  onPick: (who: Who) => void
  look?: "segmented" | "pills"
  /** Prefix of the tab and panel ids, so a second switch on the page (option 8's FAQ) gets its own. */
  id?: string
  label?: string
  /** The picked pill's fill: ink (option 8) or the primary blue (option 9). */
  tone?: "ink" | "primary"
}) {
  const tabs = useRef<Record<Who, HTMLButtonElement | null>>({ patient: null, therapist: null })
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
    event.preventDefault()
    const next = who === "patient" ? "therapist" : "patient"
    const target = event.key === "Home" ? "patient" : event.key === "End" ? "therapist" : next
    onPick(target)
    tabs.current[target]?.focus()
  }
  return (
    <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={cn("inline-grid grid-cols-2", look === "segmented" ? "gap-1 rounded-full bg-card/70 p-1 ring-1 ring-foreground/10" : "w-full max-w-[34rem] gap-3")}>
      {ORDER.map((key) => {
        const side = SIDES[key]
        const selected = who === key
        return (
          <button
            key={key}
            ref={(node) => {
              tabs.current[key] = node
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${key}`}
            aria-selected={selected}
            aria-controls={`${id}-panel-${key}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onPick(key)}
            className={cn(
              "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-[0.9375rem] font-semibold transition-[background-color,color,box-shadow,border-color] duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] active:duration-100 sm:px-5",
              EASE,
              look === "segmented" &&
                (selected ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"),
              look === "pills" && "min-h-14 border",
              look === "pills" &&
                (selected
                  ? tone === "primary"
                  ? "border-transparent bg-primary text-primary-foreground shadow-[0_12px_28px_-14px_var(--primary)]"
                  : "border-transparent bg-ink text-ink-foreground shadow-[0_12px_28px_-16px_var(--ink)]"
                  : "border-foreground/15 bg-card/80 text-foreground hover:border-foreground/30 hover:bg-card"),
            )}
          >
            <side.icon className="size-4.5 shrink-0" />
            <span className="sm:hidden">{side.short}</span>
            <span className="max-sm:hidden">{side.tab}</span>
          </button>
        )
      })}
    </div>
  )
}

function Hero() {
  const [who, setWho] = useState<Who>("patient")
  return (
    <section className={cn(UNDER_HEADER, "relative isolate overflow-hidden lg:grid lg:min-h-[max(700px,100svh)] lg:grid-cols-2")}>
      <div aria-hidden className="absolute inset-x-0 top-0 -z-20 h-[30rem] lg:inset-y-0 lg:end-0 lg:start-auto lg:h-auto lg:w-[64%]">
        {ORDER.map((key) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={key}
            src={PHOTOS[key].src}
            alt=""
            className={cn("absolute inset-0 size-full object-cover object-[50%_30%]", FADE, who === key ? "opacity-100" : "opacity-0")}
          />
        ))}
        {/* Under the glass, so its edge feathers with the panel instead of stopping at the middle. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent max-lg:hidden" />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 top-56 -z-10 bg-background/55 backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,transparent,black_7rem)] lg:inset-y-0 lg:start-0 lg:end-auto lg:top-0 lg:w-[calc(50%+7rem)] lg:bg-background/45 lg:[mask-image:linear-gradient(to_left,black_calc(100%-7rem),transparent)]"
      />

      <div className="relative h-64 sm:h-80 lg:order-last lg:h-auto">
        <p aria-hidden className="absolute bottom-6 end-6 hidden h-10 w-64 rounded-full border border-white/30 bg-white/15 text-sm font-semibold text-white backdrop-blur-md lg:block">
          {ORDER.map((key) => (
            <span key={key} className={cn("absolute inset-0 flex items-center gap-2 px-4", FADE, who === key ? "opacity-100" : "opacity-0")}>
              {key === "patient" ? <HeartHandshake className="size-4" /> : <Stethoscope className="size-4" />}
              {PHOTOS[key].label}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-col justify-center px-4 pb-14 pt-2 sm:px-6 lg:pb-16 lg:pe-12 lg:ps-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))] 2xl:ps-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] lg:pt-32">
        <h1 className={TYPE.display}>درمانگر زخم مطمئن، نزدیک خانه شما</h1>
        <p className={`mt-5 ${MEASURE} ${TYPE.body}`}>
          زخم‌بان بیماران و همراهانشان را به درمانگران و پرستاران زخمِ تأییدشده در محدوده خودشان می‌رساند.
        </p>

        <div className="mt-10">
          <Switch who={who} onPick={setWho} />
        </div>

        {/* Both answers share one grid cell, so the slot is as tall as the longer one and never changes size. */}
        <div className={`mt-4 grid ${MEASURE} rounded-[24px] bg-card/85 p-5 shadow-[0_18px_44px_-28px_rgb(15_23_42/0.45)] sm:p-6`}>
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
                className={cn("[grid-area:1/1]", FADE, shown ? "visible opacity-100" : "invisible opacity-0")}
              >
                <h2 className={TYPE.title}>{side.title}</h2>
                <p className={`mt-2 ${TYPE.body}`}>{side.desc}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {side.action}
                  <Link href={side.more.href} className={`inline-flex min-h-11 items-center ${TYPE.meta} text-link underline-offset-4 hover:underline`}>
                    {side.more.label}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <ul className={`mt-8 flex flex-wrap gap-y-2 ${TYPE.meta} [&>li+li]:border-s [&>li+li]:border-foreground/15 [&>li+li]:ps-4 [&>li]:pe-4`}>
          {PATIENT_TRUST.map((point) => (
            <li key={point.title}>{point.title}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Option7(data: HomeData) {
  return <ModernPage {...data} hero={<Hero />} />
}
