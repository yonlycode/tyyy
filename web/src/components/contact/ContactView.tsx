'use client';

import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { Container, Section } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';
import type { LinksData } from '@/lib/links';
import { LinkIcon } from './LinkIcon';

/* ── Unified link cards ──────────────────────────────────────────── */

const LinkGrid = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: m3Theme.spacing.md,
  maxWidth: '520px',
  margin: '0 auto',
});

const LinkCard = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: m3Theme.spacing.md,
  background: m3Theme.colors.surface,
  border: `1px solid ${m3Theme.colors.outlineVariant}`,
  borderRadius: m3Theme.radius.large,
  padding: m3Theme.spacing.lg,
  color: m3Theme.colors.onSurface,
  textDecoration: 'none',
  fontWeight: m3Theme.font.weights.semibold,
  fontSize: m3Theme.font.sizes.lg,
  boxShadow: m3Theme.elevation.level1,
  transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',

  '&:hover': {
    boxShadow: m3Theme.elevation.level3,
    borderColor: m3Theme.colors.primary,
    transform: 'translateY(-3px)',
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

const CardIconWrap = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  flexShrink: 0,
  color: m3Theme.colors.primary,
});

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
