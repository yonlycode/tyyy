'use client';

import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { Container, Section, ButtonLink } from '@/components/ui';
import { Banner, BannerInner, CtaText, CtaTitle } from './CtaBanner.styles';

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
