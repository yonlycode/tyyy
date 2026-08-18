---
title: "L'Affaire Séim : le reverse engineering de GTA par IA"
description: "Comment Séim a inversé les derniers 40% de GTA San Andreas en 2 mois grâce à une boucle d'agents IA multi-niveaux, et ce que ça révèle sur l'avènement de l'architecture face à la syntaxe."
date: 2026-06-08
tags: ["ai", "agents", "reverse-engineering", "open-source", "architecture"]
published: true
---

# L'Affaire Séim : le reverse engineering de GTA par IA

6 ans de travail communautaire pour inverser le code de GTA San Andreas. Stagnation à 60%. Séim, profil non-développeur, boucle les 40% restants en seulement **2 mois**.

Ce n'est pas de la magie. C'est de l'orchestration industrielle d'agents autonomes.

La méthode n'a rien à voir avec un prompt basique envoyé dans une interface web. C'est une pipeline de rétroaction autonome adossée à une source de vérité :

1. **Ghidra** (désassembleur open source de la NSA) extrait le code assembleur brut et le pseudo-code du binaire du jeu.
2. **L'Orchestrateur** (Agent 1) analyse les dépendances pour déterminer l'ordre optimal de résolution des fonctions.
3. **Le Codeur** (Agent 2) traduit l'assembleur brut en C++ propre et de haut niveau.
4. **Le Reviewer/QA** (Agent 3) compare le C++ généré avec l'assembleur de Ghidra. Il identifie les écarts et force le Codeur à itérer jusqu'à obtention d'un consensus absolu.

Le workflow a d'abord été géré manuellement par copier-coller de contextes avant d'être entièrement automatisé par un outil standalone disponible sur GitHub.

Le seul goulot d'étranglement restant est physique : tester visuellement le jeu en run (physique, caméra, collisions) nécessite encore **60 à 70 heures** de jeu humain. L'IA ne sait pas encore playtester seule.

Les livrables produits par cette pipeline court-circuitent les outils de modding traditionnels :
- Un hub web regroupant **35 outils** pour compiler les scripts GTA 3 Script ou injecter des textures.
- Un Map Editor en drag & drop qui importe un mesh 3D et génère les meshes de collision en **2 secondes**.
- Une IA de capture de mouvement instantanée extrayant un squelette d'une vidéo en **5 secondes**.

Cette aventure a permis de déterrer des secrets enfouis :
- L'activation du mode multi-protagoniste (GTA V style) désactivé à l'époque de la PS2.
- De l'archéologie de textures, en retrouvant les murs réels photographiés à Los Angeles et Las Vegas en 2002 par les équipes de Rockstar.
- GTA 3 et Vice City encapsulés et émulés sur la TV de CJ dans le moteur sans perte de performance.

Trois leçons fondamentales à en tirer :

**La mort de la syntaxe, l'avènement de l'architecture.**
Savoir écrire du C++ ou du HTML n'a plus de valeur intrinsèque. La valeur s'est déplacée vers la capacité à concevoir des architectures agentiques capables de s'auto-corriger face à une source de vérité technique.

**La souveraineté par l'Open Source.**
La réussite du projet repose sur la maîtrise complète de la stack : un désassembleur libre (Ghidra) et une pipeline d'orchestration locale et hébergée sans dépendances propriétaires.

**Le flou juridique.**
Le code généré est propre et entièrement réécrit. Pourtant, Rockstar a pour habitude de détruire ces projets via des strikes DMCA. La release finale sera une course de vitesse avant la suppression inévitable du dépôt.

L'avenir du développement n'est pas dans l'écriture du code, il est dans la construction de la machine qui le produit.
