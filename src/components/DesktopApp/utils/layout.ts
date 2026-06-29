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
  const GAP = 20
  const START_X = GAP
  const START_Y = HEADER_SAFE_TOP + 10
  const itemsPerRow = Math.max(
    1,
    Math.floor((width - GAP) / (ITEM_BOX_SIZE + GAP)),
  )

  return items.reduce<IconPositions>((acc, tile, index) => {
    const row = Math.floor(index / itemsPerRow)
    const col = index % itemsPerRow
    const x = START_X + col * (ITEM_BOX_SIZE + GAP)
    const y = START_Y + row * (ITEM_BOX_SIZE + GAP)

    acc[tile.id] = {
      x: snap(x),
      y: snap(y),
    }
    return acc
  }, {})
}
