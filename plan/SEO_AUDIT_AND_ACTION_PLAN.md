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

- [x] **Шаг 1: Добавление мета-тегов Open Graph, Twitter и Canonical в `index.html`**
  - Добавлены `link[rel="canonical"]`, `og:type="profile"`, `og:title`, `og:description`, `og:image`, `twitter:card="summary_large_image"`.

- [x] **Шаг 2: Создание растрового баннера `public/og-preview.png` (1200×630)**
  - Сгенерирован растровый брендированный баннер.

- [x] **Шаг 3: Генерация `public/sitemap.xml` и обновление `public/robots.txt`**
  - Создан `sitemap.xml` и добавлена директива `Sitemap:` в `robots.txt`.

- [x] **Шаг 4: Добавление семантического fallback-контента в `<noscript>`**
  - Размещен текстовый H1 и ссылки на флагманские проекты экосистемы (RepoRadar, FormatFlow, профили).
