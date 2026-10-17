import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Ty3`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-5 sm:px-8 pt-36 pb-32">
      {/* Ambient glow */}
      <div className="relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[var(--color-brand)]/15 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Back link */}
      <div className="mb-10">
        <Link
          href="/projets"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-brand)] transition-colors group px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Retour aux projets</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-14 space-y-6">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="font-semibold px-2.5 py-1 rounded-md bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20">
            {project.status}
          </span>
          <span className="font-medium px-2.5 py-1 rounded-md bg-[var(--color-surface-elevated)] text-[var(--color-ink-muted)] border border-[var(--color-border)]">
            {project.category}
          </span>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-[var(--color-surface-elevated)] text-[var(--color-ink-muted)] border border-[var(--color-border-subtle)] font-mono text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.15]">
          {project.title}
        </h1>

        <div className="relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-7 shadow-xs">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[var(--color-brand)] to-[var(--color-brand-secondary)]" />
          <p className="text-lg sm:text-xl text-[var(--color-ink)] font-normal leading-relaxed pl-1">
            {project.description}
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="prose max-w-none pt-2">
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-[var(--color-border)] flex justify-between items-center">
        <Link
          href="/projets"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:underline"
        >
          <span>← Tous les projets</span>
        </Link>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          <span>Lire nos articles techniques →</span>
        </Link>
      </footer>
    </article>
  );
}
