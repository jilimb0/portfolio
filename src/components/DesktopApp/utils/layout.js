const GRID_STEP = 22
const HEADER_SAFE_TOP = 54
const ITEM_BOX_SIZE = 140 // Increased from 120 to prevent cramped labels and text wrapping

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function snap(value) {
  return Math.round(value / GRID_STEP) * GRID_STEP
}

export function getDefaultPositions(items, width) {
  const cols = Math.max(1, Math.floor((width - 40) / ITEM_BOX_SIZE))

  return items.reduce((acc, tile, index) => {
    const col = index % cols
    const row = Math.floor(index / cols)
    acc[tile.id] = {
      x: 20 + col * ITEM_BOX_SIZE,
      y: HEADER_SAFE_TOP + row * ITEM_BOX_SIZE,
    }
    return acc
  }, {})
}
