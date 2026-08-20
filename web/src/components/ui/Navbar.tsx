'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

const NavbarRoot = styled('header')({
  position: 'sticky',
  top: 0,
  zIndex: m3Theme.z.navbar,
  background: 'rgba(11, 15, 25, 0.8)',
  backdropFilter: 'saturate(180%) blur(16px)',
  WebkitBackdropFilter: 'saturate(180%) blur(16px)',
  borderBottom: `1px solid ${m3Theme.colors.surfaceBorder}`,
});

const NavbarInner = styled('nav')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0.875rem ${m3Theme.spacing.xl}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: m3Theme.spacing.lg,

  '@media (max-width: 768px)': {
    padding: `0.75rem ${m3Theme.spacing.md}`,
  },
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

  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>(({ $active }) => ({
  color: $active ? m3Theme.colors.onSurface : m3Theme.colors.onSurfaceMuted,
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
    transform: $active ? 'scaleX(1)' : 'scaleX(0)',
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

const MenuButton = styled('button')({
  display: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: m3Theme.spacing.sm,
  color: m3Theme.colors.onSurface,
  borderRadius: m3Theme.radius.small,
  transition: 'background 0.2s ease',

  '&:hover': { background: m3Theme.colors.surfaceHover },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },

  '@media (max-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Bar = styled('span')<{ $open: boolean }>(({ $open }) => ({
  display: 'block',
  width: '20px',
  height: '2px',
  borderRadius: m3Theme.radius.circular,
  background: 'currentColor',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',

  '& + &': { marginTop: '4px' },

  ...($open && {
    '&:nth-of-type(1)': { transform: 'translateY(6px) rotate(45deg)' },
    '&:nth-of-type(2)': { opacity: 0 },
    '&:nth-of-type(3)': { transform: 'translateY(-6px) rotate(-45deg)' },
  }),
}));

const MobileMenu = styled('div')<{ $open: boolean }>(({ $open }) => ({
  display: 'none',
  flexDirection: 'column',
  gap: '0.125rem',
  padding: `${$open ? '0.5rem' : '0'} ${m3Theme.spacing.md}`,
  maxHeight: $open ? '320px' : '0',
  opacity: $open ? 1 : 0,
  overflow: 'hidden',
  transition:
    'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, padding 0.35s ease',

  '@media (max-width: 768px)': {
    display: 'flex',
  },
}));

const MobileLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>(({ $active }) => ({
  color: $active ? m3Theme.colors.onSurface : m3Theme.colors.onSurfaceMuted,
  textDecoration: 'none',
  fontSize: m3Theme.font.sizes.md,
  fontWeight: m3Theme.font.weights.medium,
  padding: '0.75rem 0.75rem',
  borderRadius: m3Theme.radius.small,
  borderLeft: `2px solid ${$active ? m3Theme.colors.primary : 'transparent'}`,
  background: $active ? m3Theme.colors.primarySoft : 'transparent',
  transition: 'color 0.2s ease, background 0.2s ease',

  '&:hover': {
    color: m3Theme.colors.onSurface,
    background: m3Theme.colors.surfaceHover,
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
}));

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/articles/', label: 'Articles' },
  { href: '/contact/', label: 'Contact' },
];

function isActive(href: string, pathname: string | null): boolean {
  return (
    pathname === href || (href !== '/' && pathname?.startsWith(href)) || false
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
              $active={isActive(link.href, pathname)}
            >
              {link.label}
            </NavLink>
          ))}
        </Links>
        <MenuButton
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Bar $open={open} />
          <Bar $open={open} />
          <Bar $open={open} />
        </MenuButton>
      </NavbarInner>
      <MobileMenu $open={open}>
        {links.map((link) => (
          <MobileLink
            key={link.href}
            href={link.href}
            $active={isActive(link.href, pathname)}
          >
            {link.label}
          </MobileLink>
        ))}
      </MobileMenu>
    </NavbarRoot>
  );
}
