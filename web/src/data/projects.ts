import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'flotte-agents-autonomes',
    title: "Flotte d'Agents Autonomes Karuka",
    description:
      "Système de collaboration multi-agents en production : spécialisation chirurgicale des rôles (Migo, Bueno, Malo, Kady), mesh VPN privé Tailscale et intégration continue impitoyable sous Forgejo.",
    longDescription:
      "Conception et exploitation quotidienne de la flotte d'agents IA du Lab Karuka Conseil. Finies les démos jetables : chaque agent possède une fiche de poste délimitée (Migo pour l'infra et Go 1.24, Bueno pour le produit et le design system, Malo pour la data, Kady sur le terrain) orchestrée par le runtime Hermes Agent. Zéro exposition publique, réseau maillé chiffré Tailscale, pushs via SSH dédié sur Forgejo et règle d'or de gouvernance : Bueno propose, Migo applique, Y tranche.",
    category: 'Agentic AI & DevOps',
    tags: ['Hermes Agent', 'Multi-Agents', 'Forgejo', 'Tailscale', 'Go 1.24', 'SeaweedFS'],
    role: 'Concepteur Système & Développeur',
    client: 'Karuka Lab',
    period: '2026',
    badge: 'Production Multi-Agents',
    featured: true,
  },
  {
    slug: 'kady-haas',
    title: 'Kady HaaS — Appliance IA Locale Souveraine',
    description:
      "Appliance physique 6 Watts pour l'inférence IA locale et le RAG documentaire sur site. Zéro dépendance cloud, disques chiffrés en matériel et résilience totale face aux coupures.",
    longDescription:
      "Développement de la solution Hardware-as-a-Service Kady Box Mini déployée en Guadeloupe. Conçue pour répondre aux contraintes réelles des entreprises et collectivités (souveraineté des données, coûts fixes sans racket au token US, continuité d'activité lors d'incidents sur les câbles sous-marins). Embarque un processeur Intel N100 (6W TDP), 16 Go DDR5, SSD NVMe chiffré sous LUKS2 et inférence locale débitant 15 à 25 tokens/s sur des modèles 3B/7B via llama.cpp en circuit fermé.",
    category: 'Hardware & Edge AI',
    tags: ['Intel N100', 'Edge AI', 'LUKS2', 'llama.cpp', 'HaaS', 'Tailscale'],
    role: 'Architecte Edge & Système',
    client: 'Karuka Lab',
    period: '2026',
    badge: 'Hardware & IA',
    featured: true,
  },
  {
    slug: 'alexandrie',
    title: 'Alexandrie — RAG d’Entreprise & Chatbot IA',
    description:
      'Plateforme d’assistance intelligente par IA générative et recherche sémantique pour l’accès aux connaissances internes.',
    longDescription:
      'Alexandrie est une solution de RAG (Retrieval-Augmented Generation) conçue pour valoriser le patrimoine documentaire des entreprises. En combinant embeddings vectoriels, recherche hybride (dense + sparse) et LLMs de pointe, elle permet aux collaborateurs d’interroger l’ensemble des bases de connaissances en langage naturel avec citation des sources.',
    category: 'IA & LLM',
    tags: ['Next.js', 'Python', 'FastAPI', 'Qdrant', 'OpenAI', 'LangChain'],
    role: 'Lead Architecte & Développeur',
    client: 'Confidentiel',
    period: '2024',
    badge: 'Projet Phare',
    featured: true,
  },
  {
    slug: 'kaly-flow',
    title: 'Kaly Flow — Orchestration de Workflows IA',
    description:
      'Moteur d’orchestration de pipelines IA pour l’automatisation de processus métier complexes.',
    longDescription:
      'Kaly Flow est une plateforme no-code / low-code permettant de composer, tester et déployer des chaînes de traitement combinant modèles de langage, API tierces et logique métier. L’accent a été mis sur la traçabilité, le monitoring de coûts par requête et le fallback automatique.',
    category: 'IA & MLOps',
    tags: ['React', 'Node.js', 'Temporal', 'PostgreSQL', 'Docker'],
    role: 'Lead Developer',
    client: 'Karuka Lab',
    period: '2024',
    badge: 'Open Source',
    featured: true,
  },
  {
    slug: 'karukera-connect',
    title: 'Karukera Connect — Portail Citoyen',
    description:
      'Plateforme de démarches en ligne et de communication citoyenne pour collectivités d’outre-mer.',
    longDescription:
      'Refonte complète du portail de services aux citoyens avec un focus sur l’accessibilité (RGAA), la performance en connectivité dégradée et la conformité RGPD. Architecture micro-services avec intégration FranceConnect.',
    category: 'Web & Mobile',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'GraphQL', 'Strapi'],
    role: 'Architecte Web',
    client: 'Collectivité territoriale',
    period: '2023',
    featured: false,
  },
  {
    slug: 'audit-secu-fintech',
    title: 'Audit & Renforcement Sécurité — Fintech Caraïbes',
    description:
      'Audit d’architecture, tests d’intrusion et mise en conformité PCI-DSS pour une solution de paiement.',
    longDescription:
      'Mission d’audit complet de la stack technique d’une fintech caribéenne : analyse de code statique, pentest API et infra cloud, refonte de la gestion des secrets et accompagnement à la certification PCI-DSS niveau 2.',
    category: 'Cybersécurité',
    tags: ['Security Audit', 'PCI-DSS', 'AWS', 'Terraform', 'Vault'],
    role: 'Consultant Sécurité',
    client: 'Fintech (Caraïbes)',
    period: '2023',
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(projects.map((p) => p.category)));
}
