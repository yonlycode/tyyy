import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets du Lab — Ty3",
  description: "Réalisations concrètes, systèmes d'agents, appliances physiques et plateformes web.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-36 pb-32">
      {/* Header */}
      <header className="mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20">
          <span>RÉALISATIONS CONCRÈTES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Projets & Systèmes en Production
        </h1>
        <p className="text-lg sm:text-xl text-[var(--color-ink-muted)] max-w-2xl leading-relaxed">
          Des systèmes réels déployés sur notre infrastructure ou chez nos clients. Zéro fiction, du code qui tourne.
        </p>
      </header>

      {/* Grid of Projects */}
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article key={project.slug}>
            <Link
              href={`/projets/${project.slug}`}
              className="block h-full group p-7 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] card-glow shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-medium text-[var(--color-ink-muted)]">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20">
                    {project.status}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors mb-3">
                  {project.title}
                </h2>

                <p className="text-[var(--color-ink-muted)] text-base leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--color-surface-elevated)] text-[var(--color-ink-muted)] border border-[var(--color-border-subtle)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)]">
                  <span>Voir la fiche technique</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
