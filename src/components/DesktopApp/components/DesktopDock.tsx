import { Fragment, useRef, useState } from "react"
import type { AppTile } from "../../../types/portfolio"
import s from "../style.module.css"

interface DesktopDockProps {
  items: AppTile[]
  onOpen: (id: string) => void
  activeId: string | null
}

export default function DesktopDock({
  items,
  onOpen,
  activeId,
}: DesktopDockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

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

        const isActive = activeId === tile.id

        return (
          <Fragment key={tile.id}>
            <button
              type="button"
              className={`${s.dockItem} ${isActive ? s.dockItemActive : ""}`}
              onClick={() => onOpen(tile.id)}
              onFocus={(event) => {
                const targetRect = event.currentTarget.getBoundingClientRect()
                setMouseX(targetRect.left + targetRect.width / 2)
              }}
              onBlur={() => setMouseX(null)}
              data-label={tile.name}
              aria-label={tile.name}
              style={
                {
                  "--dock-scale": scale.toFixed(3),
                  "--dock-lift": `${lift.toFixed(2)}px`,
                } as React.CSSProperties
              }
              ref={(node) => {
                itemRefs.current[index] = node
              }}
            >
              <img src={tile.icon} alt="" />
              {isActive && (
                <span className={s.dockItemDot} aria-hidden="true" />
              )}
            </button>
            {index === 0 && (
              <span className={s.dockDivider} aria-hidden="true" />
            )}
            {tile.id === "lifestyleecosystem" && (
              <span className={s.dockDivider} aria-hidden="true" />
            )}
            {tile.id === "indaapp" && (
              <span className={s.dockDivider} aria-hidden="true" />
            )}
            {tile.id === "weather" && (
              <span className={s.dockDivider} aria-hidden="true" />
            )}
          </Fragment>
        )
      })}
    </footer>
  )
}
