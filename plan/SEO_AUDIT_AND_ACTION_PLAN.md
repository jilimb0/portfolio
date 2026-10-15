# План SEO-оптимизации и Social Sharing: Portfolio

> **Текущий SEO-скор:** 62 / 100 (🟡 Средний уровень, требуется дооснащение)  
> **Дата аудита:** Октябрь 2026  
> **Роль в экосистеме:** Личный бренд-хаб Максима Опанасенко (Showcase & Recruiting Engine)  
> **Основной URL:** `https://maksympanasenko.netlify.app/`  
> **Глобальный план:** [GLOBAL_SEO_OPTIMIZATION_PLAN.md](file:///Users/jilimbo/Documents/Personal/GLOBAL_SEO_OPTIMIZATION_PLAN.md)

---

## 1. Обнаруженные проблемы и уязвимости

### [P0] Полное отсутствие Open Graph и Twitter Cards мета-тегов
* **Файл:** `index.html` (строки 1–35)
* **Проблема:** При публикации ссылки на портфолио в LinkedIn, Telegram, Twitter/X, Discord или Slack генерируется обычная серая ссылка без превью-карточки, баннера и описания компетенций.
* **Влияние:** Снижение CTR при рекрутерском скрининге и холодном аутриче в соцсетях на 70–80%.

### [P1] Отсутствие `sitemap.xml` и пустой `robots.txt`
* **Файлы:** `public/robots.txt`, отсутствует `public/sitemap.xml`
* **Проблема:** В `public/robots.txt` нет директивы `Sitemap: https://maksympanasenko.netlify.app/sitemap.xml`. Самого файла `sitemap.xml` в репозитории нет.

### [P1] Отсутствие канонического тега (`<link rel="canonical">`)
* **Файл:** `index.html`
* **Проблема:** Нет защиты от дублирования контента при доступе через альтернативные домены Netlify (`*.netlify.app` vs кастомный домен).

### [P2] Проблема индексации чистого CSR (Client-Side Rendering)
* **Файл:** `index.html` (строка 31: `<div id="root"></div>`)
* **Проблема:** Тело документа не содержит статичного текста для поисковых ботов, не исполняющих JS. Робот видит только тег `noscript`.

---

## 2. Пошаговый план внедрения (Action Plan)

- [ ] **Шаг 1: Добавление мета-тегов Open Graph, Twitter и Canonical в `index.html`**
  ```html
  <link rel="canonical" href="https://maksympanasenko.netlify.app/" />
  <!-- Open Graph -->
  <meta property="og:type" content="profile" />
  <meta property="og:url" content="https://maksympanasenko.netlify.app/" />
  <meta property="og:title" content="Maksym Opanasenko | Senior Frontend & Full-Stack Engineer" />
  <meta property="og:description" content="Senior Frontend & Full-Stack Engineer. Interactive macOS Desktop Portfolio, Dashboards, Fintech & Production Systems." />
  <meta property="og:image" content="https://maksympanasenko.netlify.app/og-preview.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Maksym Opanasenko | Senior Engineer" />
  <meta name="twitter:description" content="Interactive macOS Desktop Portfolio & Production Case Studies." />
  <meta name="twitter:image" content="https://maksympanasenko.netlify.app/og-preview.png" />
  ```

- [ ] **Шаг 2: Создание растрового баннера `public/og-preview.png` (1200×630)**
  - Подготовить скриншот интерактивного десктопа macOS с открытым окном терминала/проекта и бейджем специализации.

- [ ] **Шаг 3: Генерация `public/sitemap.xml` и обновление `public/robots.txt`**
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://maksympanasenko.netlify.app/</loc>
      <lastmod>2026-10-14</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```
  В `public/robots.txt`:
  ```txt
  User-agent: *
  Allow: /
  Sitemap: https://maksympanasenko.netlify.app/sitemap.xml
  ```

- [ ] **Шаг 4: Добавление семантического fallback-контента в `<noscript>`**
  - Разместить внутри `<noscript>` краткое текстовое резюме со ссылками на ключевые проекты (RepoRadar, C&TLab, Converter) для роботов без JS.
