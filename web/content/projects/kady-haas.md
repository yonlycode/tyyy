---
title: "Kady HaaS — Appliance IA Locale Souveraine"
description: "Appliance physique 6 Watts pour inférence IA locale et RAG d'entreprise : zéro fuite cloud, matériel chiffré et fonctionnement autonome déconnecté."
category: "Hardware & Edge AI"
tags: ["Intel N100", "Edge AI", "LUKS2", "llama.cpp", "HaaS", "Tailscale"]
role: "Architecte Edge & Système"
client: "Karuka Lab"
period: "2026"
badge: "Hardware & IA"
featured: true
---

## En bref

Conception et déploiement de **Kady Box Mini**, une solution Hardware-as-a-Service (HaaS) d'intelligence artificielle locale. Installée directement chez les entreprises et collectivités en Guadeloupe, elle traite les données confidentielles en circuit 100 % fermé avec un abonnement forfaitaire fixe.

---

## Le Problème du Tout-Cloud aux Antilles

S'en remettre aux API d'IA américaines pose trois problèmes majeurs pour les organisations caribéennes :

1. **Vulnérabilité physique réseau** : Lorsqu'un incident technique ou une tempête endommage les câbles sous-marins de télécommunication, l'entreprise se retrouve paralysée, incapable d'utiliser ses outils métiers.
2. **Insécurité juridique & CLOUD Act** : Envoyer des relevés financiers, des dossiers médicaux ou des marchés publics sur des serveurs tiers expose directement au droit extraterritorial.
3. **Tarification imprévisible** : Le modèle à la consommation au token génère des variations budgétaires incontrôlables.

---

## L'Appliance Kady Box Mini

Nous avons développé une machine compacte, silencieuse et redoutablement sobre, taillée pour le RAG documentaire et l'automatisation :

* **Processeur** : Intel N100 (4 cœurs Alder Lake-N), enveloppe thermique de **6 Watts** seulement.
* **Mémoire & Débit** : 16 Go de RAM DDR5 haute vitesse pour charger les modèles LLM quantifiés.
* **Chiffrement matériel** : SSD NVMe de 512 Go intégralement protégé par **LUKS2**. En cas de vol physique de l'unité, les données sont illisibles.
* **Isolation réseau double port 2.5 GbE** : Séparation étanche entre le réseau local utilisateur (LAN) et le tunnel de supervision chiffré point-à-point.
* **Consommation énergétique** : Moins de 12W en pleine génération d'inférence (l'équivalent d'une simple ampoule LED).

### Stack Logicielle Embarquée

* Moteur d'inférence ultra-léger via `llama.cpp` débitant entre **15 et 25 tokens/seconde** sur des modèles métiers 3B et 7B.
* Moteur de recherche vectorielle (RAG) autonome intégrant la vectorisation et l'interrogation locale de documents PDF, Office et bases internes.
* Maintenance et mises à jour transparentes au travers d'un tunnel chiffré Tailscale sans aucun port ouvert sur l'extérieur.

---

## Bénéfices Client

* **Autonomie totale** : Le boîtier fonctionne même avec la connexion Internet complètement coupée.
* **Souveraineté garantie** : Zéro paquet de données ne quitte le bâtiment du client.
* **Budget linéaire** : Un forfait mensuel HaaS tout inclus (matériel, logiciels, modèles, support), quel que soit le volume de requêtes réalisé.
