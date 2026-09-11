'use client';

import type { LinkItem } from '@/lib/links';
import { LinkIcon } from '@/components/contact/LinkIcon';
import { LogoMark } from './Navbar.styles';
import {
  Availability,
  Brand,
  BrandName,
  BrandRow,
  Column,
  ColumnTitle,
  FooterBottom,
  FooterInner,
  FooterLink,
  FooterLinks,
  FooterRoot,
  FooterTop,
  SocialLink,
  SocialRow,
  StatusDot,
  Tagline,
} from './Footer.styles';

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
