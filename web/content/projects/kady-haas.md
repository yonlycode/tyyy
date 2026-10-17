---
title: "Kaly & Kady — L'ouvrier numérique souverain, HaaS"
description: "Hardware-as-a-Service : une appliance d'IA locale clé en main pour les PME — zéro fuite de données, inférence sur site, sans abonnement cloud US. Le projet est en construction : voici la thèse, l'architecture visée et où on en est vraiment."
date: "2026-10-17"
published: true
featured: true
tags:
  - "IA Souveraine"
  - "Hardware-as-a-Service"
  - "Edge AI"
  - "Anti-SaaS"
  - "Self-Hosted"
---

## La Thèse : La fin de la rente cloud

Pour la plupart des entreprises, l'accès à l'IA générative rime avec une triple dépendance :

1. **Une fuite structurelle des données stratégiques** (devis, contrats, bilans) vers des serveurs sous juridiction américaine (Cloud Act, FISA 702).
2. **Une facture imprévisible**, indexée sur la consommation de tokens et le bon vouloir des éditeurs d'API propriétaires.
3. **Une vulnérabilité réseau totale** : connexion coupée ou API en outage, l'activité s'arrête.

Le SaaS vous loue votre propre capacité de calcul. **Le HaaS (Hardware-as-a-Service) vous l'installe.**

**Kaly** est la box : une appliance d'IA locale clé en main, livrée préconfigurée, qui tourne sur site. **Kady** est l'ouvrier numérique qui l'habite : l'agent qui fait le travail métier — gestion documentaire, classification, synthèse — sans qu'aucune donnée ne quitte les locaux.

## Ce Qui Est Réel Aujourd'hui

Soyons directs sur l'état d'avancement : **le produit est en construction, la waitlist est ouverte.** Pas de clients en production, pas de ROI mesuré, pas d'audit de sécurité publié. Ce qui existe :

* **Le panel de gestion Kaly** : application Go (stdlib) + HTMX + MongoDB — waitlist, leads, suivi du parc de box, événements, ingestion. Développement actif, déployable en conteneur.
* **Le design system Kady-UI** : librairie de web components (Storybook publié) pour une pâte graphique commune sur tous nos produits.
* **Les bancs d'essai matériels** : inférence locale mesurée sur AMD Strix Halo (les chiffres sont dans l'article halogen-flash de ce blog, mesures réelles et publiées).
* **La grille tarifaire** : abonnement HaaS au forfait mensuel, dégressif selon la capacité de la box — affichée sur le site, sans astérisque.

## L'Architecture Visée

```
┌──────────────────────────────────────────────┐
│              BOX KALY (sur site)             │
│  ┌────────────────┐   ┌───────────────────┐  │
│  │ Moteur          │   │ Kady : agent      │  │
│  │ d'inférence     │◄──┤ métier (docs,     │  │
│  │ llama.cpp       │   │ mails, synthèse)  │  │
│  │ (CPU/APU/GPU)   │   └───────────────────┘  │
│  └────────────────┘                           │
│  Chiffrement du stockage · réseau local       │
│  Interface web locale (Go + HTMX)             │
└──────────────────────────────────────────────┘
```

* **Matériel** : la config définitive de la box de production est en cours d'arbitrage (profil d'usage, budget, densité de modèles). Nous ne publions pas de spec sheet fantaisiste : quand la config sera arrêtée, elle sera publiée avec ses mesures réelles.
* **Inférence** : llama.cpp et modèles quantifiés open weights. Pas de fine-tuning maison annoncé à tort — l'adaptation passe par le contexte, les skills et les workflows de l'agent.
* **Interface** : serveur Go + HTMX, accessible sur le réseau local du client.
* **Pilotage** : le panel Kaly central suit l'état des box (événements, pings) — opt-in, métriques techniques, jamais le contenu métier du client.

## Ce Que Le HaaS Change Pour Un Client

* **Souveraineté** : les documents sensibles ne quittent pas le boîtier. C'est la promesse centrale, et elle est structurelle — pas une option dans les CGU.
* **Facture plate** : forfait mensuel, pas de compteur de tokens.
* **Résilience** : la box travaille même internet coupé.
* **Maintenance déléguée** : c'est nous qui gérons la machine, ses modèles et ses mises à jour — c'est le « as a Service » du HaaS.

## Où On En Est

Le panel est en développement, la landing est publique, la waitlist est ouverte. Les premiers pilotes seront documentés ici avec des chiffres vrais — débits, consommations, économies constatées — pas des pourcentages sortis d'un chapeau.
