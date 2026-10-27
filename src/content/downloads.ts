// Downloadable resources listed in the Downloads section of /resources.
// Add an entry here to list a new download. Every entry's copy needs
// compliance review before publishing.
//
// The Aliya Money Checklist page (/aliya-money-checklist) and its PDF live on
// the money-checklist-page branch. Publish that branch with or before this hub,
// or the link below has nothing to open.
export interface DownloadEntry {
  title: string;
  summary: string;
  /** Page that introduces the download (preferred), or the file itself. */
  href: string;
  linkLabel: string;
}

export const downloads: DownloadEntry[] = [
  {
    title: "The Aliya Money Checklist",
    summary: "A money checklist for Americans planning Aliya, organized by time horizon.",
    href: "/aliya-money-checklist",
    linkLabel: "View the checklist",
  },
];
