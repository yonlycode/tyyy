---
title: "Kady HaaS : Pourquoi nous mettons l'IA dans une boîte physique locale"
description: "Face aux dérives du Cloud SaaS américain (tarification au token imprévisible, CLOUD Act et vulnérabilité des liaisons sous-marines aux Antilles), Karuka Conseil déploie le Hardware-as-a-Service sur site."
date: 2026-10-18
tags: ["haas", "kady", "hardware", "souveraineté", "edge-computing", "rag"]
published: true
---

# Kady HaaS : Pourquoi nous mettons l'IA dans une boîte physique locale

Pour les entreprises et les institutions publiques, le modèle de l'IA en 2026 est devenu un piège économique et juridique à ciel ouvert :

1. **Une facture au token imprévisible** qui explose au moindre pic d'usage ou changement arbitraire des grilles tarifaires de la Silicon Valley.
2. **Une soumission totale aux lois extraterritoriales américaines** (FISA, CLOUD Act) dès qu'un document confidentiel franchit une API SaaS.
3. **Une dépendance absolue au réseau public** : en Guadeloupe et dans les territoires d'outre-mer, la moindre rupture de câble sous-marin ou incident télécom paralyse immédiatement toute l'activité d'une organisation tributaire du cloud.

Chez **Karuka Conseil**, notre réponse à cette impasse n'est pas un nième wrapper SaaS dans le cloud. C'est **Kady HaaS (Hardware-as-a-Service)** : une appliance physique, souveraine, installée directement dans les locaux du client.

---

## 1. La Thèse : L'IA On-Premise Clé en Main

Le constat est limpide : un cabinet comptable, une étude notariale, une clinique ou une collectivité territoriale n'a pas le droit moral ni juridique de balancer ses bilans, ses dossiers médicaux ou ses marchés publics sur les serveurs d'OpenAI ou d'Anthropic.

Mais ces structures n'ont pas non plus les moyens d'embaucher une équipe d'ingénieurs en LLMOps pour maintenir un cluster GPU Linux en local.

Le modèle HaaS résout cette équation :
- **Une box physique compacte et silencieuse** posée dans les bureaux ou la baie réseau du client.
- **Modèles d'inférence open-source (3B à 14B)** tournant 100 % en local sur le matériel embarqué.
- **Zéro paquet de données qui sort du LAN** : fonctionnement total en circuit fermé (air-gapped possible).
- **Résilience absolue aux pannes WAN** : l'inférence, la recherche sémantique (RAG) et l'extraction de données fonctionnent même si la connexion internet est coupée.
- **Abonnement forfaitaire fixe** : matériel, logiciels, modèles, maintenance et support local réunis dans un coût mensuel prévisible, requêtes illimitées.

---

## 2. Le Choix Hardware : L'Efficacité Réelle contre la Démesure GPU

Vendre un serveur à 15 000 € avec une carte graphique énergivore qui consomme 450 watts pour faire du RAG documentaire sur des PDF administratifs est une aberration industrielle.

Pour notre première déclinaison opérationnelle — **Kady Box Mini** —, nous avons fait le choix de l'efficacité brute :

- **CPU** : Intel N100 (4 cœurs, architecture Alder Lake-N, TDP record de **6 Watts**).
- **RAM** : 16 Go DDR5 rapide.
- **Stockage** : 512 Go NVMe PCIe avec chiffrement matériel **LUKS2** au repos.
- **Réseau** : Double port 2.5 GbE (isolation physique étanche entre le réseau local d'entreprise et le lien de télémaintenance sécurisé).
- **Consommation électrique** : Moins de **12 Watts** en pleine charge d'inférence, environ **5 Watts** au repos.

Sur cette enveloppe thermique minuscule, des modèles de dernière génération hautement optimisés (quantifiés en 4-bit / Q4_K_M via `llama.cpp`) délivrent entre **15 et 25 tokens par seconde**.

C'est plus rapide que la vitesse de lecture d'un être humain. Pour synthétiser un rapport, extraire les lignes d'une facture ou interroger un fonds documentaire juridique interne, c'est instantané.

---

## 3. La Pile Logicielle Kady : Confidentialité par Conception

La sécurité physique du matériel ne vaut rien sans une architecture logicielle imperméable :

1. **Système Minimaliste Durci** : Distribution Linux épurée, services root restreints, disque entièrement chiffré par clé matérielle.
2. **Moteur d'Inférence Dédié** : Serveur d'inférence local C++ à mémoire unifiée, zéro télémétrie, zéro ping externe.
3. **RAG Vectoriel Hybride Intégré** : Ingestion documentaire locale, découpage en fragments sémantiques et vectorisation via des modèles d'embedding locaux (sans appel API tiers).
4. **Supervision à Distance Découplée (Tailscale)** : Les mises à jour du firmware et des modèles sont acheminées au travers d'un tunnel chiffré point-à-point sans jamais exposer de port public sur le réseau du client.

---

## 4. La Fin de l'Imposture du Cloud SaaS

L'intelligence artificielle n'a pas besoin d'être un service de rente hébergé en Virginie du Nord.

Elle peut — et doit — devenir une commodité industrielle sobre, sécurisée, physiquement présente là où la valeur et les données sont créées. C'est l'engagement de Kady et la vision souveraine que nous bâtissons chez Karuka Conseil.
