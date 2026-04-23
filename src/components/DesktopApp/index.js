import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import admin from "../../assets/admin.webp"
import catlabpos from "../../assets/catlab-pos-screen.webp"
import indaapp from "../../assets/indaapp.webp"
import indulgence from "../../assets/indulgence.webp"
import logo from "../../assets/logo.webp"
import pokemon from "../../assets/pokemon.webp"
import serviceapp from "../../assets/service-app-screen.webp"
import stopcheck from "../../assets/stopcheck.webp"
import weather from "../../assets/weather.webp"
import portfolioDb from "../../portfolio-db.json"
import bg1 from "../MainSection/img/1.webp"
import bg2 from "../MainSection/img/2.webp"
import bg3 from "../MainSection/img/3.webp"
import bg4 from "../MainSection/img/4.webp"
import s from "./style.module.css"

const imageById = {
  admin,
  indaapp,
  indulgence,
  pokemon,
  serviceapp,
  stopcheck,
  weather,
  catlabpos,
}

const appTiles = [
  {
    id: "about",
    name: "About Me",
    descr:
      "Frontend engineer building product-focused interfaces with React and modern CSS. Open to collaboration and freelance opportunities.",
    ghLink: "https://github.com/jilimb0",
    link: "",
    icon: logo,
  },
  ...Object.values(portfolioDb).map((item) => ({
    ...item,
    icon: imageById[item.id] || item.iconUrl || logo,
  })),
]

const MENU_LABELS = ["Portfolio", "File", "View", "Window"]
const POSITION_KEY = "portfolio.desktop.iconPositions.v1"
const ICON_SIZE_KEY = "portfolio.desktop.iconSize.v1"
const GRID_STEP = 22
const HEADER_SAFE_TOP = 54

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function snap(value) {
  return Math.round(value / GRID_STEP) * GRID_STEP
}

function getDefaultPositions(items, width) {
  const itemBox = 120
  const cols = Math.max(1, Math.floor((width - 40) / itemBox))

  return items.reduce((acc, tile, index) => {
    const col = index % cols
    const row = Math.floor(index / cols)
    acc[tile.id] = {
      x: 20 + col * itemBox,
      y: HEADER_SAFE_TOP + row * itemBox,
    }
    return acc
  }, {})
}

function MenuBar({
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
        <span>{now}</span>
      </div>
    </header>
  )
}

function AppWindow({ tile, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    if (tile) {
      setIframeLoaded(false)
    }
  }, [tile])

  if (!tile) return null

  const hasLiveLink = Boolean(tile.link)
  const canEmbedLivePreview = hasLiveLink && !tile.embedBlocked

  return (
    <section className={s.windowLayer}>
      <button
        type="button"
        className={s.windowBackdrop}
        onClick={onClose}
        aria-label="Close window"
      />
      <article
        className={s.window}
        role="dialog"
        aria-label={`${tile.name} window`}
      >
        <div className={s.windowBar}>
          <div className={s.windowControls}>
            <button
              className={`${s.control} ${s.controlClose}`}
              type="button"
              onClick={onClose}
              aria-label="Close window"
            />
            <span className={`${s.control} ${s.controlMin}`} />
            <span className={`${s.control} ${s.controlMax}`} />
          </div>
          <h2 className={s.windowTitle}>{tile.name}</h2>
        </div>

        <div className={s.windowBody}>
          <div className={s.windowPreviewWrap}>
            {canEmbedLivePreview ? (
              <>
                <div className={s.iframeLoading} data-loaded={iframeLoaded}>
                  <span className={s.spinner} />
                </div>
                <iframe
                  className={s.windowIframe}
                  src={tile.link}
                  title={`${tile.name} live preview`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={() => setIframeLoaded(true)}
                />
                {/* Fallback image for mobile (iframe is hidden via CSS) */}
                <img
                  className={s.windowPreview}
                  src={tile.icon}
                  alt={tile.name}
                  style={{ position: "absolute", inset: 0 }}
                />
              </>
            ) : (
              <>
                <img
                  className={s.windowPreview}
                  src={tile.icon}
                  alt={tile.name}
                />
                {hasLiveLink && tile.embedBlocked && (
                  <div className={s.embedNotice}>
                    Live preview is blocked by this site. Use Open App.
                  </div>
                )}
              </>
            )}
          </div>
          <div className={s.windowInfo}>
            <p>{tile.descr}</p>
            <div className={s.actions}>
              {tile.link && (
                <a
                  href={tile.link}
                  target="_blank"
                  rel="noreferrer"
                  className={s.actionBtn}
                >
                  Open App
                </a>
              )}
              {tile.ghLink && (
                <a
                  href={tile.ghLink}
                  target="_blank"
                  rel="noreferrer"
                  className={s.actionBtnGhost}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

function DesktopDock({ items, onOpen, activeId }) {
  const [mouseX, setMouseX] = useState(null)
  const itemRefs = useRef([])

  return (
    <footer
      className={`${s.dock} ${mouseX === null ? s.dockIdle : ""}`}
      role="toolbar"
      aria-label="Application dock"
      onMouseMove={(event) => setMouseX(event.clientX)}
      onMouseLeave={() => setMouseX(null)}
    >
      {items.map((tile, index) => {
        const element = itemRefs.current[index]
        const rect = element?.getBoundingClientRect()
        const centerX = rect ? rect.left + rect.width / 2 : null

        const influenceRadius = 220
        const distance =
          centerX === null || mouseX === null
            ? influenceRadius
            : Math.abs(mouseX - centerX)
        const normalized = Math.max(0, 1 - distance / influenceRadius)
        const eased = normalized * normalized
        const scale = 1 + eased * 0.22 + (activeId === tile.id ? 0.015 : 0)
        const lift = -(eased * 12 + (activeId === tile.id ? 1 : 0))

        return (
          <Fragment key={tile.id}>
            <button
              type="button"
              className={`${s.dockItem} ${activeId === tile.id ? s.dockItemActive : ""}`}
              onClick={() => onOpen(tile.id)}
              onFocus={(event) => {
                const targetRect = event.currentTarget.getBoundingClientRect()
                setMouseX(targetRect.left + targetRect.width / 2)
              }}
              onBlur={() => setMouseX(null)}
              data-label={tile.name}
              aria-label={tile.name}
              style={{
                "--dock-scale": scale.toFixed(3),
                "--dock-lift": `${lift.toFixed(2)}px`,
              }}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
            >
              <img src={tile.icon} alt="" />
            </button>
            {index === 0 && (
              <span className={s.dockDivider} aria-hidden="true" />
            )}
          </Fragment>
        )
      })}
    </footer>
  )
}

export default function DesktopApp() {
  const canvasRef = useRef(null)
  const dragRef = useRef(null)
  const menuRef = useRef(null)

  const [activeId, setActiveId] = useState(null)
  const [now, setNow] = useState("")
  const [openMenu, setOpenMenu] = useState(null)
  const [positionsInitialized, setPositionsInitialized] = useState(false)
  const [iconSize, setIconSize] = useState(() => {
    if (typeof window === "undefined") return "medium"
    return localStorage.getItem(ICON_SIZE_KEY) || "medium"
  })
  const [systemTheme, setSystemTheme] = useState(() => {
    if (typeof window === "undefined") return "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })
  const [iconPositions, setIconPositions] = useState({})
  const desktopTiles = useMemo(
    () => appTiles.filter((tile) => tile.id !== "about"),
    [],
  )

  useEffect(() => {
    const updateClock = () => {
      setNow(
        new Date().toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }

    updateClock()
    const timer = setInterval(updateClock, 1000 * 30)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem(POSITION_KEY)
    const fallback = getDefaultPositions(desktopTiles, window.innerWidth)
    if (!stored) {
      setIconPositions(fallback)
      setPositionsInitialized(true)
      return
    }

    try {
      const parsed = JSON.parse(stored)
      setIconPositions({ ...fallback, ...parsed })
    } catch {
      setIconPositions(fallback)
    }
    setPositionsInitialized(true)
  }, [desktopTiles])

  useEffect(() => {
    localStorage.setItem(ICON_SIZE_KEY, iconSize)
  }, [iconSize])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => {
      setSystemTheme(media.matches ? "dark" : "light")
    }

    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!positionsInitialized) return
    localStorage.setItem(POSITION_KEY, JSON.stringify(iconPositions))
  }, [iconPositions, positionsInitialized])

  useEffect(() => {
    const closeMenu = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpenMenu(null)
      }
    }

    window.addEventListener("click", closeMenu)
    return () => window.removeEventListener("click", closeMenu)
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveId(null)
        setOpenMenu(null)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    const onMove = (event) => {
      if (!dragRef.current || !canvasRef.current) return

      const drag = dragRef.current
      if (drag.pointerId !== event.pointerId) return

      const canvasRect = canvasRef.current.getBoundingClientRect()
      const nextX = event.clientX - canvasRect.left - drag.offsetX
      const nextY = event.clientY - canvasRect.top - drag.offsetY

      const maxX = canvasRect.width - drag.width
      const maxY = canvasRect.height - drag.height

      const clampedX = clamp(nextX, 0, maxX)
      const clampedY = clamp(nextY, HEADER_SAFE_TOP, maxY)

      if (
        Math.abs(event.clientX - drag.startClientX) > 4 ||
        Math.abs(event.clientY - drag.startClientY) > 4
      ) {
        drag.moved = true
      }

      setIconPositions((prev) => ({
        ...prev,
        [drag.id]: { x: clampedX, y: clampedY },
      }))
    }

    const onUp = (event) => {
      if (!dragRef.current) return
      const drag = dragRef.current
      if (drag.pointerId !== event.pointerId) return

      dragRef.current = null
      setIconPositions((prev) => {
        const current = prev[drag.id] || { x: 0, y: 0 }
        return {
          ...prev,
          [drag.id]: {
            x: snap(current.x),
            y: snap(current.y),
          },
        }
      })

      if (!drag.moved) {
        setActiveId(drag.id)
      }
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [])

  const activeTile = useMemo(
    () => appTiles.find((tile) => tile.id === activeId) ?? null,
    [activeId],
  )
  const theme = systemTheme

  const wallpaper = useMemo(() => {
    const hour = new Date().getHours()

    if (hour >= 22 || hour < 6) {
      return {
        image: bg4,
        size: "cover",
        position: "center bottom",
      }
    }
    if (hour < 12) {
      return {
        image: bg1,
        size: "cover",
        position: "center bottom",
      }
    }
    if (hour < 18) {
      return {
        image: bg2,
        size: "cover",
        position: "center bottom",
      }
    }
    return {
      image: bg3,
      size: "cover",
      position: "center bottom",
    }
  }, [])

  const resetLayout = () => {
    const width = canvasRef.current?.clientWidth || window.innerWidth
    setIconPositions(getDefaultPositions(desktopTiles, width))
    setOpenMenu(null)
  }

  const openTile = (id) => setActiveId(id)

  const handlePointerDown = (event, tileId) => {
    if (!canvasRef.current) return
    event.preventDefault()

    const tileRect = event.currentTarget.getBoundingClientRect()
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const position = iconPositions[tileId] || {
      x: tileRect.left - canvasRect.left,
      y: tileRect.top - canvasRect.top,
    }

    dragRef.current = {
      id: tileId,
      pointerId: event.pointerId,
      offsetX: event.clientX - (canvasRect.left + position.x),
      offsetY: event.clientY - (canvasRect.top + position.y),
      width: tileRect.width,
      height: tileRect.height,
      moved: false,
      startClientX: event.clientX,
      startClientY: event.clientY,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const iconSizeClass =
    iconSize === "small"
      ? s.iconSmall
      : iconSize === "large"
        ? s.iconLarge
        : s.iconMedium

  return (
    <main
      className={`${s.desktopRoot} ${theme === "light" ? s.themeLight : s.themeDark}`}
      style={{
        backgroundImage: `url(${wallpaper.image})`,
        backgroundSize: wallpaper.size,
        backgroundPosition: wallpaper.position,
      }}
    >
      <MenuBar
        menuRef={menuRef}
        now={now}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        onOpenAbout={() => {
          openTile("about")
          setOpenMenu(null)
        }}
        onResetLayout={resetLayout}
        onSetIconSize={(size) => {
          setIconSize(size)
          setOpenMenu(null)
        }}
        onCloseWindow={() => {
          setActiveId(null)
          setOpenMenu(null)
        }}
      />

      <section
        className={`${s.desktopCanvas} ${s.desktopFree}`}
        ref={canvasRef}
      >
        {desktopTiles.map((tile, index) => {
          const position = iconPositions[tile.id]

          return (
            <button
              key={tile.id}
              type="button"
              className={`${s.iconTile} ${iconSizeClass} ${activeId === tile.id ? s.iconTileActive : ""}`}
              style={{
                left: `${position?.x ?? 20}px`,
                top: `${position?.y ?? HEADER_SAFE_TOP}px`,
                animationDelay: `${index * 80}ms`,
              }}
              onPointerDown={(event) => handlePointerDown(event, tile.id)}
              onDragStart={(event) => event.preventDefault()}
              onKeyDown={(event) => {
                if (event.key === "Enter") openTile(tile.id)
              }}
              onClick={(event) => {
                event.preventDefault()
              }}
            >
              <span className={s.iconFrame}>
                <img
                  src={tile.icon}
                  alt=""
                  draggable={false}
                  style={{
                    objectPosition: tile.iconPosition || "center",
                  }}
                />
              </span>
              <span className={s.iconLabel}>{tile.name}</span>
            </button>
          )
        })}
      </section>

      <DesktopDock items={appTiles} onOpen={openTile} activeId={activeId} />
      <AppWindow tile={activeTile} onClose={() => setActiveId(null)} />
    </main>
  )
}
