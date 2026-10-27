// Article registry for the Resources hub.
//
// Every Markdown file in this folder (except README.md) is one article. The
// file starts with a frontmatter block; see README.md for the format. The hub
// (/resources) lists articles newest first, each article gets the route
// /resources/<slug>, and the prerender (src/entry-server.tsx) picks the routes
// up from `articleRoutes` below. No other file needs editing to add an article.
import { marked } from "marked";
import { RESOURCES_HOLD_FOR_LAUNCH, SHOW_DRAFTS } from "../resources.config";

export interface Article {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** ISO date shown as "Information current as of ...". Defaults to `date`. */
  currentAsOf: string;
  summary: string;
  tags: string[];
  draft: boolean;
  /** Article body rendered from Markdown to HTML at build time. */
  html: string;
}

const files = import.meta.glob(["./*.md", "!./README.md"], { query: "?raw", import: "default", eager: true }) as Record<
  string,
  string
>;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const unquote = (v: string) => v.trim().replace(/^(["'])(.*)\1$/, "$2");

function parseFrontmatter(file: string, raw: string): { data: Record<string, string>; body: string } {
  const m = raw.replace(/^\uFEFF/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter block (--- ... ---) at the top of the file`);
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const i = line.indexOf(":");
    if (i < 1) throw new Error(`${file}: bad frontmatter line "${line}"`);
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body: m[2] };
}

function toArticle(file: string, raw: string): Article {
  const { data, body } = parseFrontmatter(file, raw);
  for (const key of ["slug", "title", "date", "summary"]) {
    if (!data[key]) throw new Error(`${file}: frontmatter is missing "${key}"`);
  }
  const slug = unquote(data.slug);
  const date = unquote(data.date);
  if (!SLUG_RE.test(slug)) throw new Error(`${file}: slug "${slug}" must be lowercase words joined by hyphens`);
  if (!DATE_RE.test(date)) throw new Error(`${file}: date "${date}" must be YYYY-MM-DD`);
  const currentAsOf = data.currentAsOf ? unquote(data.currentAsOf) : date;
  if (!DATE_RE.test(currentAsOf)) throw new Error(`${file}: currentAsOf "${currentAsOf}" must be YYYY-MM-DD`);
  const tagsRaw = data.tags ? data.tags.replace(/^\[|\]$/g, "") : "";
  return {
    slug,
    title: unquote(data.title),
    date,
    currentAsOf,
    summary: unquote(data.summary),
    tags: tagsRaw.split(",").map(unquote).filter(Boolean),
    draft: unquote(data.draft ?? "false").toLowerCase() === "true",
    html: marked.parse(body, { async: false }) as string,
  };
}

const all: Article[] = Object.entries(files)
  // Production builds blank draft files (vite.config.ts), so skip empty ones.
  .filter(([, raw]) => raw.trim() !== "")
  .map(([file, raw]) => toArticle(file, raw));

const seen = new Set<string>();
for (const a of all) {
  if (seen.has(a.slug)) throw new Error(`Duplicate article slug "${a.slug}" in src/content/articles`);
  seen.add(a.slug);
}

/** Articles visible on this build, newest first. Drafts only on local and Preview builds. */
export const articles: Article[] = all
  .filter((a) => SHOW_DRAFTS || !a.draft)
  .sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : b.date.localeCompare(a.date)));

export const getArticle = (slug: string | undefined): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const articlePath = (slug: string) => `/resources/${slug}`;

/** True when a page should carry <meta name="robots" content="noindex">. */
export const isNoindexArticle = (a: Article) => RESOURCES_HOLD_FOR_LAUNCH || a.draft;

/** Formats an ISO date as "October 27, 2026" without time zone drift. */
export const formatArticleDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

// Used by src/entry-server.tsx for the prerender and sitemap.
export const resourcesRoutes: string[] = ["/resources", ...articles.map((a) => articlePath(a.slug))];
export const resourcesNoindexRoutes: string[] = [
  ...(RESOURCES_HOLD_FOR_LAUNCH ? ["/resources"] : []),
  ...articles.filter(isNoindexArticle).map((a) => articlePath(a.slug)),
];
export const resourcesSitemapExcludeRoutes: string[] = resourcesNoindexRoutes;
