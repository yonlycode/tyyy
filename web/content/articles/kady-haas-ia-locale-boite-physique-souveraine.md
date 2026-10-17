---
title: "Kady HaaS : Pourquoi nous enfermons l'IA dans une boîte de 6 Watts"
description: "Face aux délires de facturation cloud, au CLOUD Act et aux câbles sous-marins qui sautent aux Antilles, Karuka Conseil livre l'IA sur site : une appliance physique, silencieuse et déconnectable."
date: 2026-10-18
tags: ["haas", "kady", "hardware", "souveraineté", "edge-computing", "rag"]
published: true
---

En 2026, louer son intelligence artificielle au token sur le cloud américain est devenu une hérésie pour n'importe quelle entreprise qui manipule des données sensibles.

Il y a d'abord l'absurdité financière : des factures variables qui oscillent selon le volume de requêtes et les changements d'humeur des plateformes californiennes. Il y a ensuite le cauchemar juridique : la moindre ligne de bilan comptable, de dossier médical ou de marché public envoyée sur une API externe tombe instantanément sous l'empire du CLOUD Act et des lois extraterritoriales.

Et aux Antilles, il y a la réalité du terrain : quand une tempête ou un incident de liaison coupe le câble sous-marin, une entreprise dépendante du SaaS s'arrête net. Terminé. Plus d'accès à vos propres outils.

Notre réponse chez **Karuka Conseil** n'est pas un nième portail web. C'est **Kady HaaS (Hardware-as-a-Service)** : une appliance physique posée sur votre bureau, qui tourne chez vous, et qui ne demande la permission à personne.

---

## L'IA sans cloud : l'efficacité brute contre la démesure

Beaucoup de cabinets de conseil vous expliqueront qu'il faut un rack de serveurs à 20 000 euros avec des cartes graphiques qui hurlent et consomment 500 watts pour faire tourner un modèle de langage.

C'est faux. Pour la majorité des usages métiers — interroger une base documentaire, résumer un contrat de 80 pages, classifier des factures, extraire des données de formulaires —, les modèles ouverts de 3 à 8 milliards de paramètres d'aujourd'hui enterrent les monstres d'hier.

Pour notre première machine opérationnelle — la **Kady Box Mini** —, nous avons conçu une architecture au millimètre :

- **Processeur** : Intel N100 (4 cœurs Alder Lake-N, TDP record de **6 Watts**).
- **Mémoire vive** : 16 Go de DDR5 à haute vitesse.
- **Stockage** : SSD NVMe 512 Go intégralement chiffré en matériel via **LUKS2**.
- **Réseau double port 2.5 GbE** : une interface branchée sur le réseau local pour vos collaborateurs, une interface isolée pour le tunnel de supervision sécurisé.
- **Consommation électrique réelle** : Moins de **12 Watts** en pleine charge d'inférence. 5 Watts en veille.

Le résultat ? La boîte ne chauffe pas, ne fait aucun bruit, et débite entre **15 et 25 tokens par seconde** sur des modèles quantifiés en 4-bit (`llama.cpp`). C'est plus rapide que la vitesse de lecture d'un être humain. C'est immédiat.

---

## Zéro paquet de données vers l'extérieur

Le matériel n'est que la moitié de l'équation. L'autre moitié, c'est l'imperméabilité du logiciel :

1. **Fonctionnement en circuit fermé**
   Tous les calculs se font en local. L'extraction de texte, la recherche vectorielle (RAG), la génération et les embeddings tournent sur la machine. Vous débranchez le câble internet ? Kady continue de répondre sans sourciller.

2. **Chiffrement au repos de niveau militaire**
   Si quelqu'un pénètre dans vos locaux la nuit et dérobe le boîtier, il ne récupère qu'un bloc de métal inerte. La partition NVMe est chiffrée par clé matérielle ; sans la phrase secrète de déverrouillage au boot, aucune donnée n'est lisible.

3. **Mises à jour par tunnel chiffré point-à-point**
   Nous assurons la maintenance, l'ajout de nouveaux modèles et le support via un tunnel Tailscale chiffré direct. Zéro port ouvert sur votre box Internet, zéro surface d'attaque exposée.

4. **Un abonnement forfaitaire fixe**
   Le modèle HaaS regroupe la machine, l'OS durci, les modèles, la maintenance et les garanties matérielles dans un tarif mensuel linéaire. Vous faites dix requêtes ou cent mille requêtes par mois ? Le prix ne bouge pas d'un centime.

---

## Reprendre le contrôle de son cerveau numérique

L'intelligence artificielle n'a pas être une rente versée indéfiniment à un hébergeur de Virginie.

Elle peut être un outil d'ingénierie sobre, discret, posé à côté de votre bureau, qui protège vos secrets industriels et vos données citoyennes avec une simplicité désarmante. C'est cela, la souveraineté concrète.
