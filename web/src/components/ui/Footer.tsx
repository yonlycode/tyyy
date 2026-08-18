'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

const FooterRoot = styled('footer')({
  background: m3Theme.colors.deep,
  color: m3Theme.colors.surfaceBright,
  marginTop: m3Theme.spacing.xxxl,
});

const FooterInner = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `${m3Theme.spacing.xxl} ${m3Theme.spacing.xl}`,
  display: 'flex',
  flexDirection: 'column',
  gap: m3Theme.spacing.xl,
});

const FooterTop = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.lg,
});

const FooterBrand = styled('div')({
  fontWeight: m3Theme.font.weights.bold,
  fontSize: m3Theme.font.sizes.lg,
  color: m3Theme.colors.surfaceBright,
});

const FooterLinks = styled('div')({
  display: 'flex',
  gap: m3Theme.spacing.xl,
});

const FooterLink = styled(Link)({
  color: m3Theme.colors.surfaceBright,
  textDecoration: 'none',
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.medium,
  opacity: 0.85,
  transition: 'color 0.2s ease, opacity 0.2s ease',

  '&:hover': { color: m3Theme.colors.brandAccent, opacity: 1 },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${m3Theme.colors.brandAccent}`,
    borderRadius: m3Theme.radius.small,
  },
});

const FooterBottom = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  paddingTop: m3Theme.spacing.lg,
  borderTop: `1px solid rgba(255,255,255,0.1)`,
  fontSize: m3Theme.font.sizes.xs,
  color: m3Theme.colors.surfaceBright,
  opacity: 0.8,
});

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterRoot>
      <FooterInner>
        <FooterTop>
          <FooterBrand>Yoann Fort</FooterBrand>
          <FooterLinks>
            <FooterLink href="/">Accueil</FooterLink>
            <FooterLink href="/portfolio/">Portfolio</FooterLink>
            <FooterLink href="/articles/">Articles</FooterLink>
            <FooterLink href="/privacy/">Mentions légales</FooterLink>
          </FooterLinks>
        </FooterTop>
        <FooterBottom>
          <span>© {year} Yoann Fort. Architecte IA &amp; Lead LLMOps.</span>
          <span>Next.js · Emotion · Material Design 3</span>
        </FooterBottom>
      </FooterInner>
    </FooterRoot>
  );
}