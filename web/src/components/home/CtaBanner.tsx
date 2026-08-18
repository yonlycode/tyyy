'use client';

import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { Container, Section, ButtonLink } from '@/components/ui';

const Banner = styled('div')({
  background: m3Theme.gradients.glow,
  borderRadius: m3Theme.radius.extraLarge,
  padding: m3Theme.spacing.xxl,
  textAlign: 'center',
  color: m3Theme.colors.onPrimary,
  boxShadow: m3Theme.elevation.level3,
  position: 'relative',
  overflow: 'hidden',
});

const CtaTitle = styled('h2')({
  fontSize: m3Theme.font.sizes['3xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  marginBottom: m3Theme.spacing.md,
});

const CtaText = styled('p')({
  fontSize: m3Theme.font.sizes.lg,
  opacity: 0.92,
  maxWidth: '560px',
  margin: '0 auto',
  marginBottom: m3Theme.spacing.xl,
});

const onPrimaryBg = { background: m3Theme.colors.onPrimary, color: m3Theme.colors.primary };

export function CtaBanner() {
  return (
    <Section>
      <Container>
        <AnimatedFadeIn>
          <Banner>
            <CtaTitle>Envie de passer à une IA souveraine ?</CtaTitle>
            <CtaText>
              Discutons de votre infrastructure, de vos coûts d’inférence et de votre stratégie de
              souveraineté numérique.
            </CtaText>
            <ButtonLink href="/privacy/" style={onPrimaryBg}>
              Me contacter
            </ButtonLink>
          </Banner>
        </AnimatedFadeIn>
      </Container>
    </Section>
  );
}