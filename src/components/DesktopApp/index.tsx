import { useEffect, useMemo, useRef, useState } from "react"
import admin from "../../assets/admin.webp"
import catlabpos from "../../assets/catlab-pos-screen.webp"
import indaapp from "../../assets/indaapp.webp"
import indulgence from "../../assets/indulgence.webp"
import lifestyleecosystem from "../../assets/lifestyle-ecosystem-screen.webp"
import logo from "../../assets/logo.webp"
import mypersfinbot from "../../assets/mypersfinbot.png"
import pokemon from "../../assets/pokemon.webp"
import serviceapp from "../../assets/service-app-screen.webp"
import stopcheck from "../../assets/stopcheck.webp"
import tgwrapper from "../../assets/tgwrapper.png"
import uilib from "../../assets/uilib.png"
import weather from "../../assets/weather.webp"
import portfolioDb from "../../portfolio-db.json"
import type {
  AppTile,
  DragState,
  IconPositions,
  IconSize,
  MenuLabel,
  PortfolioProject,
  ProjectFilter,
} from "../../types/portfolio"
import { PROJECT_FILTER_CATEGORIES } from "../../types/portfolio"
import { ErrorBoundary } from "../ErrorBoundary"
import bg1 from "../MainSection/img/1.webp"
import bg2 from "../MainSection/img/2.webp"
import bg3 from "../MainSection/img/3.webp"
import bg4 from "../MainSection/img/4.webp"
import AppWindow from "./components/AppWindow"
import DesktopDock from "./components/DesktopDock"
import DesktopIcon from "./components/DesktopIcon"
import MenuBar from "./components/MenuBar"
import { Terminal } from "./components/Terminal"
import s from "./style.module.css"
import { clamp, getDefaultPositions, snap } from "./utils/layout"

const imageById: Record<string, string> = {
  admin,
  indaapp,
  indulgence,
  mypersfinbot,
  pokemon,
  serviceapp,
  stopcheck,
  tgwrapper,
  uilib,
  weather,
  catlabpos,
  lifestyleecosystem,
}

const aboutTile: AppTile = {
  id: "about",
  name: "About Me",
  descr:
    "Frontend engineer focused on product UI, interactive UX, and production-ready frontend architecture.\n3+ Years Production Experience | 10+ Launched Projects\nCore stack: React, JavaScript/TypeScript, modern CSS, REST API integrations, and reusable component systems.\nI build responsive web apps, admin dashboards, and polished portfolio/landing experiences with attention to performance and visual detail.\nOpen to freelance, long-term product collaboration, and frontend consulting.",
  ghLink: "https://github.com/jilimb0",
  gitlabLink: "https://gitlab.com/ofmaos",
  cvLink: "/cv.pdf",
  link: "",
  icon: logo,
}

const terminalTile: AppTile = {
  id: "terminal",
  name: "Terminal",
  descr: "Interactive terminal emulator. Type 'help' for available commands.",
  ghLink: "",
  link: "",
  icon: logo,
}

const appTiles: AppTile[] = [
  aboutTile,
  terminalTile,
  ...Object.values(portfolioDb as Record<string, PortfolioProject>).map(
    (item) => ({
      ...item,
      icon: imageById[item.id] || item.iconUrl || logo,
    }),
  ),
]

const POSITION_KEY = "portfolio.desktop.iconPositions.v1"
const ICON_SIZE_KEY = "portfolio.desktop.iconSize.v1"
const HEADER_SAFE_TOP = 54

function parseIconSize(value: string | null): IconSize {
  if (value === "small" || value === "large") return value
  return "medium"
}

export default function DesktopApp() {
  const canvasRef = useRef<HTMLElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const menuRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number | null>(null)

  const [activeId, setActiveId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null
    const hasVisited = localStorage.getItem(POSITION_KEY)
    return hasVisited ? null : "about"
  })
  const [now, setNow] = useState("")
  const [openMenu, setOpenMenu] = useState<MenuLabel | null>(null)
  const [positionsInitialized, setPositionsInitialized] = useState(false)
  const [iconSize, setIconSize] = useState<IconSize>(() => {
    if (typeof window === "undefined") return "medium"
    return parseIconSize(localStorage.getItem(ICON_SIZE_KEY))
  })
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })
  const [iconPositions, setIconPositions] = useState<IconPositions>({})
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("All")
  const [showTerminal, setShowTerminal] = useState(false)
  const [heroPos, setHeroPos] = useState<{ x: number; y: number }>(() => {
    if (typeof window === "undefined") return { x: 20, y: 70 }
    const saved = localStorage.getItem("portfolio.heroPos")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {}
    }
    return { x: 20, y: 70 }
  })
  const heroDrag = useRef<{
    startX: number
    startY: number
    origX: number
    origY: number
  } | null>(null)

  const desktopTiles = useMemo(() => {
    const base = appTiles.filter((tile) => tile.id !== "about")
    if (projectFilter === "All") return base
    const allowed = PROJECT_FILTER_CATEGORIES[projectFilter] || []
    return base.filter(
      (tile) => tile.category && allowed.includes(tile.category),
    )
  }, [projectFilter])

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
      const parsed = JSON.parse(stored) as IconPositions
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
    const closeMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(null)
      }
    }

    window.addEventListener("click", closeMenu)
    return () => window.removeEventListener("click", closeMenu)
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId(null)
        setOpenMenu(null)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIconPositions((prev) => {
        const next = { ...prev }
        const width = window.innerWidth
        const height = window.innerHeight
        const itemBox = 140
        const maxX = Math.max(0, width - itemBox)
        const maxY = Math.max(HEADER_SAFE_TOP, height - itemBox - 100)

        let changed = false
        for (const id of Object.keys(next)) {
          const pos = next[id]
          if (pos) {
            const clampedX = clamp(pos.x, 20, maxX)
            const clampedY = clamp(pos.y, HEADER_SAFE_TOP, maxY)
            if (clampedX !== pos.x || clampedY !== pos.y) {
              next[id] = { x: clampedX, y: clampedY }
              changed = true
            }
          }
        }
        return changed ? next : prev
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
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

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setIconPositions((prev) => ({
          ...prev,
          [drag.id]: { x: clampedX, y: clampedY },
        }))
      })
    }

    const onUp = (event: PointerEvent) => {
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
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

  const handleHeroPointerDown = (e: React.PointerEvent) => {
    const el = e.currentTarget as HTMLElement
    el.setPointerCapture(e.pointerId)
    heroDrag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: heroPos.x,
      origY: heroPos.y,
    }
  }

  const handleHeroPointerMove = (e: React.PointerEvent) => {
    if (!heroDrag.current) return
    const dx = e.clientX - heroDrag.current.startX
    const dy = e.clientY - heroDrag.current.startY
    setHeroPos({
      x: heroDrag.current.origX + dx,
      y: heroDrag.current.origY + dy,
    })
  }

  const handleHeroPointerUp = () => {
    if (heroDrag.current) {
      heroDrag.current = null
      localStorage.setItem("portfolio.heroPos", JSON.stringify(heroPos))
    }
  }

  const resetLayout = () => {
    const width = canvasRef.current?.clientWidth || window.innerWidth
    setIconPositions(getDefaultPositions(desktopTiles, width))
    setOpenMenu(null)
  }

  const openTile = (id: string) => {
    if (id === "terminal") {
      setShowTerminal(true)
    } else {
      setActiveId(id)
    }
  }

  const handlePointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
    tileId: string,
  ) => {
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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if (event.key === "Enter") openTile(id)
  }

  return (
    <main
      data-testid="desktop"
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
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
      />

      <section
        className={`${s.desktopCanvas} ${s.desktopFree}`}
        ref={canvasRef}
      >
        {desktopTiles.map((tile, index) => {
          const position = iconPositions[tile.id]

          return (
            <DesktopIcon
              key={tile.id}
              tile={tile}
              isActive={activeId === tile.id}
              iconSizeClass={iconSizeClass}
              position={position}
              headerSafeTop={HEADER_SAFE_TOP}
              onPointerDown={handlePointerDown}
              onKeyDown={handleKeyDown}
              index={index}
            />
          )
        })}
      </section>

      <div
        className={s.heroWidget}
        style={{
          left: heroPos.x,
          top: heroPos.y,
          position: "fixed",
          zIndex: 100,
        }}
        onPointerDown={handleHeroPointerDown}
        onPointerMove={handleHeroPointerMove}
        onPointerUp={handleHeroPointerUp}
      >
        <div className={s.heroCard}>
          <h1 className={s.heroName}>Maksym Opanasenko</h1>
          <p className={s.heroTitle}>Frontend Engineer · UI/UX</p>
          <span className={s.heroBadge}>
            <span className={s.heroBadgeDot} />
            Open to work
          </span>
          <div className={s.heroLinks}>
            <a
              href="https://github.com/jilimb0"
              target="_blank"
              rel="noreferrer"
              className={s.heroLink}
            >
              GitHub
            </a>
            <a
              href="https://gitlab.com/ofmaos"
              target="_blank"
              rel="noreferrer"
              className={s.heroLink}
            >
              GitLab
            </a>
            <button
              type="button"
              className={s.heroLink}
              onClick={() => openTile("about")}
            >
              About Me
            </button>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className={s.heroLink}
            >
              View CV
            </a>
          </div>
        </div>
      </div>

      <div className={s.mobileHero}>
        <h1 className={s.mobileHeroName}>Maksym Opanasenko</h1>
        <p className={s.mobileHeroTitle}>Frontend Engineer · UI/UX</p>
        <span className={s.mobileBadge}>
          <span className={s.mobileBadgeDot} />
          Open to work
        </span>
        <div className={s.mobileLinks}>
          <a
            href="https://github.com/jilimb0"
            target="_blank"
            rel="noreferrer"
            className={s.mobileLink}
          >
            GitHub
          </a>
          <a
            href="https://gitlab.com/ofmaos"
            target="_blank"
            rel="noreferrer"
            className={s.mobileLink}
          >
            GitLab
          </a>
          <button
            type="button"
            className={s.mobileLink}
            onClick={() => openTile("about")}
          >
            About Me
          </button>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className={s.mobileLink}
          >
            View CV
          </a>
        </div>
      </div>

      <div className={s.mobileProjectGrid}>
        {desktopTiles.map((tile, idx) => (
          <button
            key={tile.id}
            type="button"
            className={s.mobileProjectCard}
            style={{ animationDelay: `${idx * 55}ms` }}
            onClick={() => openTile(tile.id)}
          >
            <img
              className={s.mobileProjectThumb}
              src={tile.icon}
              alt={tile.name}
            />
            <div className={s.mobileProjectInfo}>
              <p className={s.mobileProjectName}>{tile.name}</p>
              {tile.category && (
                <p className={s.mobileProjectCat}>{tile.category}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      <DesktopDock items={appTiles} onOpen={openTile} activeId={activeId} />
      <ErrorBoundary>
        <AppWindow
          key={activeTile?.id || "closed"}
          tile={activeTile}
          onClose={() => setActiveId(null)}
        />
      </ErrorBoundary>

      {showTerminal && (
        <Terminal
          tiles={appTiles}
          onOpenProject={(id) => {
            setShowTerminal(false)
            setActiveId(id)
          }}
          onClose={() => setShowTerminal(false)}
        />
      )}
    </main>
  )
}
