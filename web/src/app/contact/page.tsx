import type { Metadata } from 'next';
import { ContactView } from '../../components/contact/ContactView';
import { getLinks } from '../../lib/links';

export const metadata: Metadata = {
  title: 'Contact - Yoann Fort',
  description: 'Retrouvez-moi et contactez-moi via mes différents liens',
};

export default function ContactPage() {
  const data = getLinks();
  return <ContactView data={data} />;
}
