import type {
  AppTile,
  IconPosition,
  ProjectCategory,
} from "../../../types/portfolio"
import s from "../style.module.css"

const CATEGORY_BADGE: Record<ProjectCategory, { label: string; mod: string }> =
  {
    "Featured Case Study": { label: "Featured", mod: s.badgeFeatured },
    "Commercial Product": { label: "Commercial", mod: s.badgeCommercial },
    "Commercial Dashboard": { label: "Dashboard", mod: s.badgeCommercial },
    "Client Project": { label: "Client", mod: s.badgeClient },
    "Client Landing Page": { label: "Client", mod: s.badgeClient },
    "UX Experiment": { label: "Experiment", mod: s.badgeExperiment },
    "Pet Project": { label: "Pet", mod: s.badgePet },
    "Open Source": { label: "Open Source", mod: s.badgeOpenSource },
    "Personal Tool": { label: "Tool", mod: s.badgePersonalTool },
  }

interface DesktopIconProps {
  tile: AppTile
  isActive: boolean
  iconSizeClass: string
  position: IconPosition | undefined
  headerSafeTop: number
  onPointerDown: (
    event: React.PointerEvent<HTMLButtonElement>,
    tileId: string,
  ) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, id: string) => void
  index: number
}

export default function DesktopIcon({
  tile,
  isActive,
  iconSizeClass,
  position,
  headerSafeTop,
  onPointerDown,
  onKeyDown,
  index,
}: DesktopIconProps) {
  const badge = tile.category ? CATEGORY_BADGE[tile.category] : null

  const isFeatured = tile.category === "Featured Case Study"
  const isCommercial =
    tile.category === "Commercial Product" ||
    tile.category === "Commercial Dashboard"

  return (
    <button
      key={tile.id}
      type="button"
      className={`${s.iconTile} ${iconSizeClass} ${isActive ? s.iconTileActive : ""} ${isFeatured ? s.iconTileFeatured : ""} ${isCommercial ? s.iconTileCommercial : ""}`}
      style={{
        left: `${position?.x ?? 20}px`,
        top: `${position?.y ?? headerSafeTop}px`,
        animationDelay: `${index * 80}ms`,
      }}
      onPointerDown={(event) => onPointerDown(event, tile.id)}
      onDragStart={(event) => event.preventDefault()}
      onKeyDown={(event) => onKeyDown(event, tile.id)}
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
        {badge && (
          <span className={`${s.iconBadge} ${badge.mod}`}>{badge.label}</span>
        )}
      </span>
      <span className={s.iconLabel}>{tile.name}</span>
    </button>
  )
}
