---
title: "NVIDIA RTX Spark : vraie alternative ou hype marketing ?"
description: "Analyse technique de la puce RTX Spark de NVIDIA : bande passante limitée à 256 Go/s pour les grands modèles denses, mais intéressante pour les architectures MoE et les agents locaux sous CUDA."
date: 2026-06-08
tags: ["ai", "local-inference", "hardware", "nvidia", "open-source"]
published: true
---

# NVIDIA RTX Spark : vraie alternative ou hype marketing ?

Jensen Huang s'excite sur la "mémoire unifiée" grand public. La spec technique appelle à plus de nuance.

NVIDIA s'allie à MediaTek pour lancer sa puce **RTX Spark**. 128 Go de mémoire unifiée sur le papier, mais une bande passante qui plafonne à **256 Go/s**.

La keynote vend la puce comme capable de faire tourner des modèles géants de 120B en local. En pratique, un 120B dense à 256 Go/s tournera à un pénible **4,2 tokens/seconde**. Inutilisable.

Mais ce constat technique mérite d'être nuancé.

D'abord, cette puce comble enfin un vide : proposer une alternative grand public compatible avec le monopole **CUDA** sans devoir acheter une carte pro hors de prix. Ce sera l'alternative la plus rapide – et sûrement la plus chère – de sa catégorie.

Ensuite, l'état de l'art de l'inférence locale a changé. Le marché s'est structuré autour des architectures **MoE** (Mixture of Experts) et de modèles denses ciblés.

Les modèles denses pertinents aujourd'hui se divisent en deux :
- Soit ils sont dimensionnés d'office pour les datacenters (type DeepSeek v4).
- Soit ils sont assez petits pour tourner sur 32 Go (comme Qwen 3.6 27B).

Sur cette puce de 128 Go, des modèles comme **Qwen 3.6 (27B et 35B-A3B)** ou **Gemma 4 (12B, 26B et 31B)** tourneront à des vitesses tout à fait correctes. Ces modèles sont de très bons travailleurs pour faire tourner des agents autonomes en local-first.

Ce n'est pas la révolution annoncée pour les modèles géants, mais c'est une machine de dev locale ultra-crédible si on choisit les bons outils.
