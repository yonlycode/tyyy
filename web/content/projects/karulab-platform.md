---
title: "Plateforme Karulab — Architecture souveraine Go + Mongo + HTMX"
description: "Plateforme souveraine d'orchestration et de gestion IA conçue selon des principes de frugalité radicale : binaire statique Go, persistance MongoDB et interface réactive sans runtime JavaScript lourd."
date: "2026-03-22"
published: true
featured: true
tags:
  - "Architecture Souveraine"
  - "Go / Golang"
  - "MongoDB"
  - "HTMX"
  - "Frugalité Logicielle"
stats:
  "Taille Binaire": "18 Mo"
  "RAM Utilisée": "38 Mo"
  "Latence p99": "12 ms"
  "Build Frontend": "0 s (No-Node)"
---

## Philosophie : En finir avec l'obésité logicielle

L'ingénierie logicielle contemporaine souffre d'un mal récurrent : des architectures inutilement complexes où une simple interface de gestion d'IA nécessite 500 Mo de conteneurs Node.js, 1500 paquets npm imbriqués et des pipelines de build fragiles.

Pour la **Plateforme Karulab**, nous avons appliqué un principe directeur strict : **le minimalisme architectural au service de la résilience critique**.

La plateforme devait être capable de s'exécuter sur n'importe quel serveur bare-metal ou appliance locale, sans dépendance externe, avec une empreinte mémoire négligeable et une vitesse d'exécution instantanée.

---

## L'Architecture Technique en 3 Couches

```
┌────────────────────────────────────────────────────────┐
│                FRONTEND HYPERMÉDIA (HTMX)              │
│    HTML sémantique, SSE streaming, 0 bundle npm        │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP / Server-Sent Events
┌──────────────────────────▼─────────────────────────────┐
│                 CORE BACKEND (GOLANG)                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Binaire statique unique (18 Mo)                 │  │
│  │ Router HTTP stdlib + Worker Pool goroutines      │  │
│  │ Connecteurs natifs vLLM / llama.cpp / Ollama     │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────┬─────────────────────────────┘
                           │ Driver natif Go
┌──────────────────────────▼─────────────────────────────┐
│                 PERSISTANCE (MONGODB)                  │
│      Audit logs, sessions agents, traces d'inférence   │
└────────────────────────────────────────────────────────┘
```

### 1. Le Core Go (Golang) : Performance & Binaire Unique
* **Zéro dépendance dynamique** : L'ensemble du serveur, des routes API, des templates HTML et des tâches d'arrière-plan compile en un **seul binaire exécutable de 18 Mo**.
* **Concurrence native** : Exploitation directe des goroutines pour la gestion parallèle des requêtes d'inférence LLM et le multiplexage des flux SSE (Server-Sent Events).
* **Empreinte mémoire** : Moins de 40 Mo de RAM consommés en production avec 100 sessions d'inférence concurrentes ouvertes.

### 2. Le Moteur Hypermédia : HTMX & CSS Pur
* Aucun framework JavaScript lourd (ni React, ni Vue, ni Angular) dans le dashboard de contrôle.
* Rendu HTML côté serveur ultra-rapide (< 5 ms par page générée) et mises à jour dynamiques ciblées via **HTMX**.
* Streaming temps réel des tokens générés par les modèles d'IA via **Server-Sent Events (SSE)** natifs, sans couche WebSocket superflue.

### 3. Persistance Flexible avec MongoDB
* Modélisation documentaire naturelle pour les arbres d'exécution des agents IA, les métriques d'inférence et les configurations matérielles.
* Indexation optimisée pour la recherche de traces et l'auditabilité réglementaire (conformité AI Act européen).

---

## Bénéfices Opérationnels & Sécurité

* **Surface d'attaque réduite au minimum** : Pas de vulnérabilités `node_modules`, pas de failles XSS dues à des frameworks client complexes.
* **Déploiement en 1 seconde** : Copie du binaire `karulab-platform` sur le serveur cible, lancement en service `systemd`, prêt.
* **Stabilité bare-metal éprouvée** : Capacité à fonctionner sans maintenance sur des environnements Edge contraints pendant des mois sans fuite mémoire ni reboot.
