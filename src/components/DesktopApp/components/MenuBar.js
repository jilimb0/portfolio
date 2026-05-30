import PropTypes from "prop-types"
import logo from "../../../assets/logo.webp"
import s from "../style.module.css"

const MENU_LABELS = ["Portfolio", "File", "View", "Window"]

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
]

export default function MenuBar({
  menuRef,
  now,
  openMenu,
  setOpenMenu,
  onOpenAbout,
  onResetLayout,
  onSetIconSize,
  onCloseWindow,
}) {
  const isOpen = (label) => openMenu === label

  const toggleMenu = (label) => {
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
        {/* Contact links */}
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

        {/* Divider + clock */}
        <span className={s.menuDivider} />
        <span className={s.menuClock}>{now}</span>
      </div>
    </header>
  )
}

MenuBar.propTypes = {
  menuRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  now: PropTypes.string.isRequired,
  openMenu: PropTypes.string,
  setOpenMenu: PropTypes.func.isRequired,
  onOpenAbout: PropTypes.func.isRequired,
  onResetLayout: PropTypes.func.isRequired,
  onSetIconSize: PropTypes.func.isRequired,
  onCloseWindow: PropTypes.func.isRequired,
}
