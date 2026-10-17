---
title: "Le Stack Karulab — Go, Mongo, HTMX et frugalité assumée"
description: "Les principes d'ingénierie de Karulab : binaires Go statiques, persistance MongoDB, interfaces HTMX sans bundle npm, CI mutualisée et design system partagé. Ce qui est construit, comment, et pourquoi."
date: "2026-10-17"
published: true
featured: true
tags:
  - "Architecture Souveraine"
  - "Go / Golang"
  - "MongoDB"
  - "HTMX"
  - "Frugalité Logicielle"
---

## Philosophie : En finir avec l'obésité logicielle

L'ingénierie logicielle contemporaine souffre d'un mal récurrent : une simple interface de gestion devient 500 Mo de conteneurs Node, 1 500 paquets npm imbriqués et un pipeline de build fragile.

Notre principe directeur : **le minimalisme architectural au service de la résilience**. Chaque brique doit pouvoir tourner sur un serveur modeste ou une appliance locale, se déployer en secondes et se diagnostiquer sans diplôme d'architecte.

## Ce Que Nous Construisons Avec Ce Stack

* **Le panel Kaly** (en développement actif) : application Go stdlib + HTMX + MongoDB — waitlist, leads, parc de box, événements, grille tarifaire. Un binaire, une base, zéro build frontend.
* **Kady-UI** : notre design system — librairie de web components publiés sur un registry npm privé (Forgejo), Storybook déployé, pour que Go+HTMX, Next.js et les box aient la même pâte graphique.
* **ci-shared** : les workflows CI Forgejo mutualisés entre tous nos repos (Go et Node : build, lint, tests, release) — la complexité de CI est versionnée à un seul endroit, pas recopiée repo par repo.
* **hermes-base** : l'image Docker de base de nos agents IA, avec harness par profil — la même rigueur appliquée à l'infra d'agents.

## L'Architecture Type

```
┌────────────────────────────────────────────────────────┐
│                FRONTEND HYPERMÉDIA (HTMX)              │
│    HTML sémantique rendu serveur, 0 bundle npm         │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP
┌──────────────────────────▼─────────────────────────────┐
│                 BACKEND (GOLANG STDLIB)                │
│   Binaire statique unique · net/http · goroutines      │
└──────────────────────────┬─────────────────────────────┘
                           │ Driver mongo-driver
┌──────────────────────────▼─────────────────────────────┐
│                 PERSISTANCE (MONGODB)                  │
│   Leads, événements, configs box, audit logs           │
└────────────────────────────────────────────────────────┘
```

* **Go stdlib d'abord** : le routeur, les templates `html/template` (échappement natif), les workers en goroutines. Les dépendances externes sont comptées — le panel n'en a qu'une, le driver Mongo.
* **HTMX plutôt qu'un framework SPA** : les mises à jour dynamiques ciblées se font en fragments HTML rendus serveur. Pas de hydration, pas de state management, pas de node_modules côté client.
* **MongoDB** : modélisation documentaire pour ce qui est documentaire (événements, configs hétérogènes), index sur les chemins de requête réels.
* **Déploiement conteneur** sur Coolify, build direct depuis le Dockerfile, CI qui ne fait que tester et relâcher des tags.

## Les Vrais Chiffres, Quand Ils Existeront

Nous ne publions pas de « p99 en 12 ms » d'un service qui n'est pas encore en production. Ce qui est vérifié aujourd'hui : le panel compile en un binaire unique, ses tests passent en CI, et ses pages se passent totalement de JavaScript applicatif. Les mesures de performance viendront des environnements réels — box pilotes comprises — et seront publiées avec leur méthode de mesure.

## Bénéfices Attendus (et vérifiables)

* **Surface d'attaque réduite** : pas de chaîne d'approvisionnement npm sur le runtime serveur, échappement HTML natif Go.
* **Déploiement en secondes** : un conteneur, une variable d'environnement de connexion Mongo, prêt.
* **Frugalité** : le stack vise les machines edge — ce qui tourne sur un mini-PC client tourne aussi sur un VPS à 5 €.
