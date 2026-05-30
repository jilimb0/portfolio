import { useEffect, useMemo, useRef, useState } from "react"
import admin from "../../assets/admin.webp"
import catlabpos from "../../assets/catlab-pos-screen.webp"
import indaapp from "../../assets/indaapp.webp"
import indulgence from "../../assets/indulgence.webp"
import lifestyleecosystem from "../../assets/lifestyle-ecosystem-screen.webp"
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
import AppWindow from "./components/AppWindow"
import DesktopDock from "./components/DesktopDock"
import DesktopIcon from "./components/DesktopIcon"
// Import modular components
import MenuBar from "./components/MenuBar"
import s from "./style.module.css"
import { clamp, getDefaultPositions, snap } from "./utils/layout"

const imageById = {
  admin,
  indaapp,
  indulgence,
  pokemon,
  serviceapp,
  stopcheck,
  weather,
  catlabpos,
  lifestyleecosystem,
}

const appTiles = [
  {
    id: "about",
    name: "About Me",
    descr:
      "Frontend engineer focused on product UI, interactive UX, and production-ready frontend architecture.\nCore stack: React, JavaScript/TypeScript, modern CSS, REST API integrations, and reusable component systems.\nI build responsive web apps, admin dashboards, and polished portfolio/landing experiences with attention to performance and visual detail.\nOpen to freelance, long-term product collaboration, and frontend consulting.",
    ghLink: "https://github.com/jilimb0",
    gitlabLink: "https://gitlab.com/ofmaos",
    link: "",
    icon: logo,
  },
  ...Object.values(portfolioDb).map((item) => ({
    ...item,
    icon: imageById[item.id] || item.iconUrl || logo,
  })),
]

const POSITION_KEY = "portfolio.desktop.iconPositions.v1"
const ICON_SIZE_KEY = "portfolio.desktop.iconSize.v1"
const HEADER_SAFE_TOP = 54

export default function DesktopApp() {
  const canvasRef = useRef(null)
  const dragRef = useRef(null)
  const menuRef = useRef(null)
  const rafRef = useRef(null)

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

  // Check bounds on resize and pull spilling icons back into visible screen area
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

      // Optimize dragging rendering frequency with requestAnimationFrame
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setIconPositions((prev) => ({
          ...prev,
          [drag.id]: { x: clampedX, y: clampedY },
        }))
      })
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

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") openTile(id)
  }

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

      <DesktopDock items={appTiles} onOpen={openTile} activeId={activeId} />
      <AppWindow
        key={activeTile?.id || "closed"}
        tile={activeTile}
        onClose={() => setActiveId(null)}
      />
    </main>
  )
}
