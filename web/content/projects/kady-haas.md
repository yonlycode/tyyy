---
title: "Kady HaaS — L'ouvrier numérique souverain sur box N100"
description: "Déploiement d'une appliance d'IA locale clé en main (Hardware-as-a-Service) sur mini-PC Intel N100 : zéro fuite de données, inférence 100% on-premise et automatisation métier sans abonnement cloud US."
date: "2026-03-15"
published: true
featured: true
tags:
  - "IA Souveraine"
  - "Hardware-as-a-Service"
  - "Intel N100"
  - "llama.cpp"
  - "Edge AI"
stats:
  "Coût API": "0 €"
  "Consommation": "12 W"
  "Débit Inférence": "28 tok/s"
  "Fuite Données": "0 octet"
---

## Contexte & Enjeu : La fin de la rente cloud

Pour la plupart des entreprises, l'accès aux capacités d'IA générative rime avec une triple dépendance :

1. **Une fuite structurelle des données stratégiques** (devis, contrats, bilans comptables) vers des serveurs situés sous juridiction américaine (Cloud Act, FISA 702).
2. **Une rente financière imprévisible**, indexée sur la consommation de tokens et le bon vouloir des éditeurs d'API propriétaires.
3. **Une vulnérabilité réseau totale** : si la connexion internet est coupée ou si l'API subit un outage, l'activité de l'entreprise s'arrête.

Avec **Kady HaaS** (Hardware-as-a-Service), nous avons pris le contrepied absolu : concevoir un "ouvrier numérique" physique, sous la forme d'une box matérielle dédiée installée directement dans les locaux du client.

---

## Architecture Matérielle : L'efficience du silicium Edge

L'objectif était d'obtenir une machine compacte, inaudible, consommant moins d'énergie qu'une box internet standard, tout en garantissant une réactivité conversationnelle fluide en temps réel.

```
┌────────────────────────────────────────────────────────┐
│                    BOX LOCALE KADY                     │
│                                                        │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │ Intel N100 (4C / 4T)  │   │ 16 Go LPDDR5 4800MHz │  │
│  │ TDP Max : 12W         │◄──┤ Bande passante 38GB/s│  │
│  └──────────┬────────────┘   └──────────────────────┘  │
│             │                                          │
│  ┌──────────▼────────────┐   ┌──────────────────────┐  │
│  │ NVMe PCIe Gen3 x4     │   │ Puce TPM 2.0         │  │
│  │ Chiffrement LUKS2     │   │ Clé d'amorçage HW    │  │
│  └───────────────────────┘   └──────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

* **Processeur** : Intel N100 (architecture Gracemont 10nm, 4 cœurs à 3.4 GHz).
* **Mémoire** : 16 Go LPDDR5 unifiée à 4800 MT/s, offrant la bande passante nécessaire au streaming rapide des poids de quantisation.
* **Stockage & Sécurité** : SSD NVMe M.2 512 Go à débit séquentiel élevé, entièrement scellé par chiffrement LUKS2 lié à la puce TPM 2.0 matérielle.
* **Consommation réelle** : 6 W au repos, 12 W en inférence continue pleine charge.

---

## Stack Logicielle Souveraine

Pour extraire chaque FLOP du silicium sans couche superflue, l'environnement logiciel a été dépouillé de tout composant superflu :

* **OS** : Distribution Linux Debian 12 customisée avec un noyau optimisé basse latence et suppression de tous les services de télémétrie.
* **Moteur d'inférence** : `llama.cpp` compilé spécifiquement avec les instructions vectorielles `AVX2`, `FMA` et `BMI2` du processeur N100.
* **Modèle déployé** : Famille Qwen 2.5 et Mistral 7B quantifiés en `Q4_K_M` avec fine-tuning procédural pour la gestion documentaire, la classification d'emails et la synthèse administrative.
* **Interface locale** : Serveur HTTP léger en Go avec UI HTMX réactive, accessible exclusivement via le réseau local chiffré (mTLS ou VLAN dédié).

---

## Résultats & Impact Métier

* **Indépendance absolue** : La box fonctionne même en cas de coupure internet complète du site client.
* **ROI immédiat** : Modèle HaaS facturé au forfait fixe mensuel. Comparé à 10 licences d'outils cloud américains à 30 $/mois avec surcoût d'API, l'économie nette dépasse 70% dès la première année.
* **Conformité RGPD garantie** : Aucune donnée ne quitte le boîtier physique. Les audits de sécurité valident un score d'étanchéité de 100%.
