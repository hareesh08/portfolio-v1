---
title: Optimizing the candy palette
description: A note on how the rotating glassmorphism palette and reduced-motion handling make the site feel light on mobile.
date: "2026-07-21"
tags:
  - performance
  - css
  - mobile
---

The hero background is built from layered radial gradients that slowly animate between candy tones. It looks great, but on low-end phones it can cost real frames.

## What changed

- Disabled the background animation and `backdrop-filter` below `767px`.
- Forked utilities like `glass` into solid, non-blurred variants for small screens.
- Split the landing and intro screens so heavy sections lazy-load independently.

## Rule of thumb

If a visual only adds pleasantness and not information, let `prefers-reduced-motion` and the mobile breakpoint turn it off rather than shipping `animation: none` everywhere by hand.

| Breakpoint | Effects |
| --- | --- |
| Desktop | full animation + blur |
| Mobile | solid surfaces, no blur, static bg |

A short table works too.