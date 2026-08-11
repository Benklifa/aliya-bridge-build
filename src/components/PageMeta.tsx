import { Head } from "vite-react-ssg";

const SITE_URL = "https://aliyafinancial.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface PageMetaProps {
  title: string;
  description: string;
  /** Route path beginning with "/", used to build the canonical og:url */
  path: string;
  noindex?: boolean;
}

/**
 * Per-route document head. Rendered into static HTML at build time by
 * vite-react-ssg (react-helmet-async under the hood), so crawlers that
 * don't execute JS still see the correct tags. index.html deliberately
 * carries no title/description/OG tags — this component is the single
 * source of truth for them.
 */
const PageMeta = ({ title, description, path, noindex = false }: PageMetaProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    {noindex && <meta name="robots" content="noindex" />}
    <link rel="canonical" href={`${SITE_URL}${path}`} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${SITE_URL}${path}`} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={OG_IMAGE} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={OG_IMAGE} />
  </Head>
);

export default PageMeta;
