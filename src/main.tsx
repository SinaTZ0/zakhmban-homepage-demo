import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import data from "./data.json"
import { Option10 } from "./homepage/option-10"
import { PALETTES } from "./homepage/palettes"
import type { HomeData } from "./homepage/parts"
import "./homepage/study.css"

// The Clinical Blue palette on <html>, so menus and the sheet (which portal out of the page) get it too.
for (const [name, value] of Object.entries(PALETTES[0].vars)) document.documentElement.style.setProperty(name, value)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div data-study className="min-h-screen">
      <Option10 {...(data as HomeData)} />
    </div>
  </StrictMode>,
)
