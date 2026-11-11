// The study's colour palette. The user picked Clinical Blue on 2026-11-11; the other five candidates (Current,
// Deep Teal, Ink & Sky, Sage & Stone, Pastel) were removed. It sets the shadcn tokens plus four of the site's own:
// link, success, warning and ink (the dark surface). Every text pair passes WCAG AA (4.5:1).

export type Palette = { name: string; lead: string; vars: Record<string, string> }

const palette = (c: {
  primary: string
  soft: string
  softInk: string
  link: string
  muted: string
  border: string
  fg: string
  mutedFg: string
  success: string
  warning: string
  danger: string
  ink: string
  page?: string
}): Record<string, string> => ({
  "--background": c.page ?? "#ffffff",
  "--foreground": c.fg,
  "--card": "#ffffff",
  "--card-foreground": c.fg,
  "--popover": "#ffffff",
  "--popover-foreground": c.fg,
  "--primary": c.primary,
  "--primary-foreground": "#ffffff",
  "--secondary": c.soft,
  "--secondary-foreground": c.softInk,
  "--muted": c.muted,
  "--muted-foreground": c.mutedFg,
  "--accent": c.soft,
  "--accent-foreground": c.softInk,
  "--destructive": c.danger,
  "--border": c.border,
  "--input": c.border,
  "--ring": c.primary,
  "--link": c.link,
  "--success": c.success,
  "--warning": c.warning,
  "--ink": c.ink,
  "--ink-foreground": "#ffffff",
})

export const PALETTES: Palette[] = [
  {
    name: "Clinical Blue",
    lead: "The logo blue, deeper and quieter, on cool slate greys.",
    vars: palette({
      primary: "#0e5a9a", soft: "#eaf2f9", softInk: "#0b4a80", link: "#0f766e", muted: "#f5f7fa",
      border: "#e2e8f0", fg: "#0f172a", mutedFg: "#475569", success: "#15803d", warning: "#b45309",
      danger: "#b91c1c", ink: "#0b1e33",
    }),
  },
]
