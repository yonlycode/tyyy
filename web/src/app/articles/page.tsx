import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles & Retours du Lab — Ty3",
  description: "Réflexions techniques, architectures souveraines, inférence locale et ingénierie sans compromis.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-36 pb-32">
      {/* Header */}
      <header className="mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20">
          <span>LAB & INGÉNIERIE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Articles & Retours d'Expérience
        </h1>
        <p className="text-lg sm:text-xl text-[var(--color-ink-muted)] max-w-2xl leading-relaxed">
          Pas de théorie hors-sol ni de démos jetables. Des retours bruts sur l'inférence locale, l'orchestration multi-agents et la souveraineté logicielle.
        </p>
      </header>

      {/* Grid of Articles */}
      <div className="grid gap-6">
        {articles.map((article) => (
          <article key={article.slug}>
            <Link
              href={`/articles/${article.slug}`}
              className="block group p-7 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] card-glow shadow-xs relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-ink-muted)]">
                  <time dateTime={article.date} className="font-medium">
                    {new Date(article.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span className="text-[var(--color-ink-subtle)]">•</span>
                  <span>{article.readingTime}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--color-surface-elevated)] text-[var(--color-ink-muted)] border border-[var(--color-border-subtle)] group-hover:border-[var(--color-brand)]/30 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors mb-2.5 leading-snug">
                {article.title}
              </h2>

              <p className="text-[var(--color-ink-muted)] text-base sm:text-lg leading-relaxed line-clamp-2">
                {article.description}
              </p>

              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)]">
                <span>Lire l'article</span>
                <span className="group-hover:translate-x-1.5 transition-transform">→</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
