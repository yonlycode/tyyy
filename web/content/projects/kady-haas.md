---
title: "Kady HaaS — Appliance IA Locale Souveraine"
description: "Hardware-as-a-Service : une appliance d'IA locale 6 Watts pour les PME et collectivités — zéro fuite cloud, données chiffrées sur site et continuité d'activité déconnectée."
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

## En bref

Conception et déploiement de **Kady Box Mini**, une solution Hardware-as-a-Service (HaaS) d'intelligence artificielle locale. Installée directement chez les entreprises et collectivités en Guadeloupe, elle traite les données confidentielles en circuit 100 % fermé sous un forfait mensuel fixe.

---

## La Thèse : Sortir du Racket Cloud aux Antilles

S'en remettre aux API d'IA américaines pose trois problèmes majeurs pour les organisations caribéennes :

1. **Vulnérabilité réseau physique** : Lorsqu'un incident technique ou une tempête endommage les câbles sous-marins, l'entreprise dépendante du SaaS s'arrête net. Terminé. Plus d'accès aux outils métiers.
2. **Insécurité juridique & CLOUD Act** : Envoyer des bilans comptables, des dossiers médicaux ou des marchés publics sur des serveurs tiers expose directement au droit extraterritorial.
3. **Factures variables imprévisibles** : La rente au token génère des fluctuations budgétaires incontrôlables.

Le SaaS vous loue votre propre capacité de calcul. **Le HaaS vous l'installe sur votre bureau.**

---

## L'Appliance Kady Box Mini

Nous avons conçu une machine compacte, silencieuse et ultra-sobre, taillée pour le RAG documentaire et l'automatisation :

* **Processeur** : Intel N100 (4 cœurs Alder Lake-N), enveloppe thermique record de **6 Watts**.
* **Mémoire vive** : 16 Go de RAM DDR5 haute vitesse pour charger les modèles LLM quantifiés.
* **Chiffrement matériel** : SSD NVMe 512 Go protégé par **LUKS2**. Si le boîtier est dérobé la nuit, les données sont purement illisibles.
* **Isolation réseau double port 2.5 GbE** : Séparation étanche entre le réseau local utilisateur (LAN) et le tunnel de supervision chiffré.
* **Consommation réelle** : Moins de 12W en pleine génération d'inférence (l'équivalent d'une simple ampoule LED).

### Stack Logicielle Embarquée

* Moteur d'inférence ultra-performant via `llama.cpp` débitant entre **15 et 25 tokens/seconde** sur des modèles métiers 3B et 7B.
* Moteur de recherche vectorielle (RAG) autonome intégrant la vectorisation et l'interrogation locale de documents sans sortie externe.
* Maintenance et mises à jour transparentes au travers d'un tunnel chiffré Tailscale sans aucun port ouvert sur l'extérieur.

---

## Ce Que Le HaaS Change Pour Le Client

* **Autonomie totale** : Le boîtier fonctionne même avec la liaison Internet coupée.
* **Souveraineté absolue** : Zéro paquet de données ne quitte le bâtiment.
* **Budget linéaire** : Un forfait mensuel tout inclus (matériel, OS, modèles, support), quel que soit le nombre de requêtes.
