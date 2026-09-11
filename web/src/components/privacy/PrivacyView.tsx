'use client';

import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { Container, Card, Section, Eyebrow, SectionTitle } from '@/components/ui';
import { Heading, Paragraph, SectionBlock } from './PrivacyView.styles';

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
