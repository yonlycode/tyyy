---
title: "Baidu Unlimited-OCR : le R-SWA qui flatte le KV Cache"
description: "Baidu a éliminé les limitations mémoire de l'OCR par LLM avec le R-SWA (Reference Sliding Window Attention) : 7,3 Go de VRAM constants quelle que soit la longueur du document."
date: 2026-06-29
tags: ["ai", "machine-learning", "local-inference", "open-source", "baidu"]
published: true
---

# Baidu Unlimited-OCR : le R-SWA qui flatte le KV Cache

Les modèles d'OCR basés sur des LLMs, c'est du sur-engineering qui doit crasher en mémoire sur n'importe quel PDF de plus de 10 pages.

Baidu vient de démontrer que c'était faux — sans réentraîner le modèle de zéro.

Unlimited-OCR (3B params) repose sur DeepSeek OCR en baseline, mais remplace le mécanisme d'attention classique par une architecture qui change la donne pour le traitement long : **le R-SWA (Reference Sliding Window Attention)**.

Voilà ce qui se cache sous le capot.

**LE PROBLÈME QU'ILS ONT ÉLIMINÉ**

Dans un VLM classique, chaque token généré s'accumule dans le KV Cache. Plus le document est long, plus la mémoire gonfle linéairement. Résultat : OOM sur les PDF multi-pages, ou vitesse d'inférence qui s'effondre.

**LA SOLUTION : UNE MÉMOIRE HUMAINE, PAS UN BUFFER INFINI**

Le R-SWA fonctionne comme notre cerveau quand on recopie un long texte :
- Les jetons visuels du document source (compressés par le DeepEncoder) restent en mémoire permanente
- Une fenêtre glissante stricte de 128 tokens pour ce qui vient d'être généré
- Un oubli progressif pour tout le reste de l'output

La référence reste l'image. Le texte généré s'efface. C'est élégant, et ça n'impacte pas l'OCR car on ne se base jamais uniquement sur le texte pour la cohérence.

**LES CHIFFRES (ceux qui comptent)**

- **7,3 Go de VRAM** en FP16. Constant. Peu importe que tu parse 1 000 ou 100 000 tokens
- **Moins de 2 Go en INT4** — un consommable peut tourner ça
- **500M de paramètres actifs** par token (architecture MoE) sur 3,3B au total
- **93,92% sur OmniDocBench v1.6** (contre ~87% pour DeepSeek OCR baseline)
- **+35% de vitesse** sur les très longs PDF vs architectures classiques

**POURQUOI ÇA MOUE DANS UNE STACK LOCAL-FIRST**

Si tu traites des volumes de documents en local — PDFs techniques, rapports, manuels — Unlimited-OCR élimine la contrainte mémoire qui t'obligeait soit à scinder tes documents, soit à dépendre d'API cloud coûteuses.

Parsing one-shot de documents multi-pages avec extraction de texte, formules LaTeX et structure de tableaux. Tout sur ta machine. Facture d'API : 0 €.

Le modèle est en licence MIT sur Hugging Face. Immédiatement intégrable.

L'architecture R-SWA n'est pas OCR-specific. Baidu l'a conçue comme générique pour les tâches à longue séquence. Transcription audio, traduction de code — c'est un pattern qui va se répandre.

Surveiller de près.
