'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';
import type { LinkItem } from '@/lib/links';
import { LinkIcon } from '@/components/contact/LinkIcon';
import { LogoMark } from './Navbar';

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

  '@media (max-width: 768px)': {
    padding: `${m3Theme.spacing.lg} ${m3Theme.spacing.md}`,
  },
});

const FooterTop = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr',
  gap: m3Theme.spacing.xl,

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr 1fr',
    '& > :first-of-type': { gridColumn: '1 / -1' },
  },

  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    '& > :first-of-type': { gridColumn: 'auto' },
  },
});

const Brand = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: m3Theme.spacing.sm,
});

const BrandRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
});

const BrandName = styled('span')({
  fontWeight: m3Theme.font.weights.extrabold,
  fontSize: m3Theme.font.sizes.xl,
  letterSpacing: '-0.01em',
  color: m3Theme.colors.onSurface,
});

const Tagline = styled('p')({
  margin: 0,
  color: m3Theme.colors.onSurfaceDim,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: m3Theme.font.lineHeights.normal,
  maxWidth: '280px',
});

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: m3Theme.spacing.md,
});

const ColumnTitle = styled('h3')({
  margin: 0,
  color: m3Theme.colors.onSurface,
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.semibold,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

const FooterLinks = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: m3Theme.spacing.sm,
});

const FooterLink = styled(Link)({
  color: m3Theme.colors.onSurfaceMuted,
  textDecoration: 'none',
  fontSize: m3Theme.font.sizes.md,
  fontWeight: m3Theme.font.weights.medium,
  opacity: 0.85,
  transition: 'color 0.2s ease, opacity 0.2s ease',
  width: 'fit-content',

  '&:hover': { color: m3Theme.colors.primaryHover, opacity: 1 },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${m3Theme.colors.primary}`,
    borderRadius: m3Theme.radius.small,
  },
});

const SocialRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: m3Theme.spacing.sm,
});

const SocialLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: m3Theme.radius.medium,
  color: m3Theme.colors.onSurfaceMuted,
  background: m3Theme.colors.surfaceHover,
  border: `1px solid ${m3Theme.colors.outlineVariant}`,
  transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',

  '& svg': { width: '20px', height: '20px' },

  '&:hover': {
    color: m3Theme.colors.primaryHover,
    background: m3Theme.colors.primarySoft,
    borderColor: m3Theme.colors.primary,
    transform: 'translateY(-2px)',
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
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

export function Footer({ links }: { links: LinkItem[] }) {
  const year = new Date().getFullYear();

  return (
    <FooterRoot>
      <FooterInner>
        <FooterTop>
          <Brand>
            <BrandRow>
              <LogoMark>TY3</LogoMark>
              <BrandName>tyyy</BrandName>
            </BrandRow>
            <Tagline>Architecte IA &amp; Lead LLMOps. Je conçois des systèmes et produits intelligents, de la donnée au déploiement.</Tagline>
          </Brand>
          <Column>
            <ColumnTitle>Navigation</ColumnTitle>
            <FooterLinks>
              <FooterLink href="/">Accueil</FooterLink>
              <FooterLink href="/portfolio/">Portfolio</FooterLink>
              <FooterLink href="/articles/">Articles</FooterLink>
              <FooterLink href="/privacy/">Mentions légales</FooterLink>
            </FooterLinks>
          </Column>
          <Column>
            <ColumnTitle>Connect</ColumnTitle>
            <SocialRow>
              {links.map((link) => (
                <SocialLink
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  <LinkIcon name={link.icon} />
                </SocialLink>
              ))}
            </SocialRow>
          </Column>
        </FooterTop>
        <FooterBottom>
          <span>© {year} tyyy. Architecte IA &amp; Lead LLMOps.</span>
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