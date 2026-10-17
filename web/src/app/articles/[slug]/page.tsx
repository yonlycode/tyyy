import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — Ty3`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-5 sm:px-8 pt-36 pb-32">
      {/* Ambient background glow */}
      <div className="relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[var(--color-brand)]/15 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Back button */}
      <div className="mb-10">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-brand)] transition-colors group px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Retour aux articles</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-14 space-y-6">
        {/* Meta pill badges */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--color-ink-muted)]">
          <time dateTime={article.date} className="font-medium px-2.5 py-1 rounded-md bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
            {new Date(article.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          <span className="text-[var(--color-ink-subtle)]">•</span>
          <span className="font-medium px-2.5 py-1 rounded-md bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
            {article.readingTime}
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-medium border border-[var(--color-brand)]/20"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.15]">
          {article.title}
        </h1>

        {/* Lead deck / Callout */}
        <div className="relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-7 shadow-xs">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[var(--color-brand)] to-[var(--color-brand-secondary)]" />
          <p className="text-lg sm:text-xl text-[var(--color-ink)] font-normal leading-relaxed pl-1">
            {article.description}
          </p>
        </div>
      </header>

      {/* Content Body */}
      <div className="prose max-w-none pt-2">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Bottom Footer Navigation */}
      <footer className="mt-20 pt-8 border-t border-[var(--color-border)] flex justify-between items-center">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:underline"
        >
          <span>← Voir tous les articles</span>
        </Link>
        <Link
          href="/projets"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          <span>Découvrir les projets du Lab →</span>
        </Link>
      </footer>
    </article>
  );
}
