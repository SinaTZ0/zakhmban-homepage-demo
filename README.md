# Zakhmban homepage: design preview (option 10)

A one-page, static preview of the proposed zakhmban.ir homepage ("Composed, settled", option 10 of the homepage
design study), for sharing with the team. It is not the site: products, articles and categories are a fixed sample
(`src/data.json`), and links into the rest of the site (/shop, /blog, …) do nothing when clicked.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static files in dist/
```

## Hosting

Any static host works; the build output is `dist/`.

- **Vercel:** import the repository; it detects Vite (build `npm run build`, output `dist`).
- **Cloudflare Pages:** framework preset *Vite* (build `npm run build`, output `dist`).

The page tells search engines not to index it (`noindex` in `index.html`).

## What is where

- `src/homepage/`: the page, copied from `apps/website/src/design-study/homepage/` (options 5–10 build on each
  other, so their files come along); `ui/` holds the shadcn components.
- `src/components`, `src/config`, `src/lib`: the few pieces of the website the page reads (FAQ and trust copy,
  contact details, app links, price formatting).
- `src/next-link.tsx`: a stand-in for Next.js's `Link`.
- `public/`: the sketches and photos, icons, articles' images and the Vazirmatn font.
