import fs from 'fs';
import path from 'path';

const linksFilePath = path.join(process.cwd(), 'content', 'links.json');

export interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface LinksData {
  title: string;
  subtitle: string;
  links: LinkItem[];
}

export function getLinks(): LinksData {
  if (!fs.existsSync(linksFilePath)) {
    return { title: 'Retrouvez-moi', subtitle: '', links: [] };
  }
  try {
    const raw = fs.readFileSync(linksFilePath, 'utf8');
    const data = JSON.parse(raw) as LinksData;
    return {
      title: data.title || 'Retrouvez-moi',
      subtitle: data.subtitle || '',
      links: (data.links || []).filter((l) => l.enabled),
    };
  } catch {
    return { title: 'Retrouvez-moi', subtitle: '', links: [] };
  }
}
