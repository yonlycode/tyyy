'use client';

import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { Container, Section, ButtonLink } from '@/components/ui';

/* Subtle grid pattern background */
const Banner = styled('div')({
  background: m3Theme.colors.surfaceElevated,
  borderRadius: m3Theme.radius.extraLarge,
  padding: `${m3Theme.spacing.xxl} ${m3Theme.spacing.xl}`,
  textAlign: 'center',
  color: m3Theme.colors.onSurface,
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: m3Theme.elevation.glow,

  /* Grid pattern overlay */
  backgroundImage: `
    linear-gradient(${m3Theme.colors.gridPattern} 1px, transparent 1px),
    linear-gradient(90deg, ${m3Theme.colors.gridPattern} 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px',
  backgroundPosition: 'center center',
});

const BannerInner = styled('div')({
  position: 'relative',
  zIndex: 1,
});

const CtaTitle = styled('h2')({
  fontSize: m3Theme.font.sizes['3xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: m3Theme.font.lineHeights.tight,
  letterSpacing: '-0.02em',
  marginBottom: m3Theme.spacing.md,
  color: m3Theme.colors.onSurface,
});

const CtaText = styled('p')({
  fontSize: m3Theme.font.sizes.lg,
  color: m3Theme.colors.onSurfaceMuted,
  lineHeight: m3Theme.font.lineHeights.relaxed,
  maxWidth: '560px',
  margin: '0 auto',
  marginBottom: m3Theme.spacing.xl,
});

export function CtaBanner() {
  return (
    <Section>
      <Container>
        <AnimatedFadeIn>
          <Banner>
            <BannerInner>
              <CtaTitle>Envie de passer à une IA souveraine ?</CtaTitle>
              <CtaText>
                Discutons de votre infrastructure, de vos coûts d'inférence et de votre stratégie de
                souveraineté numérique.
              </CtaText>
              <ButtonLink href="/contact/">
                Me contacter
              </ButtonLink>
            </BannerInner>
          </Banner>
        </AnimatedFadeIn>
      </Container>
    </Section>
  );
}
