---
title: "Flotte d'Agents Autonomes — Orchestration Mastra & Hermes déterministe"
description: "Architecture d'un essaim multi-agents souverain pour processus critiques d'entreprise : orchestration déterministe par machines d'états Mastra et exécution d'outils système sécurisée via Hermes Agent."
date: "2026-03-28"
published: true
featured: true
tags:
  - "Multi-Agents"
  - "Mastra"
  - "Hermes Agent"
  - "Systèmes Critiques"
  - "Inférence Locale"
stats:
  "Taux Succès": "98.4%"
  "Dérive / Erreur": "< 0.2%"
  "Gain de Temps": "85%"
  "Agents en Essaim": "8 unités"
---

## La Problématique : Le piège des agents non déterministes

Les démonstrateurs d'agents IA "tout-au-prompt" (boucles ouvertes, ReAct non borné) séduisent sur les réseaux sociaux mais s'effondrent dès qu'ils rencontrent les contraintes du monde réel en entreprise :

* Boucles de réflexion infinies consommatrices de budget.
* Hallucinations sur les arguments d'outils et corruption d'état.
* Absence totale d'auditabilité : impossible d'expliquer pourquoi l'agent a pris telle décision financière ou juridique.

Pour automatiser des processus critiques (conformité réglementaire, audit technique, ingestion documentaire multi-sources), nous avons conçu une **architecture hybride déterministe** articulée autour de deux briques complémentaires : **Mastra** et **Hermes Agent**.

---

## L'Architecture Déterministe en Deux Piliers

```
┌────────────────────────────────────────────────────────┐
│            PILIER 1 : ORCHESTRATION MASTRA            │
│     Machine d'états finis (FSM) & Graphe Typé          │
│  ┌───────────┐      ┌────────────┐      ┌───────────┐  │
│  │ Ingestion ├─────►│ Validation ├─────►│ Décision  │  │
│  └───────────┘      └────────────┘      └─────┬─────┘  │
└───────────────────────────────────────────────┼────────┘
                                                │ Délégué
┌───────────────────────────────────────────────▼────────┐
│         PILIER 2 : EXÉCUTION PAR HERMES AGENT          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Moteur d'outils sandboxé (Bash, Python, Web)     │  │
│  │ Détection de boucle & Auto-correction locale     │  │
│  │ Inférence locale vLLM / APU Strix Halo           │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### 1. Mastra : Le Garde-Fou Déterministe
Mastra fournit le cadre structurel rigoureux dont les agents ont besoin :
* **Machines d'états finis (FSM)** : Chaque étape du workflow métier (analyse, vérification, synthèse, export) est un état strict avec des conditions de transition validées par schéma (Zod / JSON Schema).
* **Persistance transactionnelle** : Chaque transition d'état est persistée en base de données, permettant de mettre en pause, reprendre ou rejouer un workflow exactement là où il s'était arrêté.
* **Garantie d'arrêt** : Nombre de pas borné par construction mathématique, éliminant tout risque de boucle infinie.

### 2. Hermes Agent : L'Opérateur d'Outils et de Raisonnement
Pour l'exécution concrète des actions sur le système d'information :
* **Appels d'outils robustes** : Hermes dispose d'un protocole d'interaction avec le système d'exploitation (accès fichiers sécurisé, exécution de scripts Python ad-hoc, interrogations d'APIs locales).
* **Boucle d'auto-correction** : Si un outil renvoie une erreur (format invalide, timeout), Hermes adapte son prompt en local sans faire dérailler le graphe global.
* **Isolation et confidentialité** : Inférence propulsée par un serveur local vLLM ou un APU AMD Strix Halo, sans qu'aucun extrait de document ne soit exposé sur internet.

---

## L'Essaim Spécialisé Déployé

L'architecture orchestre 8 rôles d'agents spécialisés :

1. **Scout Agent** : Veille et capture automatisée des flux documentaires entrants.
2. **Extraction Agent** : Découpage, OCR et structuration JSON rigoureuse.
3. **Domain Specialist** : Application des règles métier et de conformité sectorielle.
4. **Adversarial Auditor** : Tente de réfuter les conclusions du spécialiste pour identifier les failles logiques.
5. **Synthesis & Action Agent** : Génération des rapports finaux et mise à jour des bases de données de l'entreprise.

---

## Résultats en Production

* **98.4% de taux de succès** au premier passage sans intervention humaine sur des pipelines d'analyse complexes de plus de 200 pages.
* **Division par 7 du temps de traitement** d'un dossier d'audit réglementaire (passant de 4 heures à 35 minutes).
* **Auditabilité totale** : Chaque token généré, chaque outil exécuté et chaque transition d'état sont tracés de manière immuable.
