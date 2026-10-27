import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import Layout from "@/components/Layout";
import StandardDisclosure from "@/components/StandardDisclosure";
import { useNoindex } from "@/components/useNoindex";
import { articlePath, articles, formatArticleDate } from "@/content/articles";
import { downloads } from "@/content/downloads";
import { RESOURCES_HOLD_FOR_LAUNCH } from "@/content/resources.config";

// Resources hub: articles (src/content/articles, newest first) and downloads
// (src/content/downloads.ts). All copy requires compliance review.
const Resources = () => {
  useNoindex(RESOURCES_HOLD_FOR_LAUNCH);

  return (
    <Layout>
      <div className="bg-primary pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">Resources</h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white mt-4">
              Articles and downloads for Americans preparing to make Aliya.
            </p>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white" aria-labelledby="articles-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 id="articles-heading" className="font-serif text-2xl font-bold text-primary mb-6">
              Articles
            </h2>
            {articles.length === 0 ? (
              <p className="text-muted-foreground">No articles are posted yet.</p>
            ) : (
              <ul className="space-y-6">
                {articles.map((a) => (
                  <li key={a.slug} className="border border-border rounded-lg p-5 bg-card/40">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                      <time dateTime={a.date}>{formatArticleDate(a.date)}</time>
                      {a.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-navy-50 text-primary">
                          {tag}
                        </span>
                      ))}
                      {a.draft && (
                        <span className="px-2 py-0.5 rounded-full bg-gold-500 text-primary font-semibold">
                          Draft preview
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-2">
                      <Link to={articlePath(a.slug)} className="hover:text-gold-700">
                        {a.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-3">{a.summary}</p>
                    <Link
                      to={articlePath(a.slug)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-primary"
                    >
                      Read the article <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy-50 border-t border-border" aria-labelledby="downloads-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 id="downloads-heading" className="font-serif text-2xl font-bold text-primary mb-6">
              Downloads
            </h2>
            <ul className="space-y-4">
              {downloads.map((d) => (
                <li key={d.href} className="border border-border rounded-lg p-5 bg-white flex gap-4">
                  <Download size={22} className="text-gold-700 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-primary mb-1">{d.title}</h3>
                    <p className="text-muted-foreground mb-2">{d.summary}</p>
                    <Link to={d.href} className="text-sm font-semibold text-gold-700 hover:text-primary underline">
                      {d.linkLabel}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-primary/70 text-sm mt-8 text-center">
              Questions about your own situation?{" "}
              <Link to="/contact" className="underline hover:text-accent">
                Request a free consultation
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <StandardDisclosure />
    </Layout>
  );
};

export default Resources;
