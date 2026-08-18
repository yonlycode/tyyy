---
title: "Mon setup hybride : modèles locaux et Google pour l'IA"
description: "Pourquoi j'ai découpé mon workflow IA en deux : modèles locaux (Qwen, Gemma) pour le code et le compute critique, et Google (Gemini) pour le search et le prototypage rapide."
date: 2026-06-05
tags: ["ai", "local-inference", "gemini", "open-source", "productivity"]
published: true
---

# Mon setup hybride : modèles locaux et Google pour l'IA

J'ai arrêté de chercher l'abonnement IA unique. Mon setup est désormais divisé en deux : le **compute local** et **Google**. Rien d'autre.

D'un côté, la souveraineté et le travail de fond en local. De l'autre, la recherche web et l'intégration mobile avec Gemini.

Voici mon arbitrage technique.

### Pourquoi je garde Google (Gemini & Antigravity) :

1. **L'intégration mobile native.**
Gemini est connecté à mon téléphone par défaut. Toutes mes conversations rapides, mes centres d'intérêt et mes questions quotidiennes alimentent sa mémoire. Il se rappelle de tout. C'est presque flippant, mais redoutablement efficace pour retrouver un contexte.

2. **Le scraping propre.**
Scraper le web en local est devenu un enfer. Cloudflare, captchas, blocages IP : les données sont verrouillées. Déléguer les recherches complexes (Deep Research) à Google est le seul moyen fonctionnel d'obtenir des données fraîches sans enfreindre la loi ou maintenir des scripts de contournement fragiles.

3. **Gemini 3.5 Flash.**
Ultra-rapide, presque gratuit. Pour le prototypage, l'apprentissage et le processus créatif non critique, c'est une mine d'or économique.

### Pourquoi le reste tourne en local :

Les modèles open weight sont devenus matures. Ce qui tourne aujourd'hui sur du matériel grand public dimensionné équivaut aux meilleurs modèles payants d'il y a 8 à 10 mois. C'est plus que suffisant pour travailler sérieusement, à condition d'arrêter le "vibe coding" passif et de comprendre sa stack.

Mes outils du moment :
* **qwen3.5-27b** : Le roi incontesté pour coder en local.
* **gemma-4-12B** : Une véritable pépite en test pour le raisonnement léger.

La fin de la dépendance aux API centralisées commence par un setup hybride pragmatique.
