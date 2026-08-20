---
title: "TY3 - Le portfolio du Rat"
description: "Article satirique sur le refus de payer pour l'infrastructure d'un portfolio personnel. Adressé aux développeurs qui se sont laissé enfermer dans des abonnements SaaS inutiles."
date: 2026-08-19
tags: [tyyy, localfirst, anti-saas, github-pages, open-source, infrastructure, self-hosted, sovereignty]
published: true
---

# Pourquoi je refuse de payer 3€ pour un DNS et un hébergeur

On m'a demandé l'autre jour : « Pourquoi tu héberges pas ton site sur Vercel ? C'est gratuit, c'est simple. »

J'ai souri. Pas un sourire amical. Un sourire de quelqu'un qui vient de calculer le coût réel du « gratuit » sur cinq ans.

Parce que le « gratuit » de Vercel, de Netlify, de Supabase, de Cloudflare Pages, c'est comme le « gratuit » du supermarché : le produit, c'est vous. Ou pire, c'est votre dépendance.

Mon portfolio ne coûte **rien**. Pas 0,01€. Pas 3€. Zéro. Et je suis fier de ça.

## Le piège du « free tier »

Voici ce qui se passe quand vous hébergez sur un SaaS :

- Le free tier vous donne **200MB de base de données**. Vous avez du trafic ? Il passe à du payant.
- Le « gratuit » inclut **50GB de bandwidth**. Un article qui passe sur Hacker News ? Bye bye.
- La plateforme que vous aimez peut **changer ses tarifs**, fermer, ou se faire racheter par un conglomérat qui transformera votre site en portail publicitaire.
- Votre contenu n'est **pas chez vous**. Il est en location. Dans un cloud. Dont vous ne contrôlez rien.

C'est de la dépendance déguisée en commodité. Et on tombe dedans tous les jours, parce que c'est plus facile au début.

**Plus facile au début. Plus cher, plus fragile, plus esclave après.**

## Mon architecture : zéro entrée = meilleure défense

J'ai pris un parti simple. Radical même.

**Pas de serveur. Pas de panel admin. Pas de JWT. Pas de politique de rôles. Pas de base de données.**

Juste un outil taillé pour mon besoin.

### GitHub Pages — statique, gratuit, pour de vrai

Mon site est un export statique. Next.js avec `output: 'export'`. Rien de plus.

Pas de Node.js qui tourne. Pas de runtime. Pas de processus à surveiller. Des fichiers HTML qui traînent sur GitHub Pages.

GitHub Pages, c'est pas un « tier ». C'est pas un « plan ». C'est **gratuit, sans quota, sans limitation raisonnable**, pour les repos publics. C'est du HTTP. Point.

### Markdown — la base de données du pauvre (qui gagne)

Mon contenu, c'est du Markdown brut. Avec du frontmatter. `gray-matter` le lit, `remark` le rend, `reading-time` calcule le temps de lecture.

C'est du texte. Du vrai. Lisible dans un terminal en 2074. Si GitHub part en vrille demain (ça n'arrivera pas, mais supposons), j'ai tout en local. Mon portfolio, c'est mon repo. Point.

### GitHub Actions — le CI/CD invisible et gratuit

Quand je commit sur `main`, GitHub Actions détecte le changement dans `web/**`, rebuild le site, et le déploie. Automatique. Invisible. Gratuit.

Pas de pipeline à maintenir. Pas de serveur CI à héberger. GitHub le fait pour vous, gratuitement, parce que c'est dans leur business model de héberger du code open source.

### L'app desktop — le CMS qui n'est pas un SaaS

On m'a demandé : « Pourquoi tu fais pas juste un Notion ? »

Parce que Notion, c'est du SaaS. Et du SaaS, c'est de la dépendance.

J'ai pas envie de taper dans Git pour écrire un article. VS Code + terminal, c'est bien pour coder, pas pour écrire du contenu. Donc j'ai construit **tyyy-Admin** : une app desktop native.

- **Backend** : Go, via Wails. Pas de HTTP. Pas d'API key sur un disque. Le PAT GitHub reste en cache mémoire.
- **Frontend** : React 19 + Vite 7. Un éditeur Markdown avec aperçu live.
- **Persistance** : Commits GitHub sur `main`. L'app lit, écrit, commit. C'est tout.

Pas de « cloud ». Pas de « synchronisation ». Juste un commit.

## Le budget : 0€ partout

| Poste                      | Coût                                                 |
| -------------------------- | ---------------------------------------------------- |
| Hébergement (GitHub Pages) | 0€                                                   |
| Base de données            | 0€                                                   |
| Backend / API              | 0€                                                   |
| Panel d'administration     | 0€ (c'est mon app, sur ma machine)                   |
| DNS                        | 0€ (GitHub Pages gère le DNS pour les repos publics) |
| **Total**                  | **0€**                                               |

Le seul truc qui me coûte de l'argent, c'est mon électricité pour faire tourner l'app desktop. Et encore… sur un M1 Max, c'est négligeable.

## Pourquoi une app desktop ?

Parce que j'ai pas envie de dépendre d'une plateforme pour écrire.

Notion, Google Docs, WordPress.com — tous ces outils sont beaux, fluides, bien pensés. Et tous ont un point commun : **si le service arrête, vous avez perdu votre contenu.** Ou pire, on vous le rend difficile à extraire.

Mon app ? Elle tourne sur **ma** machine. Elle fait **exactement** ce que je lui dis. Elle commit sur **mon** repo. Si elle casse, je la recode. En une soirée.

C'est pas sexy. C'est pas scalable. C'est pas « enterprise-ready ».

**C'est à moi.**

## GitHub est un monopole ? Oui. Et alors ?

Ok, je suis le premier à dire que GitHub est un monopole. Et Microsoft derrière. C'est pas parfait.

Mais c'est un monopole **open source** avec des **repos publics**. Mon code est là. Mon contenu est là. Mon infrastructure, c'est du Git.

Si GitHub ferme demain, je peux cloner mon repo. Je peux le push sur GitLab, Bitbucket, ou un serveur Git self-hosté. Le Markdown, ça vit partout. L'HTML statique, pareil.

**La vraie dépendance, ce n'est pas GitHub. C'est le format propriétaire.**

Tant que mon contenu est en Markdown et mon site en HTML statique, je suis libre.

## Le nom : « le portfolio du rat »

Oui, c'est volontaire. Je suis rat.

J'ai pas envie de payer 40 abonnements pour héberger 3 pages statiques. J'ai pas envie que mon site dépende d'une startup qui peut changer ses tarifs, fermer, ou se faire racheter.

Je vis dans les murs. Je grignote ce que les géants me laissent. Et je suis content.

Le rat, c'est celui qui survit quand tout s'effondre. Pas le héros. Pas l'entrepreneur en hoodie qui vend du « free tier » aux débutants. Le rat. Celui qui a un plan B, un C, et un D.

## La vraie question

Voici la question qui devrait vous tenir éveillé, pas celle sur le framework JavaScript de la semaine :

**Quand est-ce que tu arrêtes de payer pour quelque chose que tu pourrais faire toi-même ?**

Pas pour prouver que tu es malin. Pour prouver que tu es libre.

Mon portfolio vit dans un repo Git. Mon contenu, c'est du Markdown brut. Ma « base de données », c'est `links.json`. Mon « backend », c'est un pipeline GitHub Actions.

Et ça me coûte **zéro euro**.

Le code est public. [github.com/yonlycode](https://github.com/yonlycode/tyyy). Fork. Copie. Pique. C'est open source.

## TL;DR

- Pas de Vercel. Pas de Netlify. Pas de Supabase. Pas de « freemium » qui vous piège.
- **GitHub Pages** pour l'hébergement. Gratuit. Pour de vrai.
- **Markdown** pour le contenu. Lisible en 2074.
- **GitHub Actions** pour le déploiement. Invisible. Automatique. Gratuit.
- **Une app desktop** (Wails/Go/React) pour écrire. Sur ma machine. Pour moi.
- **0€ d'infra.** 0€ de base de données. 0€ de backend.
- Le code est open source. Fork. Copie. Pique.

---
