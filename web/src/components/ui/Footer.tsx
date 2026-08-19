'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

const FooterRoot = styled('footer')({
  background: m3Theme.colors.footerBg,
  color: m3Theme.colors.onSurfaceMuted,
  marginTop: m3Theme.spacing.xxxl,
  borderTop: `1px solid ${m3Theme.colors.footerBorder}`,
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
  color: m3Theme.colors.onSurface,
});

const FooterLinks = styled('div')({
  display: 'flex',
  gap: m3Theme.spacing.xl,
});

const FooterLink = styled(Link)({
  color: m3Theme.colors.onSurfaceMuted,
  textDecoration: 'none',
  fontSize: m3Theme.font.sizes.md,
  fontWeight: m3Theme.font.weights.medium,
  opacity: 0.85,
  transition: 'color 0.2s ease, opacity 0.2s ease',

  '&:hover': { color: m3Theme.colors.primaryHover, opacity: 1 },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${m3Theme.colors.primary}`,
    borderRadius: m3Theme.radius.small,
  },
});

const StatusDot = styled('span')({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: m3Theme.colors.success,
  boxShadow: `0 0 6px ${m3Theme.colors.success}`,
  marginRight: '6px',
  animation: 'pulse 2s ease-in-out infinite',
});

const FooterBottom = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  paddingTop: m3Theme.spacing.lg,
  borderTop: `1px solid ${m3Theme.colors.footerBorder}`,
  fontSize: m3Theme.font.sizes.sm,
  color: m3Theme.colors.onSurfaceDim,
});

const Availability = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: m3Theme.colors.onSurfaceMuted,
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.medium,
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
          <Availability>
            <StatusDot />
            Available for work
          </Availability>
          <span>Next.js · Emotion · Dark Design</span>
        </FooterBottom>
      </FooterInner>
    </FooterRoot>
  );
}
