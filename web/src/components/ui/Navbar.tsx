'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Bar,
  Links,
  Logo,
  LogoMark,
  MenuButton,
  MobileLink,
  MobileMenu,
  NavLink,
  NavbarInner,
  NavbarRoot,
} from './Navbar.styles';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/articles/', label: 'Articles' },
  { href: '/portfolio/', label: 'Portfolio' },
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
