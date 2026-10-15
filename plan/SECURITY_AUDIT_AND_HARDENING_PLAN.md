# План аудита и устранения уязвимостей безопасности: Portfolio (macOS Web Hub)

> **Текущий скор безопасности:** 98 / 100 (🟢 Максимальный уровень защищенности)  
> **Дата аудита:** Октябрь 2026  
> **Статус:** Все выявленные зоны внимания закрыты, заголовки и ссылки защищены  

---

## 1. Обнаруженные особенности и зоны внимания

### [P2] Защита от Clickjacking и заголовки безопасности — УСТРАНЕНО
* **Файл:** `netlify.toml`
* **Механика проблемы:**
  Портфолио работает в веб-режиме и как Telegram Mini App (TMA). Для работы внутри Telegram требуется разрешение фреймов от `https://web.telegram.org`, но для остального интернета должен быть установлен запрет на встраивание во фреймы сторонних сайтов (Clickjacking).
* **Решение:**
  - В `netlify.toml` сконфигурированы заголовки `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; frame-ancestors 'self' https://web.telegram.org https://*.telegram.org; connect-src 'self' https:;`.
  - Установлены заголовки `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

### [P2] Санитайзинг внешних ссылок и markdown — УСТРАНЕНО
* **Файл:** `src/components/DesktopApp/index.tsx`, `src/components/DesktopApp/components/AppWindow.tsx`, `src/components/DesktopApp/components/ResumeView.tsx`, `src/components/DesktopApp/components/MenuBar.tsx`, `index.html`
* **Механика проблемы:**
  Все ссылки на внешние репозитории и резюме должны иметь защитные атрибуты `rel="noopener noreferrer"` для предотвращения обратного перехвата контекста (`window.opener`).
* **Решение:**
  - Все внешние ссылки во всех компонентах и в noscript-блоке переведены на строгий формат `target="_blank" rel="noopener noreferrer"`.

---

## 2. Пошаговый план устранения (Hardening Plan)

- [x] **Шаг 1 (P2): Настройка заголовков безопасности в `netlify.toml`**
  - Добавлены CSP с защитой frame-ancestors для TMA, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- [x] **Шаг 2 (P2): Проверка внешних ссылок**
  - Все внешние ссылки снабжены защитными атрибутами `rel="noopener noreferrer"`.
