---
title: "TY3 / Portfolio du Rat"
description: "J'ai construit mon portfolio. Il coûte **0€/an** en infra.
Pas de Vercel. Pas de Netlify. Pas de Supabase. Pas de \"freemium\" qui vous piège avec des quotas qui disparaissent quand vous avez du trafic."
date: 2026-08-19
published: true
---

Mon portfolio ne coûte rien. Le tien, probablement trop cher.

Pas de Vercel. Pas de Netlify. Pas de Supabase. Pas de "freemium" qui vous piège avec des quotas qui disparaissent quand vous avez du trafic.

Juste :

**GitHub Pages** (statique, gratuit, pour de vrai)
**Un repo** avec des fichiers Markdown
**Un pipeline GitHub Actions** qui rebuild à chaque commit
**Une app desktop** (Wails/Go/React) qui commit à ma place

C'est tout.

On m'a demandé : "Pourquoi tu fais pas juste un Notion ?"

Parce que Notion, c'est du SaaS. Et du SaaS, c'est de la dépendance déguisée en commodité.

Mon site vit dans un repo Git. Mon contenu, c'est du Markdown brut. Ma "base de données", c'est `links.json`. Si GitHub part en vrille demain (ça n'arrivera pas, mais supposons), j'ai tout en local. Mon portfolio, c'est mon repo. Point.

**L'architecture :**

- `web/` → Next.js en export statique. `output: 'export'`. Zéro serveur. Zéro runtime. Des fichiers HTML qui traînent sur GitHub Pages.
- `admin/` → App desktop native. Go backend + React frontend. Pas de HTTP. Pas d'API key sur un disque. Le PAT GitHub reste en cache pour plus de facilité.
- Contenu → Markdown + frontmatter. `gray-matter`, `remark`, `reading-time`. C'est du texte. Du vrai. Lisible dans un terminal en 2074.
- CI/CD → GitHub Actions détecte un push sur `main`, rebuild, déployé. Automatique. Invisible. Gratuit.

**Le budget :** 0€ d'infra. 0€ de base de données. 0€ de backend.

J'ai même mis Google Analytics. Client-side uniquement. Pas de cookie banner RGPD. Pas de consentement à accepter. Le script charge, GA track, c'est tout. Anonymisé. Pas de tracking de merde.

**Pourquoi une app desktop ?**

Parce que j'ai pas envie de taper dans Git pour écrire un article. Parce que VS Code + terminal, c'est bien pour coder, pas pour écrire du contenu. L'app, c'est un CMS. Mais un CMS qui n'est pas un SaaS. Qui tourne sur ma machine. Qui commet sur mon repo. Qui fait exactement ce que je lui dis.

Pas de "cloud". Pas de "synchronisation". Juste un commit.

**Nom de code : "le portfolio du rat".**

Oui, c'est volontaire. Je suis rat. J'ai pas envie de payer 40 abonnements pour héberger 3 pages statiques. J'ai pas envie que mon site dépende d'une startup qui peut changer ses tarifs, fermer, ou se faire racheter par un conglomérat qui transformera mon site en portail publicitaire.

GitHub est un monopole ? Oui. Mais c'est un monopole **open source** avec un repo public. Mon code est là. Mon contenu est là. Mon infrastructure, c'est du Git.

Le seul truc qui me coûte de l'argent, c'est mon électricité pour faire tourner l'app desktop. Et encore...

Zéro facture. Zéro dépendance. Zéro excuse.

Le code est public. github.com/yonlycode. Fork. Copie. Pique. C'est open source.

La vraie question : *quand est-ce que tu arrêtes de payer pour quelque chose que tu pourrais faire toi-même ?*

---

*tyyy — le portfolio du rat de Yoann Fort*
