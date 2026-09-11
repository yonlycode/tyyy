'use client';

import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { Container, Section } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';
import type { LinksData } from '@/lib/links';
import { LinkIcon } from './LinkIcon';
import { CardIconWrap, LinkCard, LinkGrid } from './ContactView.styles';

/* ── Main component ──────────────────────────────────────────────── */

export function ContactView({ data }: { data: LinksData }) {
  return (
    <Section>
      <Container>
        <PageHero eyebrow="Contact" title={data.title} subtitle={data.subtitle} avatar="YF" />

        <LinkGrid>
          {data.links.map((link, index) => (
            <AnimatedFadeIn key={link.id} delay={0.15 + index * 0.08}>
              <LinkCard
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <CardIconWrap>
                  <LinkIcon name={link.icon} />
                </CardIconWrap>
                {link.label}
              </LinkCard>
            </AnimatedFadeIn>
          ))}
        </LinkGrid>
      </Container>
    </Section>
  );
}
