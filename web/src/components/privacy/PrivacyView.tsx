'use client';

import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { Container, Card, Section, Eyebrow, SectionTitle } from '@/components/ui';

const SectionBlock = styled('div')({
  marginTop: m3Theme.spacing.lg,
});

const Heading = styled('h2')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.primary,
  margin: `0 0 ${m3Theme.spacing.md}`,
});

const Paragraph = styled('p')({
  color: m3Theme.colors.onSurfaceVariant,
  lineHeight: m3Theme.font.lineHeights.relaxed,
  margin: 0,
});

export function PrivacyView() {
  return (
    <Section>
      <Container>
        <AnimatedFadeIn>
          <Eyebrow>Légal</Eyebrow>
          <SectionTitle>Mentions Légales &amp; Confidentialité</SectionTitle>

          <Card style={{ padding: m3Theme.spacing.xxl, marginTop: m3Theme.spacing.xl }}>
            <SectionBlock>
              <Heading>Éditeur du site</Heading>
              <Paragraph>
                <strong>tyyy</strong>
                <br />
                Fondateur &amp; Consultant chez Karuka Conseil
                <br />
                Contact : via LinkedIn ou GitHub.
              </Paragraph>
            </SectionBlock>

            <SectionBlock>
              <Heading>Hébergement</Heading>
              <Paragraph>
                Ce site est un site statique hébergé par GitHub Pages (GitHub Inc., 88 Colin P Kelly
                Jr St, San Francisco, CA 94107, USA).
              </Paragraph>
            </SectionBlock>

            <SectionBlock>
              <Heading>Analyse d&apos;audience &amp; Cookies</Heading>
              <Paragraph>
                Ce site utilise Google Analytics 4 à des fins strictement statistiques (mesure
                d&apos;audience, pages les plus consultées, performances). Les adresses IP sont
                anonymisées et aucune donnée permettant de vous identifier personnellement n&apos;est
                collectée ou croisée à des fins publicitaires.
              </Paragraph>
            </SectionBlock>
          </Card>
        </AnimatedFadeIn>
      </Container>
    </Section>
  );
}