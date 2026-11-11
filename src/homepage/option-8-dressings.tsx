"use client"

// Option 8 · the dressing guide. Five of the eight dressing notes describe how wet a wound is (dry, low, moderate to
// heavy, heavy, very heavy exudate), so those five sit on a scale from dry to very wet; film, silver and collagen sit
// apart as special needs. Picking one (click or keyboard, never hover) fades in a showcase with the hero's curved
// edge and pale band: the dressing's sketch at full ink, its note, a five-step wetness gauge and the shop link. All
// eight showcases share one grid cell, so the section never changes size. Every word comes from DRESSINGS.
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, Droplet, Droplets } from "lucide-react"

import { cn } from "cn"

import { EASE, TYPE } from "./option-5"
import { FADE } from "./option-7"
import { BrandIcon, DRESSINGS } from "./parts"
import { Button } from "./ui/button"

type Dressing = (typeof DRESSINGS)[number]
const byIcon = (icon: string) => DRESSINGS.find((d) => d.icon === icon) as Dressing

/** Dry to very wet, from the dressings' own notes. `level` is the step on the five-step gauge. */
const SCALE = [
  { dressing: byIcon("dressing-hydrogel"), level: 1, label: "خشک" },
  { dressing: byIcon("dressing-hydrocolloid"), level: 2, label: "کم‌ترشح" },
  { dressing: byIcon("dressing-foam"), level: 3, label: "ترشح متوسط تا زیاد" },
  { dressing: byIcon("dressing-alginate"), level: 4, label: "پرترشح" },
  { dressing: byIcon("dressing-superabsorbent"), level: 5, label: "ترشح بسیار زیاد" },
]
const SPECIAL = [byIcon("dressing-film"), byIcon("dressing-silver"), byIcon("dressing-collagen")]
const LEVEL = new Map(SCALE.map((step) => [step.dressing.icon, step]))

/** A hand-drawn double stroke under accented words (the hero's). */
export function Swash({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 18" preserveAspectRatio="none" fill="none" className={className}>
      <path d="M4 12 C 55 4, 130 2, 196 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M34 16 C 85 11, 140 10, 178 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** `vivid` (option 10): the picked row is solid primary blue with white words, instead of a raised white card. */
function Row({ dressing, picked, onPick, vivid = false }: { dressing: Dressing; picked: boolean; onPick: () => void; vivid?: boolean }) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={picked}
        aria-controls="dressing-showcase"
        onClick={onPick}
        className={cn(
          "group flex min-h-16 w-full items-center gap-4 rounded-[20px] px-3 py-2.5 text-start outline-none transition-[background-color,box-shadow] duration-300 focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.995] active:duration-100",
          EASE,
          picked
            ? vivid
              ? "bg-primary text-primary-foreground shadow-[0_16px_36px_-20px_var(--primary)]"
              : "bg-card shadow-[0_14px_36px_-24px_rgb(15_23_42/0.45)] ring-1 ring-foreground/5"
            : "hover:bg-foreground/[0.035]",
        )}
      >
        <span
          className={cn(
            "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300",
            EASE,
            picked ? (vivid ? "bg-card shadow-sm" : "bg-secondary") : "bg-card ring-1 ring-foreground/5",
          )}
        >
          <BrandIcon name={dressing.icon} size={30} />
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn("block font-bold leading-7 transition-colors duration-300", picked && !vivid && "text-primary")}>{dressing.name}</span>
          <span className={cn("block text-sm leading-6 transition-colors duration-300", picked && vivid ? "text-primary-foreground/80" : "text-muted-foreground")}>
            {dressing.note}
          </span>
        </span>
        <ChevronLeft
          aria-hidden
          className={cn(
            "size-5 shrink-0 transition-[opacity,transform] duration-300",
            picked && vivid ? "text-primary-foreground" : "text-primary",
            EASE,
            picked ? "opacity-100" : "translate-x-1 opacity-0 group-hover:opacity-40 rtl:-translate-x-1",
          )}
        />
      </button>
    </li>
  )
}

/** The five-step wetness gauge: steps up to `level` filled, a drop at each end. */
function Gauge({ level }: { level: number }) {
  return (
    <div>
      <p className={TYPE.meta}>میزان ترشح زخم</p>
      <div className="mt-2 flex items-center gap-2">
        <Droplet aria-hidden className="size-4 shrink-0 text-primary/50" />
        <div className="flex flex-1 gap-1.5">
          {[1, 2, 3, 4, 5].map((step) => (
            <span
              key={step}
              className={cn("h-2 flex-1 rounded-full", step <= level ? "bg-primary" : "bg-primary/15")}
              style={step <= level ? { opacity: 0.45 + step * 0.11 } : undefined}
            />
          ))}
        </div>
        <Droplets aria-hidden className="size-4 shrink-0 text-primary" />
      </div>
    </div>
  )
}

/** Faint concentric arcs behind the sketch: the hero's curve, repeated. */
export function Arcs({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 400" fill="none" className={className}>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx="200" cy="200" r={70 + i * 34} stroke="currentColor" strokeWidth="1.25" />
      ))}
    </svg>
  )
}

/** The panel's edge toward the list: the hero photo's half-ellipse, gentler. Phones get plain rounded corners. */
export const SHOWCASE_CURVE = "rounded-[32px] lg:rounded-s-none lg:[border-start-start-radius:18%_46%] lg:[border-end-start-radius:18%_54%]"

/** `vivid` (option 10): the picked dressing in solid blue, in the list, the phone chips and the showcase's label. */
export function DressingGuide({ vivid = false }: { vivid?: boolean }) {
  const [picked, setPicked] = useState("dressing-foam")
  const header = (title: string) => (
    <p className={`flex items-center gap-4 ${TYPE.meta}`}>
      {title}
      <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-foreground/15 to-transparent" />
    </p>
  )

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className={TYPE.heading}>
            پانسمان مناسب{" "}
            <span className="relative inline-block text-primary">
              زخم خود
              <Swash className="absolute -bottom-2 start-[6%] h-3 w-[80%] text-primary/55" />
            </span>{" "}
            را بشناسید
          </h2>
          <p className={`mt-5 ${TYPE.body}`}>آشنایی کوتاه با انواع پانسمان‌های نوین. انتخاب نهایی را با نظر پزشک یا درمانگر انجام دهید.</p>
        </div>
        <Button variant="outline" size="lg" className="self-start lg:self-auto" render={<Link href="/blog" />}>
          راهنمای انتخاب پانسمان
        </Button>
      </div>

      {/* Phones: the eight as one scrolling row of chips, in scale order, right above the showcase. */}
      <div className="-mx-4 mt-8 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden">
        {[...SCALE.map((step) => step.dressing), ...SPECIAL].map((dressing) => {
          const on = picked === dressing.icon
          return (
            <button
              key={dressing.icon}
              type="button"
              aria-pressed={on}
              aria-controls="dressing-showcase"
              onClick={() => setPicked(dressing.icon)}
              className={cn(
                "inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border ps-1.5 pe-4 text-sm font-semibold transition-colors duration-200",
                on ? (vivid ? "border-transparent bg-primary text-primary-foreground" : "border-transparent bg-ink text-ink-foreground") : "border-foreground/15 bg-card",
              )}
            >
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-card">
                <BrandIcon name={dressing.icon} size={22} />
              </span>
              {dressing.name}
            </button>
          )
        })}
      </div>

      <div className="mt-4 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
        <div className="max-lg:hidden">
          {header("بر اساس میزان ترشح زخم")}
          {/* The scale: a bar from pale (dry) to deep (very wet) beside the five, in order. */}
          <div className="mt-3 grid grid-cols-[auto_1fr] gap-3">
            <div aria-hidden className="flex flex-col items-center gap-2 py-3">
              <Droplet className="size-4 text-primary/45" />
              <span className="w-1 flex-1 rounded-full bg-gradient-to-b from-primary/10 to-primary" />
              <Droplets className="size-4 text-primary" />
            </div>
            <ul className="space-y-1">
              {SCALE.map((step) => (
                <Row key={step.dressing.icon} vivid={vivid} dressing={step.dressing} picked={picked === step.dressing.icon} onPick={() => setPicked(step.dressing.icon)} />
              ))}
            </ul>
          </div>

          <div className="mt-6">{header("برای نیازهای خاص")}</div>
          <ul className="mt-3 space-y-1 ps-7">
            {SPECIAL.map((dressing) => (
              <Row key={dressing.icon} vivid={vivid} dressing={dressing} picked={picked === dressing.icon} onPick={() => setPicked(dressing.icon)} />
            ))}
          </ul>
        </div>

        {/* The showcase: the hero's curve and pale band; all eight panels in one cell. */}
        <div className="relative">
          <div aria-hidden className={cn("absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-primary/5 max-lg:hidden", SHOWCASE_CURVE)} />
          <div
            id="dressing-showcase"
            aria-live="polite"
            className={cn("relative isolate grid h-full overflow-hidden bg-secondary ring-1 ring-primary/10 lg:ms-3.5", SHOWCASE_CURVE)}
          >
            <Arcs className="pointer-events-none absolute start-1/2 top-[38%] -z-10 size-[30rem] -translate-x-1/2 -translate-y-1/2 text-primary/10 rtl:translate-x-1/2" />
            {DRESSINGS.map((dressing) => {
              const shown = picked === dressing.icon
              const step = LEVEL.get(dressing.icon)
              return (
                <article
                  key={dressing.icon}
                  inert={!shown}
                  aria-hidden={!shown}
                  className={cn("flex flex-col items-center px-4 py-6 text-center [grid-area:1/1] sm:p-8 lg:ps-[16%]", FADE, shown ? "visible opacity-100" : "invisible opacity-0")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/design-study/${dressing.icon}.webp`}
                    alt=""
                    className={cn(
                      "mx-auto aspect-[4/3] w-full max-w-[21rem] object-contain transition-transform duration-700",
                      EASE,
                      shown ? "scale-100" : "scale-[0.97]",
                    )}
                  />
                  <div className="mt-auto flex w-full flex-col items-center pt-6">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span
                        className={cn(
                          "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold",
                          vivid ? "bg-primary text-primary-foreground" : "bg-card/80 text-secondary-foreground",
                        )}
                      >
                        {step ? step.label : "نیاز خاص"}
                      </span>
                    </div>
                    <h3 className={`mt-3 ${TYPE.heading}`}>{dressing.name}</h3>
                    <p className={`mt-2 ${TYPE.body}`}>{dressing.note}</p>
                    {step && (
                      <div className="mx-auto mt-5 w-full max-w-xs text-start">
                        <Gauge level={step.level} />
                      </div>
                    )}
                    <Button className="mt-6" size="lg" render={<Link href={`/shop?q=${encodeURIComponent(dressing.name)}`} />}>
                      پانسمان‌های {dressing.name} در فروشگاه
                      <ChevronLeft data-icon="inline-end" />
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}
