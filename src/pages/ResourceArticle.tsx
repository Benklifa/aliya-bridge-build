import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import StandardDisclosure from "@/components/StandardDisclosure";
import { useNoindex } from "@/components/useNoindex";
import { formatArticleDate, getArticle, isNoindexArticle } from "@/content/articles";
import NotFound from "./NotFound";
import "./ResourceArticle.css";

// One article from src/content/articles, at /resources/<slug>.
const ResourceArticle = () => {
  const { slug } = useParams();
  const article = getArticle(slug);
  useNoindex(article ? isNoindexArticle(article) : false);

  if (!article) return <NotFound />;

  return (
    <Layout>
      <div className="bg-primary pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/resources"
              className="inline-flex items-center gap-1 text-sm text-gold-500 hover:text-white mb-4"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Resources
            </Link>
            <h1 className="fs-h1 font-serif font-bold text-white mb-3">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
              <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
              {article.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm text-white/80">
              Information current as of{" "}
              <time dateTime={article.currentAsOf}>{formatArticleDate(article.currentAsOf)}</time>
            </p>
          </div>
        </div>
      </div>

      {article.draft && (
        <div className="bg-[#FBF3DC] border-b border-gold-500">
          <div className="container mx-auto px-4 py-3">
            <p className="max-w-3xl mx-auto text-sm text-primary">
              <strong>Draft preview.</strong> This page is not published. Draft articles appear only on
              preview builds and are left out of search indexes and the sitemap.
            </p>
          </div>
        </div>
      )}

      <article className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="article-body max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: article.html }} />
          <div className="max-w-3xl mx-auto mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <Link
              to="/resources"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Back to Resources
            </Link>
            <p className="text-primary/70 text-sm">
              Questions about your own situation?{" "}
              <Link to="/contact" className="underline hover:text-accent">
                Request a free consultation
              </Link>
              .
            </p>
          </div>
        </div>
      </article>

      <StandardDisclosure />
    </Layout>
  );
};

export default ResourceArticle;
