// Launch controls for the Resources hub (/resources) and its articles.
//
// RESOURCES_HOLD_FOR_LAUNCH
//   true  = /resources and every /resources/<slug> page is prerendered with
//           <meta name="robots" content="noindex"> and left out of sitemap.xml.
//   false = the hub and published (non-draft) articles are indexable and listed
//           in sitemap.xml. Draft articles are always noindex and never in the sitemap.
// Flip this one value to hold or release the hub. Publishing still requires
// compliance review and Michael's CCO sign-off.
export const RESOURCES_HOLD_FOR_LAUNCH = false;

// Draft articles (frontmatter `draft: true`) appear on local and Vercel Preview
// builds only. Production builds drop them entirely: no route, no prerendered
// page, no hub listing, no sitemap entry. Set in vite.config.ts from VERCEL_ENV.
export const SHOW_DRAFTS: boolean = __SHOW_DRAFTS__;
