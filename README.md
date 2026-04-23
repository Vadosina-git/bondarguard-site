# BONDAR’ GUARD — сайт охранной компании

Пультовая охрана домов, коттеджей и бизнеса. Astro + Tailwind + TypeScript.

## Локальный запуск

```bash
npm install
npm run dev
```

Откроется `http://localhost:4321/bondarguard-site/`.

## Сборка

```bash
npm run build       # статика в ./dist
npm run preview     # локальный превью продакшн-сборки
npm run favicons    # пересгенерировать фавиконы и og-image из logo-mark.svg
```

## Структура контента

Текстовый и табличный контент лежит в `src/content/`:

- `src/content/services/` — карточки услуг для посадочных страниц.
- `src/content/tariffs/` — тарифы (ЧОП / Росгвардия).
- `src/content/equipment/` — оборудование.
- `src/content/reviews/` — отзывы.
- `src/content/team/` — команда.
- `src/content/faq/` — часто задаваемые вопросы.
- `src/content/blog/` — статьи блога (`.mdx`).

Глобальные константы (телефон, адрес, реквизиты) — `src/data/site.ts`.

## Добавить статью в блог

Создать файл `src/content/blog/my-article.mdx` с frontmatter:

```mdx
---
title: "Заголовок статьи"
description: "Короткое описание для SEO"
date: 2026-04-23
image: "/images/blog/my-article.jpg"
tags: ["охрана", "сигнализация"]
---

Текст статьи в markdown + MDX.
```

## Деплой на GitHub Pages

1. Создать публичный репозиторий `bondarguard-site` в аккаунте `Vadosina-git`.
2. `git remote add origin https://github.com/Vadosina-git/bondarguard-site.git`.
3. `git push -u origin main`.
4. В Settings → Pages → Source выбрать `GitHub Actions`.
5. При следующем push в `main` workflow `.github/workflows/deploy.yml` соберёт и задеплоит сайт.

Сайт откроется на `https://vadosina-git.github.io/bondarguard-site/`.

## Переменные окружения

На GitHub Pages они не используются (форма работает в mock-режиме — логирует в консоль). На Vercel/Netlify пригодится:

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
PUBLIC_YANDEX_METRIKA_ID=
```

См. `.env.example`.

## Переход на прод-хостинг (Vercel) — когда будет домен

1. Подключить репозиторий в Vercel.
2. В `astro.config.mjs` убрать `base`, заменить `site` на боевой домен.
3. В `src/data/site.ts` поменять `contactReceiver` с `"mock"` на `"api"`.
4. Задать переменные окружения в Vercel.

## Чеклист замены placeholder'ов

Все placeholder-ресурсы перечислены в `src/content/placeholders.md`. Перед запуском в прод — заменить на реальные.
