import type { Metadata } from 'next';
import { PrivacyView } from '../../components/privacy/PrivacyView';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales & confidentialité',
  description:
    'Mentions légales, politique de confidentialité et informations sur les cookies et l’analyse d’audience du site.',
  path: '/privacy',
  type: 'website',
  images: ['/opengraph-image'],
  keywords: ['mentions légales', 'confidentialité', 'RGPD'],
});

export default function PrivacyPage() {
  return <PrivacyView />;
}