import PropTypes from "prop-types"
import s from "../style.module.css"

// Map category strings to short badge labels
const CATEGORY_BADGE = {
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

export default function DesktopIcon({
  tile,
  isActive,
  iconSizeClass,
  position,
  headerSafeTop,
  onPointerDown,
  onKeyDown,
  index,
}) {
  const badge = tile.category ? CATEGORY_BADGE[tile.category] : null

  return (
    <button
      key={tile.id}
      type="button"
      className={`${s.iconTile} ${iconSizeClass} ${isActive ? s.iconTileActive : ""}`}
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

DesktopIcon.propTypes = {
  tile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    icon: PropTypes.string,
    iconPosition: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  iconSizeClass: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  headerSafeTop: PropTypes.number.isRequired,
  onPointerDown: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}
