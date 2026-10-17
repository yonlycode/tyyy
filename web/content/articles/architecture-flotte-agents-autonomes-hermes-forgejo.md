---
title: "L'Architecture de notre Flotte d'Agents Autonomes : Hermes, Forgejo et Zéro Pipeau"
description: "Comment Karuka Conseil fait tourner une équipe d'agents IA autonomes (Migo, Bueno, Malo, Kady) orchestrée par Hermes Agent sur infra souveraine. Principes d'ingénierie, git workflow et arbitrage réel."
date: 2026-10-18
tags: ["agents", "hermes-agent", "architecture", "souveraineté", "devops"]
published: true
---

# L'Architecture de notre Flotte d'Agents Autonomes : Hermes, Forgejo et Zéro Pipeau

Tout le monde parle « d'agents autonomes » sur les réseaux. 99 % des démonstrations se résument à des scripts Python instables qui tournent en boucle sur une API OpenAI jusqu'à épuiser le quota de carte bancaire, sans mémoire d'état, sans serveur Git, et sans le moindre garde-fou d'ingénierie.

Chez **Karuka Conseil**, dans le Lab, nous ne faisons pas joujou avec des wrappers de prompts. Nous faisons tourner une **flotte opérationnelle d'agents d'ingénierie et de produit** adossée à une infrastructure souveraine auto-hébergée.

Voici l'architecture réelle, les rituels et les contraintes de conception qui régissent notre système.

---

## 1. La Flotte : Qui Fait Quoi ?

Pas « d'essaim » de 50 agents interchangeables aux noms génériques. Chaque agent a un rôle strict, une stack dédiée et un périmètre d'action non négociable :

- **Yoann Fort (« Y ») — Fondateur & Arbitre** : C'est l'humain. Il donne la vision, fixe les priorités business, arbitre les désaccords techniques et tranche en dernier recours.
- **Migo — Tech Lead & Architecte Système** : Backend (Go 1.24), conteneurs, infra Coolify, réseaux Tailscale, bases de données et sécurité. C'est le garant de la robustesse technique.
- **Bueno — Produit, Design & Business** : Positionnement, rédaction stratégique, front-end (`kady-ui`, Lit 3 Web Components), UX/UI et QA exploratoire de bout en bout.
- **Malo — Data Engineer & Scrapers** : Pipelines ETL, ingestion de données, scrapers et schémas MongoDB.
- **Kady — Produit HaaS Local** : L'agent embarqué sur matériel physique (Intel N100 / Kaly Box) qui sert d'interface directe chez nos clients finaux.

### La Règle d'Or de la Flotte

> **Bueno propose, Migo applique, Y tranche.**

Aucun agent ne s'arroge le pouvoir de fusionner son propre code ou de trancher sur le domaine d'un autre. La collaboration est horizontale, la décision finale reste humaine.

---

## 2. Le Socle Technique : Hermes Agent & Infrastructure Maillée

Les agents ne vivent pas sur une machine de dev locale. Ils sont hébergés et connectés sur une infrastructure souveraine :

1. **Runtime d'Exécution : Hermes Agent (Nous Research)** :
   - Chaque agent tourne dans un runtime autonome persistant capable de planifier, d'exécuter des outils en CLI (terminaux, patchs de fichiers, builds de tests), d'orchestrer des sous-agents en tâche de fond et d'interagir via des passerelles de messagerie chiffrées (Telegram).
2. **Réseau Mesh Sécurisé : Tailscale** :
   - Aucun serveur n'expose de port SSH ou de base de données publiquement sur Internet. Toutes les machines de l'infra (`kaly-infra-01`, `kaly-storage-01`, `kaly-ai-01`) communiquent exclusivement au travers d'un mesh VPN Tailscale chiffré.
3. **Gestion de Code Souveraine : Forgejo** :
   - Nous n'utilisons pas GitHub pour nos dépôts internes critiques. Forgejo est auto-hébergé sur nos serveurs dédiés. Les agents interagissent via Git en SSH sur port dédié et utilisent l'API Forgejo pour ouvrir des Pull Requests et poster des revues de code formelles.
4. **Stockage & Sauvegardes : SeaweedFS & Restic** :
   - Stockage objet compatible S3 auto-hébergé sur grappe de disques, garantissant l'indépendance totale vis-à-vis d'AWS S3 ou Cloudflare R2.

---

## 3. Discipline Git : Zéro Push sur `main`

Le plus grand danger avec les agents autonomes est la dérive incontrôlée du code source. Pour neutraliser ce risque, nous imposons un workflow Git draconien :

- **Interdiction formelle de pousser sur `main`** : Tout commit direct sur la branche principale est banni.
- **Branches nominatives par fonctionnalité** : Chaque intervention d'agent naît sur une branche structurée : `<user>/<feature>` (ex. `bueno/feat-v1`, `feat/bueno/migration-golang-mongo`).
- **Revue croisée impérative** : Avant d'être fusionnée, toute PR fait l'objet d'une review de code contradictoire. Migo dissèque impitoyablement les PRs de Bueno sur l'architecture et les performances, Bueno audite les interfaces et l'expérience utilisateur des livrables de Migo.
- **Validation CI avant merge** : Les tests unitaires Go (`go test -race ./...`), les vérifications TypeScript (`tsc --noEmit`) et les builds de conteneurs Docker doivent être 100 % verts.

---

## 4. Pourquoi ce Modèle Tue le « Prompt Engineering » Gadget

L'immense majorité des projets IA échouent en entreprise parce qu'ils traitent le modèle comme un oracle magique au lieu d'un composant logiciel contraint.

Dans notre architecture :
- Le modèle ne prend pas de décision d'infrastructure.
- Il travaille dans des bacs à sable hermétiques avec des outils standardisés (read, patch, build, test).
- La source de vérité est le code, le wiki et les logs de tests réels — pas ce que l'agent « pense » avoir fait.

C'est la différence entre une démo tape-à-l'œil sur Twitter et un système d'ingénierie qui livre du logiciel en production tous les jours.
