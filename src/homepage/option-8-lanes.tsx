"use client"

// Option 8 · where patient and therapist meet. Two rails, green for the patient and blue for the therapist, run side
// by side; each step is a sketch medallion on its side's rail, with its words just outside the rail. At step five the
// rails curve into each other (the contact opens, under a slow pulse) and run on together. Words come from option 5's
// LANES.
import { LockKeyholeOpen } from "lucide-react"

import { cn } from "cn"

import { LANES, TYPE, wrap } from "./option-5"
import { Swash } from "./option-8-dressings"
import { fa } from "./parts"

export type Lane = (typeof LANES)[number]["lane"]

/** The band's height and where each rail runs in it, in px (the SVG's viewBox uses the same numbers). */
export const BAND = 144
export const RAIL: Record<Lane, number> = { patient: 44, therapist: 100, both: 72 }
/** Step six runs on the joined rails, after the meeting. */
export const railOf = (i: number, lane: Lane) => (i > 4 ? RAIL.both : RAIL[lane])

export const SIDE: Record<Lane, { name: string; text: string; badge: string; ring: string }> = {
  patient: { name: "بیمار", text: "text-success", badge: "bg-success text-white", ring: "ring-success/25" },
  therapist: { name: "درمانگر", text: "text-primary", badge: "bg-primary text-primary-foreground", ring: "ring-primary/25" },
  both: { name: "هر دو طرف", text: "text-primary", badge: "bg-primary text-primary-foreground", ring: "ring-primary/60" },
}

export const sketch = (i: number) => `/design-study/lane-step-${i + 1}.webp`

export function Eyebrow({ i, lane, onBlue = false }: { i: number; lane: Lane; onBlue?: boolean }) {
  return (
    <p className={cn("text-xs font-bold leading-5", onBlue ? "text-primary-foreground/80" : SIDE[lane].text)}>
      گام {fa(i + 1)} · {SIDE[lane].name}
    </p>
  )
}

/** A step's sketch in a round frame on its rail, its number pinned to the edge. */
/** `onBlue`: the meeting medallion on option 9's solid blue capsule: white rings instead of blue ones. */
export function Medallion({
  i,
  lane,
  big = false,
  onBlue = false,
  className,
  imgClassName,
}: {
  i: number
  lane: Lane
  big?: boolean
  onBlue?: boolean
  className?: string
  imgClassName?: string
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-card shadow-[0_12px_28px_-18px_rgb(15_23_42/0.5)]",
        big ? "size-24 ring-2" : "size-[4.5rem] ring-1",
        onBlue ? "ring-primary-foreground/70" : SIDE[lane].ring,
        className,
      )}
    >
      {big &&
        [0, 1].map((n) => (
          <span
            key={n}
            aria-hidden
            className={cn(
              "absolute inset-0 -z-10 rounded-full border opacity-0 animate-[study-ping_4.8s_ease-out_infinite]",
              onBlue ? "border-primary-foreground/70" : "border-primary/40",
            )}
            style={{ animationDelay: `${n * 2.4}s` }}
          />
        ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sketch(i)} alt="" className={cn("object-contain", big ? "w-20" : "w-16", imgClassName)} />
      <span
        aria-hidden
        className={cn("absolute -end-1 -top-1 inline-flex size-6 items-center justify-center rounded-full text-xs font-bold ring-2 ring-[var(--lane-edge,var(--muted))]", SIDE[lane].badge)}
      >
        {lane === "both" ? <LockKeyholeOpen className="size-3.5" /> : fa(i + 1)}
      </span>
    </span>
  )
}

/** `strong`: option 9's rails, drawn at three quarters instead of under half. */
function Rails({ strong = false }: { strong?: boolean }) {
  // Drawn left to right and mirrored for RTL. Columns are 100 units wide; step five's centre is x = 450.
  return (
    <svg
      aria-hidden
      viewBox={`0 0 600 ${BAND}`}
      preserveAspectRatio="none"
      fill="none"
      className="absolute inset-0 size-full [mask-image:linear-gradient(to_left,transparent,black_4%,black_96%,transparent)] rtl:-scale-x-100"
    >
      <path
        d={`M0 ${RAIL.patient} H375 C418 ${RAIL.patient} 412 ${RAIL.both - 3} 450 ${RAIL.both - 3} H600`}
        className={strong ? "text-success/75" : "text-success/45"}
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M0 ${RAIL.therapist} H375 C418 ${RAIL.therapist} 412 ${RAIL.both + 3} 450 ${RAIL.both + 3} H600`}
        className={strong ? "text-primary/75" : "text-primary/45"}
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** `framed`: option 9 sets it as a white panel on its tray instead of a full-width muted band, with stronger rails and the meeting point in solid blue. */
/** `desktop` replaces the six-column rails (option 9's lane studies); `aside` is drawn first, inside the panel. */
/** `intro={false}`: the heading alone, without the lead and the rail legend (option 10). */
export function MeetingLanes({
  framed = false,
  desktop,
  aside,
  intro = true,
}: {
  framed?: boolean
  desktop?: React.ReactNode
  aside?: React.ReactNode
  intro?: boolean
}) {
  return (
    <section
      className={framed ? "relative rounded-[32px] bg-card px-5 py-8 ring-1 ring-foreground/[0.04] sm:p-10 xl:p-12" : "bg-muted py-20 sm:py-24"}
      style={framed ? ({ "--lane-edge": "var(--card)" } as React.CSSProperties) : undefined}
    >
      {aside}
      <div className={framed ? undefined : wrap}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 className={`max-w-xl ${TYPE.heading}`}>
            بیمار و درمانگر کجا{" "}
            <span className="relative inline-block text-primary">
              به هم می‌رسند
              <Swash className="absolute -bottom-2 start-[6%] h-3 w-[88%] text-primary/55" />
            </span>
          </h2>
          {intro && (
          <div className="max-w-md">
            <p className={TYPE.body}>
              هر کدام در برنامه خودش کار می‌کند. اطلاعات تماس فقط در گام پنجم و فقط برای درمانگر انتخاب‌شده باز می‌شود.
            </p>
            <ul aria-hidden className={`mt-3 flex flex-wrap max-lg:hidden gap-x-5 gap-y-1 ${TYPE.meta}`}>
              <li className="flex items-center gap-2">
                <span className="h-0.5 w-6 rounded-full bg-success/60" />
                بیمار
              </li>
              <li className="flex items-center gap-2">
                <span className="h-0.5 w-6 rounded-full bg-primary/60" />
                درمانگر
              </li>
            </ul>
          </div>
          )}
        </div>

        {/* Desktop: six columns; each step is one list item spanning the three rows (words, band, words) by subgrid. */}
        {desktop ? <div className="hidden lg:block">{desktop}</div> : (
        <ol className={cn("relative hidden grid-cols-6 lg:grid", framed ? "mt-12" : "mt-14")} style={{ gridTemplateRows: `auto ${BAND}px auto` }}>
          {/* The meeting column's capsule: pale and under the rails in option 8; in option 9 solid blue, over the
              rails, so they run into it. */}
          <li
            aria-hidden
            className={cn(
              "relative -my-6 mx-1 rounded-[32px]",
              framed
                ? "z-[1] bg-primary shadow-[0_24px_48px_-28px_var(--primary)]"
                : "bg-secondary [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]",
            )}
            style={{ gridColumn: 5, gridRow: "1 / span 3" }}
          />
          <li aria-hidden className="relative" style={{ gridColumn: "1 / -1", gridRow: 2 }}>
            <Rails strong={framed} />
          </li>
          {LANES.map((step, i) => {
            const lane: Lane = step.lane
            const meet = lane === "both"
            const y = railOf(i, lane)
            const words = (
              <div className={cn("text-center", lane === "therapist" ? "self-start pt-4" : "self-end pb-4")}>
                <Eyebrow i={i} lane={lane} />
                <p className="mt-1 font-bold leading-7">{step.title}</p>
                <p className="mx-auto mt-1 max-w-[13rem] text-sm leading-6 text-muted-foreground">{step.desc}</p>
              </div>
            )
            return (
              <li key={step.title} className={cn("relative row-span-3 grid grid-rows-subgrid px-3", framed && "z-[2]")} style={{ gridColumn: i + 1, gridRow: "1 / span 3" }}>
                {/* Row 1: the patient's words. Step five: its name, above the meeting. */}
                {meet ? (
                  <div className="self-end pb-4 text-center">
                    <Eyebrow i={i} lane={lane} onBlue={framed} />
                    <p className={cn("mt-1 font-extrabold leading-7", framed ? "text-primary-foreground" : "text-primary")}>{step.title}</p>
                  </div>
                ) : (
                  (lane === "patient" ? words : <div />)
                )}

                <div className="relative">
                  {/* Centred on its rail. */}
                  <span className="absolute start-1/2 flex -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2" style={{ top: y }}>
                    <Medallion i={i} lane={lane} big={meet} onBlue={framed && meet} />
                  </span>
                </div>

                {/* Row 3: the therapist's words. Step five: what happens. */}
                {meet ? (
                  <p className={cn("self-start pt-4 text-center text-sm leading-6", framed ? "text-primary-foreground/80" : "text-muted-foreground")}>{step.desc}</p>
                ) : (
                  (lane === "therapist" ? words : <div />)
                )}
              </li>
            )
          })}
        </ol>
        )}

        {/* Phones and tablets: one column; the medallions on a single line, each step beside its sketch. */}
        <ol className="mt-10 lg:hidden">
          {LANES.map((step, i) => {
            const lane: Lane = step.lane
            return (
              <li key={step.title} className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0">
                {i < LANES.length - 1 && (
                  <span aria-hidden className="absolute bottom-0 start-9 top-[4.5rem] w-0 border-s-2 border-dashed border-foreground/15" />
                )}
                <Medallion i={i} lane={lane} />
                <div className={cn("pt-2", lane === "both" && cn("-mt-2 rounded-[22px] p-4", framed ? "bg-primary text-primary-foreground" : "bg-secondary"))}>
                  <Eyebrow i={i} lane={lane} onBlue={framed && lane === "both"} />
                  <p className={cn("mt-1 font-bold leading-7", lane === "both" && !framed && "text-primary")}>{step.title}</p>
                  <p className={cn("mt-1 text-sm leading-6", framed && lane === "both" ? "text-primary-foreground/80" : "text-muted-foreground")}>{step.desc}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
