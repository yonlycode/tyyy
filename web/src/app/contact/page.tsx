import type { Metadata } from 'next';
import { ContactView } from '../../components/contact/ContactView';
import { getLinks } from '../../lib/links';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Retrouvez-moi et contactez-moi via mes différents liens : GitHub, LinkedIn, X et email.',
  path: '/contact',
  type: 'website',
  images: ['/opengraph-image'],
  keywords: ['contact', 'réseaux', 'email'],
});

export default function ContactPage() {
  const data = getLinks();
  return <ContactView data={data} />;
}
