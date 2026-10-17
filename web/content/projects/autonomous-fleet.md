---
title: "Flotte d'Agents Autonomes — Orchestration Hermes, harnesss bornés et infra souveraine"
description: "Comment Karulab orchestre une flotte d'agents IA sur infrastructure souveraine : Hermes Agent, harnesss bornés (dsh, agy), Forgejo, Coolify, Tailscale et SeaweedFS. Pas de framework magique, des briques qui se tiennent."
date: "2026-10-17"
published: true
featured: true
tags:
  - "Multi-Agents"
  - "Hermes Agent"
  - "Self-Hosted"
  - "Infra Souveraine"
  - "Tailscale"
---

## La Problématique : Le piège des agents tout-puissants

Les démonstrateurs d'agents IA « tout-au-prompt » (boucles ouvertes, ReAct non borné) séduisent sur les réseaux sociaux mais s'effondrent dès qu'ils rencontrent le monde réel :

* Boucles de réflexion infinies consommatrices de budget.
* Hallucinations sur les arguments d'outils et corruption d'état.
* Zéro auditabilité : impossible d'expliquer pourquoi l'agent a touché tel fichier ou posté tel truc.

Notre réponse n'est pas un framework d'agents de plus. C'est une **flotte d'agents aux rôles strictement bornés**, chacun marié à un harness déterministe, sur une infrastructure qu'on auto-héberge de bout en bout.

## La Flotte

Pas un « essaim » générique : des agents nommés, avec un rôle, un harness et un périmètre d'accès explicites.

| Agent | Rôle | Hébergement | Harness |
|---|---|---|---|
| **Migo** | Maître technique : code, infra, revues | Conteneur dédié | `dsh` (DeepSeek) pour le code |
| **Malo** | Agent local sur LLM gratuit | MacBook M1 Max | délégation + modèles locaux |
| **Bueno** | Marketing, rédaction, QA exploratoire, tests E2E navigateur | Conteneur Coolify | `agy` (Gemini) |
| **Kady** | Le buddy produit (notre produit, pas un agent interne) | Box client / endpoint local | — |

Chaque agent est une instance **Hermes Agent** avec sa propre mémoire persistante, ses skills versionnées dans un repo dédié, et un contrat : l'agent délègue le code à son harness, relit, valide, et ne pousse jamais à l'aveugle.

## L'Infrastructure Souveraine

Tout tourne sous notre contrôle, rejoints par un tailnet privé :

* **Forgejo** : git, CI Actions, registry npm/OCI, wiki = base de connaissances unique de la flotte.
* **Coolify** : orchestration des conteneurs (les instances d'agents, les services, les bancs d'essai).
* **Tailscale** : le réseau. Rien n'est exposé publiquement qui ne devrait pas l'être.
* **SeaweedFS** : stockage objet pour les artefacts lourds et froids.
* **MongoDB** : persistance des produits (leads, événements, configs box).
* **Inférence locale** : llama.cpp sur AMD Strix Halo (mesures publiées sur ce blog) et endpoint LLM du MacBook — plus des API cloud ponctuelles quand le cloud est l'outil adapté.

```
┌─────────────────────────────────────────────────┐
│                 TAILNET (Tailscale)             │
│                                                 │
│  ┌───────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Forgejo  │  │ Coolify  │  │  SeaweedFS   │  │
│  │ git/CI/wiki│  │ conteneurs│  │   objets     │  │
│  └───────────┘  └────┬─────┘  └──────────────┘  │
│                      │                          │
│         ┌────────────┼────────────┐             │
│    ┌────▼────┐  ┌────▼────┐  ┌────▼─────┐      │
│    │  Migo   │  │  Bueno  │  │   Kaly   │      │
│    │ Hermes  │  │ Hermes  │  │  panel   │      │
│    │  +dsh   │  │  +agy   │  │ Go+Mongo │      │
│    └─────────┘  └─────────┘  └──────────┘      │
│         MacBook M1 Max : Malo + endpoint LLM    │
│         Strix Halo : banc d'essai llama.cpp     │
└─────────────────────────────────────────────────┘
```

## Les Principes Qui Tiennent

* **Un agent, un rôle, un harness.** Bueno ne touche pas l'infra ; Migo ne rédige pas les posts LinkedIn. Les périmètres sont écrits, pas implicites.
* **Le harness est borné par construction.** Les tâches sont déléguées à un worker headless (dsh, agy) avec un contrat explicite : ces fichiers, pas de commit, pas de push. L'agent relit et valide avant tout merge.
* **La connaissance est versionnée.** Skills des agents et wiki d'infra vivent dans Forgejo, pas dans la tête d'un agent. Un agent reconstruit se reconstruit documenté.
* **Le cloud est un outil, pas une fondation.** Les API propriétaires passent par des points de passage identifiés et budgétés ; l'orchestration, la donnée et la mémoire restent à la maison.

## État Réel Du Projet

La flotte tourne au quotidien (cette page a été documentée par un de ses membres). Nous n'avons pas de « taux de succès de 98 % » à vous vendre : nous avons des agents qui font le travail, une infra qui tient, et des process qui se renforcent à chaque incident. C'est moins sexy qu'un essaim de huit agents fantômes, c'est surtout vrai.
