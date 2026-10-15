# План миграции Portfolio на кор-технологии (@tgwrapper & @ui-construction-library)

> **Проект:** `portfolio`  
> **Роль в экосистеме:** Центральная витрина основателя и интерактивный macOS-десктоп проектов  
> **Приоритет миграции:** 🌟 **Brand Hub (Средний)**  

---

## 1. Текущий технологический срез (As-Is)

### Telegram & TMA:
* **Что используется сейчас:** Портфолио работает как веб-приложение на Netlify. Прямой интеграции с Telegram нет (ссылки на Telegram ведут на профиль).
* **Потенциал кор-стека:** Запуск портфолио в виде Telegram Mini App прямо внутри мессенджера для мгновенного показа рекрутерам и клиентам в Telegram.

### Web & UI:
* **Что используется сейчас:** React 19, TypeScript, Vite 6, Biome 2.5, кастомные CSS-модули (`*.module.css`) для симуляции окна macOS Sequoia, дока и верхнего меню.
* **Статус `@ui-construction-library`:** ❌ Не установлена (0 компонентов).

---

## 2. Целевая архитектура (To-Be)

1. **Внедрение `@ui-construction-library` внутри окон приложений:**
   - Внешний оконный каркас macOS (рамки, кнопки закрытия/сворачивания, строка меню, док) сохраняет нативный стиль macOS.
   - Все внутренности окон — виджет **"Project Audit"**, окно **"About Me"**, карточки проектов в каталоге и новый **"Resume View"** — строятся на базе компонентов `@ui-construction-library/core@0.9.0` и иконок `@ui-construction-library/icons@0.6.0`.
2. **Поддержка Telegram Mini App через `@tgwrapper/tma`:**
   - Адаптация портфолио для открытия в качестве TMA (`t.me/FounderPortfolioBot/app`) с авто-подгонкой высоты viewport под мобильный экран.

---

## 3. Пошаговый план перехода

### Шаг 1. Подключение зависимостей
- [x] Добавить в `package.json`:
  ```json
  "dependencies": {
    "@ui-construction-library/core": "^0.9.0",
    "@ui-construction-library/icons": "^0.6.0",
    "@ui-construction-library/tokens": "^0.6.0"
  }
  ```

### Шаг 2. Миграция оконного контента
- [x] **Окно «Project Audit» & Case Study (`src/components/DesktopApp/components/AppWindow.tsx`):**
  - Заменены метрики тестов и Lighthouse на `Card`, `Badge`, `Progress`.
  - Действия переведены на `Button` (Primary / Outline / Ghost).
- [x] **Окно «About Me» & Контакты:**
  - Использован `Button` для скачивания резюме и связи в Telegram/GitHub/GitLab.
- [x] **Классический режим резюме (Resume View):**
  - Собрана адаптивная вёрстка на базе `Card`, `Badge` (стек технологий), `Progress`, `Button` из `@ui-construction-library/core` и иконки `@ui-construction-library/icons`.

### Шаг 3. TMA-оптимизация
- [x] Добавить детекцию открытия внутри Telegram WebApp (`window.Telegram?.WebApp`).
- [x] Автоматически инициализировать WebApp (`ready()`, `expand()`) и переключать десктоп в полноэкранный Showcase View при открытии в Telegram или по параметру `?view=resume`.

### Шаг 4. Верификация
- [x] Прогон `pnpm run lint` (`biome check .`).
- [x] Прогон `pnpm run typecheck` (`tsc --noEmit`).
- [x] Прогон `pnpm run test` (все 41 тестов Vitest пройдены).
- [x] Проверка сборки: `pnpm run build`.

---

## 4. Оценка трудоёмкости
* **UI-слой:** 1.5 дня (наполнение окон компонентами библиотеки + Resume View).
* **TMA-слой:** 0.5 дня (поддержка мобильного запуска).
* **Суммарно:** 2 рабочих дня.
