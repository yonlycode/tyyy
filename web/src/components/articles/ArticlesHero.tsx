import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

export function ArticlesHero() {
  return (
    <header className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,var(--brand)/12%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

      <Container size="lg">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2">
            <Badge variant="default" size="md">
              LAB & INGÉNIERIE
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.12]">
            Articles & Retours du Lab
          </h1>
          <p className="text-lg sm:text-xl text-[var(--ink-muted)] leading-relaxed font-normal">
            Architectures souveraines, inférence locale et flottes multi-agents sans filtre. Des retours bruts d'ingénierie, 100 % ancrés sur notre code en production.
          </p>
        </div>
      </Container>
    </header>
  );
}
