import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn('prose max-w-none text-[var(--ink-muted)] leading-[1.85]', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] mt-14 mb-5 pt-6 border-t border-[var(--border-subtle)] leading-snug">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mt-10 mb-4 leading-snug">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-6 text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed font-normal">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-6 pl-6 space-y-2.5 list-disc text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed marker:text-[var(--brand)]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 pl-6 space-y-2.5 list-decimal text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed marker:text-[var(--brand)] font-medium">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-[var(--brand)] p-6 sm:p-7 shadow-xs not-italic text-[var(--ink)] font-medium text-lg leading-relaxed">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-[var(--ink)]">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[var(--brand)] underline underline-offset-4 decoration-[1.5px] hover:text-[var(--ink)] transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          hr: () => (
            <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-sm font-mono text-[var(--brand)] font-medium">
                  {children}
                </code>
              );
            }
            return (
              <code className={className}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-8 p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-x-auto text-sm font-mono text-[var(--ink)] shadow-xs leading-relaxed">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
