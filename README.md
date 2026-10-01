# Portfolio

Personal site for Christos Uster Biswas. The pages are a Next.js app. The copy and case studies live in Sanity.

The homepage is one page: home, about, work, and contact. A case study is at `/work/[slug]`.

## Setup

```bash
npm install
```

Create `.env` in the project root. It is gitignored.

```bash
NEXT_PUBLIC_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=local
NEXT_PUBLIC_BASEPATH=/admin
NEXT_PUBLIC_FORM_KEY=your_web3forms_access_key
```

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_PROJECT_ID` | Sanity project the site and the CLI talk to |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset the site reads. Use `local` while editing. `production` is the live dataset |
| `NEXT_PUBLIC_BASEPATH` | Sanity Studio mount path. Defaults to `/admin` |
| `NEXT_PUBLIC_FORM_KEY` | Web3Forms key for the contact form. The form submits nothing useful without it |

Start the app:

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/admin](http://localhost:3000/admin)

`/admin` redirects to `/admin/local` or `/admin/production`, matching `NEXT_PUBLIC_SANITY_DATASET`. Both workspaces are defined in `sanity.config.ts` and share the same schema.

## Working on it

Change the layout and behavior in code. Change the words in Sanity, either in Studio or by editing the seed file and importing it again.

| Area | Where |
| --- | --- |
| Homepage sections | `components/Home.tsx`, `About.tsx`, `Work.tsx`, `Contact.tsx`, `Footer.tsx` |
| Case study | `components/CaseStudy.tsx`, `app/(general)/work/[slug]/page.tsx` |
| Sanity queries | `sanity/sanity-utils.tsx` |
| Document shape | `sanity/schema/template-schema.tsx`, `sanity/schema/work-schema.tsx` |

Two document types:

- **Template** is the single site profile: subtitle, about copy, role, focus, location, experience, the "currently" list, and the footer. `aboutContentSpan` is the phrase highlighted at the end of the about paragraph.
- **Work** is a case study: title, slug, subtitle, description, year, role, industry, `workTech` (comma-separated), context, problem, approach, outcome, responsibilities, metrics, and an optional cover and gallery. Empty live, client, or server URLs are hidden. A case study with no cover uses the generated figure.

Work is ordered by the `order` field. The public URL is `/work/` plus `slug.current`.

The site fetches with `cache: "no-store"`, so a Studio publish or a seed import shows up on refresh. Switching datasets means changing `NEXT_PUBLIC_SANITY_DATASET` and restarting `npm run dev`.

```bash
npm run lint
npm run build
```

## Seeding

`seed/` is gitignored. The dataset snapshot stays on your machine as `seed/local.ndjson`. You can pretty-print a document while editing. `npm run seed` collapses each document onto one line, then imports into the `local` dataset with `--replace`.

Log in once so the CLI can write to the project:

```bash
npx sanity login
```

`sanity.cli.js` reads `NEXT_PUBLIC_PROJECT_ID` from `.env`. The seed command always targets `local`, so an import cannot land on `production` by accident.

```bash
npm run seed
```

`--replace` overwrites documents whose `_id` is already in `local`. It does not delete documents that are absent from the file. After you drop or rename an `_id`, delete the old document:

```bash
npx sanity documents delete --dataset=local work-old-id
```

A template document looks like this, stored as a single line in the file:

```json
{
  "_id": "template-local",
  "_type": "template",
  "subtitle": "Software engineer",
  "subtitleSkills": "Python, TypeScript, RAG, multi-agent systems",
  "aboutTitle": "Full-stack products, and the AI systems that have to hold up in production.",
  "aboutContent": "Opening sentences of the about paragraph.",
  "aboutContentSpan": "the highlighted ending.",
  "role": "Software Engineer II",
  "focus": "Full-stack and AI systems",
  "location": "Dhaka",
  "experience": [
    {
      "_key": "exp-bs23",
      "_type": "object",
      "role": "Software Engineer II",
      "company": "Brain Station 23",
      "period": "March 2024 — Present"
    }
  ],
  "currently": ["Multi-tenant AI customer service"],
  "footer": "Christos Uster Biswas"
}
```

A work document:

```json
{
  "_id": "work-service-desk",
  "_type": "work",
  "title": "Service desk",
  "slug": { "_type": "slug", "current": "service-desk" },
  "subtitle": "Two customer-service products on one multi-tenant platform.",
  "description": "Short summary used at the top of the case study.",
  "year": "2024",
  "role": "Software Engineer II",
  "industry": "Customer service",
  "workTech": "FastAPI, LlamaIndex, Next.js, Qdrant, AWS",
  "order": 1,
  "context": "What the product was.",
  "problem": "The constraint.",
  "approach": "What you built.",
  "outcome": "What shipped.",
  "highlight": "One sentence.",
  "responsibilities": ["Owned the architecture"],
  "metrics": [{ "_key": "m1", "_type": "object", "value": "2", "label": "Live products" }]
}
```

Every object inside an array needs a unique `_key`. To attach an image, point `_sanityAsset` at an absolute file path:

```json
"cover": {
  "_type": "image",
  "_sanityAsset": "image@file:///absolute/path/to/cover.jpg"
}
```

Gallery items use the same image object plus a `caption`, and each item needs its own `_key`. Omit `cover` when a case study should use the generated figure.

Crop the files to the frame before import. The case study cover is 16:9 (1600×900). Gallery images are 4:3 (1600×1200). Both are shown with `object-cover`. The work-list hover crops the same cover to 3:2 at 240×160, which trims about 8% off each side of a 16:9 file. A 16:9 image placed in the gallery loses about 12% on each side.
