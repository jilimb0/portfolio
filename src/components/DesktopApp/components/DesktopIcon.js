import PropTypes from "prop-types"
import s from "../style.module.css"

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
      </span>
      <span className={s.iconLabel}>{tile.name}</span>
    </button>
  )
}

DesktopIcon.propTypes = {
  tile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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
