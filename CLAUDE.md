# CLAUDE.md — План реализации сайта охранной компании

> Документ для Claude Code. Содержит контекст проекта, анализ рынка, техстек, структуру, дизайн-систему, SEO-архитектуру и атомарный план реализации.

---

## 0. Переменные проекта (стартовые значения)

Стартовые значения для отладки — заполнены заглушками, где не указано реально. Claude Code записывает это в `src/data/site.ts`. Реальные контакты/реквизиты пользователь внесёт позже — все поля с пометкой «заглушка» остаются как есть до отдельной команды.

| Переменная | Значение | Статус |
|---|---|---|
| `COMPANY_NAME` | `BONDAR' GUARD` | **финальное** |
| `COMPANY_NAME_SHORT` | `BONDAR'` | **финальное** (для фавикона / тесных мест) |
| `TAGLINE` | `Пультовая охрана домов, коттеджей и бизнеса` | заглушка, можно менять |
| `CITY` | `Москва` | заглушка |
| `REGION` | `Московская область` | заглушка |
| `PHONE` | `+7 (495) 000-00-00` | заглушка |
| `PHONE_TEL` | `+74950000000` | заглушка (для `tel:` href) |
| `EMAIL` | `info@bondarguard.ru` | заглушка |
| `ADDRESS` | `г. Москва, ул. Примерная, 1` | заглушка |
| `WORKING_HOURS` | `Пн–Вс, круглосуточно` | заглушка |
| `INN` | `0000000000` | заглушка |
| `OGRN` | `0000000000000` | заглушка |
| `YEAR_FOUNDED` | `2020` | заглушка |
| `DOMAIN` | **не фиксировать** — использовать `import.meta.env.SITE` во время сборки | определится автоматически по репозиторию GitHub Pages |
| `DESIGN_DIRECTION` | `premium-dark` | **финальное** (см. раздел 5.1) |
| `PRICE_KVARTIRA_FROM` | `990` | заглушка |
| `PRICE_DOM_FROM` | `1990` | заглушка |
| `PRICE_BIZNES_FROM` | `2500` | заглушка |
| `GBR_TIME_CITY` | `5–7 минут` | заглушка |
| `GBR_TIME_REGION` | `10–15 минут` | заглушка |
| `CONTACT_RECEIVER` | `mock` — сейчас логирует в консоль + показывает success | временно (см. раздел 3.4) |
| `TELEGRAM_BOT_TOKEN` | — | будет добавлено при переезде на Vercel |
| `TELEGRAM_CHAT_ID` | — | будет добавлено при переезде на Vercel |

### 0.1 Задача: логотип BONDAR' GUARD

Claude Code должен сгенерировать SVG-логотип **в первой фазе** (перед сборкой шапки):

**Требования:**
- Чистый, минималистичный, **строго без лишних деталей**.
- Содержит текст `BONDAR'` и `GUARD` (расположение — на выбор Claude Code, обосновать в коммите).
- Шрифт — тот же display-font, что выбран в дизайн-концепции `premium-dark` (`Unbounded` variable).
- Опциональный геометрический знак слева или сверху (щит, абстрактная геометрия — простая, монолинейная, 1 цвет).
- Читается на 24px (фавикон) и на 120px (шапка).
- Цвет: акцентный `#00D4AA` для знака + основной текст `#F2F4F8` (вариант для тёмной шапки).
- Должны быть подготовлены **3 версии** SVG:
  1. `logo-full.svg` — знак + полное название (для десктопной шапки и футера).
  2. `logo-short.svg` — знак + `BONDAR'` (для мобильной шапки).
  3. `logo-mark.svg` — только знак (для фавикона, apple-touch-icon).
- Пути в проекте: `public/images/logos/logo-full.svg`, `logo-short.svg`, `logo-mark.svg`.
- Дополнительно: из `logo-mark.svg` сгенерировать `favicon.ico` (32×32), `favicon.svg`, `apple-touch-icon.png` (180×180), `og-default.jpg` (1200×630, логотип + tagline на фоне цвета `#0B0F17`).

**Апостроф в названии (`'`):** использовать типографский `U+2019` (`'`), а не ASCII `'`. Проверить визуально, чтобы не «прыгал» относительно букв.

---

## 1. Контекст и цель

**Заказчик:** Вадим — владелец компании по пультовой охране домов, коттеджей и коммерческой недвижимости.

**Референс:** `https://mosguard.ru/` — взять структуру и SEO-логику, но сделать другой дизайн и тексты.

**Цели сайта:**
1. Генерация лидов на услуги пультовой охраны (заявка → звонок → договор).
2. SEO-трафик по коммерческим запросам («пультовая охрана {{CITY}}», «охрана дома цена», «вневедомственная охрана» и т.д.).
3. Демонстрация экспертизы и доверия (команда, лицензии, отзывы, ответы ГБР).

**НЕ цели:** e-commerce, блог как цель (блог нужен только как SEO-инструмент), личный кабинет клиента (отдельный продукт).

---

## 2. Анализ рынка (сделан 2026-04-23)

Изучены: `mosguard.ru` (референс), `csat.ru` (Цезарь Сателлит — крупнейший игрок), `chop-24.com`, `ckskat.ru`, `rustelematika.ru`, `podrazdelenied.ru`, `pcnraduga.ru`.

### 2.1 Типовая структура сайта охранной компании

Все сайты следуют одной и той же структуре (проверенная конверсионная схема):

```
Главная
├─ Охрана (по типу объекта)
│  ├─ Квартиры
│  ├─ Дома / коттеджи / дачи
│  └─ Бизнес / коммерческая недвижимость
├─ Услуги (по типу услуги)
│  ├─ Пультовая охрана
│  ├─ Охранная сигнализация (монтаж)
│  ├─ Тревожная кнопка
│  ├─ Пожарная сигнализация
│  └─ Видеонаблюдение
├─ Оборудование / тарифы
├─ О компании (команда, лицензии, отзывы)
├─ Блог (SEO)
├─ Контакты
└─ Политика конфиденциальности
```

### 2.2 Обязательные блоки на посадочных страницах

Выделены как общий паттерн у всех ТОП-игроков:

1. **Hero** — заголовок с ключевым запросом + УТП + CTA «Заказать звонок».
2. **3 ключевых преимущества** (иконки + короткий текст): скорость реагирования / вооружённый ГБР / полномочия задержания.
3. **Выбор тарифа / типа объекта** (3 карточки: квартира/дом/бизнес ИЛИ ЧОП/Росгвардия).
4. **Состав стартового комплекта** (датчик движения, открытия, контрольная панель, брелок).
5. **Доп. оборудование** (датчики дыма/воды/газа, уличные камеры и т.д.).
6. **Мобильное приложение** (скриншот + 3 фичи).
7. **Алгоритм работы** (4 шага: тревога → обработка → выезд ГБР → информирование).
8. **Команда** (4 лица с должностями).
9. **Отзывы** (карусель).
10. **FAQ** (10–12 вопросов, критично для SEO — попадают в featured snippets).
11. **Форма консультации** (имя + телефон + согласие на ПД).
12. **Футер** (3 колонки: Услуги / Охраняем / Информация).

### 2.3 Ключевые УТП конкурентов (для различия)

| Конкурент | УТП |
|---|---|
| MosGuard | Позиционирование через Росгвардию («9500 экипажей», «вневедомственная охрана») |
| Цезарь Сателлит | Масштаб (4 мониторинговых центра, 320 000 объектов, 5000 ГБР, 6+ млн отработанных тревог) |
| СпецМонтаж | Опыт (16 лет на рынке), работа без предоплаты |
| Контроль 24 | Специализация на загородной недвижимости |

**Рекомендуемое УТП для Вадима** (не противоречит конкурентам, но выделяет):
- Время реагирования с гарантией (SLA: деньги возвращаем, если ГБР позже N минут).
- Прозрачное ценообразование (фиксированная абонплата без скрытых платежей за ложные вызовы).
- Материальная ответственность (страховка имущества на N млн ₽).
- Честное позиционирование: ЧОП + партнёрство с Росгвардией (не врать про «вневедомственную охрану», если реально ЧОП).

### 2.4 Семантическое ядро (базовое, расширять после запуска через Wordstat)

**Коммерческие (высокий приоритет):**
- пультовая охрана {{CITY}}
- охрана дома {{CITY}}
- охрана коттеджа / дачи {{CITY}}
- охрана квартиры {{CITY}}
- охрана офиса / бизнеса {{CITY}}
- охранная сигнализация установка {{CITY}}
- тревожная кнопка {{CITY}}
- пожарная сигнализация монтаж {{CITY}}
- видеонаблюдение установка {{CITY}}
- группа быстрого реагирования / ГБР

**Информационные (для блога и FAQ):**
- как выбрать охранную сигнализацию для дома
- сколько стоит охрана дома
- чем отличается ЧОП от Росгвардии
- беспроводная или проводная сигнализация
- охранная сигнализация с домашними животными

---

## 3. Tech Stack

### 3.1 Выбор фреймворка: **Astro 4.x**

**Почему Astro, а не Next.js (как у mosguard.ru):**
- Нулевой JS по умолчанию → максимальная скорость и Lighthouse 100 → плюс к SEO.
- File-based routing: `src/pages/ohrana-domov.astro` автоматически становится `/ohrana-domov`. Интуитивно даже для не-кодера.
- Встроенная поддержка MDX для блога (контент = markdown-файлы, легко редактировать).
- Встроенный sitemap, RSS, image optimization.
- Деплой бесплатно на Vercel / Netlify / Cloudflare Pages.

### 3.2 Полный стек

| Слой | Технология | Версия | Назначение |
|---|---|---|---|
| Meta-framework | Astro | `^4.16` | Статический генератор, роутинг, SEO |
| Styling | Tailwind CSS | `^3.4` | Utility-first стили |
| Language | TypeScript | `^5.6` | Типизация, меньше багов |
| Animations (layout) | GSAP + ScrollTrigger | `^3.12` | Скролл-анимации, сложные последовательности |
| Animations (UI) | Motion One / motion.dev | `^10` | Hover, micro-interactions (легче Framer Motion) |
| Smooth scroll | Lenis | `^1.1` | Плавный скролл всей страницы |
| Icons | Lucide | `^0.460` | Консистентный набор иконок |
| Forms | Web Forms + fetch → webhook | native | Отправка лида в Telegram / на email |
| Content | Astro Content Collections | built-in | Типизированный блог и услуги |
| SEO | `astro-seo` + JSON-LD | `^0.8` | Meta, OG, Twitter, Schema.org |
| Sitemap | `@astrojs/sitemap` | `^3.2` | Автогенерация sitemap.xml |
| Image optimization | `@astrojs/image` (Sharp) | built-in | WebP, AVIF, responsive |
| Analytics | Yandex.Metrika + (опц.) GA4 | — | Через `astro-partytown` для изоляции |
| Font loading | `@fontsource-variable` | latest | Локальные шрифты (без CLS) |

### 3.3 Деплой

**Текущая фаза (отладка): GitHub Pages.**
- Бесплатно, деплой из репозитория, SSL из коробки.
- Авто-деплой через GitHub Actions.
- Ограничение: только статика. Serverless-функций НЕТ → формы работают в mock-режиме (см. 3.4).

**Будущая фаза (прод): Vercel или Netlify.**
- Когда сайт готов, реальный домен куплен, бот создан — переезд в одно действие.
- Появляются serverless-функции → включается реальная отправка в Telegram.

### 3.3.1 Настройка Astro под GitHub Pages

В `astro.config.mjs`:

```js
export default defineConfig({
  // Заменить <user> и <repo> на реальные при создании репо.
  // Если репо называется <user>.github.io — base не нужен (убрать поле).
  site: 'https://<user>.github.io',
  base: '/<repo>/',
  output: 'static',
  // ...integrations
});
```

**Важно:** все внутренние ссылки в коде должны строиться через `import.meta.env.BASE_URL`, а не хардкодиться (`<a href="/ohrana-domov">` → `<a href={`${import.meta.env.BASE_URL}ohrana-domov`}>`). Для этого обязательно завести helper `src/lib/url.ts` и использовать его везде.

### 3.3.2 GitHub Actions workflow

Создать `.github/workflows/deploy.yml` — официальный пример от Astro для GitHub Pages: checkout → install → build → upload artifact → deploy. Триггер — push в `main`. После первого успешного запуска в настройках репо: Settings → Pages → Source = "GitHub Actions".

### 3.4 Обработка заявок

**Фаза отладки (GitHub Pages) — mock-режим:**

```
[Форма на сайте]
   → client-side валидация (Zod)
   → console.log({ name, phone, source })
   → показать success-состояние формы
   → отправить goal в Yandex.Metrika (reachGoal('lead_mock'))
```

Никаких реальных заявок на этой фазе не отправляется. Все попадания в форму — это просто отладка UX/валидации/аналитики.

Для тестирования можно подключить **Formspree** (бесплатно, 50 заявок/месяц, работает на чистой статике) — включается одной сменой URL в `src/lib/forms.ts`. Это опциональный шаг, если Вадим захочет получать тестовые заявки на почту во время отладки.

**Фаза прода (Vercel/Netlify) — реальная отправка:**

```
[Форма на сайте]
   → POST /api/lead (Astro API route → serverless function)
   → валидация (Zod) + anti-spam (honeypot + rate limit)
   → Telegram Bot API: sendMessage(chat_id, форматированный текст)
   → (дубль) SMTP-отправка на EMAIL
   → возвращает success
```

Код `src/pages/api/lead.ts` пишется сразу (в Фазе 7), но на GitHub Pages он просто не выполняется — Astro соберёт сайт как статику и роут `/api/lead` вернёт 404. Это нормально для отладочной фазы. При переезде на Vercel — роут оживёт без единой правки.

---

## 4. Структура проекта

```
./
├─ CLAUDE.md                          # Этот документ
├─ README.md                          # Инструкция запуска для Вадима
├─ package.json
├─ astro.config.mjs
├─ tailwind.config.mjs
├─ tsconfig.json
├─ .env.example                       # Образец env (без секретов)
├─ .gitignore
│
├─ public/                            # Статика (отдаётся как есть)
│  ├─ favicon.svg
│  ├─ favicon.ico
│  ├─ apple-touch-icon.png
│  ├─ robots.txt
│  ├─ manifest.webmanifest
│  └─ images/
│     ├─ hero/
│     ├─ services/
│     ├─ equipment/
│     ├─ team/
│     ├─ og/                          # Open Graph превью (1200x630)
│     └─ logos/                       # Лого партнёров / сертификаты
│
├─ src/
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Header.astro
│  │  │  ├─ Footer.astro
│  │  │  ├─ Navigation.astro         # Десктоп-меню
│  │  │  ├─ MobileMenu.astro         # Бургер-меню с анимацией
│  │  │  └─ StickyCTA.astro          # Плавающая кнопка «Заказать звонок»
│  │  │
│  │  ├─ ui/
│  │  │  ├─ Button.astro
│  │  │  ├─ Card.astro
│  │  │  ├─ Modal.astro              # Модалка с формой
│  │  │  ├─ Input.astro
│  │  │  ├─ PhoneInput.astro         # С маской +7 (___) ___-__-__
│  │  │  ├─ Accordion.astro          # Для FAQ
│  │  │  ├─ Tabs.astro               # Для сравнения тарифов
│  │  │  ├─ Badge.astro
│  │  │  └─ Counter.astro            # Анимированный счётчик (5000+, 24/7 и т.д.)
│  │  │
│  │  ├─ sections/
│  │  │  ├─ Hero.astro
│  │  │  ├─ TrustBar.astro           # 3 ключевых УТП иконки
│  │  │  ├─ ServiceTiles.astro       # Карточки Квартира/Дом/Бизнес
│  │  │  ├─ TariffGrid.astro         # Тарифы ЧОП vs Росгвардия
│  │  │  ├─ EquipmentShowcase.astro  # Состав комплекта
│  │  │  ├─ AdditionalEquipment.astro
│  │  │  ├─ HowItWorks.astro         # 4 шага алгоритма
│  │  │  ├─ MobileApp.astro
│  │  │  ├─ TeamGrid.astro
│  │  │  ├─ Stats.astro              # Числа (объектов под охраной и т.д.)
│  │  │  ├─ Reviews.astro            # Карусель отзывов
│  │  │  ├─ Partners.astro           # Логотипы клиентов / сертификаты
│  │  │  ├─ FAQ.astro
│  │  │  ├─ ConsultationForm.astro
│  │  │  ├─ CTASection.astro         # Большой блок CTA в середине страниц
│  │  │  └─ BreadcrumbsJsonLd.astro  # Хлебные крошки + schema
│  │  │
│  │  └─ seo/
│  │     ├─ BaseSEO.astro             # Все meta для страниц
│  │     ├─ LocalBusinessJsonLd.astro # Schema.org для главной
│  │     ├─ ServiceJsonLd.astro       # Schema.org для страниц услуг
│  │     ├─ FAQJsonLd.astro           # Schema.org для FAQ блоков
│  │     └─ BreadcrumbJsonLd.astro
│  │
│  ├─ layouts/
│  │  ├─ BaseLayout.astro             # Общий шаблон (header + main + footer)
│  │  ├─ ServiceLayout.astro          # Шаблон для страниц услуг
│  │  ├─ LegalLayout.astro            # Шаблон для страниц «Политика» и т.п.
│  │  └─ BlogLayout.astro             # Шаблон для статьи блога
│  │
│  ├─ pages/
│  │  ├─ index.astro                          # / — Главная
│  │  │
│  │  ├─ ohrana-domov.astro                   # /ohrana-domov — охрана домов / коттеджей
│  │  ├─ ohrana-kvartir.astro                 # /ohrana-kvartir — охрана квартир
│  │  ├─ ohrana-biznesa.astro                 # /ohrana-biznesa — охрана бизнеса
│  │  ├─ ohrana-dachi.astro                   # /ohrana-dachi — охрана дач (отд. лендинг)
│  │  │
│  │  ├─ pultovaya-ohrana.astro               # /pultovaya-ohrana — общая услуга
│  │  ├─ ohrannaya-signalizatsiya.astro       # /ohrannaya-signalizatsiya
│  │  ├─ pozharnaya-signalizatsiya.astro      # /pozharnaya-signalizatsiya
│  │  ├─ trevozhnaya-knopka.astro             # /trevozhnaya-knopka
│  │  ├─ videonablyudenie.astro               # /videonablyudenie
│  │  │
│  │  ├─ tarify.astro                         # /tarify — сводная таблица тарифов
│  │  ├─ oborudovanie.astro                   # /oborudovanie — каталог
│  │  │
│  │  ├─ o-kompanii.astro                     # /o-kompanii
│  │  ├─ kontakty.astro                       # /kontakty
│  │  │
│  │  ├─ blog/
│  │  │  ├─ index.astro                       # /blog — список статей
│  │  │  └─ [...slug].astro                   # /blog/<slug> — страница статьи
│  │  │
│  │  ├─ policy.astro                         # /policy — политика конф.
│  │  ├─ oferta.astro                         # /oferta — публичная оферта
│  │  │
│  │  ├─ api/
│  │  │  └─ lead.ts                           # POST /api/lead — приём заявок
│  │  │
│  │  ├─ sitemap-index.xml.ts                 # Кастомный sitemap (если нужно)
│  │  └─ 404.astro
│  │
│  ├─ content/
│  │  ├─ config.ts                            # Определение коллекций Content
│  │  ├─ blog/                                # .mdx статьи
│  │  │  ├─ kak-vybrat-ohrannuyu-signalizatsiyu.mdx
│  │  │  ├─ chop-vs-rosgvardiya.mdx
│  │  │  ├─ besprovodnaya-ili-provodnaya.mdx
│  │  │  └─ top-10-oshibok-pri-vybore.mdx
│  │  ├─ services/                            # JSON/YAML описания услуг
│  │  │  ├─ ohrana-domov.json
│  │  │  └─ ohrana-kvartir.json
│  │  ├─ tariffs/                             # Тарифы
│  │  │  ├─ chop.json
│  │  │  └─ rosgvardiya.json
│  │  ├─ equipment/                           # Оборудование
│  │  │  ├─ motion-sensor.json
│  │  │  └─ ...
│  │  ├─ reviews/                             # Отзывы
│  │  │  └─ reviews.json
│  │  ├─ team/
│  │  │  └─ team.json
│  │  └─ faq/
│  │     └─ faq.json
│  │
│  ├─ styles/
│  │  ├─ global.css                           # Tailwind @layer + CSS vars
│  │  ├─ fonts.css
│  │  └─ animations.css
│  │
│  ├─ scripts/                                # Client-side TS
│  │  ├─ lenis.ts                             # Smooth scroll init
│  │  ├─ scroll-reveal.ts                     # GSAP ScrollTrigger
│  │  ├─ counter.ts                           # Анимация счётчиков
│  │  ├─ form.ts                              # Валидация + отправка
│  │  ├─ mobile-menu.ts
│  │  └─ analytics.ts
│  │
│  ├─ lib/
│  │  ├─ telegram.ts                          # Отправка в Telegram из API route
│  │  ├─ validation.ts                        # Zod-схемы для форм
│  │  └─ seo.ts                               # Генерация meta
│  │
│  └─ data/
│     ├─ site.ts                              # Глобальные константы сайта (company, city...)
│     ├─ navigation.ts                        # Структура меню
│     └─ contacts.ts
│
└─ tests/
   └─ accessibility.md                        # Чеклист a11y
```

---

## 5. Дизайн-система

### 5.1 Три варианта дизайн-концепции (на выбор)

Claude Code должен предложить Вадиму выбрать ОДИН вариант перед имплементацией. По умолчанию — `premium-dark`.

#### Вариант A: `premium-dark` (РЕКОМЕНДУЕТСЯ)
Премиальная тёмная эстетика. Ассоциация: высокотехнологичная защита, спокойная уверенность.

- **Фон:** `#0B0F17` (почти чёрный с синим подтоном) и `#131826` (слой)
- **Текст:** `#F2F4F8` / `#9AA3B2` (вторичный)
- **Акцент:** `#00D4AA` (изумрудный свет) — CTA, важные цифры
- **Вторичный акцент:** `#3E8EFF` (электрик блю) — ссылки, иконки
- **Display font:** `Unbounded` (variable) или `Onest`
- **Body font:** `Manrope` (variable)
- **Mood:** тихая сила, tech, премиум B2B/B2C коттеджный сегмент

#### Вариант B: `institutional-trust`
Нейтрально-институциональная, как у банков и госуслуг. Ассоциация: надёжность, стабильность.

- **Фон:** `#FFFFFF` / `#F6F7F9`
- **Текст:** `#0F172A` / `#475569`
- **Акцент:** `#C8102E` (глубокий красный, как у спецслужб)
- **Вторичный:** `#1E3A8A` (navy)
- **Display font:** `Ruberoid` или `Golos Text` (кириллица)
- **Body font:** `Golos Text` / `Inter Tight`
- **Mood:** официальность, доверие, зрелость

#### Вариант C: `warm-local`
Тёплая, человечная, для частных клиентов (коттеджный сегмент). Ассоциация: дом, семья, забота.

- **Фон:** `#FAF7F2` (тёплый офф-уайт)
- **Текст:** `#1A1410` / `#5C544D`
- **Акцент:** `#D4691F` (янтарь / охра)
- **Вторичный:** `#1F4D3C` (forest green)
- **Display font:** `Fraunces` (variable, с optical sizing)
- **Body font:** `Inter` / `Manrope`
- **Mood:** человечность, локальность, уют

### 5.2 Принципы дизайна (применяются ко всем вариантам)

- **Мобилка — первой.** Всё тестируется на 375px, потом масштабируется.
- **Сетка:** 12 колонок на десктопе, gap-4 → gap-8 → gap-12. Max-width контента `1280px`.
- **Типографика:** fluid clamp: заголовки `clamp(2rem, 5vw, 4.5rem)`, body `clamp(1rem, 1.1vw, 1.125rem)`.
- **Радиусы:** 12px (карточки), 8px (кнопки), 24px (большие блоки).
- **Тени:** избегать. Использовать только у плавающих элементов (sticky CTA, модалка).
- **Контраст AA минимум:** все пары текст/фон проверить через WCAG.

### 5.3 Анимации (бюджет и паттерны)

**Общий принцип:** анимации только по событию (скролл, ховер, клик). Ничего автоплейного дольше 1 секунды. Уважение `prefers-reduced-motion` — все анимации обёрнуты в проверку.

**Обязательные микроанимации:**

| Элемент | Эффект | Библиотека |
|---|---|---|
| Hero | Staggered fade-in + subtle parallax фоновых геометрических фигур | GSAP |
| Все секции при скролле | Fade-up, delay 0.1s, ease-out-quart | GSAP ScrollTrigger |
| Счётчики («5000+ объектов») | Count-up при попадании в viewport | Motion One |
| Кнопки | Scale 1→1.03 + background-shift на hover, 150ms | CSS |
| Карточки услуг | Подъём на 4px + glow/border accent on hover | CSS + CSS vars |
| Аккордеон FAQ | Height auto + arrow rotate | CSS + `<details>` или JS |
| Мобильное меню | Slide-in справа + blur backdrop | CSS + Motion One |
| Sticky CTA | Появление через 400px скролла, bounce-in | GSAP |
| Навигация | Smooth scroll к якорю + underline-animation links | Lenis + CSS |
| Карусель отзывов | Auto-slide с паузой на hover, swipe на мобиле | Embla Carousel (lightweight) |
| Изображения | Blur-up placeholder → sharp при загрузке | Astro `<Image />` |
| Форма | Floating labels, shake при ошибке, success-tick после отправки | CSS + Motion One |
| Модалка | Fade + scale 0.95→1, 200ms | Motion One |
| Loading state кнопок | Spinner появляется в кнопке при отправке формы | CSS |

**Запрещено:**
- Параллакс фона всей страницы (раздражает, вредит производительности).
- Автоплей видео.
- Анимации важного контента дольше 600ms.
- Ambient particle-эффекты.

### 5.4 Доступность (a11y)

- Все интерактивные элементы достижимы с клавиатуры (Tab, Enter, Esc).
- Видимый `:focus-visible` стиль на всём, что фокусируется.
- `aria-label` на всех иконочных кнопках.
- Alt у картинок, `loading="lazy"` везде кроме hero.
- Семантика: `<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`.
- Skip-link «Перейти к содержанию» в начале body.
- Контраст AA+ для всех пар.

---

## 6. Карта сайта (финальная)

```
/                              Главная
├─ /ohrana-domov               Охрана домов, коттеджей, дач (hub для загородной)
├─ /ohrana-kvartir             Охрана квартир
├─ /ohrana-biznesa             Охрана коммерческой недвижимости
├─ /ohrana-dachi               Охрана дач (отд. SEO-лендинг)
│
├─ /pultovaya-ohrana           Что такое пультовая охрана (общая инфо)
├─ /ohrannaya-signalizatsiya   Установка охранной сигнализации
├─ /pozharnaya-signalizatsiya  Пожарная сигнализация
├─ /trevozhnaya-knopka         Тревожная кнопка
├─ /videonablyudenie           Видеонаблюдение
│
├─ /tarify                     Сводная страница тарифов
├─ /oborudovanie               Каталог оборудования
│
├─ /o-kompanii                 О компании, команда, лицензии
├─ /kontakty                   Контакты + карта
│
├─ /blog                       Список статей
│  └─ /blog/{slug}             Статьи (4 стартовых)
│
├─ /policy                     Политика конфиденциальности
├─ /oferta                     Публичная оферта (если нужна)
│
├─ /sitemap.xml                Авто-генерация
├─ /robots.txt                 Ручной
└─ /404                        Кастомная 404
```

**Вложенность ключей (SEO-структура):**
- URL короткие, транслит, через дефис.
- Названия папок услуг совпадают с ключевым запросом (тот же принцип, что у mosguard.ru: `/ohrana-domov`, `/ohrana-biznesa`).
- Блог отделён в подпапку `/blog/` для понятной иерархии.

---

## 7. SEO-архитектура

### 7.1 Meta-структура каждой страницы

Общий компонент `BaseSEO.astro` принимает props:

```ts
interface SEOProps {
  title: string;           // 50–60 символов, включает ключ + гео + бренд
  description: string;     // 140–160 символов
  canonical?: string;
  ogImage?: string;        // Дефолт: /images/og/default.jpg (1200x630)
  noindex?: boolean;
  keywords?: string[];     // (для yandex, google не использует)
}
```

### 7.2 Шаблоны title / description

| Страница | Title | Description |
|---|---|---|
| Главная | Пультовая охрана в {{CITY}} — {{COMPANY_NAME}} | Охрана домов, квартир и бизнеса в {{CITY}} с выездом ГБР за 5-7 минут. Пультовая охрана, сигнализация, видеонаблюдение. Звоните: {{PHONE}}. |
| /ohrana-domov | Охрана дома и коттеджа в {{CITY}} — установка сигнализации | Охрана загородных домов и коттеджей в {{CITY}} и {{REGION}}: выезд ГБР, сигнализация, датчики. От {{PRICE}} ₽/мес. |
| /ohrana-kvartir | Охрана квартиры в {{CITY}} — пультовая охрана жилья | Подключение квартиры на пульт охраны в {{CITY}}. Реагирование ГБР, мобильное приложение, от {{PRICE}} ₽/мес. |
| /ohrana-biznesa | Охрана бизнеса в {{CITY}} — офисов, магазинов, складов | Охрана коммерческой недвижимости в {{CITY}}: круглосуточный мониторинг, тревожная кнопка, выезд ГБР. |
| /pultovaya-ohrana | Пультовая охрана в {{CITY}} — цены и услуги | Пультовая охрана объектов в {{CITY}}: круглосуточный мониторинг, выезд группы быстрого реагирования за 5-7 минут. |
| /trevozhnaya-knopka | Тревожная кнопка в {{CITY}} — установка и подключение | Установка тревожной кнопки с реагированием ГБР в {{CITY}}. Для офисов, магазинов, частных лиц. |
| /pozharnaya-signalizatsiya | Пожарная сигнализация в {{CITY}} — монтаж и обслуживание | Проектирование и установка пожарной сигнализации в {{CITY}}. АПС, системы оповещения, обслуживание. |
| /videonablyudenie | Видеонаблюдение в {{CITY}} — установка систем | Установка систем видеонаблюдения в {{CITY}}: IP-камеры, DVR, удалённый доступ. Монтаж под ключ. |
| /o-kompanii | О компании {{COMPANY_NAME}} — охранная компания в {{CITY}} | Мы занимаемся охраной объектов в {{CITY}} с {{YEAR}}. Лицензии, команда, партнёры. |
| /kontakty | Контакты {{COMPANY_NAME}} в {{CITY}} | Адрес, телефон, режим работы. Заказать выезд специалиста для расчёта стоимости охраны. |

### 7.3 Schema.org (обязательно)

**На всех страницах:**
- `Organization` (в layout)
- `LocalBusiness` (на главной, контактах)
- `BreadcrumbList` (на всех внутренних)

**На страницах услуг:**
- `Service` с ценой, areaServed, provider.

**На страницах с FAQ блоком:**
- `FAQPage` — даёт rich snippets в Яндексе и Google.

**На страницах блога:**
- `Article` с author, datePublished, image.

Примеры JSON-LD — в `src/components/seo/*JsonLd.astro`.

### 7.4 robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /404

Sitemap: https://{{DOMAIN}}/sitemap-index.xml
Host: {{DOMAIN}}
```

### 7.5 Sitemap

Генерируется автоматически плагином `@astrojs/sitemap`. Настройка в `astro.config.mjs`:
- приоритет главной = 1.0
- приоритет страниц услуг = 0.8
- приоритет статей блога = 0.6
- lastmod = дата модификации

### 7.6 Технические требования SEO

- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP < 200ms. Проверять через PageSpeed Insights.
- **Изображения:** WebP + AVIF, `<Image />` от Astro с responsive srcset.
- **Шрифты:** локальные `@fontsource-variable`, `display: swap`, preload для display-шрифта.
- **Критический CSS:** Astro делает автоматически.
- **Ленивая загрузка:** всё ниже первого экрана — `loading="lazy"`.
- **Прелоадинг hero-изображения:** `fetchpriority="high"`.
- **Hreflang:** не нужен (только русский).
- **Canonical:** обязательно на каждой странице.
- **404 страница:** кастомная с CTA на главную и поиском.

---

## 8. Атомарный план реализации

**Правила для Claude Code:**
- Каждый шаг — отдельный коммит с понятным сообщением на английском.
- После каждого шага прогнать `npm run build` — убедиться, что проект собирается.
- После шагов, помеченных `🧪`, делается визуальная проверка: Claude Code запускает `npm run dev` и делает скриншот главной страницы для показа Вадиму.
- Если шаг не влезает — разбить на подшаги. Но не объединять шаги.

---

### Фаза 0: Инициализация

**Шаг 0.1.** Создать новый Astro-проект с TypeScript и Tailwind:
```bash
npm create astro@latest -- --template minimal --typescript strict --install
npx astro add tailwind
npx astro add sitemap
npx astro add mdx
```

**Шаг 0.2.** Установить зависимости:
```bash
npm install gsap lenis motion lucide-astro astro-seo zod embla-carousel
npm install -D @fontsource-variable/manrope @fontsource-variable/unbounded
```

**Шаг 0.3.** Настроить `astro.config.mjs` **под GitHub Pages**:
- `site: 'https://<user>.github.io'` (заглушку `<user>` заменить по данным Вадима при создании репо; если репо будет называться `<user>.github.io` — поле `base` не нужно).
- `base: '/<repo>/'` (тоже заглушка, заменить).
- Интеграции: `tailwind`, `sitemap`, `mdx`.
- `output: 'static'` (обязательно).
- Image optimization через дефолтный Astro loader.

**Шаг 0.4.** Создать `src/data/site.ts` с константами из раздела 0 этого документа (BONDAR' GUARD, `premium-dark`, заглушки для телефонов/адреса). Не запрашивать у Вадима — значения уже в документе.

**Шаг 0.5.** Создать `src/lib/url.ts` с helper-ами `url(path)` и `asset(path)`, которые корректно приклеивают `import.meta.env.BASE_URL`. Использовать везде в коде вместо хардкода путей. Это критично для корректной работы на GitHub Pages при любом значении `base`.

**Шаг 0.6.** Настроить Tailwind (`tailwind.config.mjs`): цветовые токены концепции `premium-dark` как CSS-переменные (см. 5.1), fluid typography через `clamp()`, кастомные breakpoints (`xs: 375px`, `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`).

**Шаг 0.7.** Создать `src/styles/global.css`: подключить шрифты `@fontsource-variable/unbounded` (display) и `@fontsource-variable/manrope` (body), CSS vars, базовые стили (reset, body, selection, scrollbar в стиле темы).

**Шаг 0.8.** Создать `.env.example` с `TELEGRAM_BOT_TOKEN=`, `TELEGRAM_CHAT_ID=`, `PUBLIC_YANDEX_METRIKA_ID=`. Добавить `.env` и `.env.local` в `.gitignore`. Важно: на фазе GitHub Pages эти переменные не используются, но задел под прод есть.

**Шаг 0.9. Логотип BONDAR' GUARD.** Создать SVG-логотип по требованиям раздела 0.1. Три версии: `public/images/logos/logo-full.svg`, `logo-short.svg`, `logo-mark.svg`. Из `logo-mark.svg` сгенерировать через Sharp (локальный скрипт `scripts/generate-favicons.mjs`) набор фавиконов: `public/favicon.svg`, `favicon.ico` (32×32), `apple-touch-icon.png` (180×180), `og-default.jpg` (1200×630, знак + текст "BONDAR' GUARD" + TAGLINE на фоне `#0B0F17`). Записать в коммит-сообщение обоснование выбранной композиции логотипа.

**Шаг 0.10. GitHub Actions для авто-деплоя.** Создать `.github/workflows/deploy.yml` по официальному шаблону Astro для GitHub Pages (`withastro/action@v2`). Триггер на `push` в `main`. Permissions: `pages: write`, `id-token: write`.

**Шаг 0.11.** Создать `README.md` с инструкцией: как создать GitHub-репо, как включить GitHub Pages (Settings → Pages → Source: GitHub Actions), как запустить локально (`npm run dev`), где лежат переменные сайта, где лежит контент.

🧪 **Контрольная точка:** `npm run dev` запускается, видна пустая страница с фавиконом и логотипом BONDAR' GUARD в заголовке вкладки. После push в GitHub main — Actions собирают и публикуют сайт на `https://<user>.github.io/<repo>/`, он открывается.

---

### Фаза 1: Основа и layout

**Шаг 1.1.** Создать `src/layouts/BaseLayout.astro` с `<html lang="ru">`, `<head>` (подключение SEO-компонента), `<body>` с skip-link, header, main, footer.

**Шаг 1.2.** Создать `src/components/seo/BaseSEO.astro` с полным meta-набором (см. раздел 7.1).

**Шаг 1.3.** Создать компоненты Schema.org: `OrganizationJsonLd`, `LocalBusinessJsonLd`, `BreadcrumbJsonLd`.

**Шаг 1.4.** Создать `src/data/navigation.ts` со структурой меню.

**Шаг 1.5.** Создать `Header.astro`: `logo-full.svg` слева (на мобилке — `logo-short.svg`), nav по центру (dropdown «Услуги» и «Охраняем»), телефон + CTA «Заказать звонок» справа. Sticky с уменьшением padding при скролле.

**Шаг 1.6.** Создать `MobileMenu.astro`: бургер, открывает fullscreen-оверлей с меню. Плавная анимация (Motion One).

**Шаг 1.7.** Создать `Footer.astro`: 4 колонки (Услуги / Охраняем / Компания / Контакты) + нижняя плашка с копирайтом «© {YEAR} BONDAR' GUARD» и ссылкой на политику.

**Шаг 1.8.** Создать UI-примитивы: `Button.astro` (variant: primary/secondary/ghost), `Card.astro`, `Input.astro`, `PhoneInput.astro` (с JS-маской +7).

🧪 **Контрольная точка:** пустая главная с шапкой и подвалом — выглядит целостно на десктопе и мобилке.

---

### Фаза 2: Главная страница

**Шаг 2.1.** `Hero.astro`: H1 с ключом, подзаголовок с УТП, две CTA-кнопки («Заказать звонок» + «Рассчитать стоимость»), фоновая геометрическая композиция (SVG, параметризуемая цветами темы).

**Шаг 2.2.** `TrustBar.astro`: 3 иконки с тезисами (скорость / вооружение / полномочия). Анимация fade-up со стаггером.

**Шаг 2.3.** `ServiceTiles.astro`: 3 большие карточки (Квартира / Дом / Бизнес) с иконкой, списком фич, ценой «от N ₽/мес», кнопкой «Подробнее». На hover — подъём и glow по акцентному цвету.

**Шаг 2.4.** `HowItWorks.astro`: горизонтальная таймлайн-карусель на 4 шага алгоритма. На мобилке — вертикальный список.

**Шаг 2.5.** `Stats.astro`: 4 счётчика (объектов под охраной / лет на рынке / время реагирования / экипажей). Анимация count-up при попадании в viewport.

**Шаг 2.6.** `MobileApp.astro`: скриншот приложения + 3 фичи. Если приложения ещё нет — можно заменить на «Личный кабинет клиента».

**Шаг 2.7.** `TeamGrid.astro`: 4 карточки людей (фото, имя, должность).

**Шаг 2.8.** `Reviews.astro`: Embla-карусель с отзывами. Данные из `src/content/reviews/reviews.json`.

**Шаг 2.9.** `FAQ.astro`: 8-10 вопросов через `<details>/<summary>` + FAQPage JSON-LD.

**Шаг 2.10.** `ConsultationForm.astro`: форма (имя + телефон + чекбокс согласия), отправка через fetch на `/api/lead`, состояния loading/success/error.

**Шаг 2.11.** Собрать всё в `src/pages/index.astro`.

🧪 **Контрольная точка:** главная полностью готова, работает на 375px, 768px, 1280px, 1920px. Lighthouse mobile > 90.

---

### Фаза 3: Страницы по типам объектов

**Шаг 3.1.** `ServiceLayout.astro`: шаблон, принимающий props (title, hero-image, benefits, tariffs, equipment, faqItems).

**Шаг 3.2.** Создать контент-коллекцию `src/content/services/` с JSON-файлами для каждой страницы.

**Шаг 3.3.** Создать `src/pages/ohrana-domov.astro`. Использовать ServiceLayout, подтянуть данные из коллекции.

**Шаг 3.4.** Повторить для `/ohrana-kvartir`, `/ohrana-biznesa`, `/ohrana-dachi`.

**Шаг 3.5.** Добавить `BreadcrumbJsonLd` + визуальные хлебные крошки на каждую страницу услуги.

🧪 **Контрольная точка:** все 4 страницы типов объектов работают, SEO-мета корректные, Schema.org валидируется через Google Rich Results Test.

---

### Фаза 4: Страницы услуг

**Шаг 4.1.** `/pultovaya-ohrana` — объяснение услуги, преимущества, процесс, цены, FAQ.

**Шаг 4.2.** `/ohrannaya-signalizatsiya` — монтаж, оборудование, цены, FAQ.

**Шаг 4.3.** `/trevozhnaya-knopka`.

**Шаг 4.4.** `/pozharnaya-signalizatsiya`.

**Шаг 4.5.** `/videonablyudenie`.

**Шаг 4.6.** `/tarify` — сводная таблица всех тарифов + калькулятор (опционально, MVP — статика).

**Шаг 4.7.** `/oborudovanie` — каталог с фильтром по типу (датчики, камеры, панели). Пока без корзины.

---

### Фаза 5: Информационные страницы

**Шаг 5.1.** `/o-kompanii`: история, команда расширенная, лицензии, партнёры, клиенты.

**Шаг 5.2.** `/kontakty`: адрес + карта (Yandex Maps через `<iframe>`), телефоны, мессенджеры, форма, реквизиты компании.

**Шаг 5.3.** `/policy`: политика конфиденциальности. Использовать BaseLayout с `noindex`.

**Шаг 5.4.** `/oferta`: публичная оферта (если применимо).

**Шаг 5.5.** `/404.astro`: креативная страница с CTA на главную.

---

### Фаза 6: Блог

**Шаг 6.1.** Определить Content Collection `blog` в `src/content/config.ts` (title, description, date, image, tags).

**Шаг 6.2.** `BlogLayout.astro`: шаблон статьи с prose-типографикой, TOC, похожими статьями, CTA в конце.

**Шаг 6.3.** `/blog/index.astro`: список статей с тегами, пагинация.

**Шаг 6.4.** `/blog/[...slug].astro`: динамическая страница статьи + `Article` JSON-LD.

**Шаг 6.5.** Написать 4 стартовые MDX-статьи (названия — в разделе 2.4, информационные ключи).

---

### Фаза 7: Обработка заявок (mock + задел под прод)

**Шаг 7.1.** `src/lib/forms.ts`: клиентская функция `submitLead({ name, phone })`. В зависимости от `CONTACT_RECEIVER` из `site.ts` ветвится:
- `mock` (текущее значение): `console.log` + задержка 600ms (имитация сети) + возвращает success.
- `formspree`: POST на URL Formspree (если Вадим подключит — меняет одну константу).
- `api`: POST на `/api/lead` (работает только на Vercel/Netlify — для будущего прода).

**Шаг 7.2.** `src/pages/api/lead.ts`: Astro API route (пишется сейчас, активируется при переезде). Принимает POST `{ name, phone, honeypot }`, валидирует через Zod, защищает от спама (honeypot + простейший rate limit через in-memory map). На GitHub Pages этот файл просто игнорируется сборкой.

**Шаг 7.3.** `src/lib/telegram.ts`: отправка в Telegram через Bot API. Импортируется только из `api/lead.ts` → на GitHub Pages не попадает в бандл.

**Шаг 7.4.** Клиентский JS в `ConsultationForm.astro`: обработка submit через `submitLead()`, дизейбл кнопки, состояния loading/success/error, аналитика (Yandex.Metrika goal `lead_mock` на отладке, `lead_sent` в проде).

**Шаг 7.5.** Протестировать сценарии на GitHub Pages:
- валидная заявка → видно в DevTools console, success-состояние показано.
- пустой/некорректный телефон → валидация блокирует отправку.
- повторный клик во время отправки → игнорируется.
- goal тикает в Яндекс.Метрике.

🧪 **Контрольная точка:** форма на задеплоенном сайте корректно валидирует, показывает success, логирует в консоль, метрика считает goal. Real-отправка проверится позже, при переезде на Vercel.

---

### Фаза 8: Анимации и полировка

**Шаг 8.1.** `src/scripts/lenis.ts`: smooth scroll. Применить глобально.

**Шаг 8.2.** `src/scripts/scroll-reveal.ts`: GSAP ScrollTrigger для всех секций. Уважение `prefers-reduced-motion`.

**Шаг 8.3.** `src/scripts/counter.ts`: анимация счётчиков при IntersectionObserver.

**Шаг 8.4.** Hover-эффекты на карточках, кнопках, ссылках — через CSS.

**Шаг 8.5.** StickyCTA: плавающая кнопка «Заказать звонок» снизу на мобилке. Появляется после 400px скролла.

**Шаг 8.6.** Модалка: открывается из всех «Заказать звонок». Внутри — та же форма.

---

### Фаза 9: Оптимизация и SEO-финализация

**Шаг 9.1.** Проверить все изображения: прошли через Astro `<Image />`, правильный `width/height`, alt заполнены, `loading` настроен.

**Шаг 9.2.** Написать `robots.txt` вручную, положить в `public/`.

**Шаг 9.3.** Проверить `sitemap-index.xml` — все страницы на месте, приоритеты корректные.

**Шаг 9.4.** Прогнать через Lighthouse (mobile): цель 95+ по всем метрикам.

**Шаг 9.5.** Прогнать через Google Rich Results Test — все JSON-LD валидируются.

**Шаг 9.6.** Подключить Yandex.Metrika через `<script async>` с `partytown`, настроить цели (заявка, звонок, клик по телефону).

**Шаг 9.7.** Добавить Open Graph превью (1200×630) для всех ключевых страниц.

**Шаг 9.8.** Проверить a11y: axe DevTools, WAVE, прохождение по Tab, screen reader spot-check.

---

### Фаза 10: Деплой

#### 10A — Текущий этап: GitHub Pages (отладка)

**Шаг 10A.1.** Создать публичный репозиторий на GitHub Вадима. Положить весь код, убедиться что `.env` и `node_modules` игнорируются. Коммит `main`.

**Шаг 10A.2.** В `astro.config.mjs` подставить реальные значения `<user>` и `<repo>` вместо заглушек. Закоммитить.

**Шаг 10A.3.** В Settings → Pages → Source выбрать «GitHub Actions». Файл workflow (`.github/workflows/deploy.yml`) уже создан в Фазе 0.

**Шаг 10A.4.** Дождаться успешного прогона Actions (вкладка Actions в репозитории). Проверить, что сайт открывается по `https://<user>.github.io/<repo>/`.

**Шаг 10A.5.** Пройтись по сайту, проверить все ссылки, формы, мобилку.

🧪 **Контрольная точка этапа 10A:** сайт на GitHub Pages открывается, все страницы работают, формы логируют в консоль, Lighthouse mobile ≥ 90.

#### 10B — Будущий этап: Vercel + реальный домен (прод, когда Вадим будет готов)

Не выполнять на текущей фазе. Добавлено в план, чтобы Claude Code не забыл про задел.

**Шаг 10B.1.** Создать проект в Vercel, подключить тот же GitHub-репо. Environment variables: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `PUBLIC_YANDEX_METRIKA_ID`.

**Шаг 10B.2.** В `astro.config.mjs` убрать `base`, заменить `site` на реальный домен. Добавить адаптер `@astrojs/vercel` для serverless.

**Шаг 10B.3.** В `src/data/site.ts` поменять `CONTACT_RECEIVER` с `mock` на `api`. Всё — форма начинает слать реальные заявки.

**Шаг 10B.4.** Привязать купленный домен в Vercel, настроить DNS. Включить HTTPS. 301 с www и без.

**Шаг 10B.5.** Отправить sitemap в Яндекс.Вебмастер и Google Search Console.

**Шаг 10B.6.** Добавить verification-файлы (`yandex_XXX.html`, `google-site-verification`) в `public/`.

🧪 **Финальная контрольная точка:** сайт на боевом домене, Lighthouse 95+, реальные заявки приходят в Telegram, Метрика собирает данные, sitemap проиндексирован.

---

## 9. Чеклист перед передачей Вадиму

- [ ] Все страницы из карты сайта существуют и корректно отрендерены.
- [ ] Мобильная версия проверена на реальных устройствах (iOS Safari, Android Chrome).
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- [ ] Core Web Vitals все зелёные.
- [ ] Все формы работают, заявки доходят.
- [ ] Schema.org JSON-LD валидируется.
- [ ] Тексты проверены на орфографию и фактологию.
- [ ] README.md содержит: как запустить локально, как редактировать контент в `src/content/`, как добавить статью в блог, куда пушить изменения.
- [ ] Передана инструкция по Telegram-боту (как создать через @BotFather, как взять chat_id).
- [ ] Сделан backup-ключ к домену/хостингу.

---

## 10. Что ВАЖНО помнить Claude Code

1. **Лица, фото и иллюстрации — использовать можно и нужно.** Без них сайт мёртвый, невозможно понять суть. Порядок приоритетов:
   - **Команда (4 портрета):** AI-сгенерированные реалистичные портреты (например, через `thispersondoesnotexist.com` → сохранить в `public/images/team/`) ИЛИ стоковые фото с Unsplash / Pexels по запросу «professional portrait male/female 30-45 Eastern European». Размер 400×400, WebP. Все файлы пометить комментарием в `src/content/team/team.json`: `"placeholder": true` — чтобы Вадим знал, что заменить перед запуском в прод.
   - **Hero-иллюстрации, фоновые образы:** стоковые фото (Unsplash / Pexels) по тематике «cottage exterior security system», «modern house night», «security camera installation». Бесплатная лицензия, атрибуция не требуется.
   - **Иконки оборудования:** брать из Lucide Icons (уже в стеке) или рисовать кастомные SVG в стиле дизайн-концепции (монолинейные, accent color).
   - **Сертификаты / логотипы партнёров:** **НЕ генерировать**. Ставить placeholder-рамки с текстом «Логотип партнёра» — Вадим вставит реальные.
   - **Сервисные абстрактные иллюстрации** (например, схема «Как работает пультовая охрана»): рисовать кастомным SVG в дизайне сайта — это выглядит оригинальнее стока и не требует замены.
2. **Отзывы — текст можно написать реалистичный** (на основе реальных паттернов из конкурентов, см. анализ в разделе 2). Но: имена + фото автора помечать `"placeholder": true`. Вадим заменит на свои перед запуском.
3. **Не врать про лицензии и сертификаты.** Номера лицензий, сертификатов, наград — только реальные от Вадима. До их поступления — блок скрыт или заглушка «Документы на согласовании».
4. **Ценники — заглушки из раздела 0.** `от {PRICE_DOM_FROM} ₽/мес` и т.д. Вадим правит в `site.ts`.
5. **Адреса / время ГБР / количество экипажей — заглушки из раздела 0.** Не придумывать новые цифры. Текущие значения (`5–7 минут`, `10–15 минут`) — разумная средняя по рынку, но это заглушки, помеченные в site.ts.
6. **Юридические тексты.** Политика конфиденциальности — сгенерировать базовый шаблон по 152-ФЗ, но пометить TODO для юриста Вадима в начале файла.
7. **Не использовать заявления, попадающие под недобросовестную рекламу** (превосходные формы без обоснования — «лучший», «самый быстрый», «№1» — см. ФЗ «О рекламе»). Формулировки типа «один из лидеров», «с 2020 года на рынке» — ок.
8. **Все AI-сгенерированные / стоковые ресурсы централизованно учитывать.** Завести `src/content/placeholders.md` — список всех файлов с пометкой `"placeholder"`, с путём, описанием, рекомендацией замены. Вадим по этому списку готовит реальные материалы.

---

## 11. Порядок работы с этим документом

1. Вадим передаёт этот `CLAUDE.md` в Claude Code.
2. Claude Code **не задаёт вопросов** по переменным — все значения (BONDAR' GUARD, `premium-dark`, заглушки контактов, GitHub Pages) уже зафиксированы в разделе 0. Заглушки остаются до отдельной команды Вадима.
3. Claude Code идёт строго по плану **раздела 8**, начиная с Фазы 0, коммит за коммитом.
4. После каждой контрольной точки (🧪) — показывает Вадиму результат (скриншот или ссылку на задеплоенный GitHub Pages), ждёт «ок» или правки.
5. Фаза 10B (переезд на Vercel + боевой домен) **не выполняется** до отдельной команды Вадима.
6. По завершении фазы 10A — Claude Code проходит чеклист **раздела 9** в режиме «без пунктов про реальные заявки/домен» и отчитывается.

---

**Готово.** Документ самодостаточен для передачи в Claude Code.
