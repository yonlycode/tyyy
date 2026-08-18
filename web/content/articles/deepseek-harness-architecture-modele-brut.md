---
title: "DeepSeek Harness : L'architecture qui tue le mythe du modèle brut"
date: 2026-07-20
description: |
  Analyse technique de l'architecture du DeepSeek Harness — prefix caching, compaction, framework Cordis, culture des mémos.
tags:
  - DeepSeek
  - AI-Engineering
  - LLM-Architecture
  - Local-First
  - Agent-AI
  - MLOps
published: true

---

**Un token en cache coûte 120x moins cher qu'un token recalculé.**

0,003$ contre 0,43$ par million de tokens.

La différence n'est pas dans le modèle. Elle est dans l'architecture du système qui l'entoure.

DeepSeek l'a compris. Leur harness est une machine d'ingénierie obsessionnelle. Voici ce qu'on peut en tirer.

---

### 1/ Le log "Append-Only" — L'impératif financier

Règle d'or : **une fois qu'une donnée a été envoyée au modèle, on ne revient jamais en arrière.**

Si l'agent produit une erreur (mauvais chemin d'accès, commande ratée), l'erreur reste dans le log. L'agent formule sa correction à la suite. Point.

Pourquoi ? Le prefix caching.

Les fournisseurs de LLMs gardent le début d'une requête en cache. Si le contexte reste strictement identique, le modèle ne recalcule pas cette base. Modifier un historique, même d'une lettre au début, **détruit ce signet précieux.**

Le contexte n'est jamais stocké comme un tableau manipulable. Il est calculé à la volée comme une projection dérivée du journal d'événements. Chaque byte gagné est un byte qui reste en cache.

---

### 2/ Le hack de la "Compaction"

Quand la mémoire de l'agent sature, la plupart des systèmes insèrent un "prompt de résumé" au début de la conversation.

Ironie : c'est exactement au moment où la requête est la plus volumineuse et la plus onéreuse qu'ils **tuent le prefix cache.**

DeepSeek fait autrement : même requête exacte (instructions, outils, historique long) + un message utilisateur tout à la fin qui demande à l'agent d'agir comme moteur de compaction.

Le cache est intégralement préservé. Le résumé arrive à la fin, pas au début. Zéro friction. C'est simple. C'est efficace.

---

### 3/ Cordis — Chaque action doit savoir se rétracter

Le harness s'appuie sur Cordis, un framework issu du monde des chatbots écrit par "Shigma".

La règle : **composabilité stricte.** Chaque plugin, chaque composant doit déclarer sa fonction inverse. Aucun plugin ne s'installe sans fournir la méthode exacte pour annuler proprement toutes ses interactions temporelles.

Zéro fuite de mémoire. Zéro effet de bord résiduel en production.

C'est une exigence architecturale, pas une feature optionnelle.

---

### 4/ Quatre presets, une enveloppe

DeepSeek orchestre quatre modes de comportement dans le même système :

**Standard Mode** — L'agent classique avec outils de lecture et shell.

**Programmatic Tool Calling** — Le plus intéressant. L'agent reçoit une interface TypeScript générée. Au lieu de pinguer l'API à chaque besoin, il rédige un programme global qui boucle, filtre et interroge plusieurs outils en parallèle. Exécution dans un Worker Thread Node.js cloisonné (CPU et RAM limités). Seul le résultat pur enrichit le contexte.

**Minimal Mode** — L'environnement brut de post-training, utilisé pour le reinforcement learning. Un shell persistant + un éditeur.

**Creation Mode** — L'agent obtient un accès système au harness qui le fait lui-même tourner. Il peut écrire du JavaScript pour instancier, configurer et évaluer d'autres agents directement depuis l'hôte.

---

### 5/ Orchestration de sous-agents officielle

Pas besoin d'émuler des concurrents maladroitement. Le harness lance des instances d'agents externes comme Claude Code ou le serveur CodeX d'OpenAI pour déléguer des tâches spécifiques.

Il pointe vers les binaires installés sur la machine, gère la création puis la destruction méticuleuse de l'arbre des processus locaux. Une fois la tâche achevée, tout est nettoyé.

---

### 6/ La culture des mémos

C'est le point le plus sous-estimé.

Le répertoire source contient **683 mémos d'ingénierie** documentant formellement l'architecture. Aucun changement substantiel du code n'est autorisé sans un mémo associé validé automatiquement par un script.

Chaque document doit obligatoirement inclure une section **"Alternatives Considérées".**

Ça semble mineur. C'est énorme. Ça évite que des développeurs arrivant plus tard ne relitiguent sans fin des options qui avaient déjà été écartées de manière justifiée.

---

### Ce que ça nous apprend

Le défi futur de l'IA agentige n'est pas d'avoir le meilleur modèle de base.

C'est de développer des wrappers extrêmement rigoureux, **efficaces financièrement**, et capables d'interagir nativement avec l'écosystème local sans détruire le cache.

Le harness DeepSeek est un manifeste technique. 683 mémos. Un log append-only. Un système qui économise 120x par byte en cache.

Les modèles s'homogénéiseront. Les wrappers qui tiendront la route, c'est ceux qui pensent l'ingénierie system comme un tout.

C'est exactement cette approche que je défends depuis le début : la souveraineté ne se résume pas à faire tourner un modèle en local. C'est toute l'architecture autour qui compte.


#DeepSeek #AIEngineering #LLM #AgentAI #LocalFirst #MLOps
