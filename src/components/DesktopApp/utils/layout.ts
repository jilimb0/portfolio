import type { AppTile, IconPositions } from "../../../types/portfolio"

const GRID_STEP = 22
const HEADER_SAFE_TOP = 54
const ITEM_BOX_SIZE = 140

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function snap(value: number): number {
  return Math.round(value / GRID_STEP) * GRID_STEP
}

export function getDefaultPositions(
  items: AppTile[],
  width: number,
): IconPositions {
  const height = typeof window !== "undefined" ? window.innerHeight : 768
  const maxRows = Math.max(
    1,
    Math.floor((height - HEADER_SAFE_TOP - 140) / ITEM_BOX_SIZE),
  )

  return items.reduce<IconPositions>((acc, tile, index) => {
    const row = index % maxRows
    const col = Math.floor(index / maxRows)

    const rightEdgeX = width - ITEM_BOX_SIZE - 20
    const x = Math.max(20, rightEdgeX - col * ITEM_BOX_SIZE)
    const y = HEADER_SAFE_TOP + row * ITEM_BOX_SIZE

    acc[tile.id] = {
      x: snap(x),
      y: snap(y),
    }
    return acc
  }, {})
}
