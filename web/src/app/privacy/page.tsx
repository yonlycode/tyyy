import type { Metadata } from 'next';
import { PrivacyView } from '../../components/privacy/PrivacyView';

export const metadata: Metadata = {
  title: 'Mentions Légales & Confidentialité',
};

export default function PrivacyPage() {
  return <PrivacyView />;
}