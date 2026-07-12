import type { RefObject } from "react"
import logo from "../../../assets/logo.webp"
import type {
  IconSize,
  MenuLabel,
  ProjectFilter,
} from "../../../types/portfolio"
import s from "../style.module.css"

const MENU_LABELS: MenuLabel[] = [
  "Portfolio",
  "File",
  "Filter",
  "View",
  "Window",
]

const FILTER_OPTIONS: ProjectFilter[] = [
  "All",
  "Commercial",
  "Featured",
  "Client",
  "Open Source",
  "Tools",
  "Pet",
]

const CONTACT_LINKS = [
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/MaksymOp",
    title: "Message on Telegram",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maksym-opanasenko-06b028199/?locale=en",
    title: "LinkedIn Profile",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:opanasenko.mo@gmail.com",
    title: "Send Email",
  },
  {
    id: "npm",
    label: "npm",
    href: "https://www.npmjs.com/~jilimb0",
    title: "npm Packages",
  },
] as const

interface MenuBarProps {
  menuRef: RefObject<HTMLElement | null>
  now: string
  openMenu: MenuLabel | null
  setOpenMenu: React.Dispatch<React.SetStateAction<MenuLabel | null>>
  onOpenAbout: () => void
  onResetLayout: () => void
  onSetIconSize: (size: IconSize) => void
  onCloseWindow: () => void
  projectFilter: ProjectFilter
  setProjectFilter: React.Dispatch<React.SetStateAction<ProjectFilter>>
}

export default function MenuBar({
  menuRef,
  now,
  openMenu,
  setOpenMenu,
  onOpenAbout,
  onResetLayout,
  onSetIconSize,
  onCloseWindow,
  projectFilter,
  setProjectFilter,
}: MenuBarProps) {
  const isOpen = (label: MenuLabel) => openMenu === label

  const toggleMenu = (label: MenuLabel) => {
    setOpenMenu((prev) => (prev === label ? null : label))
  }

  return (
    <header className={s.menuBar} ref={menuRef}>
      <div className={s.menuLeft}>
        <button
          className={s.appleButton}
          type="button"
          onClick={onOpenAbout}
          aria-label="Open About Me"
        >
          <img src={logo} alt="Portfolio logo" className={s.appleLogo} />
        </button>

        {MENU_LABELS.map((label) => (
          <div className={s.menuGroup} key={label}>
            <button
              className={s.menuItem}
              type="button"
              aria-expanded={isOpen(label)}
              onClick={() => toggleMenu(label)}
            >
              {label}
            </button>

            {isOpen(label) && label === "Portfolio" && (
              <div className={s.menuPanel}>
                <button
                  className={s.menuPanelItem}
                  type="button"
                  onClick={onOpenAbout}
                >
                  Open About Me
                </button>
              </div>
            )}

            {isOpen(label) && label === "File" && (
              <div className={s.menuPanel}>
                <button
                  className={s.menuPanelItem}
                  type="button"
                  onClick={onOpenAbout}
                >
                  Open About Me
                </button>
                <button
                  className={s.menuPanelItem}
                  type="button"
                  onClick={onResetLayout}
                >
                  Reset Icon Layout
                </button>
              </div>
            )}

            {isOpen(label) && label === "Filter" && (
              <div className={s.menuPanel}>
                {FILTER_OPTIONS.map((filter) => (
                  <button
                    key={filter}
                    className={s.menuPanelItem}
                    style={
                      projectFilter === filter ? { fontWeight: "bold" } : {}
                    }
                    type="button"
                    onClick={() => {
                      setProjectFilter(filter)
                      setOpenMenu(null)
                    }}
                  >
                    {projectFilter === filter ? `✓ ${filter}` : filter}
                  </button>
                ))}
              </div>
            )}

            {isOpen(label) && label === "View" && (
              <div className={s.menuPanel}>
                <button
                  className={s.menuPanelItem}
                  type="button"
                  onClick={() => onSetIconSize("small")}
                >
                  Icon Size: Small
                </button>
                <button
                  className={s.menuPanelItem}
                  type="button"
                  onClick={() => onSetIconSize("medium")}
                >
                  Icon Size: Medium
                </button>
                <button
                  className={s.menuPanelItem}
                  type="button"
                  onClick={() => onSetIconSize("large")}
                >
                  Icon Size: Large
                </button>
              </div>
            )}

            {isOpen(label) && label === "Window" && (
              <div className={s.menuPanel}>
                <button
                  className={s.menuPanelItem}
                  type="button"
                  onClick={onCloseWindow}
                >
                  Close Active Window
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={s.menuRight}>
        <nav className={s.menuContactLinks} aria-label="Contact links">
          {CONTACT_LINKS.map(({ id, label, href, title }) => (
            <a
              key={id}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className={s.menuContactLink}
              title={title}
            >
              {label}
            </a>
          ))}
        </nav>

        <span className={s.menuDivider} />
        <span className={s.menuClock}>{now}</span>
      </div>
    </header>
  )
}
