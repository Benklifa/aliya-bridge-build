# Resources articles

Each article is one Markdown file in this folder, named after its slug, for
example `src/content/articles/my-article-slug.md`. Adding the file is all it
takes: the hub at /resources lists it (newest first), it gets its own page at
/resources/<slug>, a browser tab title, and a prerendered page, and it goes in
sitemap.xml unless it is a draft or the hub is on hold
(`RESOURCES_HOLD_FOR_LAUNCH` in `src/content/resources.config.ts`).

## Format

```markdown
---
slug: my-article-slug
title: The Article Title
date: 2026-11-02
currentAsOf: 2026-11-02
summary: One or two sentences shown on the hub and used as the page description.
tags: [Taxes, Banking]
draft: true
---

Body in Markdown. Use ## for section headings (the page already shows the
title as the H1), plus paragraphs, lists, **bold**, and [links](/contact).
```

- `slug`: lowercase words joined by hyphens. It becomes the URL. Must be unique.
- `date`: YYYY-MM-DD. Controls the order on the hub.
- `currentAsOf`: optional, YYYY-MM-DD. The article page shows
  "Information current as of <date>" under the title. Leave it out to use
  `date`. When an article is reviewed and its facts are rechecked, update
  `currentAsOf` (and keep `date` as the original publish date).
- `tags`: optional, comma separated inside [ ].
- `draft`: optional. `true` keeps the article off Production builds entirely
  and marks it noindex on Preview builds. Leave `draft: true` until the article
  has compliance approval and Michael's CCO sign-off, then set it to `false`.

The build stops with an error if a required field is missing, the slug or
date is malformed, or two articles share a slug.

## Copy rules

"Aliya" (no h), "adviser", no em or en dashes, no performance, testimonial,
or superlative claims, no guarantees, no tax advice. Every article needs
compliance review before `draft` is set to `false`. The standard Oct 23
disclosure is added to every article page automatically; do not paste it
into the body.
