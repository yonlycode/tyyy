---
title: "x5 sur llama.cpp : ce qu'un moteur écrit pour un seul GPU enterre comme arguments"
description: "Mesures chiffrées sur AMD Strix Halo : halogen-flash-server, un moteur écrit pour une seule puce, tient 1 424 tok/s de préfill à 32K et 2 s de reprise sur 100 000 tokens — 4 à 7x devant llama.cpp."
date: 2026-09-11
tags: [local-first, strix-halo, local-inference, speculative-decoding, sovereignty, amd, agent-loops]
published: true
---

# x5 sur llama.cpp : ce qu'un moteur écrit pour un seul GPU enterre comme arguments

« En local, c'est lent. »

C'est la phrase qu'on m'a opposée pendant trois ans à chaque fois que je parlais d'IA souveraine. Sortie d'un modèle sérieux sur une machine qui n'appartient pas à un datacenter, c'était forcément : un peu de bricole, beaucoup de frustration, et un retour à l'API au bout de deux semaines.

Elle vient de cesser d'être vraie, et de loin : **d'un facteur quatre à sept selon la profondeur du contexte.**

Chez moi, sur une machine qui tient sur un bureau, un modèle de 180 milliards de paramètres répond plus vite que les serveurs d'OpenRouter. Et il le fait sans qu'un octet de mes prompts ne quitte la maison.

Le matériel, lui, n'a pas bougé d'un pouce. Ce qui a changé tient dans une décision d'ingénierie.

## Strix Halo : la machine qu'on disait trop faible

AMD Ryzen AI Max+ 395. Nom de code **Strix Halo**, architecture GPU **gfx1151**, Radeon 8060S. 128 Go de mémoire unifiée LPDDR5X sur un bus 256 bits.

Pas de VRAM dédiée. C'est justement le sujet.

Sur une carte graphique classique, le modèle vit dans la VRAM, et le jour où il n'y rentre plus vous regardez votre facture. Sur Strix Halo, le GPU et le CPU partagent le même pool. La question change alors de nature : l'engine sait-il exploiter les 124 Go disponibles sans se faire mentir par le noyau ?

La réponse longue, c'est que pendant longtemps il ne le savait pas. Les runtimes généralistes traitent un APU comme un GPU d'entrée de gamme avec beaucoup de RAM. Ils ont tort, et ça coûte cher en performance.

Il manquait autre chose que de la puissance : un moteur qui arrête de faire semblant que son code tourne partout.

## Les chiffres : 32K de contexte, quatre moteurs, un survivant

Prompt de **32 768 tokens**, réponse de **256 tokens**. Ce que publient les quatre projets qui osent donner des chiffres pour ce modèle sur ce matériel :

| Moteur | Précision | Préfill | Decode | **Total** |
|---|---|---|---|---|
| **halogen-flash 0.5.3** | **5.53 bpw** | **23.0 s** | **6.1 s** | **29.1 s** |
| EngramHalo.cpp | 3.71 bpw | 103.7 s | 14.3 s | 118.0 s |
| ROCmFP4 | 5.51 bpw | 104.7 s | 13.2 s | 117.9 s |
| CIRU-IU4 | 5.96 bpw | 143.7 s | 11.0 s | 154.7 s |

**Quatre fois plus vite que le meilleur d'entre eux, end-to-end.**

Le détail qui m'a fait m'arrêter : le runtime qui porte **plus** de bits que les autres est le **plus lent** des trois concurrents. Et le plus rapide d'entre eux tourne à 3.71 bpw, soit les deux tiers de la précision du moteur gagnant. L'idée que la vitesse s'achète en écrasant la qualité ne tient pas. Elle est exactement inversée.

### La forme de la courbe compte plus que le ratio

Le préfill, c'est là que tout se joue :

| Préfill, tok/s | CIRU-IU4 | ROCmFP4 | EngramHalo | **halogen-flash** | vs meilleur |
|---|---|---|---|---|---|
| @ 8 192 | 373 | 385 | 436 | **1 246** | **2.9x** |
| @ 32 768 | 228 | 313 | 316 | **1 424** | **4.5x** |
| @ 131 072 | 121 | 196 | 174 | **1 358** | **6.9x** |

Regardez la pente, pas les ratios. Les trois concurrents **s'effondrent** quand le contexte s'allonge : 373 → 228 → 121. La leur est plate : 1 246 → 1 424 → 1 358.

La documentation d'EngramHalo le dit elle-même : un prompt de 156K lui prend environ **douze minutes**. Le même ordre de grandeur ici, c'est **96 secondes**.

La vraie rupture est là : une courbe qui ne plie pas. N'importe qui sort un pic sur un prompt court ; tenir à 131 072 tokens, c'est autre chose.

### Le decode, la colonne honnête

Le decode est le chiffre mou, et il faut le dire avant qu'on vous le reproche.

| | halogen-flash 0.5.3 |
|---|---|
| Sériel greedy @ ctx 1 500 | **37.6 tok/s** |
| Sériel greedy @ ctx 8 000 | **36.1 tok/s** |
| Sériel greedy @ ctx 32 768 | **34.1 tok/s** |
| Spéculatif MTP @ ctx 1 500 | **42.4 tok/s** prose, **48.3 tok/s** code |
| Spéculatif MTP @ ctx 32 768, servi | **41.7 tok/s** (moyenne sur 10 prompts) |

De 1 500 à 32 768 tokens de contexte — un facteur 22 — le décodage sériel ne perd que **7 %**. C'est le chiffre à retenir pour comparer aux courbes de profondeur des autres runtimes.

Et il est mesuré à travers la stack HTTP complète, pas sur un fixture de tokens. C'est la condition la plus dure des deux.

Deux précautions d'honnêteté. D'abord, ce sont des chiffres **publiés**, pas un face-à-face joué par le même opérateur : chaque colonne concurrente vient de son propre model card, sur sa propre machine, avec ses réglages. Ensuite, **l'enveloppe d'alimentation** : les mesures ici tournent à ~85 W de puissance package soutenue, 2 229 MHz de médiane contre un top à 2 900 MHz. Un testeur indépendant sur une machine bridée à 70 W a mesuré 11 à 12 % sous les deux chiffres, de façon constante sur les deux — la signature d'une enveloppe plus basse, pas d'un désaccord sur le moteur.

Comparez les enveloppes avant de comparer les débits.

## Anatomie de la vitesse

### Zéro couche de portabilité

La phrase entière du projet tient dans son README : **chaque kernel est écrit pour ce GPU-ci et cette famille de modèles-ci.** Pas de runtime généraliste. Pas de couche de portabilité. Pas de chemin de fallback.

C'est pour ça qu'il peut faire des choses qu'un moteur généraliste ne peut pas. Et c'est pour ça qu'il tourne sur **exactement une seule puce**. Le build rejette violemment toute autre architecture.

Un moteur généraliste paie une taxe à chaque opération : abstraire le matériel, gérer les variantes, prévoir le repli. Multipliée par des milliards de produits scalaires, la taxe devient le goulot. Supprimez l'abstraction, vous récupérez le budget.

C'est un choix de conception radicalement opposé à celui de llama.cpp, qui doit tourner sur tout le monde. Les deux sont défendables. Un seul gagne en performance brute.

### Le prompt cache : une conversation ne se relit plus

C'est le point qui change le plus la pratique d'un **Agent Loop**, et il est activé par défaut.

Une conversation dont le prompt grandit — un agent, un chat, un document sur lequel vous revenez — ne relit pas son préfixe partagé. Seuls les tokens réellement ajoutés sont traités.

| | Premier tour | Chaque tour suivant |
|---|---|---|
| Conversation de 100 000 tokens | ~88 s | **~2 s** |
| Conversation de 10 000 tokens | ~9 s | **~1.4 s** |

Mesuré sur une session de 20 tours montant à 108 000 tokens : **chaque tour après le premier est tombé entre 2.0 et 2.3 secondes.**

Le coût de suivi est **plat**. Il dépend de ce que vous ajoutez, pas de ce qui est déjà là. Pour une boucle d'agent qui repasse par le même contexte à chaque itération, c'est la différence entre une architecture exploitable et une architecture qui attend.

Le cache garde huit entrées, deux par conversation : une en fin de system prompt, une en fin d'historique. Des conversations qui se relaient reprennent chacune depuis leur propre état.

### GTT, IOMMU et la ligne de commande du noyau

Sur cette machine, tout ce que le serveur alloue sur le GPU atterrit dans le **GTT**. `ttm.pages_limit` fixe ce plafond exactement : 32 505 856 pages × 4 KiB = 124 GiB, soit 99.3 % de la RAM de la machine.

La ligne de commande du noyau sur laquelle toutes les mesures ci-dessus ont été faites :

```
amdgpu.vm_update_mode=0 amdgpu.noretry=0 amdgpu.gttsize=126976
ttm.pages_limit=32505856 amdgpu.sg_display=0 amd_iommu=off
```

**`amd_iommu=off` vaut 13 à 16 % du préfill.** Le préfill est compute-bound, et sur ce matériel un IOMMU actif est une taxe de budget énergétique, pas un problème de chemin mémoire. En `iommu=pt`, le SoC tire plus (122-127 W contre 108-118 W), horloge shader plus basse (2 357-2 409 MHz contre 2 549-2 713), à température identique. Le préfill tombe de 460 à 385 tok/s à 2 048 tokens pendant que tous les chiffres bound par bande passante tiennent à l'exact.

Deux choses à peser avant de copier : ça désactive la traduction DMA sur toute la machine, et ça emporte le NPU avec. Sur une boîte qui existe pour servir ce modèle, c'est le bon arbitrage. Sur un poste de travail qui fait autre chose, c'est une vraie perte de posture de sécurité.

Et **ne collez pas nos tailles**. `gttsize` et `ttm.pages_limit` sont des dimensions, pas des constantes : mettez-les à environ votre RAM installée. Coller la ligne 128 GB sur une machine de 64 GB demande au driver plus de GTT que la machine n'en a.

## La qualité derrière la vitesse

Les promesses de vitesse ne coûtent rien. Voici les instruments derrière.

**Token pour token contre `transformers`.** Six prompts réels, 32 étapes greedy chacun, teacher-forced contre des goldens produits par HuggingFace `transformers` sur les poids BF16 originaux : **182 des 192 étapes identiques**, deux des six prompts parfaits.

Ce chiffre est **end-to-end**. Il inclut tout ce que coûte la quantification 4 bits, pas seulement la part du moteur. La part du moteur est mesurée séparément, contre une référence sur les *mêmes poids déquantifiés*, et c'est la moitié la plus petite.

**Perplexité à l'échelle du corpus.** Trois corpus de 32k tokens, scorés par position, comparés en paires. Mesurer chaque famille de tenseurs contre son propre plafond BF16 a placé presque tout le coût de quantification non-expert dans **douze tenseurs `o_proj`**. À la précision livrée, ces douze mesurent comme une **égalité statistique** avec ce plafond.

**Contexte long : la bande 10-32k.** Aiguille dans une botte de foin : un fait synthétique est greffé à une position connue, le document continue sur une phrase dont les mots suivants sont ce fait, décodage greedy, correspondance exacte. Trois aiguilles × cinq positions × deux corpus × cinq profondeurs.

| Profondeur | Retrouvé |
|---|---|
| 1 024 *(contrôle)* | 30/30 |
| 4 096 | 30/30 |
| 8 192 | 30/30 |
| 16 384 | 28/30 |
| 32 768 | 30/30 |
| **Total** | **148/150 = 98.7 %** |

Les deux ratés confabulent un code plausible au lieu de s'éteindre. Le test peut échouer, et il échoue. C'est ce qui le rend crédible.

**Propriétés d'identité, gated sur chaque build.** À température 0, le décodage spéculatif émet des tokens **octet pour octet identiques** au décodage sériel greedy. La tête de draft ne fait que proposer : un token n'est émis que si le modèle complet l'aurait produit. Une requête batchée à côté d'autres émet des tokens identiques à la même requête seule.

Ce qui n'est **pas** mesuré, et il faut le lire : le modèle n'a jamais tourné en BF16. Il ne rentre pas dans 124 Go — c'est toute la raison d'être du moteur. Donc chaque chiffre de qualité est contre une référence déquantifiée ou contre leurs propres bras, jamais contre le modèle pleine précision à l'échelle. Et les comparaisons de qualité *entre runtimes* sont impossibles : les instruments diffèrent et aucun des deux n'a la baseline BF16.

### D'où sort le 5.53 bpw

Pas du nom du format. Le bits-per-weight est calculé depuis la table des tenseurs du checkpoint lui-même, pour que ça se vérifie à l'arithmétique plutôt qu'à la confiance.

**5.53 bpw sur les 179.55B paramètres**, ou 4.55 bpw sur le tronc et les experts en mettant à part le jeu de tables de recherche n-gram en FP8.

Le checkpoint fait 115.55 GiB, plus un sidecar de qualité de 2.31 GiB. Le bundle complet demande ~118 GiB. Le sidecar est un patch d'overlay : 723 tenseurs re-quantifiés contre des statistiques d'activation mesurées, plus les douze `o_proj` promus en 8 bits. Il coûte **0.09 GB net**, parce qu'il n'ajoute pas de poids — il dépense mieux les mêmes bits.

Ici, la 4 bits relève d'abord de la **condition de correction** : 125B de paramètres plus une table d'embeddings n-gram de 51B, ça fait 335 GiB en BF16 et 173 GiB en FP8, contre 124 Go de mémoire unifiée. Sans cette densité, le modèle ne tient tout simplement pas.

## Closed-source : la tension qu'il faut poser, pas esquiver

Le moteur est closed-source. Mon premier réflexe a été de tiquer. Le positionnement entier est bâti sur l'open source, et là, non.

Et puis j'ai regardé ce que « dépendance » veut vraiment dire.

Le binaire tourne sur **ma** machine. Les 118 Go de poids sont sur **mon** disque. Le modèle est épinglé à une révision HuggingFace précise. Et avec `HALOGEN_DOWNLOAD` non défini, le conteneur **n'ouvre aucune connexion sortante**. Point. Pas de télémétrie, pas de licence check à distance, pas de coupure de service possible depuis l'extérieur.

Le point de dépendance est l'API à distance : votre capacité à travailler se retrouve pendue à un service que vous ne contrôlez pas, facturé à la requête, coupable de latence, de hausse tarifaire et d'indisponibilité. Une licence, elle, n'a jamais coupé personne un mardi matin.

Un moteur closed-source sur votre propre silicium, c'est une boîte noire **chez vous**. Vous pouvez la couper, la surveiller, la remplacer, la mesurer. Un modèle open source derrière une API cloud, c'est une boîte ouverte **chez les autres**. Le second cas est le pire des deux, quelle que soit la licence.

Est-ce que j'aimerais que ce soit open source ? Oui. Est-ce que ça change quoi que ce soit à ma souveraineté opérationnelle ? Non. La souveraineté se mesure à l'endroit où tourne le compute et à ce qui sort du réseau, pas à la licence dans un fichier `LICENSE.md`.

C'est un arbitrage inconfortable. C'est justement pour ça qu'il faut l'écrire au lieu de le passer sous silence.

## Le setup : de `pipx install` à l'endpoint OpenAI

Le plus court chemin, c'est le conteneur :

```bash
podman run --rm -p 8731:8731 \
  --device /dev/kfd --device /dev/dri --group-add keep-groups \
  --security-opt seccomp=unconfined --ipc=host --ulimit memlock=-1:-1 \
  -e HALOGEN_DOWNLOAD=peonist-ai/halogen-qwen3.8-flash-next \
  -v ~/halogen-models:/models \
  ghcr.io/peonist-ai/halogen-flash-server:0.5.6
```

Il récupère les poids au premier démarrage (118 GiB, ça prend un moment, le transfert reprend s'il est coupé) et sert un endpoint compatible OpenAI sur `:8731`. `/v1/chat/completions`, `/v1/responses`, tool calls.

Le serveur parle l'**OpenAI Responses API**, ce qui veut dire que le Codex CLI se branche dessus directement :

```toml
# ~/.codex/config.toml
model = "halogen-qwen3.8-flash-next"
model_provider = "halogen"

[model_providers.halogen]
name = "halogen"
base_url = "http://<votre-serveur>:8731/v1"
wire_api = "responses"
requires_openai_auth = false
```

`/health` est la source d'autorité sur ce que le build courant supporte : champs de sampling, acceptation des images, alias de budget de tokens, format de tool-call.

### Le Cockpit pour ne pas retenir dix workflows

Si vous ne voulez pas mémoriser une syntaxe de conteneur par backend, il y a **[AI Toolbox Cockpit](https://github.com/kyuz0/ai-toolbox-cockpit)**, une application terminale en Textual :

```bash
pipx install git+https://github.com/kyuz0/ai-toolbox-cockpit.git
ai-toolbox-cockpit
```

Vous choisissez la plateforme une fois, puis un seul cockpit pilote Toolbx, Distrobox, Podman et Docker. llama.cpp, DS4, vLLM, ComfyUI et Halogen Flash ont chacun son formulaire de serveur, sa validation et son constructeur de commande. Le catalogue embarque 29 repos llama.cpp, 13 artefacts DS4, 15 repos vLLM et 26 bundles ComfyUI, sur quatre plateformes : Strix Halo, Radeon AI PRO R9700, Intel Arc B70, NVIDIA GB10.

Une bordure qui compte : **le JSON est des données, il ne peut pas fournir de template shell arbitraire.** Les clés d'API sont saisies au lancement et jamais persistées. C'est le genre de détail qui distingue un outil d'un jouet.

Les **[amd-strix-halo-toolboxes](https://github.com/kyuz0/amd-strix-halo-toolboxes)** restent la source des images : `vulkan-radv` pour la compatibilité, `rocm-10.0` pour la performance, plus une longue traînée d'expérimentaux (ROCmFPX, EngramHalo, TheRock nightly). Avec un estimateur de VRAM intégré :

```bash
gguf-vram-estimator.py models/my-model.gguf --contexts 32768
```

Et un watcher systemd qui bascule les profils TuneD et le refroidissement Framework en détectant llama.cpp, DS4, hipfire, vLLM ou le serveur Halogen, y compris conteneurisés.

## Ce que ça ne résout pas

Ce serait malhonnête de finir sans la liste.

**Quatre conversations, pas quarante.** Le nombre de slots est figé au démarrage, jusqu'à 64, mais au-delà de quatre le débit croît très lentement : 41.3 tok/s à un flux, 74.8 à quatre, 87.8 à huit. Pas de préemption, pas de paging.

**La machine doit être sienne.** Le serveur verrouille les poids et réserve le pool KV à l'avance. Sur 128 Go il laisse environ 12 Go libres, et très peu en grands blocs contigus. Si vous faites tourner une base de données ou un autre modèle à côté, ça entre en concurrence — et quand ça manque, l'allocation n'échoue pas proprement : le noyau cherche de la mémoire contiguë qu'il ne trouve pas, et le processus peut s'arrêter plusieurs minutes à 100 % d'un cœur, sans activité disque. Ça ne crash pas, ça ne redémarre pas, et ça ressemble exactement à un hang.

Pire : `free`, `MemAvailable` et tous les outils de monitoring qui les lisent comptent les poids verrouillés comme du page cache récupérable. Ils **surestiment la mémoire disponible de la taille du modèle, soit ~68 GiB**. Aucun champ du noyau ne rapporte la différence. Le serveur doit imprimer la correction lui-même. Croyez la première ligne qu'il affiche, pas la seconde.

**Un seul GPU, une seule famille de modèles.** gfx1151 uniquement. Les images sont lues, pas générées. Pas d'audio, pas de vidéo.

**Pas de response store.** `/v1/responses` génère et streame, mais ne conserve rien. Pas de `previous_response_id`, pas d'annulation. Le raisonnement n'est pas renvoyé au client — le serveur ne stocke rien, donc un résumé de raisonnement serait inventé plutôt que réel.

**Le contexte 1M est un autre modèle.** Opt-in en YaRN statique facteur 4, et ça se paie : +0.4 à 0.6 % de perplexité, 10 % de décodage spéculatif en moins, et un prompt d'un million de tokens en 22-24 minutes de préfill.

## L'arbitrage a changé

Pendant trois ans, l'arbitrage local contre cloud se résumait à : *la souveraineté coûte en performance*. On acceptait d'être plus lent pour garder ses données.

Ce trade n'existe plus. Pas partout, pas pour tout le monde, pas à n'importe quelle échelle. Mais sur une machine à base de Strix Halo, avec un moteur écrit pour cette puce, on tient **1 424 tok/s de préfill à 32K**, **~42 tok/s de décodage servi**, et **2 secondes de reprise sur une conversation de 100 000 tokens**.

À ces chiffres, le local fait mieux que le cloud, chez soi, sans facture récurrente.

La performance, elle, est établie. Ce qui reste à démontrer est du côté des têtes : savoir si l'industrie arrêtera de traiter le local comme une curiosité de hobbyiste, maintenant que la dernière excuse technique est tombée.

Si vous avez un Strix Halo qui prend la poussière, ou si vous avez fait tourner autre chose dessus, je suis preneur des chiffres.

## Sources & Références

1. **halogen-flash-server** — README complet, benchmarks, conditions de mesure, configuration. [github.com/peonist-ai/halogen-flash-server](https://github.com/peonist-ai/halogen-flash-server)
2. **AMD Strix Halo Toolboxes** — images conteneur llama.cpp Vulkan/ROCm pour gfx1151, estimateur de VRAM, inférence distribuée. [github.com/kyuz0/amd-strix-halo-toolboxes](https://github.com/kyuz0/amd-strix-halo-toolboxes)
3. **Guide central Strix Halo** — setup hôte, allocation mémoire unifiée. [strix-halo-toolboxes.com](https://strix-halo-toolboxes.com/)
4. **AI Toolbox Cockpit** — cockpit terminal unifié multi-backends et multi-plateformes. [github.com/kyuz0/ai-toolbox-cockpit](https://github.com/kyuz0/ai-toolbox-cockpit)
5. **Poids du modèle** — checkpoint W4B, overlay de qualité, tokenizer, épinglés par révision. [huggingface.co/peonist-ai/halogen-qwen3.8-flash-next](https://huggingface.co/peonist-ai/halogen-qwen3.8-flash-next)
6. **Interactive Benchmark Viewer** — courbes de profondeur Vulkan RADV / ROCm / builds expérimentaux. [kyuz0.github.io/amd-strix-halo-toolboxes](https://kyuz0.github.io/amd-strix-halo-toolboxes/)
7. **llama.cpp issue #25992 / PR #25863** — workaround temporaire sur les host buffers ROCm pour GPU intégrés, appliqué par les images `rocm-10.0`. [github.com/ggml-org/llama.cpp/issues/25992](https://github.com/ggml-org/llama.cpp/issues/25992)
8. **EngramHalo.cpp** — un des moteurs comparés, port ROCm avec engram SSD et sidecar MTP. [github.com/Aristo94/EngramHalo.cpp](https://github.com/Aristo94/EngramHalo.cpp)
