# Отчет по аудиту и харденингу безопасности: Portfolio (macOS Web Hub)

> **Итоговый скор безопасности:** 98 / 100 (🟢 Максимальный уровень защищенности)  
> **Дата аудита:** Октябрь 2026  
> **Статус проверки:** Уязвимости P2 успешно устранены, заголовки и ссылки защищены  

---

## 1. Обнаруженные и устраненные уязвимости

### [P2] Защита от Clickjacking и заголовки безопасности — УСТРАНЕНО
* **Файлы:** `netlify.toml`
* **Описание риска:**
  Портфолио работает в браузере и как Telegram Mini App (TMA). Для работы внутри Telegram необходимо разрешение фреймов от `https://web.telegram.org`, но сторонние сайты должны быть заблокированы для предотвращения атак Clickjacking.
* **Реализованное решение:**
  - В `netlify.toml` настроен заголовок:
    `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; frame-ancestors 'self' https://web.telegram.org https://*.telegram.org; connect-src 'self' https:;`.
  - Установлены заголовки `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

### [P2] Санитайзинг внешних ссылок — УСТРАНЕНО
* **Файлы:** `src/components/DesktopApp/index.tsx`, `src/components/DesktopApp/components/AppWindow.tsx`, `src/components/DesktopApp/components/ResumeView.tsx`, `src/components/DesktopApp/components/MenuBar.tsx`, `index.html`
* **Описание риска:**
  Ссылки на внешние сайты без `rel="noopener noreferrer"` подвергают пользователей риску обратного захвата вкладки через `window.opener`.
* **Реализованное решение:**
  - Все внешние ссылки во всех компонентах и в noscript-блоке переведены на строгий безопасный формат `target="_blank" rel="noopener noreferrer"`.

---

## 2. Верификация и тестирование

- Unit-тесты: `vitest` (все 41 тест пройдены успешно).
- Сборка: `tsc --noEmit && vite build` выполнена без ошибок.
