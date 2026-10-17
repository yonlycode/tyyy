---
title: "Flotte d'Agents Autonomes Karuka"
description: "Système multi-agents en production sur notre métal : rôles chirurgicaux (Migo, Bueno, Malo, Kady), mesh VPN privé et gouvernance Git impitoyable."
category: "Agentic AI & DevOps"
tags: ["Hermes Agent", "Multi-Agents", "Forgejo", "Tailscale", "Go 1.24", "SeaweedFS"]
role: "Concepteur Système & Développeur"
client: "Karuka Lab (Interne)"
period: "2026"
badge: "Production Multi-Agents"
featured: true
---

## En bref

Conception et exploitation quotidienne de la flotte d'agents IA du Lab **Karuka Conseil**. Loin des scripts jetables et des boucles de prompts sans persistance, nous faisons collaborer des agents dédiés possédant une véritable fiche de poste, des clés SSH et un périmètre d'action sous haute sécurité.

---

## Le Problème

99 % des démos multi-agents sur le marché souffrent de trois tares rédhibitoires en milieu professionnel :

1. **L'illusion de l'agent omniscient** : Un seul agent censé tout faire (infra, code, design, compta), qui dérive dès la troisième requête et produit du code fragile.
2. **Zéro contrôle d'accès** : Des agents branchés sans filet sur des serveurs ouverts à tous les vents.
3. **L'entropie logicielle** : Des modifications poussées directement sur `main` qui cassent la production en 48 heures.

---

## L'Architecture & La Solution

Nous avons structuré notre flotte autour d'une règle de gouvernance inébranlable et d'une ségrégation stricte des responsabilités :

> **Bueno propose, Migo applique, Y tranche.**

### Les Spécialistes en poste

* **Y (Yoann Fort) — L'Arbitre** : Fondateur et autorité technique. Il arbitre les décisions stratégiques et valide les passages critiques en production.
* **Migo — Le Gardien de l'Infra** : Tech Lead système. Responsable du Go 1.24, des conteneurs Coolify, des bases de données et de la sécurité réseau. Migo audite et merge le code.
* **Bueno — Le Produit & la Rigueur UX** : Pilotage du design system (`kady-ui`), de l'ergonomie, de la rédaction, du business et de la QA exploratoire de bout en bout.
* **Malo — L'Ingénieur Data** : Pipelines d'ingestion documentaire, scraping ciblé et collections MongoDB.
* **Kady — L'Agent Terrain** : Logiciel embarqué sur nos boîtiers physiques HaaS déployés sur site.

### Le Socle Technique

* **Moteur d'exécution** : Hermes Agent (Nous Research), avec gestion d'outils réels, persistance contextuelle et isolation des sessions.
* **Réseau fermé** : Aucune IP publique exposée. Les machines communiquent exclusivement au travers d'un mesh VPN chiffré **Tailscale**.
* **Forge souveraine** : Instance Forgejo locale accessible par SSH dédié (port 22222). Les agents créent des branches isolées (`<user>/<feature>`) et soumettent des Pull Requests ; le push direct sur `main` est physiquement banni.
* **Stockage objet** : Cluster SeaweedFS privé pour les sauvegardes et les artefacts.

---

## Résultats & Impact

* **Vélocité sans régression** : Refonte complète d'une stack (migration Go 1.24 + bibliothèque de 14 Web Components Lit 3) menée en parallèle avec revue croisée continue entre agents.
* **Zéro fuite, zéro compromission** : 100 % du code et des contextes reste confiné au sein du réseau Karuka Conseil.
