'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

const NavbarRoot = styled('header')({
  position: 'sticky',
  top: 0,
  zIndex: m3Theme.z.navbar,
  background: 'rgba(254, 247, 255, 0.82)',
  backdropFilter: 'saturate(180%) blur(12px)',
  WebkitBackdropFilter: 'saturate(180%) blur(12px)',
  borderBottom: `1px solid ${m3Theme.colors.outlineVariant}`,
});

const NavbarInner = styled('nav')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0.75rem ${m3Theme.spacing.xl}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: m3Theme.spacing.lg,
});

const Logo = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
  textDecoration: 'none',
  color: m3Theme.colors.onSurface,
  fontWeight: m3Theme.font.weights.extrabold,
  fontSize: m3Theme.font.sizes.lg,
  letterSpacing: '-0.01em',
});

const LogoMark = styled('span')({
  width: '34px',
  height: '34px',
  borderRadius: m3Theme.radius.medium,
  background: m3Theme.gradients.glow,
  color: m3Theme.colors.onPrimary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.bold,
  boxShadow: m3Theme.elevation.level1,
});

const Links = styled('div')({
  display: 'flex',
  gap: m3Theme.spacing.xl,
  alignItems: 'center',
});

const NavLink = styled(Link)<{ active: boolean }>(({ active }) => ({
  color: active ? m3Theme.colors.primary : m3Theme.colors.onSurfaceVariant,
  textDecoration: 'none',
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.semibold,
  position: 'relative',
  paddingBlock: '0.25rem',
  transition: 'color 0.2s ease',

  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-4px',
    height: '2px',
    borderRadius: m3Theme.radius.circular,
    background: m3Theme.gradients.glow,
    transform: active ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '&:hover': {
    color: m3Theme.colors.onSurface,
    '&::after': { transform: 'scaleX(1)' },
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
    borderRadius: m3Theme.radius.small,
  },
}));

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/articles/', label: 'Articles' },
  { href: '/contact/', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <NavbarRoot>
      <NavbarInner>
        <Logo href="/">
          <LogoMark>TY3</LogoMark>
        </Logo>
        <Links>
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              active={pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))}
            >
              {link.label}
            </NavLink>
          ))}
        </Links>
      </NavbarInner>
    </NavbarRoot>
  );
}
