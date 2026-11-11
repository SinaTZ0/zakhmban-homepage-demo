"use client"

// Option 10 · Composed, settled: option 9 with the swimlanes (its lanes study D) and the review's fixes.
//   · The lanes: the heading alone (no lead, no rail legend: the lane tabs say it), then the two lanes.
//   · The hero's fourth trust point no longer repeats «contact only after you choose» (step five and the trust panel
//     both say it); it promises the comparison instead, in the lanes' own words (steps two and three).
//   · Trust: the two small panels put the medallion beside the title, and the house sketch is larger, so the privacy
//     panel has no dead space.
//   · The journal lists two posts after the lead, so the questions panel beside it has no empty block.
//   · The dressing guide marks the picked dressing in solid blue (row, phone chip and the showcase's label).
//   · More tray below the blue closing call, so it doesn't sit right on the navy footer.
import { CreditCard, MapPin, Scale, ShieldCheck } from "lucide-react"

import { cn } from "cn"

import { wrap } from "./option-5"
import { Hero, type Point } from "./option-8"
import { DressingGuide } from "./option-8-dressings"
import { MeetingLanes } from "./option-8-lanes"
import { Closing, Journal, PAD, PANEL, Questions, Shop, TrustBento } from "./option-9"
import { Swimlanes } from "./option-9-lanes"
import { Footer, Header, type HomeData } from "./parts"

/** Option 8's four points with the contact promise swapped for the comparison (LANES steps two and three). */
const POINTS: Point[] = [
  { icon: MapPin, title: "درمانگران محدوده شما", sub: "نزدیک خانه شما" },
  { icon: ShieldCheck, title: "درمانگران تأییدشده", sub: "مدارک، دستی بررسی می‌شود" },
  { icon: Scale, title: "مقایسه و انتخاب", sub: "پیشنهاد و هزینه هر جلسه را می‌بینید" },
  { icon: CreditCard, title: "پرداخت امن", sub: "درگاه بانکی یا کیف پول برنامه" },
]

export function Option10(data: HomeData) {
  const { categories, products, posts } = data
  return (
    <>
      <Header categories={categories} floating />
      <main>
        <Hero vivid points={POINTS} className="lg:min-h-[max(720px,calc(100svh-3rem))]" />

        <div className="relative z-10 -mt-10 rounded-t-[32px] bg-muted pb-10 pt-4 sm:rounded-t-[40px] sm:pb-14 sm:pt-5">
          <div className={cn(wrap, "grid grid-cols-[minmax(0,1fr)] gap-4 sm:gap-5")}>
            <MeetingLanes framed intro={false} desktop={<Swimlanes />} />
            <TrustBento compact />
            <section className={cn(PANEL, PAD)}>
              <DressingGuide vivid />
            </section>
            <Shop products={products} />
            <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:gap-5 lg:grid-cols-12">
              {posts.length > 0 && <Journal posts={posts} more={2} />}
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
