"use client"

// Option 9 · four studies for the lanes' desktop layout, because steps one to four read small beside the blue
// meeting capsule. A small picker in the panel's corner switches them (?lanes=a|b|c|d); phones keep the one list.
//   A · Larger: the same two rails, with bigger medallions, thicker rails and larger words.
//   B · Tiles on wide rails: each rail is a wide pale track with a line down its middle; every step is its own
//       tinted tile that sits on its track, its medallion pinned to the tile's edge on the rail.
//   C · Card row: six equal cards in a row, tinted by side, joined by small arrows; step five the blue card.
//   D · Swimlanes: a green patient lane and a blue therapist lane, each headed by a solid tab; each step is a white
//       card in its lane, step five a blue card spanning both, and step six in one merged band, centred.
import { useEffect, useState } from "react"
import { ChevronLeft } from "lucide-react"

import { cn } from "cn"

import { LANES } from "./option-5"
import { SIDES } from "./option-7"
import { Eyebrow, type Lane, Medallion, MeetingLanes } from "./option-8-lanes"
import { fa } from "./parts"

type Study = "a" | "b" | "c" | "d"
const STUDIES: { key: Study; name: string }[] = [
  { key: "a", name: "Larger" },
  { key: "b", name: "Tiles on wide rails" },
  { key: "c", name: "Card row" },
  { key: "d", name: "Swimlanes" },
]

/** Each side's tint (the lane colours from study.css). */
const TILE: Record<Lane, string> = {
  patient: "bg-lane-patient ring-lane-patient-line",
  therapist: "bg-lane-therapist ring-lane-therapist-line",
  both: "bg-primary text-primary-foreground",
}
const BLUE_SHADOW = "shadow-[0_24px_48px_-28px_var(--primary)]"

function Words({ i, lane, onBlue = false, className }: { i: number; lane: Lane; onBlue?: boolean; className?: string }) {
  const step = LANES[i]
  return (
    <div className={className}>
      <Eyebrow i={i} lane={lane} onBlue={onBlue} />
      <p className={cn("mt-1 text-lg leading-8", lane === "both" ? "font-extrabold" : "font-bold")}>{step.title}</p>
      <p className={cn("mx-auto mt-1 max-w-[15rem] text-[0.9375rem] leading-7", onBlue ? "text-primary-foreground/80" : "text-muted-foreground")}>
        {step.desc}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */
/* A and B: the two rails. */

type RailSpec = { band: number; rail: Record<Lane, number>; tiles: boolean }
const LARGER: RailSpec = { band: 184, rail: { patient: 52, therapist: 132, both: 92 }, tiles: false }
const TILES: RailSpec = { band: 176, rail: { patient: 48, therapist: 128, both: 88 }, tiles: true }

/** The rails, drawn left to right and mirrored for RTL; step five's centre is x = 450. `wide`: pale 16px tracks
 *  with a line down the middle, which lie side by side after the meeting. */
function Track({ band, rail, wide }: { band: number; rail: Record<Lane, number>; wide: boolean }) {
  const off = wide ? 8 : 3
  const path = (from: number, to: number) => `M0 ${from} H375 C418 ${from} 412 ${to} 450 ${to} H600`
  const lines = [
    { d: path(rail.patient, rail.both - off), tone: "text-success" },
    { d: path(rail.therapist, rail.both + off), tone: "text-primary" },
  ]
  return (
    <svg
      aria-hidden
      viewBox={`0 0 600 ${band}`}
      preserveAspectRatio="none"
      fill="none"
      className="absolute inset-0 size-full [mask-image:linear-gradient(to_left,transparent,black_4%,black_96%,transparent)] rtl:-scale-x-100"
    >
      {lines.map((line) => (
        <g key={line.tone} className={line.tone}>
          {wide && <path d={line.d} stroke="currentColor" strokeOpacity={0.2} strokeWidth={16} vectorEffect="non-scaling-stroke" />}
          <path d={line.d} stroke="currentColor" strokeOpacity={0.8} strokeWidth={wide ? 2 : 3} vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </svg>
  )
}

function RailSteps({ band, rail, tiles }: RailSpec) {
  const big = tiles ? { className: "size-[5.5rem]", imgClassName: "w-[4.5rem]" } : { className: "size-24", imgClassName: "w-20" }
  return (
    <ol className="relative mt-12 grid grid-cols-6" style={{ gridTemplateRows: `auto ${band}px auto` }}>
      {/* The meeting column's blue capsule, over the rails so they run into it. */}
      <li aria-hidden className={cn("relative z-[1] -my-6 mx-1 rounded-[32px] bg-primary", BLUE_SHADOW)} style={{ gridColumn: 5, gridRow: "1 / span 3" }} />
      <li aria-hidden className="relative" style={{ gridColumn: "1 / -1", gridRow: 2 }}>
        <Track band={band} rail={rail} wide={tiles} />
      </li>
      {LANES.map((step, i) => {
        const lane: Lane = step.lane
        const meet = lane === "both"
        const y = i > 4 ? rail.both : rail[lane]
        // Patient steps (and step six, after the meeting) read above their rail; therapist steps below it.
        const above = lane !== "therapist"
        const words = (
          <div className={cn("relative flex flex-col text-center", above ? "justify-end" : "justify-start", tiles ? "h-full" : above ? "self-end" : "self-start")}>
            {tiles && (
              // The tile runs from its words to the middle of its medallion, on the rail.
              <span
                aria-hidden
                className={cn("absolute inset-x-0 rounded-[24px] ring-1", TILE[lane])}
                style={above ? { top: 0, bottom: -y } : { bottom: 0, top: -(band - y) }}
              />
            )}
            <Words i={i} lane={lane} className={cn("relative", tiles ? (above ? "px-4 pb-4 pt-5" : "px-4 pb-5 pt-4") : above ? "pb-5" : "pt-5")} />
          </div>
        )
        return (
          <li key={step.title} className={cn("relative z-[2] row-span-3 grid grid-rows-subgrid", tiles ? "px-1.5" : "px-3")} style={{ gridColumn: i + 1, gridRow: "1 / span 3" }}>
            {meet ? (
              <div className="self-end pb-5 text-center text-primary-foreground">
                <Eyebrow i={i} lane={lane} onBlue />
                <p className="mt-1 text-lg font-extrabold leading-8">{step.title}</p>
              </div>
            ) : above ? (
              words
            ) : (
              <div />
            )}
            <div className="relative">
              <span className="absolute start-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2" style={{ top: y }}>
                <Medallion i={i} lane={lane} big={meet} onBlue={meet} {...(meet ? { className: "size-28", imgClassName: "w-24" } : big)} />
              </span>
            </div>
            {meet ? (
              <p className="self-start px-2 pt-5 text-center text-[0.9375rem] leading-7 text-primary-foreground/80">{step.desc}</p>
            ) : !above ? (
              words
            ) : (
              <div />
            )}
          </li>
        )
      })}
    </ol>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */
/* C: the card row. */

function CardRow() {
  return (
    <ol className="mt-12 grid grid-cols-6 gap-4">
      {LANES.map((step, i) => {
        const lane: Lane = step.lane
        const meet = lane === "both"
        return (
          <li
            key={step.title}
            className={cn("relative flex flex-col items-center rounded-[24px] px-4 pb-6 pt-6 text-center", meet ? cn(TILE.both, BLUE_SHADOW) : cn("ring-1", TILE[lane]))}
          >
            {/* An arrow in the gap toward the next card (RTL: the next card is to the left). */}
            {i < LANES.length - 1 && (
              <span
                aria-hidden
                className="absolute -end-[1.375rem] top-[58px] z-10 inline-flex size-7 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm ring-1 ring-foreground/10"
              >
                <ChevronLeft className="size-4" />
              </span>
            )}
            <Medallion i={i} lane={lane} big={meet} onBlue={meet} className="size-24" imgClassName="w-20" />
            <Words i={i} lane={lane} onBlue={meet} className="mt-5" />
          </li>
        )
      })}
    </ol>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */
/* D: the swimlanes. */

const SWIM: { lane: "patient" | "therapist"; row: number; tab: string; line: string; name: string }[] = [
  { lane: "patient", row: 1, tab: "bg-success text-white shadow-[0_14px_30px_-18px_var(--success)]", line: "border-success/35", name: "بیمار" },
  { lane: "therapist", row: 2, tab: "bg-primary text-primary-foreground shadow-[0_14px_30px_-18px_var(--primary)]", line: "border-primary/35", name: "درمانگر" },
]

/**
 * Two lanes up to the meeting: each a tinted band headed by a solid tab (its side's icon and name), with a dashed
 * line down its middle. Step five, the blue card, spans both lanes; after it the two bands end and one band, green
 * fading into blue, carries step six, centred between the two lanes.
 */
export function Swimlanes() {
  return (
    <ol className="mt-12 grid grid-cols-[5rem_repeat(6,minmax(0,1fr))] gap-x-2.5 gap-y-3">
      {SWIM.map((swim) => {
        const side = SIDES[swim.lane]
        return [
          // The lane: from its tab to under step five's card (columns 1–6).
          <li key={`${swim.lane}-band`} aria-hidden className={cn("relative rounded-[28px] ring-1", TILE[swim.lane])} style={{ gridColumn: "1 / 7", gridRow: swim.row }}>
            <span className={cn("absolute end-0 start-[5.5rem] top-1/2 border-t-2 border-dashed", swim.line)} />
          </li>,
          // The lane's tab: a solid strip of its colour, inset in the band's start.
          <li
            key={`${swim.lane}-name`}
            className={cn("relative my-3 ms-3 flex flex-col items-center justify-center gap-2.5 rounded-[20px] px-1 py-5", swim.tab)}
            style={{ gridColumn: 1, gridRow: swim.row }}
          >
            <span aria-hidden className="inline-flex size-10 items-center justify-center rounded-full bg-primary-foreground/15 ring-1 ring-primary-foreground/25">
              <side.icon className="size-5" />
            </span>
            <span className="text-sm font-bold">{swim.name}</span>
          </li>,
        ]
      })}
      {/* After the meeting: one band for both, green above fading into blue below. */}
      <li
        aria-hidden
        className="relative rounded-[28px] bg-gradient-to-b from-lane-patient to-lane-therapist ring-1 ring-lane-therapist-line"
        style={{ gridColumn: 7, gridRow: "1 / span 2" }}
      />
      {LANES.map((step, i) => {
        const lane: Lane = step.lane
        const meet = lane === "both"
        const after = i > 4
        return (
          <li
            key={step.title}
            className={cn(
              "relative flex flex-col items-center rounded-[22px] px-3 pb-5 pt-5 text-center",
              meet ? cn("-my-1 justify-center", TILE.both, BLUE_SHADOW) : "bg-card shadow-[0_12px_28px_-20px_rgb(15_23_42/0.45)] ring-1 ring-foreground/5",
              !meet && (after ? "mx-3 self-center" : "my-3"),
            )}
            style={{ gridColumn: i + 2, gridRow: meet || after ? "1 / span 2" : lane === "patient" ? 1 : 2 }}
          >
            <Medallion i={i} lane={lane} big={meet} onBlue={meet} className={meet ? "size-28" : "size-20"} imgClassName={meet ? "w-24" : "w-16"} />
            <p className={cn("mt-4 text-xs font-bold leading-5", meet ? "text-primary-foreground/80" : lane === "patient" ? "text-success" : "text-primary")}>
              گام {fa(i + 1)}
              {meet && " · هر دو طرف"}
              {after && " · بیمار"}
            </p>
            <p className={cn("mt-1 leading-7", meet ? "text-lg font-extrabold" : "font-bold")}>{step.title}</p>
            <p className={cn("mt-1 text-sm leading-6", meet ? "text-primary-foreground/80" : "text-muted-foreground")}>{step.desc}</p>
          </li>
        )
      })}
    </ol>
  )
}

/* ------------------------------------------------------------------------------------------------------------ */

const DESKTOP: Record<Study, React.ReactNode> = {
  a: <RailSteps {...LARGER} />,
  b: <RailSteps {...TILES} />,
  c: <CardRow />,
  d: <Swimlanes />,
}

/** Option 9's lanes with the study picker. The choice is kept in the address (?lanes=b). */
export function LaneStudies() {
  const [study, setStudy] = useState<Study>("d")

  useEffect(() => {
    const asked = new URL(window.location.href).searchParams.get("lanes")
    if (asked && asked in DESKTOP) setStudy(asked as Study)
  }, [])

  const pick = (next: Study) => {
    setStudy(next)
    const url = new URL(window.location.href)
    url.searchParams.set("lanes", next)
    window.history.replaceState(null, "", url)
  }

  const picker = (
    <div className="absolute end-4 top-2.5 z-10 hidden lg:block">
      <div dir="ltr" className="flex items-center gap-1 rounded-full bg-card p-1 text-xs font-semibold shadow-sm ring-1 ring-foreground/10">
        <span className="px-2 text-muted-foreground">Lanes study</span>
        {STUDIES.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-pressed={study === s.key}
            onClick={() => pick(s.key)}
            className={cn("rounded-full px-3 py-1 transition-colors", study === s.key ? "bg-foreground text-background" : "hover:bg-foreground/5")}
          >
            {s.key.toUpperCase()} · {s.name}
          </button>
        ))}
      </div>
    </div>
  )

  return <MeetingLanes framed aside={picker} desktop={DESKTOP[study]} />
}
