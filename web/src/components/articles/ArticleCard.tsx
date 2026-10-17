import Link from 'next/link';
import type { Article } from '@/types/article';
import { Badge } from '@/components/ui/Badge';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const dateFormatted = new Date(article.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="h-full">
      <Link
        href={`/articles/${article.slug}`}
        className="group relative flex flex-col justify-between h-full p-7 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.25)] overflow-hidden"
      >
        {/* Subtle accent gradient bar on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          {/* Metadata pill bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs text-[var(--ink-muted)]">
            <div className="flex items-center gap-2">
              <time dateTime={article.date} className="font-medium">
                {dateFormatted}
              </time>
              <span className="opacity-40">•</span>
              <span className="font-medium">{article.readingTime}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors mb-3 leading-snug">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[var(--ink-muted)] text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
            {article.description}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-sm font-semibold text-[var(--brand)]">
          <span>Lire l'article</span>
          <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
        </div>
      </Link>
    </article>
  );
}
