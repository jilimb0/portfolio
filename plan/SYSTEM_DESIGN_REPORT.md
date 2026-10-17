# Отчет о внедрении System Design и архитектурной устойчивости: Portfolio

> **Статус:** Имплементировано  
> **Область:** PWA Service Worker (Stale-While-Revalidate & Cache-First), Edge CDN Caching Headers, Fast LCP Preloading  
> **Дата аудита и внедрения:** Октябрь 2026

---

## 1. Контекст и архитектурные вызовы

`Portfolio` — интерактивный macOS-хаб, демонстрирующий экосистему проектов и технический стек.
Ранее:
1. **LCP задержка:** Загрузка ключевого аватара/логотипа происходила последовательно после разбора DOM без ранней предварительной загрузки (preload).
2. **Отсутствие кэширования в Service Worker для ассетов:** Старый воркер кэшировал только корень `/`, из-за чего при повторных визитах и оффлайне JS/CSS и изображения не были доступны.
3. **Отсутствие Edge-заголовков неизменяемости:** Сборки Vite генерируют контентно-хешированные файлы (`/assets/*-[hash].js`), для которых необходимы заголовки `Cache-Control: public, max-age=31536000, immutable`.

---

## 2. Реализованные архитектурные решения

### 2.1. Современный PWA Service Worker (`public/sw.js`)
* **Пре-кэширование критического бандла:**
  - Корневые документы: `/`, `/index.html`, `/manifest.json`, `/logo.webp`, `/og-preview.png`, `/robots.txt`, `/sitemap.xml`.
* **Стратегии обработки сетевых запросов:**
  - **Навигация (HTML):** Network-First с fallback на кэшированный `/index.html` при отсутствии сети.
  - **Статические ассеты (`/assets/*`, `.webp`, `.png`, `.svg`, `.css`, `.js`, шрифты):** Cache-First с фоновым Stale-While-Revalidate обновлением.
  - **Автоматическая ротация версий:** Активация нового кэша `portfolio-static-v2` и `portfolio-runtime-v2` с удалением устаревших кэшей и немедленным захватом клиентов (`clients.claim()`).

### 2.2. Заголовки Edge CDN в Netlify (`netlify.toml`)
* Для версионированных ассетов:
  ```toml
  [[headers]]
    for = "/assets/*"
    [headers.values]
      Cache-Control = "public, max-age=31536000, immutable"
  ```
* Для входных точек (`/sw.js` и `/index.html`):
  `Cache-Control = "public, max-age=0, must-revalidate"` для предотвращения устаревания версий в CDN.

### 2.3. Быстрый LCP (`index.html`)
* Добавлен тег `<link rel="preload" href="/logo.webp" as="image" type="image/webp" />` в `<head>` для немедленной загрузки логотипа до парсинга стилей.

---

## 3. Результаты верификации

* **Тесты:** 48/48 тестов успешно пройдены (`vitest run`).
* **Linter & Formatter:** Biome check без ошибок (`biome check .`).
* **TypeScript & Build:** `tsc --noEmit` и `vite build` без ошибок, успешная генерация сборки.
